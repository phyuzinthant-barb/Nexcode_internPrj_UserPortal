import { ExamHistoryCard } from "../../components"

const History = () => {
  return (
    <div className="history">
      <div className="top-level">
        <h3 className="header">Exam History</h3>
      </div>
      <div>
        <ExamHistoryCard />
        <ExamHistoryCard />
      </div>
    </div>
  )
}

export default History