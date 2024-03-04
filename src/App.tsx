import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Error from "./pages/Error/Error";
import Technology from "./pages/Technology/Technology";
import AddQuestion from "./pages/AddQuestions/AddQuestions";
import Questions from "./pages/AddQuestions/Questions";
import TestSession from "./pages/Test/TestSession";
import PrivateRoute from "./routes/PrivateRoute";
import StartTest from "./pages/StartTest/StartTest";

function App() {
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
    </>
  );
}

export default App;
