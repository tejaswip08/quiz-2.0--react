import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeAnimation = (props) => {
  const [state, setState] = useState({
    counter: 5,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (state.counter === 0) {
      navigate(`/dashboard/${props.CurrentUserDetails.name}`, {
        state: props.CurrentUserDetails,
      });
      return;
    }
    const interval = setInterval(() => {
      setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state.counter]);

  return (
    <div className="quiz-loading-wrapper">
      <div className="quiz-loading-logo">
        <div className="quiz-loading-q">Q</div>
      </div>

      <div className="quiz-loading-bar-wrapper">
        <div className="quiz-loading-bar"></div>
      </div>

      <div className="quiz-loading-text">Please wait</div>

      <div className="quiz-loading-sub">
        We are setting things up for you
        <span className="quiz-loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
