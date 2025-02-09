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
      setMessage("register course");
      setUser(userData.data);
    } catch (err) {
      setMessage("can not register");
    }
  };

  const handleStar = async () => {
    setMessage("start course");
  }

  console.log("coursss detail", course)
  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.detail}</p>
      <p>{course.time}</p>
      <p>{course.price}</p>
      {user && user.registered_courses.includes(course.id) ? (
        <button onClick={handleStar}>start course</button>
      )
        : (

          <button onClick={handleRegister}>สมัครเรียน</button>

        )}

      {message && <p style={{ color: "green" }}>{message}</p>}
      <br></br>
      <Link to="/profile">Your Courses</Link>
      <br></br>
      <Link to="/home">Home</Link>
      {user ? (
        <p>Username: {user.username}</p>
      )
        : (

          <div style={{ padding: "20px" }}>
            <h1>ระบบสมัครสมาชิก & ล็อกอิน</h1>
            <nav>
              <Link to="/register" style={{ marginRight: "10px" }}>สมัครสมาชิก</Link>
              <Link to="/login" style={{ marginRight: "10px" }}>เข้าสู่ระบบ</Link>
              <Link to="/profile">โปรไฟล์</Link>
            </nav>

          </div>

        )}
    </div>
  );
};

export default CourseDetail;