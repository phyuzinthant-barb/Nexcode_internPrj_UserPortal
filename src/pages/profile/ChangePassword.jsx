import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ChangePasswordForm } from "../../feature";
import { Alert } from "antd";
import { useState } from "react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [currentNewPasswordSame, setCurrentNewPasswordSame] = useState(true);

  const handleFormSubmission = (values) => {
    if (values["new-password"] !== values["confirm-password"]) {
      setPasswordsMatch(false);
      setCurrentNewPasswordSame(true); 
      return; 
    }

    if (values["current-password"] === values["new-password"]) {
      setCurrentNewPasswordSame(false);
      setPasswordsMatch(true); 
      return; 
    }
    setPasswordsMatch(true);
    setCurrentNewPasswordSame(true);
    console.log("Success:", values);
    navigate("/");
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

      <div className="change-password-form">
        <ChangePasswordForm onSubmit={handleFormSubmission} />
      </div>
    </div>
  );
};

export default ChangePassword;
