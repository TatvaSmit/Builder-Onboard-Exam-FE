import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Error from "./pages/Error/Error";
import Technology from "./pages/Technology/Technology";
import AddQuestion from "./pages/AddQuestions/AddQuestions";
import Questions from "./pages/AddQuestions/Questions";
import TestSession from "./pages/Test/TestSession";
import PrivateRoute from "./routes/PrivateRoute";
import StartTest from "./pages/StartTest/StartTest";
import { Role } from "./constants/constant";
import Modal from "./modals/Modal";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const modal = useSelector((state: RootState) => state.modal);
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/start-test"
          element={
            <PrivateRoute>
              <StartTest />
            </PrivateRoute>
          }
        />
        <Route
          path="/technology"
          element={
            <PrivateRoute>
              <Technology />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-question"
          element={
            <PrivateRoute>
              <AddQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-question/:question_id"
          element={
            <PrivateRoute>
              <AddQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <Questions />
            </PrivateRoute>
          }
        />
        <Route
          path="/test-session"
          element={
            <PrivateRoute>
              <TestSession />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Modal
        title={modal.title}
        type={modal.type}
        open={modal.open}
        dialogContent={modal.dialogContent}
        handleClose={modal.onCancel}
        handleSubmit={modal.onSubmit}
      />
    </>
  );
}

export default App;
