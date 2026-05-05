import React, { useState, useEffect, useRef } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Material UI
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// RHF
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Images
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";

// Components
import MySnackbar from "../components/common/MySnackbar";

// ── Validation Schema ──────────────────────────────────────────────────────────
const formsSchema = yup.object({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .email("Provided email is invalid!")
    .required("Email is required!"),
});

// ── Main Component ─────────────────────────────────────────────────────────────
const Home = () => {
  let windowContent;
  const storage = useRef(undefined);
  const avatarImageArray = [
    { name: "avatar-1", path: avatar1 },
    { name: "avatar-2", path: avatar2 },
    { name: "avatar-3", path: avatar3 },
    { name: "avatar-4", path: avatar4 },
  ];

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formsSchema), mode: "onTouched" });

  // ── Form submit — saves name & email into state then moves to window 2 ──
  function formData(data) {
    setState((prevState) => ({
      ...prevState,
      window: 2,
      userDetails: {
        ...prevState.userDetails,
        name: data.name,
        email: data.email,
      },
    }));
  }

  // Use Effect
  useEffect(() => {
    storage.current = JSON.parse(localStorage.getItem("USER_DETAILS"));
    console.log("LOCA_ST_ITEMS", storage.current);
  }, []);

  // Router
  const navigate = useNavigate();
  function navigateToQuizPageMethod() {
    const existingUsers =
      JSON.parse(localStorage.getItem("USER_DETAILS")) || [];
    const userExists = existingUsers.some(
      (item) => item.email === state.userDetails.email,
    );
    if (!userExists) {
      const updatedUsers = [...existingUsers, state.userDetails];
      localStorage.setItem("USER_DETAILS", JSON.stringify(updatedUsers));
    }
    navigate("/quiz-attempt");
  }

  // Use State
  const [state, setState] = useState({
    window: 1,
    userDetails: {
      name: "",
      email: "",
      avatar: null,
    },
    snackbarDetails: {
      color: null,
      enabled: false,
      message: null,
    },
  });

  function toggleWindowMethod(window) {
    if (window == 3) {
      if (state.userDetails.avatar) {
      } else {
        setState((prevState) => ({
          ...prevState,
          snackbarDetails: {
            color: "error",
            enabled: true,
            message: "Kindly select your avatar..!",
          },
        }));
        return;
      }
    }
    setState((prevState) => ({ ...prevState, window: window }));
  }

  function callAvatarMethod(imageItem) {
    setState((prevState) => ({
      ...prevState,
      userDetails: {
        ...prevState.userDetails,
        avatar: imageItem,
      },
    }));
  }

  switch (state.window) {
    case 1:
      windowContent = (
        // ── handleSubmit wraps the form, Next button submits it ──
        <form onSubmit={handleSubmit(formData)}>
          <span className="quiz-emoji">👋</span>
          <div className="quiz-title">Welcome Back!</div>
          <div className="quiz-subtitle">
            Please provide your details to register and start the quiz
          </div>
          <div className="quiz-field">
            <TextField
              {...register("name")}
              label="Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
          <div className="quiz-field">
            <TextField
              {...register("email")}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* type="submit" so handleSubmit fires and validates before proceeding */}
          <button type="submit" className="quiz-btn">
            Next →
          </button>
          <div className="quiz-or-divider">
            <span>OR</span>
          </div>
          <button
            className="quiz-btn quiz-btn-secondary"
            onClick={() => toggleWindowMethod(4)}
          >
            I already have an account
          </button>
        </form>
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
                className={
                  state.userDetails.avatar?.name === imageItem.name
                    ? "quiz-avatar-selected-item quiz-avatar-item"
                    : "quiz-avatar-item"
                }
                onClick={() => callAvatarMethod(imageItem)}
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

    case 4:
      const savedAccounts = storage.current;

      windowContent = (
        <div>
          <p className="quiz-avatar-title">Welcome Back 👋</p>
          <p className="quiz-avatar-sub">Select your account to continue</p>

          <div className="quiz-account-list">
            {savedAccounts.map((user, index) => (
              <div key={index} className="quiz-account-item">
                <div className="quiz-account-avatar">
                  <img src={user.avatar.path} alt={user.avatar.name} />
                </div>
                <div className="quiz-account-info">
                  <div className="quiz-account-name">{user.name}</div>
                  <div className="quiz-account-email">{user.email}</div>
                </div>
                <div className="quiz-account-arrow">→</div>
              </div>
            ))}
          </div>
          <button
            className="quiz-btn quiz-btn-secondary"
            onClick={() => toggleWindowMethod(1)}
          >
            ← Back
          </button>
        </div>
      );
      break;
  }

  return (
    <>
      <div className="quiz-root">
        {state.snackbarDetails.enabled && (
          <MySnackbar
            SnackbarDetails={state.snackbarDetails}
            handleClose={() =>
              setState((prev) => ({
                ...prev,
                snackbarDetails: {
                  ...prev.snackbarDetails,
                  enabled: false,
                },
              }))
            }
          />
        )}
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

          <div key={state.window} className="quiz-window">
            {windowContent}
          </div>
        </Card>
        {/* <p className="quiz-copyright">
          © {new Date().getFullYear()} Tejaswi Sagar. All rights reserved.
        </p> */}
      </div>
    </>
  );
};

export default Home;
