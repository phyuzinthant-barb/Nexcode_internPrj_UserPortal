import { Radio, Space } from "antd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const TakenQuestion = () => {
  return (
    <div>
      <div className="answer-exam-form">
        <div className="question">
          <p>1. What does UI stand for in UI design?</p>
          <div className="icon answer-true">
            <CheckCircleOutlineIcon />
          </div>
        </div>
        <div className="answer-group">
          <Radio.Group defaultValue={1} disabled>
            <Space direction="vertical">
              <Radio value={1}>A : </Radio>
              <Radio value={2}>B : </Radio>
              <Radio value={3}>C : </Radio>
              <Radio value={4}>D : </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>

      <div className="answer-exam-form">
        <div className="question">
          <p>2. What does UI stand for in UI design?</p>
          <div className="icon answer-false">
            <CancelOutlinedIcon />
          </div>
        </div>
        <div className="answer-group">
          <Radio.Group defaultValue={2} disabled>
            <Space direction="vertical">
              <Radio value={1}>A : </Radio>
              <Radio value={2}>B : </Radio>
              <Radio value={3}>C : </Radio>
              <Radio value={4}>D : </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default TakenQuestion;
