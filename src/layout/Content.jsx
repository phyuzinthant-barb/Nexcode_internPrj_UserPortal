import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const App = () => {
  return (
    <Content
      style={{ minHeight: '78vh', width: "100%", backgroundColor: "white" }}>
      <Outlet />
    </Content>
  );
};

export default App;
