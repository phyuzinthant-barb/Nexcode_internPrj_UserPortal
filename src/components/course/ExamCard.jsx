import { Card, Space, Button, Modal } from "antd";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

const ExamCard = () => {
  const navigate = useNavigate();

  const okClick = () => {
    navigate("/view-exam/answer-exam")
  }
  const handleClick = () => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You are ready to start the exam.",
      okText: "Start Exam",
      onOk: okClick,
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
            <OkBtn onClick={okClick} />
        </>
      ),
    });
  };

  return (
    <div className="exam-card-design">
      <Card>
        <div className="exam-card">
          <div className="exam-history">
            <h4>UI - Exam - Basic</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              repellendus accusamus ut quibusdam atque fuga mollitia blanditiis
              vitae, libero accusantium amet distinctio enim, magni culpa illo
              dignissimos explicabo ratione exercitationem!
            </p>
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
                <p>-100 Questions</p>
                <p>-50 mins</p>
                <p>-100 Marks</p>
              </div>
            </div>
            <div className="view-exam-history">
              <Space size="middle">
                <Button type="primary" onClick={handleClick}>
                  Start Exam
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExamCard;
