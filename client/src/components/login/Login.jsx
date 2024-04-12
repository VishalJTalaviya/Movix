import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../store/auth";
import "../register/Register.css"
const URL = "http://localhost:7000/api/route/login"

const Login = () => {
  const [user , setUser] = useState({
    email: "",
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
    console.log("User:" , user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("Response:" , response);

      if (response.ok) {
        const login_data = await response.json();
        storeTokenInLS(login_data.token);
        setUser({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log("Error In Login : ", error);
    }
  };


  return (
    <div className="registration-container">
      <h1 className="heading">Login for Movix</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
