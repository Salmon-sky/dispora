import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/authAdminProposal.service";
// Image
import gambarHalamanLogin from "../../../asset/image/arsipSurat/loginArsipSurat.png";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
// Css
import "../../../css/arsipSurat/loginArsipSurat.css";

const LoginAdminProposal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    AuthService.login(username, password).then(
      (response) => {
        if(response.message === "Username atau Password Salah"){
          setMessage(response.message);
          setLoading(false);  
        }
        else if(response.message === "Log in Berhasil"){
          setLoading(false);
          navigate("/dashboard_admin_proposal"); 
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };
  return (
    <div className="container-fluid ps-md-0"> 
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-4 bg-image" style={{backgroundImage:`url(${gambarHalamanLogin})`}}></div>
        <div className="col-md-8 col-lg-8">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4 text-center">Login Admin</h3>  
                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <label htmlFor="username" className="label-login mb-1">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                      />
                    </div>
                    <label htmlFor="password" className="label-login mb-1">Password</label>
                    <div className="input-group mb-3">
                      <input
                        type={passwordType}
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                      />
                      <div className="input-group-btn">
                        <span className="btn default btn-eye" onClick={togglePassword}>
                        { passwordType==="password"? <Eye className="eye-password" /> :<EyeSlash/> }
                        </span>
                      </div>
                    </div>

                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}

                    <div className="d-grid">
                      <button className="btn btn-lg btn-login text-uppercase fw-bold mb-2" type="submit" disabled={loading}>
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
export default LoginAdminProposal;