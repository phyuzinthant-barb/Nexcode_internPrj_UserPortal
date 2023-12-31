import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../feature/auth/authSlice";
import { useLoginAccountMutation } from "../../feature/auth/authApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "../pageStyle/styles.css";


const App = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginAccount] = useLoginAccountMutation();

  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const { data, error } = await loginAccount(values);
      console.log(data)
        console.log( 'error', error)
      if (data?.token) {
        dispatch(setCredentials({...data}));

        const isFirstTime = data?.firstPasswordChangeCompleted

        if(isFirstTime){
        return navigate("/");
        }else{
          return navigate("/change-password", {state : {isFirstTime : data?.firstPasswordChangeCompleted }})
        }
      } else if (error) {
        if (error.originalStatus === 404) {
          message.error("Email is incorrect.");
        } else if (error.originalStatus === 401) {
          message.error("Password is incorrect.");
        } else {
          message.error(error?.data?.message || error?.error || "Login failed.");
        }
      } else {
        console.error("Unexpected response from login API:", { data, error });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="sign-in-form">
      <Form
        className="sign-in"
        layout="vertical"
        name="sign-in"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 className="sign-in-header">Welcome!</h2>
        <Form.Item
          className="sign-in-email"
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Please input your email!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="sign-in-email"
          label="Password"
          name="password"
          rules={[
            {
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Link to="/sign-in/forgot-password" className="forgot-pwd" href="">
            Forgot Password
          </Link>
        </Form.Item>

        <Form.Item shouldUpdate>
          {({ getFieldsValue }) => {
            const { email, password } = getFieldsValue(["email", "password"]);
            const isButtonDisabled = !email || !password;

            return (
              <Button
                className="sign-in-submit-btn"
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}
                loading={isSubmitting}
              >
                Log In
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;

