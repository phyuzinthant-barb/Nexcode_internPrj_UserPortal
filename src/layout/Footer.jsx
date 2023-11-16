import { Layout } from "antd";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./styles/styles.css";

const { Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Footer className="footer">
        <div className="copyright-text">
          <p>CompanyName @ 202X. All rights reserved.</p>
        </div>
        <div className="social-media-icon">
          <YouTubeIcon />
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
          <LinkedInIcon />
        </div>
      </Footer>
    </Layout>
  );
};

export default App;
