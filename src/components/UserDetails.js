import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={400}
        >
          <CircularProgress size={60} thickness={4} color="primary" />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Card sx={{ maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={user.avatar}
            alt={user.first_name}
            sx={{
              borderRadius: "50%",
              width: 150,
              height: 150,
              margin: "auto",
              mt: 2,
            }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Email: {user.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/dashboard")}
              sx={{
                mt: 3,
                textTransform: "none",
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s",
              }}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}

export default UserDetails;
