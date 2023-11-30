import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Link, useParams } from "react-router-dom";
import { TakenQuestion } from "../../components";
import { useSelector } from "react-redux";
import { useGetViewAnswerSheetQuery } from "../../feature/history/historyApi";
import "../styles/styles.css";

const HistoryRecord = () => {
  const { examId } = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const { data: record, isLoading, error, refetch } = useGetViewAnswerSheetQuery({ examId, token });

  console.log(record)

  const [marks, setMarks] = useState(record?.obtainedResult);

  useEffect(()=> {
    refetch();
  }, [refetch, token]);

  const renderAlert = () => {
    if (record?.isPassFail === true) {
      return (
        <Alert
          showIcon
          message="Congratulations! You Passed!"
          description={`${record?.obtainedResult} Marks`}
          type="success"
        />
      );
    } else {
      return (
        <Alert
          showIcon
          message="You Failed!"
          description={`${record?.obtainedResult} Marks`}
          type="error"
        />
      );
    }
  }
  
  return (
    <div>
      <div className="title">
        <div className="exam-header-arrow-icon">
          <Link to="/history" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
        </div>
        <div className="exam-name-group">
          <h3>{record?.examResponse?.name}</h3>
          <p>{record?.examResponse?.description}</p>
        </div>
      </div>
      <div className="alert-message">{renderAlert()}</div>
      <div className="question-answer-form">
        {record?.userAnswerResponse.map((questionResponse) => (
          <TakenQuestion key={questionResponse.id} questionResponse={questionResponse} />
        ))}
      </div>
    </div>
  );
};

export default HistoryRecord;
