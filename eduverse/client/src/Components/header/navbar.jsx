import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { setLoggoedUser } from "../useRedux/user";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from '../userSide/categoryComponent/categoryModal'
import axios from '../../Config/axios'


const pages = {
  user: ["Home", "Categories", "Courses"],
  admin: ["Mentors", "Courses", "Users", "Categories", "Reports"],
  mentor: ["Home", "Earning", "Courses", "Purchase List"],
};

const settings = ["Profile", "Logout"];

function ResponsiveAppBar({ role, logoutUser }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [fetchedCategories, setFetchedCategories] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    if (role === "user") {
      navigate("/user/userProfile");
    } else if (role === "admin") {
      navigate("/admin/adminProfile");
    } else if (role === "mentor") {
      navigate("/mentor/mentorProfile");
    }
    handleCloseUserMenu();
  };


  const userDetails = useSelector((state) => state.loggedUser.currentUser);
  console.log(userDetails);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    dispatch(setLoggoedUser(null));
    console.log(userDetails);
    navigate("/login");
    handleCloseUserMenu();
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/user/getAllCategories"); // Adjust the API endpoint URL
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };


  const handlePageClick = async (page) => {
    if (role === "admin") {
      if (page === "Users") {
        navigate("/admin/userManage");
      }
      if (page === "Courses") {
        navigate("/admin/courseView");
      }
      if (page === "Categories") {
        navigate("/admin/categoryList");
      }
      if (page === "Mentors") {
        navigate("/admin/mentorManage");
      }
      handleCloseNavMenu();
    }
    if (role === "mentor") {
      if (page === "Home") {
        navigate("/mentor/mentorHome");
      }
      if (page === "Courses") {
        navigate("/mentor/courseManage");
      }
      if (page === "Purchase List") {
        navigate("/mentor/purchaseDetails");
      }
      handleCloseNavMenu();
    }

    if (role === "user") {
      if (page === "Home") {
        navigate("/user/userHome");
      }
      if(page === "Courses"){
        navigate(`/user/yourCourses/${userDetails._id}`)
      }
      if(page==="Categories"){
        try {
          const categories = await fetchCategories(); // Use the API request function
          setFetchedCategories(categories);
          setShowCategoryModal(true);
          handleCloseNavMenu();
        } catch (error) {
          console.log(error);
        }
      }
      handleCloseNavMenu();
    }
  };

  const navbarLinks = pages[role] || [];

  return (
    <AppBar position="static" sx={{ height: 80 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EDUVERSE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
              {navbarLinks.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
             <Modal
          open={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <CategoryList categories={fetchedCategories} /> {/* Pass your category data here */}
          </Box>
        </Modal>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarLinks.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Profile"
                      ? handleProfileClick
                      : handleLogoutClick
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;