import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useState } from "react";
import MuiButton from "../components/Button/MuiButton";
import Input from "../components/Input/MuiInput";

interface Props {
  open: boolean;
  title: string;
  handleClose: () => void;
}

const UpdateTechnology = (props: Props) => {
  const { open, title, handleClose } = props;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Rubik, sans-serif" }}>
          {" "}
          Update duration and no. of questions{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
          <Grid container rowGap={3}>
            <Grid item xs={12}>
              <Input label="Technology" placeholder="Technology" fullWidth width="100%" />
            </Grid>
            <Grid item xs={12}>
              <Input label="Duration" type="number" placeholder="Duration" fullWidth width="100%" />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="No. of questions"
                type="number"
                placeholder="No of question"
                fullWidth
                width="100%"
              />
            </Grid>
          </Grid>
          <DialogActions>
            <MuiButton borderRadius="4px" fontColor="white" onClick={handleClose}>
              Close
            </MuiButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTechnology;
