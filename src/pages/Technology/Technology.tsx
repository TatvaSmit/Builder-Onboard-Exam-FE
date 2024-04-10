import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Input from "../../components/Input/MuiInput";
import Layout from "../../layout/layout";
import MuiButton from "../../components/Button/MuiButton";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Modal from "../../modals/Modal";
import {
  createTechnology,
  getAllTechnologies,
  updateTechnology,
} from "../../services/technologyServices";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { resetForm } from "../../redux/slices/updateTechSlice";
import apiCall from "../../config/apiCall";
import { setData } from "../../redux/slices/commonSlice";
import { ITechnology } from "../../constants/Interface";

const technologyTableHeaders = ["Technology", "Duration", "Questions", "Action"];

const DialogContent = () => {
  const common = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const handleDialogInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      setData({
        name: "techUpdateFormData",
        value: { ...common.techUpdateFormData, [name]: value },
      })
    );
  };
  return (
    <Grid container rowGap={3}>
      <Grid item xs={12}>
        <Input
          label="Technology"
          placeholder="Technology"
          fullWidth
          width="100%"
          value={common.techUpdateFormData.technology}
          name="technology"
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label="Duration"
          type="number"
          value={common.techUpdateFormData.duration}
          name="duration"
          placeholder="Duration"
          helperText={_.get(common, "techUpdateFormData.errors.duration", "")}
          error={Boolean(_.get(common, "techUpdateFormData.errors.duration", ""))}
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
          error={Boolean(_.get(common, "techUpdateFormData.errors.noOfQuestions", ""))}
          helperText={_.get(common, "techUpdateFormData.errors.noOfQuestions", "")}
          value={common.techUpdateFormData.noOfQuestions}
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
  const common = useSelector((state: RootState) => state.common);
  const [technologies, setTechnologies] = useState([]);
  const dispatch = useDispatch();

  const handleClickOpen = (tech: ITechnology) => {
    dispatch(
      setData({
        name: "techUpdateFormData",
        value: {
          id: tech.id,
          technology: _.get(tech, "name", ""),
          duration: _.get(tech, "duration", ""),
          noOfQuestions: _.get(tech, "no_of_questions", 0),
          errors: {
            duration: "",
            noOfQuestions: "",
          },
        },
      })
    );
    dispatch(
      openModal({
        type: "updateTechnology",
        onCancel: handleClose,
        onSubmit: handleUpdateTech,
        dialogContent: <DialogContent />,
      })
    );
  };

  const handleUpdateTech = async (props: any) => {
    console.log(common)
    const duration = _.get(common, "techUpdateFormData.duration", "");
    const noOfQuestions = _.get(common, "techUpdateFormData.noOfQuestions", "");
    if (!duration || !noOfQuestions) {
      dispatch(
        setData({
          name: "techUpdateFormData",
          value: {
            ...common.techUpdateFormData,
            errors: {
              // ..._.get(common, "techUpdateFormData.errors", {}),
              duration: duration ? "" : "duration is required",
              noOfQuestions: noOfQuestions ? "" : "number of questions is required",
            },
          },
        })
      );
      return;
    }

    const { response, error } = await apiCall(() =>
      updateTechnology(props.techUpdateFormData.id, {
        duration: props.techUpdateFormData.duration,
        no_of_questions: props.techUpdateFormData.noOfQuestions,
      })
    );
    if (response) {
      const { response, error } = await apiCall(getAllTech);
    }
    dispatch(closeModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(resetForm());
  };

  const [technology, setTechnology] = useState("");
  const [technologyError, setTechnologyError] = useState("");
  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLInputElement;
    setTechnology(value);
    setTechnologyError("");
  };

  const handleAddTechnology = async () => {
    if (technology) {
      const res = await createTechnology({ name: technology }).catch((error) => console.log(error));
      if (res) {
        setTechnology("");
        setTechnologyError("");
        getAllTech();
      }
    } else {
      setTechnologyError("technology is required");
    }
  };

  const getAllTech = async () => {
    const { response, error } = await apiCall(getAllTechnologies);
    setTechnologies(_.get(response, "data", []));
  };

  useEffect(() => {
    getAllTech();
  }, []);

  return (
    <>
      <Layout pageTitle="Technology">
        <Box sx={webStyles.pageWrapper}>
          <Box sx={webStyles.technologyPageWrapper}>
            <Typography sx={webStyles.pageTitle}>Add Technology</Typography>
            <Box mb={3}>
              <Input
                onChange={handleTechChange}
                value={technology}
                name={"technology"}
                width="400px"
                placeholder="Enter technology name"
                helperText={technologyError}
                error={Boolean(technologyError)}
              />
              <MuiButton
                margin={"0 0 0 20px"}
                borderRadius="4px"
                height={"55px"}
                width="65px"
                fontColor="white"
                onClick={handleAddTechnology}
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
              {technologies.map((t: ITechnology, idx: number) => {
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
                      <IconButton sx={{ color: "#6c00ea" }} onClick={() => handleClickOpen(t)}>
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
  pageWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: "24px 0",
  },
  pageTitle: {
    fontWeight: 500,
    fontSize: "32px",
    marginBottom: "20px",
    fontFamily: "Rubik,sans-serif",
  },
  technologyName: {
    // boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
    border: "0.2px solid #e2e2e2",
    borderRadius: "8px",
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
