import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  
  const validate = () => {
    let err = {};

    if (!name.trim()) err.name = "Name is required";
    else if (name.length < 3) err.name = "Name must be at least 3 characters";

    if (!email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      err.email = "Enter a valid email";

    if (!phone.trim()) err.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone))
      err.phone = "Phone must be 10 digits";

    if (!password.trim()) err.password = "Password is required";
    else if (password.length < 6)
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  
  const addData = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios.post("https://e-commerce-backend-node-js-eyecore.vercel.app/register", {
        name,
        email,
        phone,
        password,
      })
      .then((response) => {
        console.log(response);
        alert("REGISTER SUCCESSFUL");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        alert("REGISTER FAILED");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="heading">Sign UP!</h2>

        <div className="field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="field">
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}
        </div>

        <div className="btn-group">
          <button type="submit" className="primary-btn bn me-3" onClick={addData}>
            Submit
          </button>

          <Link to="/login">
            <button className="primary-btn bn">login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
