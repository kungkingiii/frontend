import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "./env";
import "./assets/css/responsive.css"
import "./assets/css/style.css"
import "./assets/css/bootsnav.css"
import "./assets/css/bootstrap.min.css"
import "./assets/css/flaticon.css"
import "./assets/css/animate.css"
import "./assets/css/linearicons.css"
import "./assets/css/slick-theme.css"
import "./assets/css/slick.css"
import "./assets/css/font-awesome.min.css"

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [findCourse, setFindCourses] = useState("");
  useEffect(() => {
    axios.get(`${URL}/courses`)
      .then(response =>
        setCourses(response.data)

      )
      .catch(error => console.error("Error fetching courses:", error));

    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${URL}/userdata`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  console.log("userrrr", user, findCourse, courses);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${URL}/courses/`, {
        params: { search: findCourse },
      });
      console.log("coursessss", response)

      setCourses(response.data);
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
    }
  };
  const handleGet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${URL}/courses/`);
      console.log("coursessss", response)

      setCourses(response.data);
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
    }
  };
  return (
    <div>
      <header id="header-top" class="header-top">
        <ul>

          {user ? (
            <div class="header-top-left">

              <li class="header-top-contact">
                <h1>Welcome! {user.username}</h1>
              </li>
              <li class="header-top-contact">
                <Link to="/profile">profile</Link>
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
          <div class="welcome-hero-txt">
            <h2>best place to fine and leaning new skill <br /> that all you need </h2>
          </div>
          <div class="welcome-hero-serch-box">
            <div class="welcome-hero-form">
              <div class="single-welcome-hero-form">
                <input
                  type="text" placeholder="find your course"
                  value={findCourse}
                  onChange={(e) => setFindCourses(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="welcome-hero-serch">
              <form onSubmit={handleSearch}>
                <button class="welcome-hero-btn">
                  search  <i data-feather="search"></i>
                </button>
              </form>
            </div>
            <div class="welcome-hero-serch">
              <form onSubmit={handleGet}>
                <button class="welcome-hero-btn">
                  all courses  <i data-feather="search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

      </section>

      <section id="works" class="works">
        <div class="container">
          <div class="section-header">
            <h2>Our courses</h2>
            <p>Explore our courses here!</p>
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
                    <Link to={`/course/${course.id}`} >read more...</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default Home;
