import React from "react";
import { useState } from "react";
import "./forgotPassword.css";





export default function ForgotPassword() {
  
  

  return (
    <div>
      <div className="container-forgotPassword">
        <form className="form-forgotPassword">
          <div className="contents-forgotPassword">
            <h3 className="title-forgotPassword"> Şifre Yenileme</h3>

            <div className="form-group mt-3">
              <label>Email adresi</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email adresinizi girin"
                
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="button-forgotPassword">
                Gönder
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}