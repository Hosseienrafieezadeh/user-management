import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import AddUserDialog from "../components/user/AddUserDialog";
import EditUserDialog from "../components/user/EditUserDialog";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useUser } from "../context/UserContext";

function Dashboard() {
  const { users, setUsers } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { open } = useSidebar();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      setLoading(false);
      return;
    }

    fetch("https://reqres.in/api/users?page=1")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
        localStorage.setItem("users", JSON.stringify(data.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [setUsers]);

  const handleAddUser = (newUserData) => {
    setUsers((prev) => [...prev, newUserData]);
    localStorage.setItem("users", JSON.stringify([...users, newUserData]));
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    localStorage.setItem(
      "users",
      JSON.stringify(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: isMobile ? 50 : 80 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: isMobile ? 60 : 80,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: isMobile ? 1 : 1.5,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => navigate(`/user/${params.id}`)}
            sx={{ fontSize: "0.8rem", mr: 1 }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<Edit />}
            onClick={() => {
              setSelectedUser(params.row);
              setOpenEditDialog(true);
            }}
            sx={{ fontSize: "0.8rem" }}
          >
            Edit
          </Button>
        </>
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
            marginLeft: open ? "0px" : "-20px",
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
    </DashboardLayout>
  );
}

export default Dashboard;
