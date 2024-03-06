import { Box, List, ListItem, Typography } from "@mui/material";
import Layout from "../../layout/layout";
import MuiInput from "../../components/Input/MuiInput";
import MuiSelect from "../../components/Select/MuiSelect";
import MuiButton from "../../components/Button/MuiButton";
import { useEffect, useState } from "react";
import Modal from "../../modals/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import apiCall from "../../config/apiCall";
import { getAllTechnologies, getTechnology } from "../../services/technologyServices";
import _ from "lodash";
import { TechnologyList } from "../../constants/Interface";
import { setData } from "../../redux/slices/commonSlice";
import { createExam, getTest } from "../../services/testSessionServices";

interface Props {}

const ExamDetails = () => {
  const commonData = useSelector((state: RootState) => state.common);
  return (
    <>
      Once you start the exam Timer will start running for respective duration,When you are done
      submit your responses, else it will get auto submitted.
      <List>
        <ListItem>Technology Name : {commonData.examInfo.name}</ListItem>
        <ListItem>Number Of Questions : {commonData.examInfo.noOfQuestions}</ListItem>
        <ListItem>Total Time : {commonData.examInfo.duration} Mins</ListItem>
      </List>
    </>
  );
};

const StartTest = (props: Props) => {
  const [technologies, setTechnologies] = useState<TechnologyList[]>([]);
  const [technology, setTechnology] = useState("");
  const commonData = useSelector((state: RootState) => state.common);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const createExamSession = async () => {
    const { response, error } = await apiCall(() =>
      createExam({
        technology_id: technology,
        name: `Test_${new Date().getTime()}`,
      })
    );
    const testId = _.get(response, "data.id", null);
    const testPerformanceId = _.get(response, "data.test_performance_id", null);
    dispatch(
      setData({
        name: "examAndPerformanceId",
        value: { testId: testId, testPerformanceId: testPerformanceId },
      })
    );
    const { response: testDetailsResponse, error: e1 } = await apiCall(() => getTest(testId));
    if (testDetailsResponse) {
      dispatch(
        setData({
          name: "examDetails",
          value: {
            name: _.get(testDetailsResponse, "data.test_name", "Test"),
            duration: _.get(testDetailsResponse, "data.duration", 30),
            questions: _.get(testDetailsResponse, "data.questions", []),
          },
        })
      );
    }
    return testDetailsResponse;
  };
  const handleAttempTest = async () => {
    const resp = await createExamSession();
    if (resp) {
      dispatch(closeModal());
      navigate("/test-session");
    }
  };

  const handleOpenExamDetailsModal = () => {
    if (technology) {
      dispatch(
        openModal({
          type: "examDetails",
          title: "Before starting exam read below instrucion",
          open: true,
          dialogContent: <ExamDetails />,
          onCancel: handleCloseModal,
          onSubmit: handleAttempTest,
        })
      );
    } else {
    }
  };

  const handleChangeTech = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLInputElement;
    setTechnology(value);
  };

  const getAllTech = async () => {
    const { response, error } = await apiCall(getAllTechnologies);
    if (response) {
      const formattedTechList = _.map(_.get(response, "data", []), ({ id, name }) => {
        return { id, name };
      });
      setTechnologies(formattedTechList);
    }
  };

  const getTechnologyInfo = async () => {
    const { response, error } = await apiCall(() => getTechnology(Number(technology)));
    dispatch(
      setData({
        name: "examInfo",
        value: {
          duration: _.get(response, "data.duration", null),
          noOfQuestions: _.get(response, "data.no_of_questions", 0),
          technologyName: _.get(response, "data.name", null),
          id: _.get(response, "data.id", null),
        },
      })
    );
  };

  useEffect(() => {
    getTechnologyInfo();
  }, [technology]);

  useEffect(() => {
    getAllTech();
  }, []);
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
            value={technology}
            onChange={handleChangeTech}
            menuList={technologies}
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
