import { Statistic, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Question } from "../../components";
import "../styles/styles.css";

const { Countdown } = Statistic;

const AnswerExam = () => {
  const navigate = useNavigate();

  const autoSubmit = () => {
    console.log("Auto-submitting the exam!");
  };

  const onFinish = () => {
    console.log("Countdown finished!");
    autoSubmit();
    navigate("/view-exam/answer-exam/view-record");
  };

  return (
    <div>
      <div className="top-level">
        <div className="exam-header">
          <h3>Exam Name</h3>
          <p>Exam Description</p>
        </div>
        <div className="countdown-clock">
          <Countdown value={Date.now() + 1000 * 1000} onFinish={onFinish} />
        </div>
      </div>
      <div className="question-answer-form">
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <div className="submit-btn">
          <Button
            type="primary"
            className="exam-submit-btn"
            onClick={onFinish}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerExam;
