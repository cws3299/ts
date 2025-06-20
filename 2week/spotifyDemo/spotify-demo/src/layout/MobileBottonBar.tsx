import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Search, LibraryMusic } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MobileBottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // 현재 경로에 따라 활성 탭을 결정합니다.
    const path = location.pathname;
    if (path === "/") {
      setValue("/");
    } else if (path.startsWith("/search")) {
      setValue("/search");
    } else if (path.startsWith("/playlist")) {
      setValue("/playlist");
    } else {
      // 일치하는 것이 없으면 기본적으로 홈으로 설정합니다.
      setValue("/");
    }
  }, [location.pathname]);

  if (!isMobile) return null;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="홈" value="/" icon={<Home />} />
        <BottomNavigationAction
          label="검색"
          value="/search" // 값은 '/search'로 유지됩니다.
          icon={<Search />}
        />
        <BottomNavigationAction
          label="내 라이브러리"
          value="/playlist"
          icon={<LibraryMusic />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomBar;
