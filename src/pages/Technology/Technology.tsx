import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Input from "../../components/Input/MuiInput";
import Layout from "../../layout/layout";
import MuiButton from "../../components/Button/MuiButton";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import Modal from "../../modals/Modal";

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

const Technology = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setOpenEditModal(false);
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
              sx={{ fontWeight: 800, fontSize: "32px", marginBottom: "20px" }}
            >
              Add Technology
            </Typography>
            <Box mb={3}>
              <Input
                name={"technology"}
                width="400px"
                placeholder="Enter technology name"
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
              }}
            >
              {technologyTableHeaders.map((header) => {
                return <Grid xs={true}>{header}</Grid>;
              })}
            </Grid>
            <Grid container rowGap={2}>
              {technology.map((t, idx: number) => {
                return (
                  <Grid xs={12} sx={{ ...webStyles.technologyName }}>
                    <Grid xs={true}>{t.name}</Grid>
                    <Grid xs={true}>{t.duration}min</Grid>
                    <Grid xs={true}>{t.no_of_questions}</Grid>
                    <Grid xs={2}>
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
        <Modal
          type="updateTechnology"
          title="update"
          open={openEditModal}
          handleClose={handleClose}
        />
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
