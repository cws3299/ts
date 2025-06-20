import {
  Avatar,
  Box,
  Typography,
  styled,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useAuthStore } from "../../state/AuthStore";
import { Margin } from "@mui/icons-material";
import LibraryHead from "./LibraryHead";

const AvatarButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 12px",
  backgroundColor: "#333",
  borderRadius: "8px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#444",
  },
  userSelect: "none",
});

const LogoutBox = styled(Box)<{ width: number }>(({ width }) => ({
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: "6px",
  backgroundColor: "#222",
  color: "#fff",
  padding: "6px 0",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
  textAlign: "center",
  width: `${width}px`,
  "&:hover": {
    backgroundColor: "#444",
  },
}));

const RelativeWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
});

const SearchBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "focused",
})<{ focused: boolean }>(({ focused, theme }) => ({
  display: "flex",
  alignItems: "center",
  border: `1px solid ${focused ? "#1DB954" : "#444"}`,
  borderRadius: 8,
  padding: "8px 12px",
  transition: "border 0.2s ease",
  gap: "4px",
}));

const SearchInput = styled(InputBase)({
  color: "white",
  flex: 1,
  fontSize: "14px",
  "& input::placeholder": {
    color: "#aaa",
  },
});

const Navbar = () => {
  const location = useLocation();
  const [isFocused, setIsFocused] = useState(false);

  const { data: userProfile } = useGetCurrentUserProfile();
  const [showLogout, setShowLogout] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const avatarButtonRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const isSearchPage = location.pathname.startsWith("/search");
  const { keyword } = useParams<{ keyword: string }>();
  const isPlayListPage = location.pathname === "/playlist";

  useEffect(() => {
    if (isSearchPage && keyword) {
      setSearch(keyword);
    }
  }, [isSearchPage, keyword]);

  useEffect(() => {
    const trimmed = search.trim();

    const debounce = setTimeout(() => {
      if (!isSearchPage) return;

      if (!trimmed) {
        navigate("/search", { replace: true });
      } else {
        navigate(`/search/${encodeURIComponent(trimmed)}`, { replace: true });
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [search, isSearchPage, navigate]);

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  const removeId = useAuthStore((state) => state.removeState);
  const setUserId = useAuthStore((state) => state.setState);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");
    removeId();
    window.location.href = "/";
  };

  useLayoutEffect(() => {
    if (avatarButtonRef.current) {
      setButtonWidth(avatarButtonRef.current.offsetWidth);
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      setUserId(userProfile.id);
    }
  }, [userProfile]);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      display="flex"
      justifyContent={isSearchPage ? "space-between" : "flex-end"}
      alignItems="center"
      height="64px"
      minHeight="64px"
      px={3}
      className="testtest"
      gap={2}
    >
      {isSearchPage && !isPlayListPage ? (
        <SearchBox focused={isFocused}>
          <SearchIcon sx={{ color: "#aaa", fontSize: 20 }} />
          <SearchInput
            placeholder={isFocused ? "" : "Let's find some music"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
      ) : (
        <Box sx={{ width: 300, height: 40 }} />
      )}

      {isPlayListPage && !isMdUp ? <LibraryHead /> : null}

      {userProfile ? (
        <RelativeWrapper>
          <AvatarButton onClick={toggleLogout} ref={avatarButtonRef}>
            <Avatar
              src={userProfile.images[0]?.url}
              alt={userProfile.display_name}
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="body2" noWrap color="#fff">
              {userProfile.display_name}
            </Typography>
          </AvatarButton>

          {showLogout && (
            <LogoutBox onClick={logout} width={buttonWidth}>
              로그아웃
            </LogoutBox>
          )}
        </RelativeWrapper>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
