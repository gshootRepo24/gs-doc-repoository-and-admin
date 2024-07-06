import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  Paper,
  InputAdornment,
  CircularProgress,
  ListItemIcon,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import { addMemberToGroups } from "../../../../api calls/addMemberToGroup";

const AssignGroups = ({ currGroups, associatedUsers, selectedUserIndex,userDbId ,setUpdatedGroups}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [associatedSearchTerm, setAssociatedSearchTerm] = useState("");
  const [availableGroups, setAvailableGroups] = useState([]);
  const [associatedGroups, setAssociatedGroups] = useState([]);

  useEffect(() => {
    // Initialize available groups by filtering out the associated groups from currGroups
    const initialAvailableGroups = currGroups.filter(
      (group) =>
        !associatedUsers.some(
          (associatedGroup) => associatedGroup.groupName === group.groupName
        )
    );
    setAvailableGroups(initialAvailableGroups);
    setAssociatedGroups(associatedUsers);
  }, [currGroups, associatedUsers]);

  const transformGroups = (groups) => {
    return groups.map(group => ({
      groupIndex: group.groupIndex,
      roleIndex: '0'  
    }));
  };

  const handleAssociateUser = (group) => {
    const updatedAssociatedGroups = [...associatedGroups, group];
    setAssociatedGroups(updatedAssociatedGroups);
    setAvailableGroups((prev) =>
      prev.filter((grp) => grp.groupName !== group.groupName)
    );

      const transformedGroups = transformGroups(updatedAssociatedGroups);
      console.log('updated groups of user after adding are: ', transformedGroups);
      setUpdatedGroups(transformedGroups);
      //await addMemberToGroups(userDbId, selectedUserIndex, transformedGroups);
  };

  const handleDissociateUser = (group) => {
    const updatedAssociatedGroups = associatedGroups.filter((grp) => grp.groupName !== group.groupName);
    setAssociatedGroups(updatedAssociatedGroups);
    setAvailableGroups((prev) => {
      
      const isGroupPresent = prev.some((grp) => grp.groupName === group.groupName);
      if (!isGroupPresent) {
        return [...prev, group];
      }
      return prev;
    });

      const transformedGroups = transformGroups(updatedAssociatedGroups);
      console.log('updated groups of user after removing are: ', transformedGroups);
      setUpdatedGroups(transformedGroups);
      //await addMemberToGroups(userDbId, selectedUserIndex, transformedGroups);
  };

  const filteredGroups = availableGroups.filter((group) =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssociatedGroups = associatedGroups.filter((group) =>
    group.groupName.toLowerCase().includes(associatedSearchTerm.toLowerCase())
  );

  if (!associatedUsers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (associatedUsers.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h6">No Assigned Groups</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" padding={2}>
      <Paper elevation={3} sx={{ width: "45%", padding: 2 }}>
        <TextField
          placeholder="Search Groups"
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {filteredGroups.map((grp) => (
            <ListItem
              key={grp.groupName}
              sx={{ display: "flex", justifyContent: "space-between", cursor: 'pointer' }}
              onClick={() => handleAssociateUser(grp)}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={grp.groupName} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ width: "45%", padding: 2 }}>
        <TextField
          placeholder="Search Associated Groups"
          onChange={(e) => setAssociatedSearchTerm(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" flexWrap="wrap" gap={1}>
          {filteredAssociatedGroups.map((grp) => (
            <Chip
              key={grp.groupName}
              label={grp.groupName}
              icon={<GroupIcon style={{ color: "#fff" }} />}
              onClick={() => handleDissociateUser(grp)}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                cursor: 'pointer',
                "& .MuiChip-deleteIcon": {
                  color: "#fff",
                },
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default AssignGroups;
