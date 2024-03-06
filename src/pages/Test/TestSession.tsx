import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MuiPagination from "../../components/Pagination/MuiPagination";
import MuiButton from "../../components/Button/MuiButton";
import MuiRadioButton from "../../components/Radio/MuiRadioButton";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Options } from "../../constants/constant";
import Option from "../../components/Option/Option";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import apiCall from "../../config/apiCall";
import {
  createExam,
  getTest,
  fillTheAnswer,
  updateAnswer,
  submitExam,
} from "../../services/testSessionServices";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setData } from "../../redux/slices/commonSlice";

interface IFilledAnswerId {
  [key: string | number]: number;
}

const TestSession = () => {
  const commonData = useSelector((state: RootState) => state.common);
  const user = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);
  const [minutes, setMinutes] = useState(Number(_.get(commonData, "examDetails.duration", 30)));
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [filledAnswerIdArray, setFilledAnswerIdArray] = useState<IFilledAnswerId[] | []>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalQuestions = _.get(commonData, "examDetails.questions", []).length;
  const answerArray = _.map(_.get(commonData, "examDetails.questions", []), (num, idx: number) => {
    // console.log(num);
    return { [num.id]: null };
  });

  const [answer, setAnswer] = useState<any>(answerArray);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.name);
    const v = (event.target as HTMLInputElement).value;
    console.log(commonData);
    console.log(index);
    fillAnswer(index, v);
    setAnswer(
      answer.map((e: any, idx: number) => {
        if (Number(Object.keys(e)[0]) === index) {
          return { ...e, [index]: v };
        }
        return e;
      })
    );
  };

  const fillAnswer = async (questionId: number, answer: any) => {
    const payload = {
      selected_answer: answer,
      user_id: user.id,
      test_id: _.get(commonData, "examAndPerformanceId.testId", null),
      question_id: questionId,
      technology_id: _.get(commonData, "examInfo.id", null),
    };
    const isQuestionAlreadyFilled = filledAnswerIdArray.filter((e) => {
      return Number(Object.keys(e)[0]) === questionId;
    });
    console.log(isQuestionAlreadyFilled.length, filledAnswerIdArray, questionId);
    if (Boolean(isQuestionAlreadyFilled?.length)) {
      const indexOfFilledAnswerId = filledAnswerIdArray.findIndex(
        (obj) => Object.keys(obj)[0] === questionId.toString()
      );
      const filledTestStatsId = filledAnswerIdArray[indexOfFilledAnswerId][`${questionId}`];
      const { response, error } = await apiCall(() => updateAnswer(filledTestStatsId, payload));
    } else {
      const { response, error } = await apiCall(() => fillTheAnswer(payload));
      const testStateId = _.get(response, "data.id", null);
      setFilledAnswerIdArray([...filledAnswerIdArray, { [questionId]: testStateId }]);
    }
  };

  const handleNavigation = (type: string) => {
    type === "prev" ? setPage(page - 1) : setPage(page + 1);
  };

  const moveToQuestion = (page: number) => {
    setPage(page);
  };

  const selectedQuestions = answer.filter((v: any, idx: number) => {
    return v[idx + 1] === null ? false : true;
  });

  interface LabelProps {
    name: string;
    idx: number;
  }

  const Label = (props: LabelProps) => {
    const { name, idx } = props;
    return (
      <>
        <Option index={idx} width="50px" height="50px" />
        {name}
      </>
    );
  };

  const handleOpenAlertModal = () => {
    dispatch(
      openModal({
        open: true,
        type: "alert",
        title: "Alert!",
        onSubmit: handleAlertModalSubmit,
        onCancel: handleAlertModalClose,
      })
    );
  };

  const handleAlertModalClose = () => {
    dispatch(closeModal());
  };

  const handleAlertModalSubmit = () => {
    dispatch(closeModal());
    navigate("/start-test");
  };

  const handleSubmitExam = async () => {
    const id = _.get(commonData, "examAndPerformanceId.testPerformanceId", null);
    const payload = {
      test_id: _.get(commonData, "examAndPerformanceId.testId", null),
      user_id: user.id,
      technology_id: _.get(commonData, "examInfo.id", null),
    };
    const { response, error } = await apiCall(() => submitExam(id, payload));
    const updatedCount = _.get(response, "data", []);
  };

  useEffect(() => {
    let totalSeconds = minutes * 60;
    const intervalId = setInterval(() => {
      if (totalQuestions > 0) {
        setHours(Math.floor(totalSeconds / 3600));
        setMinutes(Math.floor(totalSeconds / 60));
        setSeconds(totalSeconds % 60);
        totalSeconds--;
      } else {
        navigate("/start-test");
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Box sx={{ minHeight: "calc(100vh - 50px)" }}>
        <Box
          sx={{
            backgroundColor: "#e3e3e3",
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleOpenAlertModal}>
            <CancelIcon />
          </IconButton>
          <Typography
            sx={{
              fontFamily: "Rubik, sans-serif",
              marginLeft: "auto",
              paddingRight: "20px",
            }}
          >
            Sessiontime remaining: {_.padStart(`${hours}`, 2, "0")}:
            {_.padStart(`${minutes}`, 2, "0")}:{_.padStart(`${seconds}`, 2, "0")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box width={"270px"} sx={{ padding: "10px", borderRight: "1px solid #6c00ea" }}>
            <Grid container gap={1}>
              {_.get(commonData, "examDetails.questions", []).map((e: any, idx: number) => {
                const isSelected = answer[idx][`${e.id}`] === null ? false : true;
                const isCurrentPage = page === idx + 1;
                const isOtherPageSelectedOrNot = isSelected ? "#00D659" : "#f4eaff";
                const backgroundColor = isCurrentPage ? "#6c00ea" : isOtherPageSelectedOrNot;
                return (
                  <Grid item>
                    <MuiButton
                      {...webStyles.switchButton}
                      backgroundColor={backgroundColor}
                      fontColor={page === idx + 1 ? "white" : "black"}
                      onClick={() => moveToQuestion(idx + 1)}
                    >
                      {idx + 1}
                    </MuiButton>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box sx={webStyles.examArea}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              <h1>{_.get(commonData, "examDetails.name", "Test")}</h1>
              <Typography style={{ fontFamily: "Rubik, sans-serif" }}>
                {_.get(commonData, "examInfo.technologyName", "Tech")}
              </Typography>
              <Typography style={{ fontFamily: "Rubik, sans-serif" }}>
                {totalQuestions - selectedQuestions.length} of {totalQuestions} remaining
              </Typography>
            </Box>
            {_.get(commonData, "examDetails.questions", [])
              .slice(page - 1, page)
              .map((q: any) => {
                return (
                  <>
                    <Typography
                      mb={2}
                      sx={{
                        backgroundColor: "#6c00ea",
                        color: "white",
                        padding: "15px 20px",
                        marginRight: "auto",
                        width: "100%",
                        borderRadius: "8px",
                        fontFamily: "Rubik, sans-serif",
                        boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      {page}. {q.question}
                    </Typography>
                    <FormControl fullWidth>
                      <RadioGroup
                        name={`${q.id}`}
                        value={`${answer[page - 1][`${q.id}`]}`}
                        onChange={handleChange}
                      >
                        <Grid container spacing={2}>
                          {q.options.map((op: any, idx: number) => {
                            const isSelected =
                              answer[page - 1][`${q.id}`] !== op.name ? false : true;
                            return (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControlLabel
                                  sx={{
                                    border: isSelected
                                      ? "0.2px solid #6c00ea"
                                      : "0.2px solid #e3e3e3",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "8px",
                                    width: "100%",
                                    marginLeft: "0",
                                    fontFamily: "Rubik, sans-serif",
                                    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
                                  }}
                                  value={op.name}
                                  control={<MuiRadioButton />}
                                  label={<Label idx={idx} name={op.name} />}
                                  labelPlacement="start"
                                />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </>
                );
              })}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Box
                sx={{
                  width: "150px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <MuiButton
                  {...webStyles.switchButton}
                  width="70px"
                  onClick={() => handleNavigation("prev")}
                  disabled={page === 1}
                >
                  Prev
                </MuiButton>
                <MuiButton
                  {...webStyles.switchButton}
                  width="70px"
                  onClick={() => handleNavigation("next")}
                  disabled={page === _.get(commonData, "examDetails.questions", []).length}
                >
                  Next
                </MuiButton>
              </Box>
              <MuiButton
                onClick={handleSubmitExam}
                fontColor="white"
                borderRadius="4px"
                width="70px"
              >
                Submit
              </MuiButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TestSession;

type WebStyles = {
  [key: string]: React.CSSProperties;
};

const webStyles: WebStyles | any = {
  examArea: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "calc(100% - 250px)",
    height: "100vh",
    padding: "24px 32px",
  },
  switchButton: {
    backgroundColor: "#f4eaff",
    fontColor: "black",
    borderRadius: "4px",
    width: "40px",
  },
};
