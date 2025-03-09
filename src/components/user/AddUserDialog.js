import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function AddUserDialog({ open, onClose, onAdd }) {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: null,
  });

  const handleAddUser = () => {
    if (!newUser.first_name || !newUser.last_name || !newUser.email) {
      alert("All fields are required!");
      return;
    }

    const newUserData = {
      id: Math.floor(Math.random() * 1000),
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      avatar: newUser.avatar || `https://i.pravatar.cc/150?u=${Math.random()}`,
    };

    onAdd(newUserData);
    onClose();
    setNewUser({ first_name: "", last_name: "", email: "", avatar: null });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mb={2}
        >
          <Avatar
            src={newUser.avatar || "https://i.pravatar.cc/150"}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="upload-avatar"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-avatar">
            <IconButton color="primary" component="span">
              <PhotoCamera />
              <input type="file" hidden onChange={handleImageUpload} />
            </IconButton>
          </label>
        </Box>

        <TextField
          fullWidth
          label="First Name"
          value={newUser.first_name}
          onChange={(e) =>
            setNewUser({ ...newUser, first_name: e.target.value })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          value={newUser.last_name}
          onChange={(e) =>
            setNewUser({ ...newUser, last_name: e.target.value })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleAddUser} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserDialog;
