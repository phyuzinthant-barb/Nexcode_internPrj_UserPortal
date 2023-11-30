import { Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../../feature/course/courseApi";
import { useEffect } from "react";
import "../styles/styles.css";

const App = () => {
  const token = useSelector((state) => state.authSlice.token);
  const { data: courses, isLoading, error, refetch } = useGetAllCoursesQuery(token);

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  if (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div className="all-courses-body">
      <Row gutter={24}>
        {courses &&
          courses.map((course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card
                className="new-course-card"
                title={course.name}
                bordered={false}
                style={{ height: "100%" }}
              >
                <p style={{ maxHeight: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {course.description}
                </p>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default App;
