import { Button, Form, Input } from "antd";
import "../styles/styles.css";

const App = ({ onSubmit }) => {

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="change-password-form">
      <Form
        className="pwd-form"
        layout="vertical"
        name="chg-pw"
        labelCol={{
          span: 16,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 400,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Current Password"
          name="current-password"
          rules={[
            {
              required: true,
              message: "Please input the current password!",
            },
            
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="new-password"
          rules={[
            {
              required: true,
              message: "Please input the new password!",
            },
            {
              pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                  "Your password must have minimum eight characters with at least one uppercase letter, one number and one special character.",
          },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm-password"
          rules={[
            {
              required: true,
              message: "Please input the confirm password!",
            },
            {
              pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                  "Your password must have minimum eight characters with at least one uppercase letter, one number and one special character.",
          },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            className="change-password-submit-btn"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
