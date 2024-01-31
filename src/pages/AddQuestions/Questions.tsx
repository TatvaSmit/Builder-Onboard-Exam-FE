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
import React, { useState } from "react";
import MuiSelect from "../../components/Select/MuiSelect";
import MuiAccordion from "../../components/MuiAccordion/MuiAccordion";
import { Options } from "../../constants/constant";
import MuiButton from "../../components/Button/MuiButton";
import Layout from "../../layout/layout";
import MuiPagination from "../../components/Pagination/MuiPagination";

export const questions = [
  {
    question: "test",
    options: [
      {
        name: "A",
      },
      {
        name: "B",
      },
      {
        name: "C",
      },
      {
        name: "D",
      },
    ],
    correct_answer: "A",
    points: 2,
    technology_id: 1,
  },
  {
    question: "test",
    options: [
      {
        name: "A",
      },
      {
        name: "B",
      },
      {
        name: "C",
      },
      {
        name: "D",
      },
    ],
    correct_answer: "A",
    points: 2,
    technology_id: 1,
  },
  {
    question: "test",
    options: [
      {
        name: "A",
      },
      {
        name: "B",
      },
      {
        name: "C",
      },
      {
        name: "D",
      },
    ],
    correct_answer: "A",
    points: 2,
    technology_id: 1,
  },
];

const Questions = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [page, setPage] = React.useState(1);
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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
          <Typography sx={{ fontWeight: 800, fontSize: "32px", marginBottom: "20px" }}>
            Question list
          </Typography>
          <MuiSelect mb={"20px"} width="400px" menuList={[""]} />
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
                            op.name == q.correct_answer
                              ? "0.2px solid #6c00ea"
                              : "0.2px solid #e3e3e3"
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
