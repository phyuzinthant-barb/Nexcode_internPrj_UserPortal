import { Button, Form, message } from "antd";
import "../pageStyle/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "../../feature/auth/authApi";

const App = () => {
  const { email, previousRoute } = useLocation().state;
  const [isResent, setIsResent] = useState(false);
  const [timer, setTimer] = useState(59);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyOtp] = useVerifyOtpMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const onVerify = async (e) => {
    e.preventDefault;
    try {
      setIsSubmitting(true);
      if (otp?.trim().length === 0) {
        dispatch(message.info("Please enter otp code!"));
        setIsSubmitting(false);
        return;
      }
      const { data, error: apiError } = await verifyOtp({ email, otp });
      if (previousRoute === "/sign-in/forgot-password") {
        dispatch(message.success("OTP is verified. Please Change Password."));
        navigate("/sign-in/forgot-password/change-password", {
          replace: true,
          state: email,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    let counter;
    if (isResent) {
      counter = setInterval(decreaseTimer, 1000);
    } else clearInterval(counter);
    return () => clearInterval(counter);
  }, [timer, isResent]);

  const decreaseTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      setIsResent(false);
    }
  };

  const onResendOtp = async () => {
    setIsResent(true);
    setTimer(59);
    setOtp("");
    try {
      const { data, error: apiError } = await forgotPassword({ email });
      if (data?.success) {
        dispatch(message.success("OTP is sent."));
      } else {
        setOtp("");
        dispatch(message.error("OTP is wrong."));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   navigate("/sign-in/forgot-password/verify-otp/change-password");
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const [otp, setOtp] = useState("");

  return (
    <div className="sign-in-form">
      <Form
        className="sign-in"
        layout="vertical"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onVerify}
        // onFinishFailed={onFinishFailed}
        autoComplete="off">
        <h2 className="sign-in-header">Verfiy your account</h2>
        <p className="forgot-pwd-description">
          Enter the 6-digit PIN code sent to your email ****@mail.com
        </p>
        <Form.Item>
          <OTPInput
            value={otp}
            onChange={(code) => setOtp(code)}
            numInputs={6}
            containerStyle={"otp-form"}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus={true}
          />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            const isButtonDisabled = otp.length !== 6;

            return (
              <div>
                <Button
                  className="sign-in-submit-btn"
                  type="primary"
                  htmlType="submit"
                  disabled={isButtonDisabled}
                  loading={isSubmitting}>
                  Verify
                </Button>
                <div className="otp-resent">
                  <Button type="link" onClick={onResendOtp}>
                    Resent new code
                  </Button>
                </div>
              </div>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
