import React from "react";
import "./ResetPass.css";
import { Link } from "react-router-dom";

const ResetPass = () => {
  return (
    <div className="resetPasswordOverlay">
      <div className="resetPasswordCard">
        <h2>Reset Your Password</h2>
        <p className="subtitle">
          Enter your registered email and we’ll send you a secure reset link.
        </p>

        <form>
          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <button type="submit" className="goldBtn">
            Send Reset Link
          </button>
        </form>

        <p className="backLogin">
          Remembered your password?{" "}
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPass;
