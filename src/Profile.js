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
      <h3>Profile</h3>
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button onClick={handleLogout}>Log out</button>
      <div style={{ padding: "20px" }}>
        <h1>Your courses</h1>
        {courses.map(course => (
          <div key={course.id} style={{ marginBottom: "10px" }}>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <Link to={`/course/${course.id}`} style={{ color: "blue" }}>ดูรายละเอียด</Link>
          </div>
        ))}
        <Link to={`/`} style={{ color: "blue" }}>all couses</Link>
      </div>
    </div>
  );
};

export default Profile;
