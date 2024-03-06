import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { lazy, useState } from "react";
import MuiButton from "../components/Button/MuiButton";
import Input from "../components/Input/MuiInput";
import { error, success } from "../assets";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/slices/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
  type: any;
  open: boolean;
  description?: string;
  title: string;
  dialogContent?: any;
  handleClose: () => void;
  handleSubmit?: (props?: any) => void;
}

const UpdateTechnology = (props: Props) => {
  const { handleClose, dialogContent, handleSubmit } = props;
  const common = useSelector((state: RootState) => state.common);
  return (
    <>
      <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Rubik, sans-serif" }}>
        Update duration and no. of questions
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
        {dialogContent}
        <DialogActions>
          <MuiButton borderRadius="4px" fontColor="white" onClick={handleClose}>
            Close
          </MuiButton>
          {handleSubmit && (
            <MuiButton borderRadius="4px" fontColor="white" onClick={() => handleSubmit(common)}>
              Update
            </MuiButton>
          )}
        </DialogActions>
      </DialogContent>
    </>
  );
};

const ExamDetails = (props: Props) => {
  const { title, description, handleClose, handleSubmit, dialogContent } = props;
  return (
    <>
      <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Rubik, sans-serif" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
        <DialogActions>
          <MuiButton
            borderRadius="4px"
            backgroundColor="white"
            border="1px solid #6c00ea"
            fontColor="#6c00ea"
            onClick={handleClose}
          >
            Close
          </MuiButton>
          {handleSubmit && (
            <MuiButton
              borderRadius="4px"
              fontColor="white"
              margin="0 0 0 20px"
              onClick={handleSubmit}
            >
              Submit
            </MuiButton>
          )}
        </DialogActions>
      </DialogContent>
    </>
  );
};

const SuccessModal = (props: Props) => {
  const { title, description, handleClose } = props;
  return (
    <>
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontFamily: "Rubik, sans-serif",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "24px" }}>Question added successfully</Typography>
        <DialogContentText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          id="alert-dialog-description"
        >
          <img src={success} alt="success" style={{ width: "300px" }} />
        </DialogContentText>

        <DialogActions>
          <MuiButton width="140px" borderRadius="4px" fontColor="white" onClick={handleClose}>
            Close
          </MuiButton>
        </DialogActions>
      </DialogContent>
    </>
  );
};

const AlertModal = (props: Props) => {
  const { title, handleClose, handleSubmit, description } = props;
  return (
    <>
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontFamily: "Rubik, sans-serif",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "24px" }}>Question added successfully</Typography>

        <DialogContentText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          id="alert-dialog-description"
        >
          <img src={success} alt="success" style={{ width: "300px" }} />
        </DialogContentText>

        <DialogActions>
          <MuiButton
            borderRadius="4px"
            backgroundColor="white"
            border="1px solid #6c00ea"
            fontColor="#6c00ea"
            onClick={handleClose}
          >
            Cancel
          </MuiButton>
          {handleSubmit && (
            <MuiButton
              borderRadius="4px"
              fontColor="white"
              margin="0 0 0 20px"
              minWidth=""
              onClick={handleSubmit}
            >
              Ok
            </MuiButton>
          )}
        </DialogActions>
      </DialogContent>
    </>
  );
};

const ErrorModal = (props: Props) => {
  const dispatch = useDispatch();
  const { title, description, handleClose = () => dispatch(closeModal()), handleSubmit } = props;
  return (
    <>
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontFamily: "Rubik, sans-serif",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "24px" }}>{description}</Typography>
        <DialogContentText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          id="alert-dialog-description"
        >
          <img src={error} alt="success" style={{ width: "300px" }} />
        </DialogContentText>
        <DialogActions>
          <MuiButton width="140px" borderRadius="4px" fontColor="white" onClick={handleClose}>
            Close
          </MuiButton>
        </DialogActions>
      </DialogContent>
    </>
  );
};

const Modal = (props: Props) => {
  const { open, handleClose, type } = props;
  let children = <></>;
  switch (type) {
    case "updateTechnology":
      children = <UpdateTechnology {...props} />;
      break;
    case "examDetails":
      children = <ExamDetails {...props} />;
      break;
    case "success":
      children = <SuccessModal {...props} />;
      break;
    case "alert":
      children = <AlertModal {...props} />;
      break;
    default:
      children = <ErrorModal {...props} />;
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {children}
      </Dialog>
    </>
  );
};

export default Modal;
