import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { URL } from "./env";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [courses, setCouses] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get(`${URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data.userData)
        setCouses(res.data.userCouse)
      }
      )
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  console.log("this is user", user);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>


      <header id="header-top" class="header-top">
        <ul>

          {user ? (
            <div class="header-top-left">

              <li class="header-top-contact">
                <h1>Welcome! {user.username}</h1>
              </li>

            </div>
          )
            : (
              <div class="header-top-left">
                <li class="header-top-contact">
                  <Link to="/register">register</Link>
                </li>
                <li class="header-top-contact">
                  <Link to="/login" >login</Link>
                </li>

              </div>
            )}

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

      <section id="home" class="welcome-hero">
        <div class="container">

          <br></br>
          <div class="welcome-hero-txt">
            <div class="single-how-works-icon">
              <i class="flaticon-lightbulb-idea"></i>
            </div>
            <h2>{user.username} <br /> Profile</h2>
            <p>Username: {user.username}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
        <br></br>
      </section>
      <section id="works" class="works">
        <div class="container">
          <div class="section-header">
            <h2>Your courses</h2>
            <p>All your courses is here!</p>
          </div>
          <div class="works-content">
            <div class="row">
              {courses.map((course, id) => (
                <div class="col-md-4 col-sm-6" key={id}>
                  <div class="single-how-works">
                    <div class="single-how-works-icon">
                      <i class="flaticon-lightbulb-idea"></i>
                    </div>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <Link to={`/course/${course.id}`} >detail</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
      <button class="welcome-hero-btn" onClick={handleLogout}>
        Logout  <i data-feather="search"></i>
      </button>
    </div>
  );
};

export default Profile;
