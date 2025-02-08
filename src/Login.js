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
    <div style={{ padding: "20px" }}>
      <h2>เข้าสู่ระบบ</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">เข้าสู่ระบบ</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Login;
