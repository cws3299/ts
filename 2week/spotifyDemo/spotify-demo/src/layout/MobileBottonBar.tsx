// components/MobileBottomNav.tsx
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
    setValue(location.pathname);
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
        <BottomNavigationAction label="Home" value="/" icon={<Home />} />
        <BottomNavigationAction
          label="Search"
          value="/search"
          icon={<Search />}
        />
        <BottomNavigationAction
          label="Your Library"
          value="/library"
          icon={<LibraryMusic />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomBar;
