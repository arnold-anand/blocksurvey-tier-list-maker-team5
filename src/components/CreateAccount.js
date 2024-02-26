import React, { useState } from "react";
import { nhost } from "../lib/nhost";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await nhost.auth.signUp({
        email: email,
        password: password,
      });
      // Display alert upon successful signup
      window.alert("Account created successfully! You're now logged in");
      // Redirect to sign-in page
      navigate("/");
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl text-left">
          <span className="font-montserrat">Welcome to </span>
          <span className="font-abril-fatface">Tieron!</span>
        </div>

        <form action="" method="POST" onSubmit={handleSignup}>
          <div className="flex flex-col items-start justify-center mt-4">
            <label
              className="font-open-sans text-black text-opacity-50 text-[14px]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-black w-[470px] bg-opacity-[6%] h-[48px] rounded-[8px] p-3 mt-2"
              placeholder="Enter email address"
            />
          </div>
          <div className="flex flex-col items-start justify-center mt-4">
            <label
              className="font-open-sans text-black text-opacity-50 text-[14px]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-black w-[470px] bg-opacity-[6%] h-[48px] rounded-[8px] p-3 mt-2 font-open-sans"
              placeholder="New password"
            />
          </div>
          <button
            type="submit"
            className="mt-10 bg-black w-[470px] h-[48px] text-white rounded-[8px] font-open-sans font-bold"
          >
            Create Account
          </button>
        </form>
        <div className="mt-5 text-[14px]">
          <span className="text-black text-opacity-50 font-open-sans">
            Already have an account?{" "}
          </span>
          <span>
            <Link to="/" className="font-open-sans font-bold underline" href="">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
