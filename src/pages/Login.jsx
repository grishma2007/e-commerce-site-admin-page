import {  useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
 
  const addData = (e) => {
      e.preventDefault();
      console.log("Login button clicked"); 
  axios.post("https://e-commerce-backend-node-js-eyecore.vercel.app/login",
  { email, password },
  { withCredentials: true }
)
    .then(()=> {
      sessionStorage.setItem("isLoggedIn","true")
      navigate("/Info")
      
    })
      .catch(function (error) {
          console.log(error);
          alert("login Failed");
      });
  }
   return (<div className="auth-page">
      <div className="auth-card">
        <h2 className="heading">Login</h2>
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="user1@gmail.com"  value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="primary-btn" onClick={addData}>Login</button>
      </div>
    </div>
  )};

export default Login;