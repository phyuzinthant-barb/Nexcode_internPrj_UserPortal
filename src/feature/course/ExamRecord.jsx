import { useState } from "react";
import { Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { TakenQuestion } from "../../components";

const ExamRecord = () => {
  const navigate = useNavigate();
  const [marks, setMarks] = useState(50); 

  const handleNextExam = () => {
    navigate("/view-exam")
  };

  const renderAlert = () => {
    if (marks >= 50) {
      return (
        <Alert
          showIcon
          message="Congratulations! You Passed!"
          description={`${marks} Marks`}
          type="success"
        />
      );
    } else {
      return (
        <Alert
          showIcon
          message="You Failed!"
          description={`${marks} Marks`}
          type="error"
        />
      );
    }
  };

  return (
    <div>
      <div className="top-level">
        <div className="exam-header">
          <h3>Exam Name</h3>
          <p>Exam Description</p>
        </div>
        <div className="forward-btn">
          <Button className="forward-btn-size" type="primary" onClick={handleNextExam}>
            Next Exam
          </Button>
        </div>
      </div>
      <div className="alert-message">{renderAlert()}</div>
      <div className="question-answer-form">
        <TakenQuestion />
      </div>
    </div>
  );
};

export default ExamRecord;
