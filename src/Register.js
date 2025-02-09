import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { URL } from "./env";
// import "./assets2/css/bootstrap.css"
import "./assets2/css/style.css"
import "./assets2/css/style.css.map"
import "./assets2/css/responsive.css"


const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // เคลียร์ข้อความก่อนหน้า

    try {
      await axios.post(`${URL}/register`, { username, name, email, phone, password });
      setMessage("success! please login");
      setTimeout(() => navigate("/login"), 2000); // รอ 2 วิ แล้วไปหน้า Login
    } catch (err) {
      console.log(err)
      setMessage("username or email already exist!");
    }
  };
  console.log(username, name, email, phone, password)

  return (
    <div>
      <header id="header-top" class="header-top">
        <ul>
          <div class="header-top-left">
            <li class="header-top-contact">
              <Link to="/login" >login</Link>
            </li>
          </div>
        </ul>
      </header>
      <section class="top-area">
        <div class="header-area">
          <nav class="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
            <div class="container">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                  <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.html">Learning<span>Courses</span></a>
              </div>
              <div class="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                <ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                  <li class="scroll"> <Link to="/home">home</Link></li>
                  <li class="scroll"> <Link to="/home">about us</Link></li>
                  <li class="scroll"> <Link to="/home">contact us</Link></li>
                </ul>
              </div>

            </div>
          </nav>
        </div>
        <div class="clearfix"></div>
      </section>
      <section class="contact_section layout_padding-bottom">
        <div class="container">
          <div class="heading_container">
            <h2>
              Register
            </h2>
          </div>
          <div class="row">
            <div class="col-md-7">
              <div class="form_container">
                <form action="" onSubmit={handleRegister}>
                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="FullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />                  </div>
                  <div class="btn_box">
                    <button>
                      submit
                    </button>
                  </div>
                </form>
                {message && <p style={{ color: "green" }}>{message}</p>}

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Register;
