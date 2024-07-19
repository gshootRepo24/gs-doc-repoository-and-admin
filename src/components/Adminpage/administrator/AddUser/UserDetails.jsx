import React from "react";
import {
  Box,
  TextField,
  Typography,
  Switch,
  Grid,
  Paper,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import "./UserDetails.scss";
import { addUser } from "../../../../api calls/addUser";
import { toast } from "react-toastify";

const UserDetails = ({
  isUserSelected,
  tabValue,
  setTabValue,
  groupName,
  setGroupName,
  associatedUsers,
  setAssociatedUsers,
  users,
  setUsers,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  neverExpires,
  setNeverExpires,
  expiryDate,
  setExpiryDate,
  roles,
  setRoles,
  assignedRoles,
  setAssignedRoles,
  isDomainUser,
  setIsDomainUser,
  isGeneratePassword,
  setIsGeneratePassword,
  firstName,
  setFirstName,
  personalName,
  setPersonalName,
  lastName,
  setLastName,
  email,
  setEmail,
  comment,
  setComment,
}) => {
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);
  const handlePersonalNameChange = (event) =>
    setPersonalName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleCommentChange = (event) => setComment(event.target.value);
  const handleExpiryDateChange = (event) => setExpiryDate(event.target.value);
  const handleChangenever = (event) => setNeverExpires(event.target.checked);

  const handleDomainUserChange = (event) => {
    setIsDomainUser(event.target.checked);
  };

  const handleGeneratePasswordChange = (event) => {
    setIsGeneratePassword(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userDetails = {
      user: {
        parentGroupIndex: "1",
        password,
        fax: "",
        name: firstName,
        personalName: personalName,
        familyName: lastName,
        comment,
        mailId: email,
        passwordNeverExpire: neverExpires ? "Y" : "N",
        domainUser: isDomainUser ? "Y" : "N",
        limitCount: "1000",
        privileges: "11111111111111",
        groupIndex: "2",
        dataDefination: {
          field: [
            {
              indexId: "1019",
              indexType: "I",
              indexValue: "9954",
            },
          ],
        },
      },
    };

    try {
      const response = await addUser(userDetails);
      if (response.status === 0) {
        toast.success("User added successfully!");
      } else {
        toast.error("User adding failed!");
      }
    } catch (error) {
      toast.error("User adding failed!");
    }
  };


  // display: flex;
  // flex-direction: row;
  // align-items: baseline;
  // justify-content: space-between;

  return (
    <Box component={Paper} elevation={3} className="container">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} style={{ padding: "24px" }}>
          <Grid item xs={12} className="form-section">
            <Typography variant="h6" className="form-section__header" style={{ marginBottom: "24px" }}>
              Primary Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} className="form-section__field">
                <Typography style={{ marginBottom: "0px" }}>Domain User</Typography>
                <Switch checked={isDomainUser} onChange={handleDomainUserChange} />
              </Grid>
              <Grid item xs={6} className="form-section__field">
                <Typography style={{ marginBottom: "0px" }}>Generate Password</Typography>
                <Switch checked={isGeneratePassword} onChange={handleGeneratePasswordChange} />
              </Grid>
              <Grid item xs={6} className="form-section__field">
                <Typography style={{ marginBottom: "0px" }}>Password</Typography>
                <TextField
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                  fullWidth
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { padding: "6px" } }}
                />
              </Grid>
              <Grid item xs={6} className="form-section__field">
                <Typography style={{ marginBottom: "0px" }}>Confirm Password</Typography>
                <TextField
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                  fullWidth
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { padding: "6px" } }}
                />
              </Grid>
              <Grid item xs={12} className="form-section__field" style={{ marginTop: "0px" }}>
              <div>Password Settings</div>
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={<Switch checked={neverExpires} onChange={handleChangenever} />}
                  label="Never Expires"
                  style={{ marginTop: "15px" }} // Adjust the margin as needed
                />
                <RadioGroup
                  row
                  value={neverExpires ? "never" : "expiry"}
                  onChange={handleChangenever}
                  className="radio-group"
                >
                  <FormControlLabel value="expiry" control={<Radio />} label="Password Expiry Date" />
                  <FormControlLabel value="days" control={<Radio />} label="Password Expiry Days" />
                </RadioGroup>
              </Box>
            </Grid>
              <Grid item xs={6} className="form-section__field">
                <Typography style={{ marginBottom: "0px" }}>Password Expiry Date</Typography>
                <TextField
                  type="date"
                  value={neverExpires ? "" : expiryDate}
                  onChange={handleExpiryDateChange}
                  disabled={neverExpires}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  inputProps={{ style: { padding: "6px" } }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className="form-section">
            <Typography variant="h6" className="form-section__header" style={{ marginBottom: "24px" }}>
              Other Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} className="form-section__field">
                <Typography style={{ marginBottom: "4px" }}>Personal Name</Typography>
                <TextField
                  label="Personal Name"
                  value={personalName}
                  onChange={handlePersonalNameChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { padding: "6px" } }}
                />
              </Grid>
              <Grid item xs={12} className="form-section__field">
                <Typography style={{ marginBottom: "4px" }}>Last Name</Typography>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { padding: "6px" } }}
                />
              </Grid>
              <Grid item xs={12} className="form-section__field">
                <Typography style={{ marginBottom: "4px" }}>Email Id</Typography>
                <TextField
                  label="Email Id"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { padding: "6px" } }}
                />
              </Grid>
              <Grid item xs={12} className="form-section__field">
                <Typography style={{ marginBottom: "4px" }}>Comment</Typography>
                <TextField
                  label="Comment"
                  value={comment}
                  onChange={handleCommentChange}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { padding: "6px" } }}
                />
              </Grid>
              {error && (
                <Grid item xs={12} className="form-section__error">
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {!isUserSelected && (
            <Grid item xs={12} className="button-container" style={{ marginTop: "24px" }}>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default UserDetails;
