import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const MySnackbar = (props) => {
  return (
    <Snackbar
      open={props.SnackbarDetails.enabled}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      onClose={props.handleClose}
    >
      <Alert
        severity={props.SnackbarDetails.color}
        variant="filled"
        className="quiz-app-font"
        style={{ borderRadius: "17px" }}
      >
        {props.SnackbarDetails.message}
      </Alert>
    </Snackbar>
  );
};

export default MySnackbar;
