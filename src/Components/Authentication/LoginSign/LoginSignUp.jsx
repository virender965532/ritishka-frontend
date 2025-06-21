import React, { useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../../api/api";
import { loginAndSaveData } from "../../../redux/actions/loginActions";

const LoginSignUp = () => {
  const UserData = useSelector((state) => state?.userData);
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (UserData?.user?._id) {
      const role = UserData?.user?.role;
      if (role === "ADMIN" || role === "SUPERADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [UserData])

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

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    const errors = {};
    if (!loginData.email.trim()) errors.email = "Email is required";
    if (!loginData.password) errors.password = "Password is required";
    if (loginData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!/\S+@\S+\.\S+/.test(loginData.email)) errors.email = "Email is invalid";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginData.email)) errors.email = "Email is invalid";
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    setLoginErrors(errors);
    setError("");
    if (Object.keys(errors).length === 0) {
      try {
        const res = await loginUser(loginData);

        localStorage.setItem("token", res?.data?.token);
        dispatch(loginAndSaveData(res.data, true));
        const role = res.data.user?.role;
        if (role === "ADMIN" || role === "SUPERADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } catch (err) {
        setError(err.response?.data?.error || "Login failed");
      }
    }
  };

  const validateRegister = () => {
    const errors = {};
    if (!signupData.name.trim()) errors.name = "Name is required";
    if (!signupData.email) errors.email = "Email is required";
    if (!signupData.phone) errors.phone = "Phone number is required";
    if (!signupData.password) errors.password = "Password is required";
    if (!signupData.confirmPassword) errors.confirmPassword = "Confirm password is required";
    if (!signupData.password || signupData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (signupData.password !== signupData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!/\S+@\S+\.\S+/.test(signupData.email)) errors.email = "Email is invalid";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(signupData.email)) errors.email = "Email is invalid";
    if(!/^\d{10}$/.test(signupData.phone)) errors.phone = "Phone number is invalid";
    if (!/^\d{10}$/.test(signupData.phone)) errors.phone = "Phone number must be 10 digits";
    return errors;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegister();
    setRegisterErrors(errors);
    setError("");
    if (Object.keys(errors).length === 0) {
      try {
      const { name, email, phone, password } = signupData;
        await signupUser({ name, email, phone, password });
        setActiveTab("tabButton1");
      } catch (err) {
        setError(err.response?.data?.error || "Signup failed");
      }
    }
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
            {error && (
              <div className="loginSignUpError" style={{ marginBottom: "20px", textAlign: "center", fontWeight: "bold", color: "red" }}>
                <div style={{ color: "red" }}>{error}</div>
              </div>
            )}
            {/* tab1 */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address *"
                    value={loginData.email}
                    onChange={handleLoginChange}

                  />
                  {loginErrors.email && (
                    <p className="text-danger">{loginErrors.email}</p>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    value={loginData.password}
                    onChange={handleLoginChange}

                  />
                  {loginErrors.password && (
                    <p className="text-danger">{loginErrors.password}</p>
                  )}
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/reset-password">Lost password?</Link>
                    </p>
                  </div>
                  <button type="submit">Log In</button>
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
                <form onSubmit={handleSignupSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Username *"
                    value={signupData.name}
                    onChange={handleSignupChange}

                  />
                  {registerErrors.name && (
                    <p className="text-danger">{registerErrors.name}</p>
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address *"
                    value={signupData.email}
                    onChange={handleSignupChange}

                  />
                  {registerErrors.email && (
                    <p className="text-danger">{registerErrors.email}</p>
                  )}
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                    value={signupData.phone}
                    onChange={handleSignupChange}

                  />
                  {registerErrors.phone && (
                    <p className="text-danger">{registerErrors.phone}</p>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    value={signupData.password}
                    onChange={handleSignupChange}

                  />
                  {registerErrors.password && (
                    <p className="text-danger">{registerErrors.password}</p>
                  )}
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password *"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}

                  />
                  {registerErrors.confirmPassword && (
                    <p className="text-danger">{registerErrors.confirmPassword}</p>
                  )}
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" required />
                      <p>
                        I accept that I have read & understood the{" "}
                        <Link
                          to="/terms"
                          style={{ textDecoration: "none", color: "#c32929" }}
                        >
                          {" "}
                          privacy policy
                        </Link>
                        .
                      </p>
                    </label>
                  </div>
                  <button type="submit">Register</button>
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
