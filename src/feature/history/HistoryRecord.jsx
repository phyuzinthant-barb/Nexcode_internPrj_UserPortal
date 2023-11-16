import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import { TakenQuestion } from "../../components";
import "../styles/styles.css";

const HistoryRecord = () => {
  const [marks, setMarks] = useState(50);

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
      <div className="title">
        <div className="exam-header-arrow-icon">
          <Link to="/history" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
        </div>
        <div className="exam-name-group">
          <h3>Exam Name</h3>
          <p>Exam Description</p>
        </div>
      </div>
      <div className="alert-message">{renderAlert()}</div>
      <div className="question-answer-form">
        <TakenQuestion />
      </div>
    </div>
  );
};

export default HistoryRecord;
