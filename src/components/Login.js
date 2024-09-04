import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSighInForm = () => {
    setErrorMessage(null);
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    //Validate the form data
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value);
    // another way
    // setErrorMessage(message);
    // if(message) return;
    // rest of the logic
    if (message !== null) {
      setErrorMessage(message);
    } else {
      // Sign In / Sign Up
      if (!isSignInForm) {
        //Sign Up Login
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // console.log("Sign Up", user);
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: USER_AVATAR,
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayname: displayName,
                    photoURL: photoURL,
                  })
                );
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
            // ...
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

            setErrorMessage(
              errorMessage === "Firebase: Error (auth/email-already-in-use)."
                ? "User Already Exist! Please use SignIn."
                : ""
            );
            // ..
          });
      } else {
        // Sign In Logic
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Sign In", user);
            // ...
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setErrorMessage(
              errorMessage === "Firebase: Error (auth/invalid-credential)."
                ? "User Not Found!! Please Enter Correct Email or Password."
                : ""
            );
          });
      }
    }
  };
  return (
    <div>
      <Header />
      <div className=" absolute">
        <img
          className=" h-screen object-cover md:h-auto"
          src={BG_URL}
          alt="bg-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault(e)}
        className=" bg-black w-full md:w-1/3 absolute p-14 my-36 mx-auto right-0 left-0 text-white opacity-80 rounded-lg"
      >
        <h1 className=" text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="p-4 my-4 bg-gray-700 w-full rounded-sm"
            type="text"
            placeholder="Full Name"
          ></input>
        )}
        <input
          ref={email}
          className="p-4 my-4 bg-gray-700 w-full rounded-sm"
          type="text"
          placeholder="Email or phone number"
        ></input>
        <input
          ref={password}
          className="p-4 my-4 bg-gray-700 w-full rounded-sm"
          type="password"
          placeholder="Password"
        ></input>
        {errorMessage && (
          <p className=" text-red-400 text-lg py-2 font-bold">{errorMessage}</p>
        )}
        <button
          className=" p-4 my-6 bg-red-600 w-full rounded-md text-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? " Sign In" : " Sign Up"}
        </button>
        <p className=" py-4">
          <span className=" opacity-50">
            {!isSignInForm ? "Already Registered?" : "New to Netflix?"}
          </span>
          <button className=" hover:underline px-2" onClick={toggleSighInForm}>
            {!isSignInForm ? "Sign In now" : "Sign Up now"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
