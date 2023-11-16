import { Radio, Space } from "antd";
import { useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="answer-exam-form">
      <p className="question">1. What does UI stand for in UI design?</p>
      <div className="answer-group">
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>A : </Radio>
            <Radio value={2}>B : </Radio>
            <Radio value={3}>C : </Radio>
            <Radio value={4}>D : </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Question;
