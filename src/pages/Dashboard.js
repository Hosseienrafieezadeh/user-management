import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Fab,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import AddUserDialog from "../components/user/AddUserDialog";
import EditUserDialog from "../components/user/EditUserDialog";
import DeleteUserDialog from "../components/user/DeleteUserDialog";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useUser } from "../context/UserContext";

function Dashboard() {
  const { users, setUsers } = useUser();
  const [loading, setLoading] = useState(true);
  const usersRef = useRef([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { open } = useSidebar();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (usersRef.current.length > 0) {
      setUsers(usersRef.current);
      setLoading(false);
      return;
    }

    fetch("https://reqres.in/api/users?page=1")
      .then((response) => response.json())
      .then((data) => {
        usersRef.current = data.data;
        setUsers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [setUsers]);

  const handleAddUser = (newUserData) => {
    setUsers((prev) => [...prev, newUserData]); //
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const columns = [
    { field: "id", headerName: "ID", width: isMobile ? 50 : 100 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: isMobile ? 60 : 100,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      minWidth: 280, // جلوگیری از فشرده شدن دکمه‌ها
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // **وسط‌چین کردن افقی**
            alignItems: "center", // **وسط‌چین کردن عمودی**
            height: "100%", // 👈 باعث می‌شود کل ارتفاع سلول پر شود
            width: "100%",
            gap: 1,
          }}
        >
          <Tooltip title="View">
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ fontSize: "0.8rem", minWidth: "70px" }}
              onClick={() => navigate(`/user/${params.id}`)}
            >
              View
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<Edit />}
              sx={{ fontSize: "0.8rem", minWidth: "70px" }}
              onClick={() => {
                setSelectedUser(params.row);
                setOpenEditDialog(true);
              }}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<Delete />}
              sx={{ fontSize: "0.8rem", minWidth: "70px" }}
              onClick={() => {
                setSelectedUser(params.row);
                setOpenDeleteDialog(true);
              }}
            >
              Delete
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <CircularProgress size={60} thickness={4} color="primary" />
        </Box>
      ) : (
        <Paper
          sx={{
            height: 550,
            width: open ? "calc(100% - 220px)" : "100%",
            transition: "width 0.3s ease-in-out",
            p: 2,
            position: "relative",
            overflowX: "auto",
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              sx={{ textTransform: "none", fontSize: "1rem", px: 4 }}
            >
              Add User
            </Button>
          </Box>
        </Paper>
      )}

      {isMobile && (
        <Fab
          color="success"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          onClick={() => setOpenDialog(true)}
        >
          <Add />
        </Fab>
      )}

      <AddUserDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddUser}
      />
      <EditUserDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        user={selectedUser}
        onSave={handleEditUser}
      />
      <DeleteUserDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        user={selectedUser}
        onDelete={handleDeleteUser}
      />
    </DashboardLayout>
  );
}

export default Dashboard;
