import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "./env";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    axios.get(`${URL}/courses/${id}`)
      .then(response => setCourse(response.data))
      .catch(error => console.error("Error fetching course details:", error));
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
  }, [id]);

  const handleRegister = async () => {
    // axios.post(`http://localhost:5000/courses/${id}/register`)
    //   .then(response => setMessage(response.data.message))
    //   .catch(error => console.error("Error registering:", error));


    try {
      const userData = await axios.post(`${URL}/courses/${id}/register`,
        { courseId: course.id, username: user.username });
      console.log("coursss userData", userData)
      setMessage("subscribe course is success!");
      setUser(userData.data);
    } catch (err) {
      setMessage("can not subscribe, Please Login before subscribe!");
    }
  };

  const handleStart = async () => {
    setMessage("start course");
  }

  console.log("coursss detail", course, user)
  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>

      <header id="header-top" class="header-top">
        <ul>

          {user ? (
            <div class="header-top-left">

              <li class="header-top-contact">
                <h1>Welcome! {user.username}</h1>
              </li>
              <li class="header-top-contact">
                <Link to="/profile">Your Courses</Link>
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
            <h2>{course.title} <br /> {course.description}</h2>
          </div>
        </div>
        <br></br>
      </section>
      <br></br>
      <p>{course.detail}</p>
      <h1>Study time</h1>
      <p>{course.time}</p>
      <h1>Price</h1>
      <p>{course.price}</p>
      {user && user.registered_courses.includes(course.id) ? (
        <button class="welcome-hero-btn" onClick={handleStart}>
          start course  <i data-feather="search"></i>
        </button>
      )
        : (

          <button class="welcome-hero-btn" onClick={handleRegister}>
            subscribe  <i data-feather="search"></i>
          </button>

        )}

      {message && <p style={{ color: "green" }}>{message}</p>}


    </div>
  );
};

export default CourseDetail;