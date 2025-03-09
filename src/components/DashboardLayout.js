import {
  Logout,
  Menu,
  People,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditUserDialog from "../components/user/EditUserDialog";
import { useSidebar } from "../context/SidebarContext";
import { useUser } from "../context/UserContext";
import { useThemeMode } from "../context/ThemeContext";

const drawerWidth = 220;

function DashboardLayout({ children }) {
  const { user, updateUser } = useUser();
  const { open, toggleDrawer } = useSidebar();
  const { themeMode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflowX: "hidden",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundImage:
            "linear-gradient(90deg, rgba(180,58,58,1) 2%, rgba(49,49,116,1) 36%, rgba(105,0,161,1) 73%, rgba(166,69,252,1) 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={handleOpenEditDialog}
            >
              <Typography variant="body1">
                {user.first_name} {user.last_name}
              </Typography>
              <Avatar src={user.avatar} alt={user.first_name} />
            </Box>
          )}

          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper, // 👈 تنظیم رنگ سایدبار
            color: theme.palette.text.primary, // 👈 تنظیم رنگ متن
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${open ? drawerWidth : "0px"})`,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>

      <EditUserDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        user={user}
        onSave={updateUser}
      />
    </Box>
  );
}

export default DashboardLayout;
