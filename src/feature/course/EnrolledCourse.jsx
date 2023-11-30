import { SearchCourses } from "../../components";
import { useState, useEffect } from "react";
import "../styles/styles.css";
import { useGetSignUpCoursesQuery } from "../user/userApi";
import { useSelector } from "react-redux";
import { Card, Space, Button } from "antd";
import { CustomProgress } from "../../components/index";
import { Link } from "react-router-dom";

const EnrolledCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCourseId, setSearchedCourseId] = useState(null);

  const token = useSelector((state) => state.authSlice.token);
  const { data: signUpCourses, isLoading, error, refetch } = useGetSignUpCoursesQuery(token);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    console.error("Error fetching signup courses:", error);
    return <div>Error fetching courses</div>; 
  }

  // useEffect(() => {
  //   refetch();
  // }, [refetch, token]);


  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    console.log(term);

    const foundCourse = signUpCourses.find(
      (course) => course.name.toLowerCase() === term.toLowerCase()
    );

    if (foundCourse) {
      setSearchedCourseId(foundCourse.id);
      console.log("Searched Course ID:", foundCourse.id);
    } else {
      setSearchedCourseId(null);
      console.log("Course not found");
    }
  };

  return (
    <div className="enrolled-courses">
      <div className="top-level">
        <h3 className="header">Your Courses</h3>
        <div className="search-box">
          <SearchCourses onSearch={handleSearch} />
        </div>
      </div>
      <div className="card-design">
        <div className="course-page-body">
          {(searchTerm
            ? signUpCourses.filter((course) => 
                course.name.toLowerCase().includes(searchTerm)
              )
            : signUpCourses
          ).map((course) => (
            <Card key={course.id}>
              <div className="course-card">
                <div className="course-title">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  <CustomProgress percent={course.percentage} />
                </div>

                <div className="action" style={{ width: "320px" }}>
                  <Space size="middle">
                    <Link to={`/view-exam/${course.id}`}>
                      <Button type="primary">View Exams</Button>
                    </Link>
                  </Space>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourse;
