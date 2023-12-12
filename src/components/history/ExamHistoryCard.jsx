import React, { useEffect } from "react";
import { Card, Space, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllExamsWhichUserTakenQuery } from "../../feature/history/historyApi";

const ExamHistoryCard = () => {
  const token = useSelector((state) => state.authSlice.token);
  const { data : history, isLoading, error } = useGetAllExamsWhichUserTakenQuery(token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching signup courses:", error);
    return <div>Error fetching courses</div>;
  }

  return (
    <div>
      {history.map((exam) => (
        <Card key={exam.id}>
          <Row gutter={16}>
            <Col xs={24} md={16}>
              <div className="exam-card">
                <div className="exam-history">
                  <h4>{`${exam.courseName} - ${exam.levelName} - ${exam.examName}`}</h4>
                  <p>{exam.examDescription}</p>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="detail-history">
                <div className="information">
                  <div className="detail-header">
                    <p>Exam Type</p>
                    <p>Number of Questions</p>
                    <p>Limited Time</p>
                    <p>Total Marks</p>
                    <p>Obtained Marks</p>
                    <p>Status</p>
                  </div>
                  <div className="detail-info">
                    <p>-Multiple Choice</p>
                    <p>- {`${exam.numberOfQuestionsToGenerate} Questions`}</p>
                    <p>- {`${exam.examDurationMinute} Questions`}</p>
                    <p>- {`${exam.examTotalMark} Marks`}</p>
                    <p>- {`${exam.obtainedResult} Marks`}</p>
                    <p>{exam.isPass ? "Passed" : "Failed"}</p>
                  </div>
                </div>
                <div className="view-exam-history">
                  <Space size="middle">
                    <Link to={`/history/record/${exam.id}`}>
                      <Button type="primary">View Exam History</Button>
                    </Link>
                  </Space>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default ExamHistoryCard;
