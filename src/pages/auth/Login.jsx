import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/Google.png";
import { AuthContext } from "../../Provider/AuthProvider";
import { RiErrorWarningLine } from "react-icons/ri";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import Button from "@mui/material/Button";

const Login = () => {
  const { login, socialLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  // error message
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // error message reset
    setEmailErrorMsg("");
    setPasswordErrorMsg("");

    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (methods.length === 0) {
      setEmailErrorMsg("Please enter a valid email address");
      return;
    }

    await login(email, password)
      .then((result) => {
        console.log("Login successful");
        navigate("/");
      })
      .catch((error) => {
        setPasswordErrorMsg("Incorrect password");
      });
  };

  const handleGoogleLogin = async () => {
    await socialLogin()
      .then((result) => {
        console.log("Social Login Successful: ", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log("Social Login find error: ", error.code);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-2/1">
        <h1 className="text-5xl font-bold">Login</h1>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleForm} className="fieldset">
              <label className="label font-bold text-base">Email</label>
              <input
                type="email"
                className="input border 
                border-gray-500 rounded-sm"
                placeholder="Email"
                name="email"
                required
              />

              {emailErrorMsg && (
                <div className="flex items-center justify-center gap-x-1 text-red-400">
                  <span>
                    <RiErrorWarningLine />
                  </span>
                  <span>{emailErrorMsg}</span>
                </div>
              )}

              <label className="label font-bold text-base">Password</label>
              <input
                type="password"
                className="input border 
                border-gray-500 rounded-sm"
                placeholder="Password"
                name="password"
                required
              />

              {passwordErrorMsg && (
                <div className="flex items-center justify-center gap-x-1 text-red-400">
                  <span>
                    <RiErrorWarningLine />
                  </span>
                  <span>{passwordErrorMsg}</span>
                </div>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn btn-neutral mt-4 border-1 rounded-2xl">
                Log in
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-500"></div>
              <span className="text-gray-300 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-500"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="btn border-1 rounded-2xl relative"
            >
              <img
                className="size-7 absolute left-2"
                src={googleIcon}
                alt="Google Icon"
              />
              <span className="text-center">Continue with Google</span>
            </button>
          </div>
        </div>
        <p>
          Don't have an account?{" "}
          <NavLink to={"/register"} className={"text-blue-400"}>
            Sign Up.
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
