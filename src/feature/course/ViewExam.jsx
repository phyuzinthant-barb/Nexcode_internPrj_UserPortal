import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import "../styles/styles.css";
import { ExamCard } from "../../components";
import { useSelector } from "react-redux";
import { useGetSignUpCoursesQuery } from "../user/userApi";

const ViewExam = () => {
  const { courseId } = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const { data: signUpCourses, isLoading, error } = useGetSignUpCoursesQuery(token);
  const currentCourse = signUpCourses?.find(course => course.id === parseInt(courseId));

  return (
    <div>
      <div className="view-exam-header">
        <h3 className="exam-header">
          <Link to="/" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
          {currentCourse ? currentCourse.name : "Course Name Not Found"}
        </h3>
      </div>
      <div>
        <ExamCard courseId={courseId} />
      </div>
    </div>
  );
};

export default ViewExam;
