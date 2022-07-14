import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Button, Typography, Link } from "@components/commons";

const pages = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "library",
    path: "/library",
  },
  {
    name: "plan",
    path: "/plan",
  },
  {
    name: "blog",
    path: "/blog",
  },
  {
    name: "about",
    path: "/about",
  },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BrandNameResponsive screen="big" />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Button size="large" handleOnAction={handleOpenNavMenu}>
              <MenuIcon />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.path}>
                    <a>{page.name}</a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <BrandNameResponsive screen="small" />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href={page.path} key={page.name}>
                <a>{page.name.toUpperCase()}</a>
              </Link>
            ))}
          </Box>
          <Link href="/login" color="secondary">
            <a>SIGN IN</a>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

function BrandNameResponsive({ screen }) {
  if (screen === "small") {
    return (
      <>
        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            mt: 1,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MyBib
        </Typography>
      </>
    );
  }
  return (
    <>
      <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        component="a"
        href="/"
        sx={{
          mr: 2,
          mt: 1,
          display: { xs: "none", md: "flex" },
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        MyBib
      </Typography>
    </>
  );
}

export default Navbar;
