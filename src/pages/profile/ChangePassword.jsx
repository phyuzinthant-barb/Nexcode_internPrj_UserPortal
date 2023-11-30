import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ChangePasswordForm } from "../../feature";
import { Alert, message } from "antd";
import { useState } from "react";
import { useChangePasswordMutation } from "../../feature/user/userApi";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [currentNewPasswordSame, setCurrentNewPasswordSame] = useState(true);
  const token = useSelector((state) => state.authSlice.token);
  const [ changePassword, {error: error} ] = useChangePasswordMutation(token);

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
      message.success("Password changed successfully.")
      navigate("/sign-in");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div>
      <div className="title">
        <div className="exam-header-arrow-icon">
          <Link to="/" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
        </div>
        <div className="exam-name-group">
          <h3>Change Password</h3>
        </div>
      </div>

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

      {error && (
        <Alert
          message="Error changing password. Please try again."
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
