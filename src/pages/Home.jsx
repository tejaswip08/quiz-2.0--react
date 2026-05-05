import React, { useState } from "react";
import backgroundImage from "../assets/bg-4.jpg";

// Router
import { useNavigate } from "react-router-dom";

// Material UI
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// Images
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";

// Main Component
const Home = () => {
  let windowContent;

  const avatarImageArray = [
    { name: "avatar-1", path: avatar1 },
    { name: "avatar-2", path: avatar2 },
    { name: "avatar-3", path: avatar3 },
    { name: "avatar-4", path: avatar4 },
  ];

  // Router (For Navigation)
  const navigate = useNavigate();
  function navigateToQuizPageMethod() {
    navigate("/quiz-attempt");
  }

  // Hooks Logics Here
  const [state, setState] = useState({ window: 1 });

  function toggleWindowMethod(window) {
    setState((prevState) => ({ ...prevState, window: window }));
  }

  function callAvatarMethod() {
    alert("AVATAR_TRIGGERING");
  }

  switch (state.window) {
    case 1:
      windowContent = (
        <div>
          <span className="quiz-emoji">👋</span>
          <div className="quiz-title">Welcome Back!</div>
          <div className="quiz-subtitle">
            Fill in your details to start the quiz
          </div>

          <div className="quiz-field">
            <TextField label="Name" variant="outlined" fullWidth />
          </div>

          <div className="quiz-field">
            <TextField label="Email" variant="outlined" fullWidth />
          </div>

          <button className="quiz-btn" onClick={() => toggleWindowMethod(2)}>
            Next →
          </button>
        </div>
      );
      break;

    case 2:
      windowContent = (
        <div>
          <p className="quiz-avatar-title">Pick your avatar</p>
          <p className="quiz-avatar-sub">
            This is how you will see in your profile
          </p>

          <div className="quiz-avatar-grid">
            {avatarImageArray.map((imageItem, index) => (
              <div
                key={index}
                className="quiz-avatar-item"
                onClick={callAvatarMethod}
              >
                <img src={imageItem.path} alt={`avatar-${index}`} />
              </div>
            ))}
          </div>

          <button
            className="quiz-btn quiz-btn-secondary"
            onClick={() => toggleWindowMethod(1)}
          >
            ← Back
          </button>

          <button className="quiz-btn" onClick={() => toggleWindowMethod(3)}>
            Continue →
          </button>
        </div>
      );
      break;
    case 3:
      windowContent = (
        <div>
          <p className="quiz-avatar-title">Before You Begin</p>
          <p className="quiz-avatar-sub">Read the rules carefully</p>

          <div className="quiz-rules-grid">
            <div className="quiz-rule-item">
              <div className="quiz-rule-icon">⏱</div>
              <div className="quiz-rule-heading">10 Seconds Per Question</div>
              <div className="quiz-rule-desc">
                Each of the 7 questions has a 10-second timer.
              </div>
            </div>

            <div className="quiz-rule-item">
              <div className="quiz-rule-icon">🚫</div>
              <div className="quiz-rule-heading">No Skipping</div>
              <div className="quiz-rule-desc">
                You cannot skip or jump to the next question manually.
              </div>
            </div>

            <div className="quiz-rule-item">
              <div className="quiz-rule-icon">⚡</div>
              <div className="quiz-rule-heading">Auto-Advance</div>
              <div className="quiz-rule-desc">
                After 10 sec the quiz moves to next question automatically.
              </div>
            </div>

            <div className="quiz-rule-item">
              <div className="quiz-rule-icon">✅</div>
              <div className="quiz-rule-heading">Live Feedback</div>
              <div className="quiz-rule-desc">
                Right or wrong is shown instantly after each answer.
              </div>
            </div>

            <div className="quiz-rule-item">
              <div className="quiz-rule-icon">🏆</div>
              <div className="quiz-rule-heading">Leaderboard</div>
              <div className="quiz-rule-desc">
                Correct answers and speed are both tracked and ranked.
              </div>
            </div>
          </div>

          <div className="quiz-btn-row">
            <button
              className="quiz-btn quiz-btn-secondary"
              onClick={() => toggleWindowMethod(2)}
            >
              ← Back
            </button>
            <button className="quiz-btn" onClick={navigateToQuizPageMethod}>
              Let's Go →
            </button>
          </div>
        </div>
      );
      break;
  }

  return (
    <>
      <div className="quiz-root">
        <Card className="quiz-card" variant="outlined">
          <div className="quiz-logo">
            <div className="quiz-logo-icon">
              <div className="quiz-logo-q">Q</div>
              <div className="quiz-logo-spark">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="quiz-logo-text">
              quiz<span>it</span>
            </div>
          </div>

          {windowContent}
        </Card>
        <p className="quiz-copyright">
          © {new Date().getFullYear()} Tejaswi Sagar. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Home;
