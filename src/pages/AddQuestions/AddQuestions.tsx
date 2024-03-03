import { Box, IconButton, Typography } from "@mui/material";
import Input from "../../components/Input/MuiInput";
import MuiSelect from "../../components/Select/MuiSelect";
import { useState } from "react";
import MuiRadioButton from "../../components/Radio/MuiRadioButton";
import { AddCircle, Delete } from "@mui/icons-material";
import MuiButton from "../../components/Button/MuiButton";
import Layout from "../../layout/layout";
import Option from "../../components/Option/Option";
import Modal from "../../modals/Modal";

const AddQuestion = () => {
  const [optionsArr, setOptionArr] = useState([{ name: "" }]);
  const [correctOption, setCorrectOption] = useState<null | number>(null);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Layout pageTitle="Add Questions">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 0",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "32px",
              marginBottom: "20px",
              fontFamily: "Rubik,sans-serif",
            }}
          >
            Add Question
          </Typography>
          <MuiSelect width="500px" mb={"20px"} menuList={[""]} />
          <Box mb={2}>
            <Input
              width="500px"
              label="Question"
              placeholder="Enter the question"
            />
          </Box>
          <Box mb={2}>
            <Input
              width="500px"
              label="Points"
              type="number"
              placeholder="Enter question points"
            />
          </Box>
          <h2>Add Options</h2>
          <Box sx={{ maxWidth: "fit-content" }}>
            {optionsArr.map((option: any, index: number) => {
              return (
                <Box mb={2} sx={{ display: "flex", alignItems: "center" }}>
                  <Input
                    width="500px"
                    placeholder="Enter Option"
                    startAdornment={
                      <Option index={index} width="56px" height="56px" />
                    }
                    endAdornment={
                      <MuiRadioButton
                      // onClick={() => setCorrectOption(index)}
                      // checked={index === correctOption}
                      />
                    }
                  />
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Box>
              );
            })}
            <Box>
              <IconButton
                sx={{
                  display: "flex",
                  color: "white",
                  minWidth: "auto",
                  marginLeft: "auto",
                  backgroundColor: "#6c00ea",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#6c00ea",
                  },
                }}
                onClick={() => setOptionArr([...optionsArr, { name: "" }])}
              >
                <AddCircle />
              </IconButton>
            </Box>
          </Box>
          <MuiButton
            onClick={() => setOpenModal(true)}
            variant="contained"
            borderRadius="4px"
            fontColor="white"
          >
            Add Question
          </MuiButton>
        </Box>
        <Modal
          title="Suceess"
          open={openModal}
          handleClose={() => setOpenModal(false)}
          type={"success"}
        />
      </Layout>
    </>
  );
};

export default AddQuestion;
