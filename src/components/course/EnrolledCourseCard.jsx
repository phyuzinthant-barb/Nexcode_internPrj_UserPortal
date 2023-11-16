import { CustomProgress } from "../index";
import { Card, Space, Button } from "antd";
import "../styles/styles.css";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="course-page-body">
      <Card>
        <div className="course-card">
          <div className="course-title">
            <h4>UI</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              repellendus accusamus ut quibusdam atque fuga mollitia blanditiis
              vitae, libero accusantium amet distinctio enim, magni culpa illo
              dignissimos explicabo ratione exercitationem!
            </p>
            <CustomProgress percent={100} />
          </div>

          <div className="action">
            <Space size="middle">
              <Link to="/view-exam">
                <Button type="primary">View Exams</Button>
              </Link>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default App;
