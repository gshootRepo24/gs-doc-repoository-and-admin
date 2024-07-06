import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DeleteConfirmModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this folder?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="error" 
            onClick={onConfirm}
            sx={{ mr: 2 }}
          >
            Delete
          </Button>
          <Button 
            variant="contained" 
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmModal;
