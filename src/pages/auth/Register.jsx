import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";

const Register = () => {
  const { createNewUser } = useContext(AuthContext);

  // Error Message
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // Password Show
  const [passwordShow, setPasswordShow] = useState(false);

  const navigate = useNavigate();

  const handleForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const userRegisterInfo = { name, email, photo, password };

    // reset previous error message
    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    // password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const length = password.length >= 6;

    if (hasUpperCase === false) {
      setPasswordErrorMessage("Include at least one uppercase letter");
      return;
    } else if (hasLowerCase === false) {
      setPasswordErrorMessage("Include at least one lowercase letter");
      return;
    } else if (length === false) {
      setPasswordErrorMessage("Use at least 6 characters");
      return;
    }

   await createNewUser(email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
        // .then()
        // .catch();
        console.log("Register Successful: ", result.user);

        navigate("/");
      })
      .catch((error) => {
        let errorMsg = error.code.replace("auth/", "").replace("-", " ");
        errorMsg = errorMsg
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        console.log(errorMsg);

        if (errorMsg.includes("Email")) {
          setEmailErrorMessage(errorMsg);
        } else {
          setPasswordErrorMessage(errorMsg);
        }
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold">Create an Account</h1>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleForm} className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input border 
                border-gray-500 rounded-sm"
                placeholder="Name"
                name="name"
                required
              />

              <label className="label">Email</label>
              <input
                type="email"
                className="input border 
                border-gray-500 rounded-sm"
                placeholder="Email"
                name="email"
                required
              />
              {emailErrorMessage && (
                <div className="flex items-center justify-center gap-x-1 text-red-400">
                  <span>
                    <RiErrorWarningLine />
                  </span>
                  <span>{emailErrorMessage}</span>
                </div>
              )}

              <label className="label">Photo URL</label>
              <input
                type="url"
                className="input border 
                border-gray-500 rounded-sm"
                placeholder="Photo URL"
                name="photo"
                required
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={passwordShow ? "text" : "password"}
                  className="input border 
                border-gray-500 rounded-sm"
                  placeholder="Password"
                  name="password"
                  required
                />
                <button
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute right-5 top-1/2 -translate-1/2"
                >
                  {passwordShow ? (
                    <FaEyeSlash className="size-4 cursor-pointer" />
                  ) : (
                    <FaEye className="size-4 cursor-pointer" />
                  )}
                </button>
              </div>

              {passwordErrorMessage && (
                <div className="flex items-center justify-center gap-x-1 text-red-400">
                  <span>
                    <RiErrorWarningLine />
                  </span>
                  <span>{passwordErrorMessage}</span>
                </div>
              )}

              <button className="btn btn-neutral border-1 rounded-2xl">
                Register
              </button>
            </form>
          </div>
        </div>
        <p>
          Already Have An Account?{" "}
          <NavLink to={"/login"} className={"text-blue-400"}>
            Sign In.
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
