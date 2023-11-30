import { Radio, Space } from "antd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const TakenQuestion = ({ questionResponse }) => {
  const { questionResponse : qRes, answers, selectedAnswer, isSelectedAnswerCorrect } = questionResponse;

  const selectedAnswerIndex = qRes?.answers?.find(answer => answer.answer === selectedAnswer);


  return (
    <div className="answer-exam-form">
      <div className="question">
        <p>{qRes?.question}</p>
        <div className={`icon ${isSelectedAnswerCorrect ? "answer-true" : "answer-false"}`}>
          {isSelectedAnswerCorrect ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
        </div>
      </div>
      <div className="answer-group">
        <Radio.Group defaultValue={selectedAnswerIndex?.answer} disabled>
          <Space direction="vertical">
            {qRes?.answers?.map((answer, index) => (
              <Radio key={index} value={answer?.answer}>{`${String.fromCharCode(65 + index)}: ${answer.answer}`}</Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default TakenQuestion;
