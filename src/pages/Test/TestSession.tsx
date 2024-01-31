import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
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

const TestDetails = {
  name: "Test",
  duration: "20",
  technology_id: "1",
  questions: [
    {
      question_id: 1,
      question: "What is the capital of France?",
      point: "2",
      options: [{ name: "Paris" }, { name: "Berlin" }, { name: "Rome" }],
    },
    {
      question_id: 2,
      question: "Who wrote 'Romeo and Juliet'?",
      point: "3",
      options: [
        { name: "William Shakespeare" },
        { name: "Jane Austen" },
        { name: "Charles Dickens" },
      ],
    },
    {
      question_id: 3,
      question: "What is the largest mammal?",
      point: "1",
      options: [{ name: "Blue Whale" }, { name: "Elephant" }, { name: "Giraffe" }],
    },
    {
      question_id: 4,
      question: "In which year did World War II end?",
      point: "5",
      options: [{ name: "1945" }, { name: "1939" }, { name: "1950" }],
    },
    {
      question_id: 4,
      question: "What is the capital of Japan?",
      point: "2",
      options: [{ name: "Tokyo" }, { name: "Beijing" }, { name: "Seoul" }],
    },
    {
      question_id: 5,
      question: "Who is known as the 'Father of Computer Science'?",
      point: "4",
      options: [{ name: "Alan Turing" }, { name: "Bill Gates" }, { name: "Steve Jobs" }],
    },
    {
      question_id: 6,
      question: "What is the chemical symbol for gold?",
      point: "1",
      options: [{ name: "Au" }, { name: "Ag" }, { name: "Fe" }],
    },
    {
      question_id: 7,
      question: "Who painted the Mona Lisa?",
      point: "3",
      options: [
        { name: "Leonardo da Vinci" },
        { name: "Vincent van Gogh" },
        { name: "Pablo Picasso" },
      ],
    },
  ],
};

const TestSession = () => {
  const [page, setPage] = useState(1);
  const [minutes, setMinutes] = useState(Number(TestDetails.duration));
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const totalQuestions = TestDetails.questions.length;
  const answerArray = Array(totalQuestions)
    .fill(0)
    .map((num, idx: number) => {
      return { [idx + 1]: null };
    });

  const [value, setValue] = React.useState<any>(answerArray);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.name);
    const v = (event.target as HTMLInputElement).value;
    setValue(
      value.map((e: any, idx: number) => {
        if (idx + 1 === index) {
          return { ...e, [index]: v };
        }
        return e;
      })
    );
  };

  const handleNavigation = (type: string) => {
    type === "prev" ? setPage(page - 1) : setPage(page + 1);
  };

  const moveToQuestion = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    let totalSeconds = minutes * 60;
    const intervalId = setInterval(() => {
      setHours(Math.floor(totalSeconds / 3600));
      setMinutes(Math.floor(totalSeconds / 60));
      setSeconds(totalSeconds % 60);
      totalSeconds--;
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const selectedQuestions = value.filter((v: any, idx: number) => {
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

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Box
          sx={{ backgroundColor: "#e3e3e3", height: "50px", display: "flex", alignItems: "center" }}
        >
          <Typography
            sx={{ fontFamily: "Rubik, sans-serif", marginLeft: "auto", paddingRight: "20px" }}
          >
            Sessiontime remaining: {_.padStart(`${hours}`, 2, "0")}:
            {_.padStart(`${minutes}`, 2, "0")}:{_.padStart(`${seconds}`, 2, "0")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box width={"270px"} sx={{ padding: "10px", borderRight: "1px solid #6c00ea" }}>
            <Grid container gap={1}>
              {TestDetails.questions.map((e, idx: number) => {
                const isSelected = value[idx][idx + 1] === null ? false : true;
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
              <h1>{TestDetails.name}</h1>
              <Typography>React JS</Typography>
              <Typography>
                {totalQuestions - selectedQuestions.length} of {totalQuestions} remaining
              </Typography>
            </Box>
            {TestDetails.questions.slice(page - 1, page).map((q) => {
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
                      name={`${page}`}
                      value={`${value[page - 1][page]}`}
                      onChange={handleChange}
                    >
                      <Grid container spacing={2}>
                        {q.options.map((op, idx: number) => {
                          const isSelected = value[page - 1][page] !== op.name ? false : true;
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
                width: "150px",
                display: "flex",
                justifyContent: "space-between",
                mt: "20px",
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
                disabled={page === TestDetails.questions.length}
              >
                Next
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
