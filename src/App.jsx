import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import {
  AnswerExamPage,
  ChangePassword,
  ChangePwdPage,
  CoursePage,
  ExamRecordPage,
  ForgotPasswordPage,
  HistoryPage,
  HistroyRecordPage,
  SignInPage,
  VerifyOTPPage,
  ViewExamPage,
} from "./pages/index";
import { AuthLayout } from "./layout";
import { AuthRequire } from "./feature";

const App = () => {
  return (
    <Routes>
      <Route path="sign-in" element={<AuthLayout />}>
        <Route index element={<SignInPage />} />
        <Route path="forgot-password">
          <Route index element={<ForgotPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOTPPage />} />
            <Route path="change-password" element={<ChangePwdPage />} />
        </Route>
      </Route>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }>
        <Route index element={<CoursePage />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="view-exam/:courseId" element={<ViewExamPage />} />
        <Route path="answer-exam/:examId" element={<AnswerExamPage />} />
        <Route path="answer-exam/:examId/view-record" element={<ExamRecordPage />} />
        <Route path="history">
          <Route index element={<HistoryPage />} />
          <Route path="record/:examId" element={<HistroyRecordPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
