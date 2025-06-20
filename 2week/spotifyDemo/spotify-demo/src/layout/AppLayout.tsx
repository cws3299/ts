import { NavLink, Outlet } from "react-router";
import { Box, styled, Typography } from "@mui/material";
import { Home, Search } from "@mui/icons-material";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
import MobileBottomBar from "./MobileBottonBar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",
  [theme.breakpoints.down("sm")]: {
    paddingBottom: theme.spacing(8),
  },
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  paddingBottom: "10px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: "#FAF0E6",
  },
  "&:active": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <Home />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <Search />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>

          {/* // 이 두개를 하나의 위젯으로 추가 래핑하는것도 좋을거 같음 -> 도메인 위젯이다 보니 도메인용으로 하나빼는것도 괜찮아 보임 */}
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
      <MobileBottomBar />
    </Layout>
  );
};

export default AppLayout;
