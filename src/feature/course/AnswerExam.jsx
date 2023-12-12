import { Statistic, Button, Form } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Question } from "../../components";
import "../styles/styles.css";
import { useSelector } from "react-redux";
import { useGetStartExamQuery, useSubmitExamMutation } from "../exam/examApi";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const { Countdown } = Statistic;

const AnswerExam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const examDuration = location?.state * 60

  const { examId } = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const { data: questions, isLoading : isQuestionsLoading } = useGetStartExamQuery({ examId, token });
  const [submitExam] = useSubmitExamMutation(token);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [form] = Form.useForm()
  const [remainingTime, setRemainingTime] = useState(examDuration);

  const savedTime = Cookies.get("remainingTime") || null;


  useEffect(() => {
    if(savedTime){
      setRemainingTime(savedTime / 1000)
    }
  }, [savedTime])


  const onFinish = async(values) => {

    const answerData = Object.entries(values).map(item => {
      return {
        questionId : item[0],
        selectedAnswer : item[1]?.answer
      }
    })

    try {
      setIsSubmitting(true)
      const {data, error} = await submitExam({
        examId,
        answerData
      });
      if (data) {
        console.log("Auto-submitting the exam!", data?.message );
        Cookies.remove("remainingTime")
        navigate(`/answer-exam/${examId}/view-record`, {state : data});
      } else {
        console.error("Error submitting exam:", error?.data?.message || error?.error);
      }
    } catch (error) {
      console.error("Unexpected error submitting exam:", error);
    }finally{
      setIsSubmitting(false)
    }
  };

  const onAutoSubmit = () => {
      form.submit();
  }

  const onAnswerChange = (questionId, answer) => {
    const changedAnswers = selectedAnswers?.filter(item => item.questionId !== questionId)
    setSelectedAnswers([...changedAnswers, {questionId , answer}]);
  };

  const onCDChange = (value) => {
    Cookies.set("remainingTime", value)
  
  }

  if(isQuestionsLoading){
    return <div>
      <p> Loading . . .  </p>
    </div>
  }

  return (
    <div>
      <Form form={form} onFinish={onFinish}> 
      <div className="top-level">
        <div className="exam-header">
          <h3>{questions?.exam.name}</h3>
          <p>{questions?.exam.description}</p>
        </div>
        <div className="countdown-clock">
          <Countdown value={Date.now() + remainingTime * 1000}  onChange={onCDChange} onFinish={onAutoSubmit} />
        </div>
      </div>
      <div className="question-answer-form">
        {questions ? (
          questions?.questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              setSelectedAnswers={setSelectedAnswers}
              selectedAnswers={selectedAnswers}
              selectedAnswer={selectedAnswers[question.id]}
              onAnswerChange={onAnswerChange}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
        <div className="submit-btn">
          <Button type="primary" htmlType="submit" className="exam-submit-btn" loading={isSubmitting}>
            Submit
          </Button>
        </div>
      </div>
      </Form>
    </div>
  );
};

export default AnswerExam;