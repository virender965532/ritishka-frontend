import React, { useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useLocation } from "react-router-dom";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.endsWith("/signup")) {
      setActiveTab("tabButton2");
    } else if (path.endsWith("/login")) {
      setActiveTab("tabButton1");
    } else {
      setActiveTab("tabButton1"); // default to login
    }
  }, [location.pathname]);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* tab1 */}

            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form>
                  <input type="email" placeholder="Email address *" required />
                  <input type="password" placeholder="Password *" required />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button>Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form>
                  <input type="text" placeholder="Username *" required />
                  <input type="email" placeholder="Email address *" required />
                  <input type="password" placeholder="Password *" required />
                  <div className="loginSignUpForgetPass">
                      <label>
                      <input type="checkbox" className="brandRadio" required/>
                      <p>
                        I accept that I have read & understood the{" "}
                        <Link
                          to="/terms"
                          style={{ textDecoration: "none", color: "#c32929" }}    
                        >{" "}
                          privacy policy
                        </Link>.
                      </p>
                    </label>
                  </div>
                  <button>Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
