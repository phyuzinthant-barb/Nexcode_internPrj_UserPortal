import { Card, Col, Row } from "antd";
import "../styles/styles.css";

const App = () => {
  return (
    <div className="all-courses-body">
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card className="new-course-card" title="Course Name " bordered={false}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea omnis
              ducimus laboriosam ex, alias molestias molestiae dolor. Eligendi
              quos laborum distinctio adipisci suscipit. Repellat voluptatem
              voluptas non quae cupiditate accusantium?
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card className="new-course-card" title="Course Name" bordered={false}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              repellendus, commodi repudiandae tempore esse neque accusantium
              eum aspernatur vero omnis perspiciatis ab minus! Ipsam magnam
              excepturi illo officia? Sapiente, laborum.
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card className="new-course-card" title="Course Name" bordered={false}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
              nisi atque provident ullam molestias exercitationem? Hic veniam
              eius ipsam nostrum. Repellat et perferendis pariatur hic facere
              tempore vel laboriosam veniam.
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default App;
