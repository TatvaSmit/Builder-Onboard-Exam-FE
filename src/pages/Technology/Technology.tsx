import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Input from "../../components/Input/MuiInput";
import Layout from "../../layout/layout";
import MuiButton from "../../components/Button/MuiButton";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import Modal from "../../modals/Modal";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  resetForm,
  setErrors,
  techFormOnChange,
} from "../../redux/slices/updateTechSlice";

const technology = [
  { name: "Node", id: 1, duration: 30, no_of_questions: 30 },
  { name: "ROR", id: 2, duration: 30, no_of_questions: 30 },
  { name: "React Native", id: 3, duration: 30, no_of_questions: 30 },
];

const technologyTableHeaders = [
  "Technology",
  "Duration",
  "Questions",
  "Action",
];

const DialogContent = () => {
  const techModal = useSelector((state: RootState) => state.techModal);
  const dispatch = useDispatch();
  const handleDialogInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(techFormOnChange({ name, value }));
  };
  return (
    <Grid container rowGap={3}>
      <Grid item xs={12}>
        <Input
          label="Technology"
          placeholder="Technology"
          fullWidth
          width="100%"
          value={techModal.techUpdateFormData.technology}
          name="technology"
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label="Duration"
          type="number"
          value={techModal.techUpdateFormData.duration}
          name="duration"
          placeholder="Duration"
          helperText={techModal.techUpdateFormData.errors.duration}
          error={Boolean(techModal.techUpdateFormData.errors.duration)}
          fullWidth
          width="100%"
          onChange={handleDialogInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label="No. of questions"
          type="number"
          name="noOfQuestions"
          error={Boolean(techModal.techUpdateFormData.errors.noOfQuestions)}
          helperText={techModal.techUpdateFormData.errors.noOfQuestions}
          value={techModal.techUpdateFormData.noOfQuestions}
          placeholder="No of question"
          fullWidth
          width="100%"
          onChange={handleDialogInputChange}
        />
      </Grid>
    </Grid>
  );
};

const Technology = () => {
  const [tech, setTechnology] = useState("");
  const dispatch = useDispatch();
  const techModal = useSelector((state: RootState) => state.techModal);
  console.log(techModal);

  const handleClickOpen = () => {
    dispatch(
      openModal({
        open: true,
        type: "updateTechnology",
        onCancel: handleClose,
        onSubmit: handleUpdateTech,
        dialogContent: <DialogContent />,
      })
    );
  };

  const handleUpdateTech = () => {
    const { duration, technology, noOfQuestions } =
      techModal.techUpdateFormData;
    if (!duration || !technology || !noOfQuestions) {
      dispatch(setErrors());
    }
  };

  const handleClose = () => {
    dispatch(closeModal({}));
    dispatch(resetForm());
  };

  const addTechnology = () => {
    if (tech) {
    } else {
    }
  };
  return (
    <>
      <Layout pageTitle="Technology">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            padding: "24px 0",
          }}
        >
          <Box sx={webStyles.technologyPageWrapper}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "32px",
                marginBottom: "20px",
                fontFamily: "Rubik,sans-serif",
              }}
              onClick={addTechnology}
            >
              Add Technology
            </Typography>
            <Box mb={3}>
              <Input
                name={"technology"}
                width="400px"
                placeholder="Enter technology name"
                onChange={(e) => setTechnology(e.target.value)}
              />
              <MuiButton
                margin={"0 0 0 20px"}
                borderRadius="4px"
                height={"55px"}
                width="65px"
                fontColor="white"
              >
                Add
              </MuiButton>
            </Box>

            <Grid
              container
              sx={{
                ...webStyles.technologyName,
                backgroundColor: "#6c00ea",
                color: "white",
                marginBottom: "20px",
                height: "62px",
              }}
            >
              {technologyTableHeaders.map((header) => {
                return (
                  <Grid style={{ textAlign: "center" }} xs={true}>
                    {header}
                  </Grid>
                );
              })}
            </Grid>
            <Grid container rowGap={2}>
              {technology.map((t, idx: number) => {
                return (
                  <Grid xs={12} sx={{ ...webStyles.technologyName }}>
                    <Grid style={{ textAlign: "center" }} xs={true}>
                      {t.name}
                    </Grid>
                    <Grid style={{ textAlign: "center" }} xs={true}>
                      {t.duration}min
                    </Grid>
                    <Grid style={{ textAlign: "center" }} xs={true}>
                      {t.no_of_questions}
                    </Grid>
                    <Grid style={{ textAlign: "center" }} xs={true}>
                      <IconButton
                        sx={{ color: "#6c00ea" }}
                        onClick={handleClickOpen}
                      >
                        <Edit />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
};
export default Technology;

const webStyles = {
  technologyName: {
    // boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
    border: "0.2px solid #e2e2e2",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    fontFamily: "Rubik, sans-serif",
    backgroundColor: "#f4eaff",
  },
  technologyPageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: "500px",
  },
};
