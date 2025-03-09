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
} from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const usersRef = useRef([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (usersRef.current.length > 0) {
      setUsers(usersRef.current);
      setLoading(false);
      return;
    }

    fetch("https://reqres.in/api/users?page=1")
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data.data) !== JSON.stringify(usersRef.current)) {
          usersRef.current = data.data;
          setUsers(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: isMobile ? 50 : 80 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: isMobile ? 60 : 80,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          sx={{
            width: isMobile ? 30 : 40,
            height: isMobile ? 30 : 40,
            boxShadow: 2,
          }}
        />
      ),
    },
    { field: "first_name", headerName: "First Name", minWidth: 100, flex: 1 },
    { field: "last_name", headerName: "Last Name", minWidth: 100, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      minWidth: isMobile ? 150 : 180,
      flex: 1.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: isMobile ? 120 : 150,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate(`/user/${params.id}`)}
          sx={{
            textTransform: "none",
            boxShadow: 2,
            fontSize: isMobile ? "0.7rem" : "0.875rem",
            "&:hover": {
              boxShadow: 4,
              transform: "translateY(-2px)",
            },
            transition: "all 0.2s",
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout isMobile={isMobile}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}
      >
        Users List
      </Typography>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <CircularProgress
            size={isMobile ? 40 : 60}
            thickness={4}
            color="primary"
          />
        </Box>
      ) : (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Paper
            sx={{
              height: isMobile ? 400 : 500,
              minWidth: isMobile ? 500 : 700,
              maxWidth: "100%",
              p: isMobile ? 2 : 3,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "background.paper",
            }}
          >
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={isMobile ? 3 : 5}
              rowsPerPageOptions={isMobile ? [3, 5] : [5, 10]}
              checkboxSelection
              disableSelectionOnClick
              autoPageSize
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            />
          </Paper>
        </Box>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
