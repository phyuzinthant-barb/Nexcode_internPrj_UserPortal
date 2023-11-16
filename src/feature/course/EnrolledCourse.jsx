import { EnrolledCourseCard, Search } from "../../components";
import "../styles/styles.css";

const EnrolledCourse = () => {
  return (
    <div className="enrolled-courses">
      <div className="top-level">
        <h3 className="header">Your Courses</h3>
        <div className="search-box">
          <Search />
        </div>
      </div>
      <div className="card-design">
        <EnrolledCourseCard />
        <EnrolledCourseCard />
        <EnrolledCourseCard />
      </div>
    </div>
  );
};

export default EnrolledCourse;
