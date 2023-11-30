import { Statistic, Button, Form, Spin } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Question } from "../../components";
import "../styles/styles.css";
import { useSelector } from "react-redux";
import { useGetStartExamQuery, useSubmitExamMutation } from "../exam/examApi";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import dayjs from "dayjs";

const { Countdown } = Statistic;

const AnswerExam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const examDuration = location?.state * 60

  const { examId } = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const { data: questions, isLoading : isQuestionsLoading, error, refetch } = useGetStartExamQuery({ examId, token });
  const [submitExam] = useSubmitExamMutation(token);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [remainingTime, setRemainingTime] = useState(examDuration);


  useEffect(() => {
    const savedTime = Cookies.get("remainingTime") || null;
    if (savedTime) {
    setRemainingTime(
      savedTime/1000
    );
    }
  }, []);

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
      <Form onFinish={onFinish}> 
      <div className="top-level">
        <div className="exam-header">
          <h3>{questions?.exam.name}</h3>
          <p>{questions?.exam.description}</p>
        </div>
        <div className="countdown-clock">
          <Countdown value={Date.now() + remainingTime * 1000}  onChange={onCDChange} />
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
