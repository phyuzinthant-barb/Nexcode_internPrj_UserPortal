import { CustomProgress } from "../index";
import { Card, Space, Button, Col, Row } from "antd";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetSignUpCoursesQuery } from "../../feature/user/userApi";

const App = () => {
  const token = useSelector((state) => state.authSlice.token);
  const { data: signUpCourses, isLoading, error, refetch } = useGetSignUpCoursesQuery(token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching signup courses:", error);
    return <div>Error fetching courses</div>;
  }

  return (
    <div className="course-page-body">
      <Row gutter={[16, 16]}>
        {signUpCourses &&
          signUpCourses.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={course.id}>
              <Card>
                <div className="course-card">
                  <div className="course-title">
                    <h4>{course.name}</h4>
                    <p>{course.description}</p>
                    <CustomProgress percent={course.percentage} />
                  </div>
                  <div className="action">
                    <Space size="middle">
                      <Link to={`/view-exam/${course.id}`}>
                        <Button type="primary">View Exams</Button>
                      </Link>
                    </Space>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default App;
