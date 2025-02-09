import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "./env";

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

  console.log("userrrr", user);
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
      <div style={{ padding: "20px" }}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="find your course"
            value={findCourse}
            onChange={(e) => setFindCourses(e.target.value)}
            required
          /><button
            type="submit">search</button>
          <br /><br />

        </form>
        <form onSubmit={handleGet}>

          <button

            type="submit">all courses</button>
        </form>
      </div>
      <div style={{ padding: "20px" }}>
        <h1>Our courses</h1>
        {courses.map(course => (
          <div key={course.id} style={{ marginBottom: "10px" }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to={`/course/${course.id}`} style={{ color: "blue" }}>ดูรายละเอียด</Link>
          </div>
        ))}
      </div>
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

export default Home;
