import { Avatar, Box, Typography, styled } from "@mui/material";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useAuthStore } from "../../state/AuthStore";

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

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [showLogout, setShowLogout] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const avatarButtonRef = useRef<HTMLDivElement>(null);

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  const removeId = useAuthStore((state) => state.removeState);

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

  const setUserId = useAuthStore((state) => state.setState);

  useEffect(() => {
    if (userProfile) {
      setUserId(userProfile.id);
    }
  }, [userProfile]);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      pr={2}
    >
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
