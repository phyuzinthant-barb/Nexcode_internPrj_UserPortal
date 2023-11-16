import { Card, Space, Button } from "antd";
import { Link } from "react-router-dom";

const ExamHistoryCard = () => {
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
                <p>Obtained Marks</p>
                <p>Status</p>
              </div>
              <div className="detail-info">
                <p>-Multiple Choice</p>
                <p>-100 Questions</p>
                <p>-50 mins</p>
                <p>-100 Marks</p>
                <p>-100 Marks</p>
                <p>Passed</p>
              </div>
            </div>
            <div className="view-exam-history">
              <Space size="middle">
                <Link to="/history/record">
                <Button type="primary">View Exam History</Button>
                </Link>
              </Space>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExamHistoryCard;
