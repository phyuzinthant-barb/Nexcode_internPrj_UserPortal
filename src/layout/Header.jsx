import { Layout, Dropdown, Space, Avatar, Menu, Modal } from "antd";
import {
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./styles/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutAccount } from "../feature/auth/authSlice";

const { Header } = Layout;

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(username);

  const {username} = useSelector(state => state.authSlice)
  // const { isFirstTime } = useSelector(state => state.authSlice.isFirstTime)

  const LogoutModalForm = ({ visible, handleOk, handleCancel }) => (
    <Modal
      title="Are you sure to logout?"
      open={visible}
      onOk={handleOk}
      okType="danger"
      centered
      onCancel={handleCancel}></Modal>
  );

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleClick = (obj) => {
    navigate(obj.key);
  };

  const handleLogoutModalClose = () => {
    dispatch(logoutAccount());
    navigate("/sign-in");
  };

  const handleLogoutModalCancel = () => {
    setLogoutModalVisible(false);
  }

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

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
        <a onClick={() => setLogoutModalVisible(true)}>
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
        <div className="navbar-display lg:flex">
          
          <div>
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
                {username ||  "Student Name"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <LogoutModalForm
        visible={logoutModalVisible}
        handleOk={handleLogoutModalClose}
        handleCancel={handleLogoutModalCancel}
      />
    </Layout>
  );
};

export default App;
