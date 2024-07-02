import React, { useState, useEffect } from "react";
import { Box, Typography, Switch, Grid, Paper } from "@mui/material";

const privilegeLabels = [
  "Create User/Group/Role",
  "Modify User/Group/Role",
  "Assign User to Group",
  "Image Server Operations",
  "Create/Modify DataClass",
  "Create/Modify Global Index",
  "Assign Rights",
  null,
  null,
  null,
  null,
  "Manage Audit Log",
  "Manage Data Security",
  "View Data Security",
  "Assign User to Application"
];

const Privileges = ({ binaryString, setBinaryString }) => {
  const [privileges, setPrivileges] = useState({});

  useEffect(() => {
    const initialPrivileges = privilegeLabels.reduce((acc, label, index) => {
      if (label !== null) {
        acc[label] = binaryString[index] === '1';
      }
      return acc;
    }, {});
    setPrivileges(initialPrivileges);
  }, [binaryString]);

  const handlePrivilegeChange = (privilege) => (event) => {
    const newPrivileges = {
      ...privileges,
      [privilege]: event.target.checked,
    };
    setPrivileges(newPrivileges);

    const newBinaryString = privilegeLabels.map((label, index) => {
      if (label === privilege) {
        return event.target.checked ? '1' : '0';
      }
      return privileges[label] ? '1' : '0';
    }).join('');

    setBinaryString(newBinaryString);
  };

  const privilegeKeys = Object.keys(privileges);

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
        width: '100%'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Privileges</Typography>
        <Box>
          <Typography
            variant="body2"
            component="span"
            sx={{ cursor: "pointer", color: "#1976d2", marginRight: 2 }}
            onClick={() => {
              privilegeKeys.forEach(privilege => handlePrivilegeChange(privilege)({ target: { checked: true } }));
            }}
          >
            Select All
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ cursor: "pointer", color: "#1976d2" }}
            onClick={() => {
              privilegeKeys.forEach(privilege => handlePrivilegeChange(privilege)({ target: { checked: false } }));
            }}
          >
            Remove All
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {privilegeKeys.slice(0, Math.ceil(privilegeKeys.length / 2)).map((privilege) => (
            <Box
              key={privilege}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                backgroundColor: "#fff",
                borderRadius: 1,
                boxShadow: 1,
                mb: 1,
              }}
            >
              <Typography variant="body1">{privilege}</Typography>
              <Switch
                checked={privileges[privilege]}
                onChange={handlePrivilegeChange(privilege)}
                color="primary"
              />
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          {privilegeKeys.slice(Math.ceil(privilegeKeys.length / 2)).map((privilege) => (
            <Box
              key={privilege}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                backgroundColor: "#fff",
                borderRadius: 1,
                boxShadow: 1,
                mb: 1,
              }}
            >
              <Typography variant="body1">{privilege}</Typography>
              <Switch
                checked={privileges[privilege]}
                onChange={handlePrivilegeChange(privilege)}
                color="primary"
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Privileges;
