import { ExamHistoryCard } from "../../components";
import { useSelector } from "react-redux";

const History = () => {
  
  return (
    <div className="history">
      <div className="top-level">
        <h3 className="header">Exam History</h3>
      </div>
      <div style={{marginBottom: "24px"}}>
        <ExamHistoryCard />
      </div>
    </div>
  )
}

export default History