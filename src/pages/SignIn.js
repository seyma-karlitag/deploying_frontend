import React, { useState } from "react";
import { useEffect } from "react";
import { Navbar } from "./../components";
import "./signin.css";

const bcrypt = require("bcryptjs");
let SERVER_HOST;

if (process.env.NODE_ENV === "development") {
  console.log("Development code build");
  SERVER_HOST = "http://localhost:3001";
} else {
  console.log("Production code build");
  SERVER_HOST = "http://188.166.10.60:3001";
}

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState(" ");
  const [auth, setAuth] = useState("unauthenticated");

  const [authMode, setAuthMode] = useState(1);
  //authMode = 1 for signIn,
  //authMode = 0 for signUp

  const handleLogin = async () => {
    console.log("Login button clicked.");
    const response = await fetch(`https://getinfluenced.onrender.com/api/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email, //use email as username for compatibility issues in passport.js
        password,
      }),
    });
    try {
      //TODO: server does not return json on response when not authenticated, do this properly
      const res = await response.json();
      console.log("Returned from /api/login: ", res);
      setAuth("authenticated");
      sessionStorage.setItem("session", JSON.stringify(res.data));
      window.location.href = "/";
    } catch (e) {
      console.log("Returned from /api/login: ", null);
      setAuth("invalid");
    }
  };

  const handleRegister = async () => {
    console.log("Register button clicked.");
    const response = await fetch(`https://getinfluenced.onrender.com/api/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        nickname: " ",
        email,
        password: password,
      }),
    });

    const result = await response.json();

    console.log("Returned from /api/register: ", result);
  };

  function Form(authMode) {
    return (
      <>
        <div className="Auth-form-container">
          <div className="form1">
            <div className="content">
              <h3 className="title">
              {authMode ? "Giriş Yap" : "Kayıt Ol"}
            </h3>

            {!authMode && (
              <>
                

                <div className="form-group mt-3">
                  <label>Adınız</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Adınızı Girin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
           

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            

            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="button-signin"
                onClick={authMode ? handleLogin : handleRegister}
              >
                {authMode ? "Giriş Yap" : "Kayıt Ol"}
              </button>
            </div>

            <div className="forgot-password-signin">
              <p className="text-center mt-2">
                <a href="ForgotPassword">Şifreni mi unuttun?</a>
              </p>
            </div>

            <div className="notregistered-signin">
              <span
                className="link-primary"
                onClick={() => {
                  setAuthMode(!authMode);
                }}
              >
                {authMode ? "Bir hesabın yok mu?" : "Bir hesabın var mı?"}
              </span>
            </div>

            {auth === "invalid" && (
              <div className="credentials-invalid">
                Kullanıcı adı veya şifre hatalı !
              </div>
            )}
            {auth === "authenticated" && (
              <div className="credentials-valid">Giriş başarılı !</div>
            )}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (authMode) return Form(1);
  else return Form(0);
}