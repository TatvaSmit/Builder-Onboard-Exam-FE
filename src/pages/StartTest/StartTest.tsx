import { Box, Typography } from "@mui/material";
import Layout from "../../layout/layout";
import MuiInput from "../../components/Input/MuiInput";
import MuiSelect from "../../components/Select/MuiSelect";
import MuiButton from "../../components/Button/MuiButton";
import { useState } from "react";
import Modal from "../../modals/Modal";

interface Props {}

const StartTest = (props: Props) => {
  const [openExamModal, setOpenExamModal] = useState(false);
  const handleCloseModal = () => {
    setOpenExamModal(false);
  };
  const handleOpenExamDetailsModal = () => {
    setOpenExamModal(true);
  };
  return (
    <>
      <Layout pageTitle="Start exam" isDeveloper={true}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{fontFamily: "Rubik,sans-serif", fontWeight: 800, fontSize: "32px", marginBottom: "20px" }}
          >
            Start Exam
          </Typography>
          <MuiSelect
            label="Technology"
            menuList={["Node", "React"]}
            width="500px"
          />
          <MuiButton
            margin="20px 0 0 0"
            width="150px"
            fontColor="white"
            borderRadius="4px"
            onClick={handleOpenExamDetailsModal}
          >
            Start Exam
          </MuiButton>
        </Box>
        <Modal
          title={"Exam Details"}
          type="examDetails"
          open={openExamModal}
          handleClose={handleCloseModal}
        />
      </Layout>
    </>
  );
};
export default StartTest;
