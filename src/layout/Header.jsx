import { Layout, Dropdown, Space, Avatar, Menu } from "antd";
import {
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./styles/styles.css";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const App = () => {
  const navigate = useNavigate();

  const handleClick = (obj) => {
    navigate(obj.key);
  };

  const items = [
    {
      label: (
        <Link to="/change-password">
          <EditOutlined /> Change Password
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <a>
          <LogoutOutlined /> Log out
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <Layout>
      <Header>
        <h2 className="logo">
          <span className="e">e</span>
          <span className="d">d</span>
          <span className="u">u</span>
          <span className="z">z</span>
          <span className="o">o</span>
          <span className="n">n</span>
          <span className="ee">e</span>
        </h2>
        <div className="navbar-display">
          <div className="nav-item">
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ backgroundColor: "#002766" }}
              defaultSelectedKeys={[location.pathname]}
              onClick={handleClick}
              items={[
                {
                  key: "",
                  label: "Courses",
                },
                {
                  key: "history",
                  label: "History",
                },
              ]}
            />
          </div>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            placement="bottomRight"
            arrow>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                Student Name
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
    </Layout>
  );
};

export default App;
