import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { ChangePasswordForm } from "../../feature";
import { Alert, message } from "antd";
import { useState } from "react";
import { useChangePasswordMutation } from "../../feature/user/userApi";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const location = useLocation();
  const isFirstTime = location?.state;

  console.log(isFirstTime);

  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [currentNewPasswordSame, setCurrentNewPasswordSame] = useState(true);
  const token = useSelector((state) => state.authSlice.token);
  const [changePassword, { error: error }] = useChangePasswordMutation(token);

  const handleFormSubmission = async (values) => {
    setPasswordsMatch(true);
    setCurrentNewPasswordSame(true);

    if (values["new-password"] !== values["confirm-password"]) {
      setPasswordsMatch(false);
      return;
    }

    if (values["current-password"] === values["new-password"]) {
      setCurrentNewPasswordSame(false);
      return;
    }

    try {
      await changePassword({
        password: {
          oldPassword: values["current-password"],
          newPassword: values["new-password"],
        },
      });
      message.success("Password changed successfully.");
      navigate("/sign-in");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div>
      {isFirstTime?.isFirstTime ? (
        <div className="title">
          <div className="exam-header-arrow-icon">
            <div className="exam-header-arrow-icon"></div>
            <Link to="/" className="arrow-icon">
              <ArrowLeftOutlined />
              <div className="exam-name-group">
                <h3>Change Password</h3>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Alert
            showIcon
            message="Change your temporary password."
            type="warning"
            style={{ width: "100%", paddingLeft: "113px", height:"46px" }}
          />
          <div
            className="first-time-login"
            style={{
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "28px",
              fontStyle: "normal",
              marginTop: "24px",
              marginLeft: "113px",
            }}>
            <p>Change Password</p>
          </div>
        </div>
      )}

      {!passwordsMatch && (
        <Alert
          message="New Password and Confirm Password do not match."
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      {!currentNewPasswordSame && (
        <Alert
          message="Current password and new password cannot be the same."
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      <div className="change-password-form">
        <ChangePasswordForm onSubmit={handleFormSubmission} />
      </div>
    </div>
  );
};

export default ChangePassword;
