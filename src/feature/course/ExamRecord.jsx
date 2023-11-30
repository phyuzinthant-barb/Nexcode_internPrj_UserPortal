import { Button, Alert } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/styles.css";
import { TakenQuestion } from "../../components";
import { useSelector } from "react-redux";

const ExamRecord = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSlice.token);

  const location = useLocation();
  const responseData = location?.state;

  // console.log(responseData?)

  const handleNextExam = () => {
    navigate("/");
  };

  const renderAlert = () => {
    if (responseData?.isPassFail === true) {
      return (
        <Alert
          showIcon
          message="Congratulations! You Passed!"
          description={`${responseData?.obtainedResult} Marks`}
          type="success"
        />
      );
    } else {
      return (
        <Alert
          showIcon
          message="You Failed!"
          description={`${responseData?.obtainedResult} Marks`}
          type="error"
        />
      );
    }
  };

  return (
    <div>
      <div className="top-level">
        <div className="exam-header">
          <h3>{responseData?.examResponse?.name}</h3>
          <p>{responseData?.examResponse?.description}</p>
        </div>
        <div className="forward-btn">
          <Button
            className="forward-btn-size"
            type="primary"
            onClick={handleNextExam}>
            Next Exam
          </Button>
        </div>
      </div>
      <div className="alert-message">{renderAlert()}</div>
      <div className="question-answer-form">
        {responseData?.userAnswerResponse?.map((question, index) => (
          <TakenQuestion key={index} questionResponse={question} />
        ))}
      </div>
    </div>
  );
};

export default ExamRecord;
