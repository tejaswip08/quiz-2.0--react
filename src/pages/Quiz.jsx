import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";

const Quiz = () => {
  // USESTATE
  const [state, setState] = useState({
    totalQuestions: 7,
    countdown: 10,
    randomNumbersArray: [],
    randomQuestions: [],
    attendedCount: 1,
    correctAnswer: null,
    selectedIndex: null,
    resultsDeclared: false,
  });

  const navigate = useNavigate();

  // USE-EFFECT1 FOR RANDOM QUESTION GENERATION
  useEffect(() => {
    let array = [];
    for (let i = 0; i < state.totalQuestions; i++) {
      let randomNumber = Math.floor(Math.random() * questions.length);
      array.push(randomNumber);
    }
    const filteredQuest = questions.filter((question) =>
      array.includes(question.id),
    );
    setState((prevState) => ({
      ...prevState,
      randomNumbersArray: array,
      randomQuestions: filteredQuest,
    }));
    console.log("RANDOM_QUES", filteredQuest);
  }, []);

  // USE-EFFECT2 FOR COUNTDOWN
  useEffect(() => {
    if (state.countdown === 0) {
      moveNextQuestionMethod();
      return;
    }
    const interval = setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        countdown: prevState.countdown - 1,
      }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state.countdown]);

  // FUNCTIONS HERE
  function moveNextQuestionMethod() {
    if (state.attendedCount == state.totalQuestions) {
      navigate("/leaderboard");
      return;
    }
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        attendedCount: prevState.attendedCount + 1,
        countdown: 10,
        correctAnswer: null,
        selectedIndex: null,
        resultsDeclared: false,
      }));
    }, 2000);
    setState((prevState) => ({
      ...prevState,
      resultsDeclared: true,
    }));
  }

  function checkForAnswerMethod(selOption, correctOption, index) {
    // if (selOption === correctOption) {
    console.log("YES_CORRECT");
    setState((prevState) => ({
      ...prevState,
      correctAnswer: selOption === correctOption,
      selectedIndex: index,
    }));
    // }
  }

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="quiz-page">
      {/* Top bar */}
      <div className="quiz-page-topbar">
        <div className="quiz-page-logo">
          <div className="quiz-page-logo-icon">Q</div>
          <span className="quiz-page-logo-text">
            quiz<span>it</span>
          </span>
        </div>
        <div className="quiz-page-meta">
          <span className="quiz-page-qcount">
            {state.attendedCount} <span>/ {state.totalQuestions}</span>
          </span>
          <div
            className={`quiz-page-countdown ${state.countdown <= 3 ? "quiz-countdown-urgent" : ""}`}
          >
            <svg className="quiz-countdown-ring" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="#e8e8e8"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke={state.countdown <= 3 ? "#e53935" : "#005550"}
                strokeWidth="2.5"
                strokeDasharray={`${(state.countdown / 10) * 100} 100`}
                strokeLinecap="round"
                strokeDashoffset="25"
                style={{
                  transition: "stroke-dasharray 1s linear, stroke 0.3s",
                }}
              />
            </svg>
            <span className="quiz-countdown-number">{state.countdown}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="quiz-page-progress-bar-wrapper">
        <div
          className="quiz-page-progress-bar"
          style={{
            width: `${(state.attendedCount / state.totalQuestions) * 100}%`,
          }}
        ></div>
      </div>

      {/* Card */}
      <div className="quiz-page-card">
        {/* Question */}
        <div className="quiz-page-question-wrapper">
          <div className="quiz-page-question-tag">
            Question {state.attendedCount}
          </div>
          <h2 className="quiz-page-question">
            {state.randomQuestions[state.attendedCount - 1]?.question}
          </h2>
        </div>

        {/* Options */}
        <div className="quiz-page-options">
          {state.randomQuestions[state.attendedCount - 1]?.options.map(
            (option, index) => (
              <button
                key={index}
                disabled={state.selectedIndex !== null}
                onClick={() =>
                  checkForAnswerMethod(
                    option,
                    state.randomQuestions[state.attendedCount - 1]
                      ?.correctAnswer,
                    index,
                  )
                }
                className={`quiz-page-option ${
                  state.resultsDeclared
                    ? option ===
                      state.randomQuestions[state.attendedCount - 1]
                        ?.correctAnswer
                      ? "correct-answer"
                      : state.selectedIndex === index
                        ? "wrong-answer"
                        : ""
                    : state.selectedIndex === index
                      ? "selected-answer"
                      : ""
                }`}
              >
                <span className="quiz-option-label">{optionLabels[index]}</span>
                <span className="quiz-option-text">{option}</span>
                <span className="quiz-option-indicator"></span>
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
