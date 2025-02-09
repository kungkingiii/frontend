import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { URL } from "./env";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // เคลียร์ error ก่อนหน้า

    try {
      const res = await axios.post(`${URL}/login`, { username, password });
      localStorage.setItem("token", res.data.token); // บันทึก Token ใน localStorage
      navigate("/profile"); // ไปที่หน้าโปรไฟล์
    } catch (err) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (

    <div>
      <header id="header-top" class="header-top">
        <ul>
          <div class="header-top-left">
            <li class="header-top-contact">
              <Link to="/register">register</Link>
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
              Login
            </h2>
          </div>
          <div class="row">
            <div class="col-md-7">
              <div class="form_container">
                <form action="" onSubmit={handleLogin}>
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
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div class="btn_box">
                    <button>
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>


  );
};

export default Login;
