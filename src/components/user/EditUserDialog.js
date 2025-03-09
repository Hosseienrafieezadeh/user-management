import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function EditUserDialog({ open, onClose, user, onSave }) {
  const [editedUser, setEditedUser] = useState(user);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleSave = () => {
    if (!editedUser.first_name || !editedUser.last_name || !editedUser.email) {
      setError("All fields are required!");
      return;
    }

    onSave(editedUser);
    setSuccess(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mb={2}
          >
            <Avatar
              src={editedUser?.avatar || "https://i.pravatar.cc/150"}
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-avatar-edit"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-avatar-edit">
              <IconButton color="primary" component="span">
                <PhotoCamera />
                <input type="file" hidden onChange={handleImageUpload} />
              </IconButton>
            </label>
          </Box>

          <TextField
            fullWidth
            label="First Name"
            value={editedUser?.first_name || ""}
            onChange={(e) =>
              setEditedUser({ ...editedUser, first_name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            value={editedUser?.last_name || ""}
            onChange={(e) =>
              setEditedUser({ ...editedUser, last_name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={editedUser?.email || ""}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          User updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditUserDialog;
