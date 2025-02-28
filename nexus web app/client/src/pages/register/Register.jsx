import React, { useState, useEffect } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate, useLocation } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [isService, setIsService] = useState(false); // State for toggling service options
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    isLogistics: false,
    desc: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSellerParam = params.get('isSeller');
    setUser((prevUser) => ({
      ...prevUser,
      isSeller: isSellerParam === 'true',
    }));
  }, [location.search]);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleServiceToggle = () => {
    setIsService((prev) => !prev);
    if (!isService) {
      setUser({ ...user, isSeller: false, isLogistics: false });
    }
  };

  const handleSeller = () => {
    if (user.isSeller) {
      setUser((prev) => ({
        ...prev,
        isSeller: false,
        isLogistics: false,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        isSeller: true,
        isLogistics: false,
      }));
    }
  };

  const handleLogistics = () => {
    if (user.isLogistics) {
      setUser((prev) => ({
        ...prev,
        isSeller: false,
        isLogistics: false,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        isSeller: false,
        isLogistics: true,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="img">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="country">Location</label>
          <input
            name="country"
            type="text"
            placeholder="Location"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          
         
          
          <label htmlFor="phone" className="phonenum">Phone Number</label>
          <input
            name="phone"
            
            type="text"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <label htmlFor="desc">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
