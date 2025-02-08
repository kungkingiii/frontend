import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "./env";

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
      const res = await axios.post(`${URL}/register`, { username, name, email, phone, password });
      setMessage("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
      setTimeout(() => navigate("/login"), 2000); // รอ 2 วิ แล้วไปหน้า Login
    } catch (err) {
      console.log(err)
      setMessage("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>สมัครสมาชิก</h2>
      {message && <p style={{ color: message.includes("สำเร็จ") ? "green" : "red" }}>{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">สมัครสมาชิก</button>
      </form>
    </div>
  );
};

export default Register;
