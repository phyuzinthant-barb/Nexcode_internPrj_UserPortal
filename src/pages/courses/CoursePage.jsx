import { AllCourse, EnrolledCourse } from "../../feature";

const CoursePage = () => {
  return (
    <>
      <div>
        <EnrolledCourse />
      </div>
      <div>
        <AllCourse />
      </div>
    </>
  );
};

export default CoursePage;