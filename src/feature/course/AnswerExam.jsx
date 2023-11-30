import { Statistic, Button, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
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
  const { examId } = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const { data: questions, isLoading, error, refetch } = useGetStartExamQuery({ examId, token });
  const [submitExam, { isLoading: Loading }] = useSubmitExamMutation(token);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const data = questions?.exam.examDurationMinute;
  const hours = Math.floor(data / 60);
  const minutes = data % 60;

  const formatTime = `${hours}:${minutes}`;

  const format = "HH:mm";
  const [remainingTime, setRemainingTime] = useState(dayjs(formatTime, format).minute() * 60);


  useEffect(() => {
    const savedTime = Cookies.get("remainingTime");

    if (savedTime) {
    setRemainingTime(
      savedTime/1000
    );
    }
  }, []);

  useEffect(() => {
    Cookies.set("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  // const autoSubmit = async () => {
  //   try {
  //     const response = await submitExam({
  //       examId,
  //       answerData: Object.keys(selectedAnswers).map((questionId) => ({
  //         questionId,
  //         selectedAnswer: selectedAnswers[questionId],
  //       })),
  //     });
  
  //     if (response.error) {
  //       console.error("Error submitting exam:", response.error);
  //     } else {
  //       console.log("Auto-submitting the exam!", response);
  //       navigate("/view-record");
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error submitting exam:", error);
  //   }
  // };

  const onFinish = async(values) => {

    const answerData = Object.entries(values).map(item => {
      return {
        questionId : item[0],
        selectedAnswer : item[1]?.answer
      }
    })
    try {
      const response = await submitExam({
        examId,
        answerData
      });
      if (response.error) {
        console.error("Error submitting exam:", response.error);
      } else {
        console.log("Auto-submitting the exam!", response);
        Cookies.remove("remainingTime")
        navigate(`/answer-exam/${examId}/view-record`, {state : response?.data});
      }
    } catch (error) {
      console.error("Unexpected error submitting exam:", error);
    }
  };

  const onAnswerChange = (questionId, answer) => {
    const changedAnswers = selectedAnswers?.filter(item => item.questionId !== questionId)
    setSelectedAnswers([...changedAnswers, {questionId , answer}]);
  };

  const onCDChange = (value) => {
    Cookies.set("remainingTime", value)
  }

  return (
    <div>
      <Form onFinish={onFinish}> 
      <div className="top-level">
        <div className="exam-header">
          <h3>Exam Name</h3>
          <p>Exam Description</p>
        </div>
        <div className="countdown-clock">
          <Countdown value={Date.now() + remainingTime * 1000} onFinish={onFinish} onChange={onCDChange} />
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
          <Button type="primary" htmlType="submit" className="exam-submit-btn" loading={Loading}>
            Submit
          </Button>
        </div>
      </div>
      </Form>
    </div>
  );
};

export default AnswerExam;
