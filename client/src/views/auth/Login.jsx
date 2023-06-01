import React, { useState } from "react";
import canvas1 from "/src/assets/image/canvas1.gif";
import faGoogle from "/src/assets/image/google-48.png";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const googleProvider = new GoogleAuthProvider();

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      console.log(alert?.message);
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        name: res?.user.displayName,
        email: res?.user.email,
        profilePic: "",
      });

      localStorage.setItem("name", user?.name);
      localStorage.setItem("email", user?.email);
      //localStorage.setItem("profilePic", profilePic);

      setAlert({
        open: true,
        message: `Sign In Successful. Welcome ${user?.email}`,
        type: "success",
      });
      console.log(alert?.message);
    } catch (error) {
      setAlert({
        open: true,
        message: error?.message,
        type: "error",
      });
      console.log(alert?.message);
      return;
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        // const name = res.user.displayName;
        // const email = res.user.email;
        // const profilePic = res.user.photoURL;
        setUser({
          name: res.user.displayName,
          email: res.user.email,
          profilePic: res.user.photoURL,
        });
        console.log(res.user);

        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("profilePic", user.profilePic);
        setAlert({
          open: true,
          message: `Google Sign Up Successful. Welcome ${user?.email}`,
          type: "success",
        });

        console.log("login using google successful");
        console.log(alert?.message);
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        console.log(alert?.message);
        return;
      });
  };

  return (
    <div className="flex">
      <div className="md:w-1/2 md:p-8 flex flex-col mt-4 m-4">
        <div className="md:p-16 sm:p-8 p-0 lg:pl-36 lg:m-4 md:w-1/2 lg:p-16 pt-8 md:m-0 flex flex-col ">
          <h2 className="text-3xl mb-4 font-bold md:w-[400px]">Welcome Back</h2>
          <h4 className="mb-4 md:w-[400px] md:text-lg w-[300px] text-sm">
            "Welcome back! Please enter your details"
          </h4>

          {/* ------------------Inputs-------------------------- */}

          <form>
            <div className="flex flex-col mb-4">
              <p className="font-semibold md:w-[400px] md:text-lg w-[300px] text-sm">
                Email
              </p>
              <input
                className="md:w-[400px] w-[300px] border border-slate-600 rounded p-2"
                label="Email"
                placeholder="Enter your Email"
                type="email"
                value={email}
              />
            </div>

            <div className="flex flex-col mb-2 mt-8">
              <p className="font-semibold md:w-[400px] md:text-lg w-[300px] text-sm">
                Password
              </p>
              <input
                className="md:w-[400px] w-[300px] border border-slate-600 rounded p-2"
                label="Password"
                placeholder="Enter Password"
                type="password"
                value={password}
              />
            </div>
            <div className="md:w-[400px] w-[300px] text-sm flex flex-inline justify-between mt-2">
              <div>
                <label
                  htmlFor="rememberMe"
                  className="bg-transparent w-[150px] text-xs md:text-sm"
                >
                  <input className="mr-1" type="checkbox" id="rememberMe" />
                  Remember me
                </label>
              </div>
              <a className="md:w-[150px] md:text-sm text-xs text-purple-500 cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* --------------------Sign In Buttons------------------------------ */}

            <div className="flex flex-col">
              <button
                className="md:w-[400px] w-[300px] text-center text-lg font-medium mt-14 mb-4 mr-2 p-2 border rounded bg-purple-500 text-white"
                type="submit"
                onClick={handleLoginSubmit}
              >
                Sign in
              </button>
              <button
                className="md:w-[400px] w-[300px] shadow-md text-center text-lg font-medium mb-4 p-2 border rounded bg-white text-black"
                type="submit"
                onClick={signInWithGoogle}
              >
                <div className="flex justify-center">
                  <img src={faGoogle} alt="google-Icon" className="w-8" />
                  Sign In with Google
                </div>
              </button>
            </div>
          </form>
          <div className="">
            <p className="mt-4 md:w-[400px] w-[300px]">
              Don't have an account?
              <button className="ml-1 text-purple-500">
                <a href="./Signup">Signup</a>
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* -------------------Right Side Image------------------ */}

      <div className="hidden md:block ">
        <img src={canvas1} alt="canvas image" className="pt-40 h-auto w-auto" />
      </div>
    </div>
  );
};

export default Login;
