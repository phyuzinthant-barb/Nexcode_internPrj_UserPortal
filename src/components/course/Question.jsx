import { Form, Radio, Space } from "antd";
import { useState } from "react";

const Question = ({ question, onAnswerChange , setSelectedAnswers, selectedAnswers}) => {
  const [value, setValue] = useState("")

  const onChange = (e) => {
    const isAlreadySelected = selectedAnswers?.find(answer => answer.questionId === question.id)
    if(isAlreadySelected){
      onAnswerChange(question?.id, e.target.value?.answer)
    }else{
      setSelectedAnswers([...selectedAnswers, {questionId : question?.id, answer : e.target.value?.answer}])
    }
  };

  return (
    <div className="answer-exam-form">
      <p className="question">{question.question}</p>
      <div className="answer-group">
        <Form.Item name={`${question?.id}`} >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {question.answers.map((answer, index) => (
              <Radio key={index} value={answer}>
                {String.fromCharCode(64 + index + 1)} : {answer.answer}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );
};

export default Question;
