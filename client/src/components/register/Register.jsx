import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import { useAuth } from "../../../store/auth";

const URL = "http://localhost:7000/api/route/register"
const Register = () => {
  const [user , setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user, 
      [name]: value 
    })
  }

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("User" , user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const reg_data = await response.json();
      console.log("Response From Server : ", reg_data);

      if (response.ok) {
        storeTokenInLS(reg_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
      } else {
        alert(reg_data.extraDetails);
      }
      console.log("Response" , response);
    } catch (error) {
      console.log("Error Is : ", error);
    }
  };

  return (
    <div className="container">
    <div className="registration-container">
      <h1 className="heading">Register for Movix</h1>
      <form onSubmit={handleSubmit} className="registration-form">
      {/* <form className="registration-form"> */}
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          id="phone"
          value={user.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  )
}

export default Register
