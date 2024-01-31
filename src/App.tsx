import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Error from "./pages/Error/Error";
import Technology from "./pages/Technology/Technology";
import AddQuestion from "./pages/AddQuestions/AddQuestions";
import Questions from "./pages/AddQuestions/Questions";
import TestSession from "./pages/Test/TestSession";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/add-questions" element={<AddQuestion />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/test-session" element={<TestSession />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
