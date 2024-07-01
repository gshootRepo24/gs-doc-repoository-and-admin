import "./AddUser.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Tab,
  Tabs,
  Switch,
  TextareaAutosize,
  Grid,
  Menu,
  styled,
  MenuItem,
} from "@mui/material";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";

// import Sidebar from "../Sidebar";
const AddUser = () => {
  console.log("AddUser");
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
  }));

  const [viewAnchorEl, setViewAnchorEl] = useState(false);
  const handleViewClose = () => setViewAnchorEl(null);

  const handleClick = (event) => {
    setViewAnchorEl(!viewAnchorEl);
  };

  const handleClose = () => {
    setViewAnchorEl(null);
  };

  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState(""); // State for group name
  const [associatedUsers, setAssociatedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [neverExpires, setNeverExpires] = useState(false);
  const [expiryDate, setExpiryDate] = useState("Password Expiry Date");
  const [roles, setRoles] = useState([]); // State to manage available roles
  const [assignedRoles, setAssignedRoles] = useState([]); // State to manage assigned roles

  const [privileges, setPrivileges] = useState({
    "Create User/Group/Role": false,
    "Modify User/Group/Role": false,
    "Assign User to Group": false,
    "Image Server Operations": false,
    "Create/Modify DataClass": false,
    "Create/Modify Global Index": false,
    "Assign Rights": false,
    "Manage Audit Log": false,
    "Manage Data Security": false,
    "View Data Security": false,
  });

  useEffect(() => {}, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePrivilegeChange = (name) => (event) => {
    setPrivileges({ ...privileges, [name]: event.target.checked });
  };

  const handleAssociateUser = (user) => {
    setAssociatedUsers([...associatedUsers, user]);
    setUsers(users.filter((u) => u !== user));
  };

  const handleDissociateUser = (user) => {
    setUsers([...users, user]); // Add user back to available users list
    setAssociatedUsers(associatedUsers.filter((u) => u !== user));
  };

  const handleSearchUsers = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    // Filter users based on the search term
  };

  const handleSearchAssociatedUsers = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    // Filter associated users based on the search term
  };
  // const handleChangenever = (e) => {
  //   setNeverExpires((prev) => !prev);
  // };

  const handleChangenever = (event) => {
    setNeverExpires(!neverExpires);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Do something with the passwords, like send them to the server
    console.log("Passwords match:", password);
  };
  const handleChangeexpiry = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleSearchRoles = (event) => {
    // eslint-disable-next-line no-unused-vars
    const searchTerm = event.target.value.toLowerCase();
    // Filter roles based on the search term
  };

  // eslint-disable-next-line no-unused-vars
  const handleSearchAssignedRoles = (event) => {
    // eslint-disable-next-line no-unused-vars
    const searchTerm = event.target.value.toLowerCase();
    // Filter assigned roles based on the search term
  };

  const handleSave = () => {
    // Implement save functionality
    console.log("Details saved");
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ height: "100vh", paddingTop: 4 }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={12} md={3}>
            <Paper
              sx={{ height: "100%", display: "flex", flexDirection: "row" }}
            >
              <Box>
                <Item key="+Create" elevation={2}>
                  <div className="left-panel-user">
                    <span>Users</span>
                    <span>
                      <span className="margin_85"> +Create</span>
                      <span onClick={handleClick}>︙</span>
                    </span>

                    <Menu
                      id="simple-menu"
                      anchorEl={viewAnchorEl}
                      open={Boolean(viewAnchorEl)}
                      onClose={handleViewClose}
                      sx={{
                        "& .MuiPaper-root": {
                          backgroundColor: "#333",
                          color: "white",
                        },
                      }}
                    >
                      <MenuItem onClick={handleClose}>Password policy</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Name Display Style
                      </MenuItem>
                    </Menu>
                  </div>
                  <div className="ser">
                    <input type="text" placeholder="Search User" />{" "}
                  </div>
                </Item>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Enter group name"
                    style={{ width: "200px", marginRight: "10px" }}
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="User Details" />
                    <Tab label="Assign Groups" />
                    <Tab label="Privileges" />
                    <Tab label="Application" />
                  </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                  <Box
                    sx={{
                      display: "",
                      flexDirection: "column",
                      gap: 1,
                      height: "100%",
                    }}
                  >
                    <Typography variant="subtitle1">Primary Details</Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Domain user</Typography>
                      <Switch
                        checked={privileges["Image Server Operations"]}
                        onChange={handlePrivilegeChange(
                          "Image Server Operations"
                        )}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "raw",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Password*</Typography>
                      <form onSubmit={handleSubmit}>
                        <TextField
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          width="100%"
                        />
                      </form>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "raw",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Confirm Password*</Typography>
                      <form onSubmit={handleSubmit}>
                        <TextField
                          type="password"
                          placeholder="ConfirmPassword"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          width="100%"
                          error={error !== ""}
                          helperText={error}
                        />
                      </form>
                    </Box>
                   
                      <div
                        
                      >
                        
                        <span>Password Never Expiers</span>
                        <Switch
                          checked={neverExpires}
                          onChange={handleChangenever}
                        />
                      </div>
             
                    {!neverExpires && 
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Password Expiry Date"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Password Expiry Days"
                        />
                      </RadioGroup>
                    </FormControl>
                    }
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      height: "100%",
                    }}
                  >
                    <Typography variant="subtitle1">Assign Users</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <TextField
                        placeholder="Search User(s) to associate"
                        fullWidth
                        onChange={handleSearchUsers}
                        variant="outlined"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAssociateUser("user1")}
                      >
                        Associate All
                      </Button>
                    </Box>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography variant="subtitle1">User(s)</Typography>
                      {users.map((user, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography>{user}</Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAssociateUser(user)}
                          >
                            Associate
                          </Button>
                        </Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <TextField
                        placeholder="Search associated User(s)"
                        fullWidth
                        onChange={handleSearchAssociatedUsers}
                        variant="outlined"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDissociateUser("user1")}
                      >
                        Dissociate All
                      </Button>
                    </Box>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography variant="subtitle1">
                        Associated User(s)
                      </Typography>
                      {associatedUsers.map((user, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography>{user}</Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDissociateUser(user)}
                          >
                            Dissociate
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      height: "100%",
                    }}
                  >
                    <Typography variant="subtitle1">Privileges</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Create User/Group/Role</Typography>
                      <Switch
                        checked={privileges["Create User/Group/Role"]}
                        onChange={handlePrivilegeChange(
                          "Create User/Group/Role"
                        )}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Modify User/Group/Role</Typography>
                      <Switch
                        checked={privileges["Modify User/Group/Role"]}
                        onChange={handlePrivilegeChange(
                          "Modify User/Group/Role"
                        )}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Assign User to Group</Typography>
                      <Switch
                        checked={privileges["Assign User to Group"]}
                        onChange={handlePrivilegeChange("Assign User to Group")}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Image Server Operations</Typography>
                      <Switch
                        checked={privileges["Image Server Operations"]}
                        onChange={handlePrivilegeChange(
                          "Image Server Operations"
                        )}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Create/Modify DataClass</Typography>
                      <Switch
                        checked={privileges["Create/Modify DataClass"]}
                        onChange={handlePrivilegeChange(
                          "Create/Modify DataClass"
                        )}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Create/Modify Global Index</Typography>
                      <Switch
                        checked={privileges["Create/Modify Global Index"]}
                        onChange={handlePrivilegeChange(
                          "Create/Modify Global Index"
                        )}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Assign Rights</Typography>
                      <Switch
                        checked={privileges["Assign Rights"]}
                        onChange={handlePrivilegeChange("Assign Rights")}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Manage Audit Log</Typography>
                      <Switch
                        checked={privileges["Manage Audit Log"]}
                        onChange={handlePrivilegeChange("Manage Audit Log")}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Manage Data Security</Typography>
                      <Switch
                        checked={privileges["Manage Data Security"]}
                        onChange={handlePrivilegeChange("Manage Data Security")}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>View Data Security</Typography>
                      <Switch
                        checked={privileges["View Data Security"]}
                        onChange={handlePrivilegeChange("View Data Security")}
                      />
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      height: "100%",
                    }}
                  >
                    <Typography variant="subtitle1">Roles</Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography>Associated User(s)</Typography>
                      <TextField
                        placeholder="Search users to associate roles"
                        fullWidth
                        onChange={handleSearchUsers}
                        variant="outlined"
                      />
                    </Box>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography>Roles</Typography>
                      <TextField
                        placeholder="Search roles"
                        fullWidth
                        onChange={handleSearchRoles}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </TabPanel>
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default AddUser;
