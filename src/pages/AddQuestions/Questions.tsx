import { Edit, ExpandCircleDown, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiSelect from "../../components/Select/MuiSelect";
import MuiAccordion from "../../components/MuiAccordion/MuiAccordion";
import { Options } from "../../constants/constant";
import MuiButton from "../../components/Button/MuiButton";
import Layout from "../../layout/layout";
import MuiPagination from "../../components/Pagination/MuiPagination";
import { getAllQuestions } from "../../services/questionServices";
import { getAllTechnologies } from "../../services/technologyServices";
import { TechnologyList } from "../../constants/Interface";

interface Question {
  id: string;
  options: { name: string }[];
  question: string;
  technology_id: string;
  answer: string;
}

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [technologyList, setTechnologyList] = useState<TechnologyList[]>([]);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [page, setPage] = React.useState(1);
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getListQuestions = async () => {
    const res = await getAllQuestions().catch((error) => console.log(error));
    if (res) {
      setQuestions(res.data);
    }
  };
  const getAllTechnology = async () => {
    const res = await getAllTechnologies().catch((error) => console.log(error));
    if (res) {
      setTechnologyList(res.data);
    }
  };

  const handleChangeTechnology = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLInputElement;
  };

  useEffect(() => {
    getListQuestions();
    getAllTechnology();
  }, []);
  return (
    <>
      <Layout pageTitle="Questions">
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
              fontFamily: "Rubik,sans-serif",
              fontWeight: 800,
              fontSize: "32px",
              marginBottom: "20px",
            }}
          >
            Question list
          </Typography>
          <MuiSelect
            mb={"20px"}
            width="400px"
            onChange={handleChangeTechnology}
            label="Technology"
            menuList={technologyList}
          />
          {questions.map((q, index: number) => {
            const details = (
              <Grid container rowSpacing={2} spacing={2}>
                {q.options.map((op, index: number) => {
                  return (
                    <Grid sx={{ display: "flex" }} item xs={12} md={6} lg={3}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "auto",
                          border: `${
                            op.name == q.answer ? "0.2px solid #6c00ea" : "0.2px solid #e3e3e3"
                          } `,
                          borderRadius: "8px",
                          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "0 10px",
                            alignItems: "center",
                            width: "40px",
                            borderTopLeftRadius: "8px",
                            borderBottomLeftRadius: "8px",
                            justifyContent: "center",
                            backgroundColor: "#6c00ea",
                            height: "40px",
                            color: "white",
                            marginRight: "20px",
                          }}
                        >
                          {Options[index]}
                        </span>
                        {op.name}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            );

            const summary = (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {index + 1}. {q.question}
                <IconButton sx={{ marginLeft: "auto" }}>
                  <Edit />
                </IconButton>
              </Box>
            );

            return (
              <MuiAccordion
                expanded={expanded === `${index}`}
                handleChange={handleChange(`${index}`)}
                summary={summary}
                details={details}
              />
            );
          })}
          <MuiPagination count={10} page={page} handleChange={handlePagination} />
        </Box>
      </Layout>
    </>
  );
};

export default Questions;
