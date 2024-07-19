import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import AlarmIcon from '@mui/icons-material/Alarm';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import VersionsIcon from '@mui/icons-material/History';
import CheckInIcon from '@mui/icons-material/CheckCircleOutline';
import CheckOutIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveIcon from '@mui/icons-material/OpenWith';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import MoveFolderModal from './MoveFolderModal';
import CopyFolderModal from './CopyFolderModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import copyFolder from '../../../../api calls/dulpicateFolder';
import { deleteFolder } from '../../../../api calls/deleteFolder';
import { toast } from 'react-toastify';

const decodeLoginUserRights = (rights) => {
  return {
    reserved1: (rights & (1 << 0)) !== 0,
    viewMetaData: (rights & (1 << 1)) !== 0,
    createFolder: (rights & (1 << 2)) !== 0,
    modifyMetaData: (rights & (1 << 3)) !== 0,
    delete: (rights & (1 << 4)) !== 0,
    annotate: (rights & (1 << 5)) !== 0,
    reserved2: (rights & (1 << 6)) !== 0,
    print: (rights & (1 << 7)) !== 0,
    copy: (rights & (1 << 8)) !== 0,
    viewSecuredData: (rights & (1 << 9)) !== 0,
    viewContent: (rights & (1 << 10)) !== 0,
    modifyContent: (rights & (1 << 11)) !== 0,
  };
};

const OptionsModal = ({ modalOpen, handleModalClose, anchorEl, parentFolder, folderIndex, loginUserRights }) => {
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [moveFolderModalOpen, setMoveFolderModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [rights,setRights] = useState({});

  useEffect(()=>{
    setRights(decodeLoginUserRights(loginUserRights));
  },[loginUserRights])

  const handleCopyClick = () => {
    setCopyModalOpen(true);
    handleModalClose();
  };

  const handleCopyModalClose = () => {
    setCopyModalOpen(false);
  };

  const handleMoveClick = () => {
    setMoveFolderModalOpen(true);
    handleModalClose();
  };

  const handleMoveFolderModalClose = () => {
    setMoveFolderModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteConfirmModalOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmModalOpen(false);
  };

  const handleDeleteFolder = async () => {
    try {
      await deleteFolder(folderIndex, parentFolder, -2003653037);
      console.log("Folder has been deleted");
      toast.success("Folder deleted successfully");
    } catch (error) {
      console.error("Error deleting folder", error);
      toast.error("Error deleting folder");
    } finally {
      setDeleteConfirmModalOpen(false);
      handleModalClose();
    }
  };

  const handleDuplicateClick = async () => {
    try {
      await copyFolder(folderIndex, parentFolder, parentFolder);
      console.log('Document duplicated successfully');
      handleModalClose();
    } catch (error) {
      console.error('Error duplicating document:', error);
    }
  };

  const getPosition = () => {
    if (anchorEl) {
      const { bottom, top, left } = anchorEl.getBoundingClientRect();
      const modalHeight = 400; // Estimate the modal height
      const windowHeight = window.innerHeight;
      const modalWidth = 200; // Set the modal width
      const windowWidth = window.innerWidth;

      let calculatedTop, calculatedLeft;

      // Check if there's enough space at the bottom
      if (windowHeight - bottom < modalHeight) {
        calculatedTop = top - modalHeight; // Place above
        // Ensure modal does not overflow at the top
        if (calculatedTop < 0) {
          calculatedTop = 0;
        }
      } else {
        calculatedTop = bottom; // Place below
      }

      // Calculate horizontal position to ensure it does not overflow
      calculatedLeft = left - 100; // Adjust as needed
      if (calculatedLeft + modalWidth > windowWidth) {
        calculatedLeft = windowWidth - modalWidth;
      } else if (calculatedLeft < 0) {
        calculatedLeft = 0;
      }

      return { top: calculatedTop, left: calculatedLeft };
    }
    return { top: 0, left: 0 };
  };

  const { top, left } = getPosition();

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: top,
            left: left,
            transform: 'translate(-50%, 0)',
            width: 200,
            maxHeight: 400,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
            '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
            'scrollbar-width': 'thin', // Hide scrollbar for Firefox
            'scrollbar-color': '#888 transparent', // For Firefox
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Options
          </Typography>
          <Divider />
          <List>
            <ListItem button aria-label="Forward">
              <ForwardIcon sx={{ mr: 1 }} />
              <ListItemText primary="Forward" />
            </ListItem>
            {rights.viewMetaData && (
              <ListItem button aria-label="Alarms">
                <AlarmIcon sx={{ mr: 1 }} />
                <ListItemText primary="Alarms" />
              </ListItem>
            )}
            {rights.print && (
              <ListItem button aria-label="Print">
                <PrintIcon sx={{ mr: 1 }} />
                <ListItemText primary="Print" />
              </ListItem>
            )}
            <ListItem button aria-label="Share">
              <ShareIcon sx={{ mr: 1 }} />
              <ListItemText primary="Share" />
            </ListItem>
            <Divider />
            {rights.viewMetaData && (
              <ListItem button aria-label="Versions">
                <VersionsIcon sx={{ mr: 1 }} />
                <ListItemText primary="Versions" />
              </ListItem>
            )}
            {rights.modifyContent && (
              <ListItem button aria-label="Check In">
                <CheckInIcon sx={{ mr: 1 }} />
                <ListItemText primary="Check In" />
              </ListItem>
            )}
            {rights.modifyContent && (
              <ListItem button aria-label="Check Out">
                <CheckOutIcon sx={{ mr: 1 }} />
                <ListItemText primary="Check Out" />
              </ListItem>
            )}
            <Divider />
            {rights.delete && (
              <ListItem button aria-label="Delete" onClick={handleDeleteClick}>
                <DeleteIcon sx={{ mr: 1 }} />
                <ListItemText primary="Delete" />
              </ListItem>
            )}
            {rights.copy && (
              <ListItem button aria-label="Move" onClick={handleMoveClick}>
                <MoveIcon sx={{ mr: 1 }} />
                <ListItemText primary="Move" />
              </ListItem>
            )}
            {rights.copy && (
              <ListItem button aria-label="Copy" onClick={handleCopyClick}>
                <DuplicateIcon sx={{ mr: 1 }} />
                <ListItemText primary="Copy" />
              </ListItem>
            )}
            {rights.copy && (
              <ListItem button aria-label="Duplicate" onClick={handleDuplicateClick}>
                <DuplicateIcon sx={{ mr: 1 }} />
                <ListItemText primary="Duplicate" />
              </ListItem>
            )}
          </List>
        </Box>
      </Modal>
      <CopyFolderModal
        modalOpen={copyModalOpen}
        handleModalClose={handleCopyModalClose}
        parentFolder={parentFolder}
        folderIndex={folderIndex}
      />
      <MoveFolderModal
        modalOpen={moveFolderModalOpen}
        handleModalClose={handleMoveFolderModalClose}
        parentFolder={parentFolder}
        folderIndex={folderIndex}
      />
      <DeleteConfirmModal
        open={deleteConfirmModalOpen}
        onClose={handleDeleteConfirmClose}
        onConfirm={handleDeleteFolder}
      />
    </>
  );
};

export default OptionsModal;
