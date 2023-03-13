import { Link } from "react-router-dom";
import "./style/404.css";

const NoPage = () => {
  return (
    <div className="no_page">
      <div className="profile_card">
        <div className="profile_card_header">
          <h1>404 No Page Found!</h1>
        </div>
        <Link to="/">Go Home</Link>
      </div>
      <div className="box">
        
      </div>
    </div>
  );
};

export default NoPage;
