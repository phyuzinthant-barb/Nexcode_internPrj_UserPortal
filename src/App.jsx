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

const App = () => {
  return (
    <Routes>
      <Route path="sign-in" element={<AuthLayout/>}>
        <Route index element={<SignInPage/>} />
        <Route path="forgot-password">
          <Route index  element={<ForgotPasswordPage/>} />
          <Route path="verify-otp">
            <Route index element={<VerifyOTPPage/>} />
            <Route path="change-password" element={<ChangePwdPage/>} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CoursePage />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="view-exam">
          <Route index element={<ViewExamPage />} />
          <Route path="answer-exam">
            <Route index element={<AnswerExamPage/>} />
            <Route path="view-record" element={<ExamRecordPage/>} />
          </Route>
        </Route>
        <Route path="history">
          <Route index element={<HistoryPage />} />
          <Route path="record" element={<HistroyRecordPage/>} />
        </Route> 
      </Route>
    </Routes>
  );
};

export default App;
