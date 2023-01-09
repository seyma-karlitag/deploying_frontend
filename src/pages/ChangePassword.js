import React from "react";
import "./changePassword.css";

export default function ChangePassword() {
  return (
    <div>
      <div className="container-changePassword">
        <div className="contents-changePassword">
          <h3 className="title-changePassword">Şifre Yenileme</h3>

          <div className="form-group mt-3">
            <label>Şifrenizi Girin</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Şifrenizi Girin"
            />
          </div>

          <div className="form-group mt-3">
            <label>Şifreyi Tekrar Giriniz</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Şifreyi Tekrar Giriniz"
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="button-forgotPassword">
              Değiştir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
