import { Box, Typography } from "@mui/material";
import Layout from "../../layout/layout";
import MuiInput from "../../components/Input/MuiInput";
import MuiSelect from "../../components/Select/MuiSelect";
import MuiButton from "../../components/Button/MuiButton";
import { useState } from "react";
import Modal from "../../modals/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeModal, openModal } from "../../redux/slices/modalSlice";

interface Props {}

const StartTest = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal({ open: false }));
  };

  const handleAttempTest = () => {
    dispatch(closeModal({ open: false }));
    navigate("/test-session");
  };

  const handleOpenExamDetailsModal = () => {
    dispatch(
      openModal({
        type: "examDetails",
        title: "Success",
        open: true,
        onCancel: handleCloseModal,
        onSubmit: handleAttempTest,
      })
    );
  };
  return (
    <>
      <Layout pageTitle="Exam" isDeveloper={true}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "calc(100vh - 64px)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "32px",
              marginBottom: "20px",
              fontFamily: "Rubik, sans-serif",
            }}
          >
            Test
          </Typography>
          <MuiSelect
            label="Technology"
            menuList={["Node", "React"]}
            width="500px"
            fontFamily="Rubik, sans-serif"
          />
          <MuiButton
            margin="40px 0 0 0"
            width="160px"
            fontColor="white"
            borderRadius="4px"
            onClick={handleOpenExamDetailsModal}
          >
            Start Test
          </MuiButton>
        </Box>
      </Layout>
    </>
  );
};
export default StartTest;
