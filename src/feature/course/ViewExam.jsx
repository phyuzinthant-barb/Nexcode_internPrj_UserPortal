import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import { ExamCard } from "../../components";

const ViewExam = () => {
  return (
    <div>
      <div className="view-exam-header">
        <h3 className="exam-header">
          <Link to="/" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
          Course Name
        </h3>
      </div>
      <div>
        <ExamCard />
      </div>
    </div>
  );
};

export default ViewExam;
