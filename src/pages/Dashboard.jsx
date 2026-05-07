import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SportsEsports, EmojiEvents, CheckCircle } from "@mui/icons-material";

const Dashboard = () => {
  const routerData = useLocation().state;
  const navigate = useNavigate();
  return (
    <div className="dash-root">
      <nav className="dash-nav">
        <div className="dash-nav-logo">
          <div className="dash-nav-logo-icon">
            <span>Q</span>
          </div>
          <div className="dash-nav-logo-text">
            quiz<span>it</span>
          </div>
        </div>
        <button
          className="dash-nav-btn"
          onClick={() => {
            navigate("/quiz-attempt");
          }}
        >
          Start Quiz →
        </button>
      </nav>

      <div className="dash-content">
        <div className="dash-hero">
          <div className="dash-hero-avatar">
            <img
              src={routerData?.avatar?.path}
              alt={routerData?.avatar?.name}
            />
            <div className="dash-hero-avatar-ring"></div>
          </div>

          <div className="dash-hero-body">
            <div className="dash-hero-name">{routerData?.name}</div>
            <div className="dash-hero-email">{routerData?.email}</div>

            <div className="dash-hero-divider"></div>

            <div className="dash-hero-stats">
              <div className="dash-stat">
                <div className="dash-stat-top">
                  <div className="dash-stat-icon-box">
                    <SportsEsports className="dash-stat-icon" />
                  </div>
                  <span className="dash-stat-value">0</span>
                </div>
                <span className="dash-stat-label">Games Played</span>
              </div>

              <div className="dash-stat-divider"></div>

              <div className="dash-stat">
                <div className="dash-stat-top">
                  <div className="dash-stat-icon-box dash-stat-icon-box--gold">
                    <EmojiEvents className="dash-stat-icon" />
                  </div>
                  <span className="dash-stat-value">0</span>
                </div>
                <span className="dash-stat-label">Highest Score</span>
              </div>

              <div className="dash-stat-divider"></div>

              <div className="dash-stat">
                <div className="dash-stat-top">
                  <div className="dash-stat-icon-box dash-stat-icon-box--teal">
                    <CheckCircle className="dash-stat-icon" />
                  </div>
                  <span className="dash-stat-value">0</span>
                </div>
                <span className="dash-stat-label">Correct Answers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
