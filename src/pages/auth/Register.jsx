import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";

const Register = () => {
  const { createNewUser } = useContext(AuthContext);

  // Error Message state
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [photoErrorMessage, setPhotoErrorMessage] = useState("");

  // Password Show
  const [passwordShow, setPasswordShow] = useState(false);

  const navigate = useNavigate();

  // name validation
  const handleNameValidation = (name) => {
    const nameRegex = /^[A-Za-z ]+$/;

    if (!name.trim()) {
      return {
        valid: false,
        error: "Name is required.",
      };
    }

    if (!nameRegex.test(name.trim())) {
      return {
        valid: false,
        error: "Name can only contain letters and spaces.",
      };
    }

    if (name.trim().length < 2) {
      return {
        valid: false,
        error: "Name must be at least 2 characters.",
      };
    }

    return {
      valid: true,
      error: "",
    };
  };

  // photo url validation
  const handlePhotoValidation = async (photo) => {
    // input exists and type check
    if (!photo || typeof photo !== "string") {
      return { valid: false, error: "User profile link is required." };
    }

    // start and ending space remove
    const trimmed = photo.trim();

    // check space
    const hasSpace = /\s/.test(trimmed);

    if (hasSpace) {
      return { valid: false, error: "Link cannot contain space." };
    }

    // check url is right or not
    let url;
    try {
      url = new URL(trimmed);
    } catch {
      return { valid: false, error: "Please provide a valid link." };
    }

    // check https:// or http://
    if (!["https:", "http:"].includes(url.protocol)) {
      return {
        valid: false,
        error: "Link must start with http:// or https://",
      };
    }

    // image direct link validation check
    // 1st image extension check (no network call)
    const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?.*)?$/i;

    if (!IMAGE_EXTENSIONS.test(url.pathname + url.search)) {
      return {
        valid: false,
        error: "Link doesn't look like a direct image file (.jpg, .png, etc).",
      };
    }

    // 2nd actually try loading the image
    return new Promise((resolve) => {
      const img = new Image();
      // after 8 second later error show
      const timeOut = setTimeout(() => {
        img.src = "";
        resolve({ valid: false, error: "Image took too long to load." });
      }, 8000);
      // image find success
      img.onload = () => {
        clearTimeout(timeOut);
        resolve({ valid: true, error: "" });
      };
      // firstly find find error without 8 second time need
      img.onerror = () => {
        clearTimeout(timeOut);
        resolve({
          valid: false,
          error: "Link doesn't point to a loadable image.",
        });
      };
      img.src = trimmed;
    });
    return { valid: true, error: "" };
  };

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
    setNameErrorMessage("");
    setPhotoErrorMessage("");

    // name validation
    const nameValidation = handleNameValidation(name);
    if (!nameValidation.valid) {
      setNameErrorMessage(nameValidation.error);
      return;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailErrorMessage("Please enter a valid email address.");
      return;
    }

    // photo validation
    const photoValidation = await handlePhotoValidation(photo);
    if (!photoValidation.valid) {
      setPhotoErrorMessage(photoValidation.error);
      return;
    }

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
  // Register button disable when any input state empty
  const [disabledBtn, setDisabledBtn] = useState(true);

  // when every input not empty then Register button enable
  const handleChange = (e) => {
    const form = e.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoUrl = form.photo.value.trim();
    const password = form.password.value;

    const allFilled =
      email !== "" && password !== "" && photoUrl !== "" && name !== "";

    setDisabledBtn(!allFilled);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold">Create an Account</h1>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form
              onChange={handleChange}
              onSubmit={handleForm}
              className="fieldset space-y-2"
            >
              <div className="space-y-1">
                <label className="label font-bold text-base">Name</label>
                <input
                  type="text"
                  className="input border 
                border-gray-500 rounded-sm"
                  placeholder="Name"
                  name="name"
                />
                {nameErrorMessage && (
                  <div className="mt-1 flex items-center justify-center gap-x-1 text-red-400">
                    <span>
                      <RiErrorWarningLine />
                    </span>
                    <span>{nameErrorMessage}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label className="label font-bold text-base">Email</label>
                <input
                  type="email"
                  className="input border 
                border-gray-500 rounded-sm"
                  placeholder="Email"
                  name="email"
                />
                {emailErrorMessage && (
                  <div className="mt-1 flex items-center justify-center gap-x-1 text-red-400">
                    <span>
                      <RiErrorWarningLine />
                    </span>
                    <span>{emailErrorMessage}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="label font-bold text-base">Photo URL</label>
                <input
                  type="url"
                  className="input border 
                border-gray-500 rounded-sm"
                  placeholder="https://"
                  name="photo"
                />
                {photoErrorMessage && (
                  <div className="mt-1 flex items-center justify-center gap-x-1 text-red-400">
                    <span>
                      <RiErrorWarningLine />
                    </span>
                    <span>{photoErrorMessage}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="label font-bold text-base">Password</label>
                <div className="relative">
                  <input
                    type={passwordShow ? "text" : "password"}
                    className="input border 
                border-gray-500 rounded-sm"
                    placeholder="Password"
                    name="password"
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
                  <div className="mt-1 flex items-center justify-center gap-x-1 text-red-400">
                    <span>
                      <RiErrorWarningLine />
                    </span>
                    <span>{passwordErrorMessage}</span>
                  </div>
                )}
              </div>

              <button
                disabled={disabledBtn}
                className="mt-3 btn btn-neutral border-1 rounded-2xl"
              >
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
