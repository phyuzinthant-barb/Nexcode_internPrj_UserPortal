import { Card, Space, Button, Modal } from "antd";
import "../styles/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllExamsByCourseIdQuery } from "../../feature/course/courseApi";

const ExamCard = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const {
    data: exams,
    isLoading,
    error,
  } = useGetAllExamsByCourseIdQuery({ courseId, token });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const okClick = (examId) => {
    navigate(`/answer-exam/${examId}`);
  };

  const handleClick = (examId) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You are ready to start the exam.",
      okText: "Start Exam",
      centered: true,
      onOk: () => okClick(examId),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  return (
    <div className="exam-card-design">
      {Array.isArray(exams) && exams.length > 0 ? (
        exams.map((exam) => (
          <Card key={exam.id}>
            <div className="exam-card">
              <div className="exam-history">
                <h4>
                  {exam.category.name} - {exam.level.level} - {exam.name}
                </h4>
                <p>{exam.description}</p>
              </div>
              <div className="detail">
                <div className="information">
                  <div className="detail-header">
                    <p>Exam Type</p>
                    <p>Number of Questions</p>
                    <p>Limited Time</p>
                    <p>Total Marks</p>
                  </div>
                  <div className="detail-info">
                    <p>-Multiple Choice</p>
                    <p>- {exam.noOfQuestion} Questions</p>
                    <p>- {exam.examDurationMinute} Minutes</p>
                    <p>- {exam.examTotalMark} Marks</p>
                  </div>
                </div>
                <div className="view-exam-history">
                  <Space size="middle">
                    <Button type="primary" onClick={() => handleClick(exam.id)}>
                      Start Exam
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <h3
          style={{
            fontSize: "2rem",
            fontWeight: "400",
            color: "#002766",
            display: "flex",
            height: "60vh",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}>
          No exams available!
        </h3>
      )}
    </div>
  );
};

export default ExamCard;
