import { NewCourseCard } from "../../components";
import "../styles/styles.css";

const AllCourse = () => {
  return (
    <div className="all-courses">
      <div className="top-level">
        <h3 className="header">New Courses</h3>
      </div>
      <div>
        <NewCourseCard />
      </div>
    </div>
  );
};

export default AllCourse;
