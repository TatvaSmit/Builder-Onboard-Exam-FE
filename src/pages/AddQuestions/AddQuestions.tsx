import { Box, IconButton, Typography } from "@mui/material";
import MuiInput from "../../components/Input/MuiInput";
import MuiSelect from "../../components/Select/MuiSelect";
import { useEffect, useState } from "react";
import MuiRadioButton from "../../components/Radio/MuiRadioButton";
import { AddCircle, Delete } from "@mui/icons-material";
import MuiButton from "../../components/Button/MuiButton";
import Layout from "../../layout/layout";
import Option from "../../components/Option/Option";
import _ from "lodash";
import { createQuestion } from "../../services/questionServices";
import { useNavigate } from "react-router-dom";
import { getAllTechnologies } from "../../services/technologyServices";
import { IQuestionData, TechnologyList } from "../../constants/Interface";



const AddQuestion = () => {
  const [optionsArr, setOptionArr] = useState([{ name: "" }]);
  const [correctOption, setCorrectOption] = useState<null | number>(null);
  const [technologyList, setTechnologyList] = useState<TechnologyList[]>([]);
  const [questionData, setQuestionData] = useState<IQuestionData>({
    question: null,
    points: null,
    technology_id: null,
    options: [{ name: "" }],
    answer: null,
    optionIndex: null,
  });
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setQuestionData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    const { value } = e.target as HTMLInputElement;
    setQuestionData((prevState) => {
      const updateOptions = _.map(prevState.options, (op, index: number) => {
        if (index === idx) {
          op.name = value;
          return op;
        }
        return op;
      });
      return { ...prevState, options: updateOptions };
    });
  };

  const handleRemoveOptions = (idx: number) => {
    setQuestionData((prevState) => {
      const updateOptions = _.filter(prevState.options, (op, index: number) => {
        return index != idx;
      });
      return { ...prevState, options: updateOptions };
    });
  };

  const handleCorrectAnswer = (idx: number) => {
    setQuestionData((prevState) => {
      const option = _.filter(prevState.options, (op, index: number) => {
        return index === idx;
      });
      return { ...prevState, answer: _.get(option, "[0].name", null), optionIndex: idx };
    });
  };

  const handleAddQuestion = async () => {
    _.set(questionData, "technology_id", Number(_.get(questionData, "technology_id", null)));
    const questionPayload = _.omit(questionData, "optionIndex");
    const res = await createQuestion(questionPayload).catch((error) => console.log(error));
    if (res) {
      navigate("/questions");
    }
  };

  const getAllTechnology = async () => {
    const res = await getAllTechnologies().catch((error) => console.log(error));
    if (res) {
      setTechnologyList(res.data);
    }
  };

  useEffect(() => {
    getAllTechnology();
  }, []);
  console.log(technologyList)
  return (
    <>
      <Layout pageTitle="Add Question">
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0" }}
        >
          <Typography
            sx={{
              fontFamily: "Rubik,sans-serif",
              fontWeight: 800,
              fontSize: "32px",
              marginBottom: "20px",
            }}
          >
            Add Question
          </Typography>
          <MuiSelect
            width="500px"
            mb={"20px"}
            name="technology_id"
            value={questionData.technology_id}
            onChange={handleOnChange}
            label="Technology"
            menuList={technologyList}
          />
          <Box mb={2}>
            <MuiInput
              width="500px"
              name="question"
              value={questionData.question}
              onChange={handleOnChange}
              label="Question"
              placeholder="Enter the question"
            />
          </Box>
          <Box mb={2}>
            <MuiInput
              width="500px"
              label="Points"
              name="points"
              value={questionData.points}
              onChange={handleOnChange}
              type="number"
              placeholder="Enter question points"
            />
          </Box>
          <Typography
            sx={{ fontSize: "20px", marginBottom: "20px", fontFamily: "Rubik,sans-serif" }}
          >
            Add Options
          </Typography>
          <Box sx={{ maxWidth: "fit-content" }}>
            {questionData.options.map((option: any, index: number) => {
              return (
                <Box mb={2} sx={{ display: "flex", alignItems: "center" }}>
                  <MuiInput
                    width="450px"
                    value={questionData.options[index].name}
                    onChange={(e) => handleOptionChange(e, index)}
                    placeholder="Enter Option"
                    startAdornment={<Option index={index} width="56px" height="56px" />}
                    endAdornment={
                      <MuiRadioButton
                        onChange={() => handleCorrectAnswer(index)}
                        checked={index === questionData.optionIndex}
                      />
                    }
                  />
                  <IconButton
                    sx={{
                      backgroundColor: "#6c00ea",
                      color: "white",
                      marginLeft: "20px",
                      "&:hover": {
                        backgroundColor: "#6c00ea",
                      },
                    }}
                    onClick={() => handleRemoveOptions(index)}
                  >
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
                onClick={() =>
                  setQuestionData({
                    ...questionData,
                    options: [...questionData.options, { name: "" }],
                  })
                }
              >
                <AddCircle />
              </IconButton>
            </Box>
          </Box>
          <MuiButton
            onClick={handleAddQuestion}
            margin="20px 0 0 0"
            variant="contained"
            borderRadius="4px"
            fontColor="white"
          >
            Add Question
          </MuiButton>
        </Box>
      </Layout>
    </>
  );
};

export default AddQuestion;
