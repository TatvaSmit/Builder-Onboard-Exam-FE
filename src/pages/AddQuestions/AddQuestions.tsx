import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import MuiInput from "../../components/Input/MuiInput";
import MuiSelect from "../../components/Select/MuiSelect";
import { useEffect, useState } from "react";
import MuiRadioButton from "../../components/Radio/MuiRadioButton";
import { AddCircle, Delete } from "@mui/icons-material";
import MuiButton from "../../components/Button/MuiButton";
import Layout from "../../layout/layout";
import Option from "../../components/Option/Option";
import _ from "lodash";
import { createQuestion, getFullQuestion, getQuestion } from "../../services/questionServices";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTechnologies } from "../../services/technologyServices";
import { TechnologyList } from "../../constants/Interface";
import apiCall from "../../config/apiCall";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AddQuestion = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const commonData = useSelector((state: RootState) => state.common);
  const [technologyList, setTechnologyList] = useState<TechnologyList[]>([]);
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(
      setData({
        name: "questionData",
        value: {
          ...commonData.questionData,
          [name]: value,
          errors: {
            ...commonData.questionData.errors,
            [name]: value ? "" : getErrorMsg(name),
          },
        },
      })
    );
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    const { value } = e.target as HTMLInputElement;
    const options = _.cloneDeep(commonData.questionData.options);
    const updateOptions = _.map(options, (op, index: number) => {
      if (index === idx) {
        op.name = value;
        return op;
      }
      return op;
    });
    dispatch(
      setData({
        name: "questionData",
        value: {
          ...commonData.questionData,
          options: updateOptions,
        },
      })
    );
  };

  const handleRemoveOptions = (idx: number) => {
    const updateOptions = _.filter(commonData.questionData.options, (op, index: number) => {
      return index != idx;
    });
    dispatch(
      setData({
        name: "questionData",
        value: {
          ...commonData.questionData,
          options: updateOptions,
        },
      })
    );
  };

  const handleCorrectAnswer = (idx: number) => {
    const option = _.filter(commonData.questionData.options, (op, index: number) => {
      return index === idx;
    });
    const selectedAnswer = _.get(option, "[0].name", null);
    dispatch(
      setData({
        name: "questionData",
        value: {
          ...commonData.questionData,
          answer: selectedAnswer,
        },
      })
    );
  };
  const getErrorMsg = (key: string) => {
    switch (key) {
      case "question":
        return "question is required";
      case "points":
        return "points are required";
      case "technology_id":
        return "technology is required";
      case "options":
        return "atleast 2 options should be added";
      case "answer":
        return "answer should be selected";
      default:
        return "invalid value";
    }
  };

  const isAllFieldsValid = () => {
    const questionData = _.get(commonData, "questionData", {});
    const isOptionsAreThere = questionData.options.length > 1;
    const isTechnologySelected = _.get(questionData, "technology_id", null);
    const isAnswerSelected = _.get(questionData, "answer", null);
    const isPointsAreAdded = _.get(questionData, "points", null);
    dispatch(
      setData({
        name: "questionData",
        value: {
          ...commonData.questionData,
          errors: {
            question: isTechnologySelected ? "" : getErrorMsg("question"),
            points: isPointsAreAdded ? "" : getErrorMsg("points"),
            technology_id: isTechnologySelected ? "" : getErrorMsg("technology_id"),
            options: isOptionsAreThere ? "" : getErrorMsg("options"),
            answer: isAnswerSelected ? "" : getErrorMsg("answer"),
          },
        },
      })
    );
    return isPointsAreAdded && isAnswerSelected && isTechnologySelected && isOptionsAreThere;
  };

  const handleAddQuestion = async () => {
    if (Boolean(isAllFieldsValid())) {
      dispatch(
        setData({
          name: "questionData",
          value: {
            ...commonData.questionData,
            technology_id: Number(_.get(commonData, "questionData.technology_id", null)),
          },
        })
      );
      const res = await createQuestion(commonData.questionData).catch((error) =>
        console.log(error)
      );
      if (res) {
        navigate("/questions");
      }
    }
  };

  const getAllTechnology = async () => {
    const res = await getAllTechnologies().catch((error) => console.log(error));
    if (res) {
      const formattedTechList = _.map(_.get(res, "data", []), ({ id, name }) => {
        return { id, name };
      });
      setTechnologyList(formattedTechList);
    }
  };

  const getQuestionData = async (id: number) => {
    const { response, error } = await apiCall(() => getFullQuestion(id));
    dispatch(setData({ name: "questionData", value: { ...response.data } }));
  };

  useEffect(() => {
    getAllTechnology();
    const questionId = _.get(param, "question_id", null);
    if (questionId) {
      getQuestionData(Number(questionId));
    } else {
      dispatch(
        setData({
          name: "questionData",
          value: {
            question: null,
            points: null,
            technology_id: null,
            options: [],
            answer: null,
            errors: {
              question: "",
              points: "",
              technology_id: "",
              options: "",
              answer: "",
            },
          },
        })
      );
    }

    return () => {
      dispatch(setData({ name: "questionData", value: {} }));
    };
  }, []);
  console.log(commonData);
  return (
    <>
      <Layout pageTitle="Add Question">
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
          <MuiSelect
            width="500px"
            mb={"20px"}
            fontFamily="Rubik,sans-serif"
            name="technology_id"
            value={_.get(commonData, "questionData.technology_id", null)}
            onChange={handleOnChange}
            label="Technology"
            menuList={technologyList}
            error={Boolean(_.get(commonData, "questionData.errors.technology_id", ""))}
            errorMsg={_.get(commonData, "questionData.errors.technology_id", "")}
          />
          <Box mb={2}>
            <MuiInput
              width="500px"
              name="question"
              value={_.get(commonData, "questionData.question", null)}
              onChange={handleOnChange}
              label="Question"
              placeholder="Enter the question"
              helperText={_.get(commonData, "questionData.errors.question", "")}
              error={Boolean(_.get(commonData, "questionData.errors.question", ""))}
            />
          </Box>
          <Box mb={2}>
            <MuiInput
              width="500px"
              label="Points"
              name="points"
              value={_.get(commonData, "questionData.points", null)}
              onChange={handleOnChange}
              type="number"
              placeholder="Enter question points"
              helperText={_.get(commonData, "questionData.errors.points", "")}
              error={Boolean(_.get(commonData, "questionData.errors.points", ""))}
            />
          </Box>
          <Typography
            sx={{ fontSize: "20px", marginBottom: "20px", fontFamily: "Rubik,sans-serif" }}
          >
            Add Options
          </Typography>
          <Typography>{_.get(commonData, "questionData.errors.answer", "")}</Typography>
          <Box sx={{ maxWidth: "fit-content" }}>
            {_.get(commonData, "questionData.options", []).map((option: any, index: number) => {
              return (
                <Box mb={2} sx={{ display: "flex", alignItems: "center" }}>
                  <MuiInput
                    width="450px"
                    value={commonData.questionData.options[index].name}
                    onChange={(e) => handleOptionChange(e, index)}
                    placeholder="Enter Option"
                    startAdornment={<Option index={index} width="56px" height="56px" />}
                    endAdornment={
                      <MuiRadioButton
                        disabled={!commonData.questionData.options[index].name}
                        onChange={() => handleCorrectAnswer(index)}
                        checked={
                          commonData.questionData.options[index].name ===
                          commonData.questionData.answer
                        }
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
              <Tooltip
                title={getErrorMsg("options")}
                open={Boolean(_.get(commonData, "questionData.errors.options", ""))}
                arrow
                placement="right"
              >
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
                  disabled={_.get(commonData, "questionData.options", []).length === 6}
                  onClick={() =>
                    dispatch(
                      setData({
                        name: "questionData",
                        value: {
                          ...commonData.questionData,
                          options: [...commonData.questionData.options, { name: "" }],
                        },
                      })
                    )
                  }
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
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
