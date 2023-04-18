import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import "./checkInStyle.css";

const CheckIn = () => {
  const [visitor, setVisitor] = useState({
    id: uuid(),
    fullname: "",
    contactno: "",
    purpose: "Interview",
    visited_with: "Walk-In",
    check_in_time: "",
  });

  const { dispatchAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVisitor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/addvisitor", visitor);

      let visitorData = {
        ...visitor,
        check_in_time: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      dispatchAuth({ type: "CHECK_IN", payload: visitorData });
      navigate("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="checkInContainer">
        <h1>Check In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Full Name: </label>
            <input
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              name="fullname"
              required
            />
          </div>
          <div className="input-container">
            <label>Contact No.: </label>
            <input
              type="text"
              placeholder="Contact No."
              onChange={handleChange}
              name="contactno"
              pattern="[0-9]+"
              title="Please Enter Phone Number"
              required
            />
          </div>
          <div className="input-container">
            <label>Purpose of Visit: </label>
            <select
              name="purpose"
              placeholder="purpose"
              onChange={handleChange}
            >
              <option value="Interview">Interview</option>
              <option value="Business Meeting">Business Meeting</option>
              <option value="Repairs & Maintenance">
                Repairs & Maintenance
              </option>
              <option value="Delivery">Delivery</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="input-container">
            <label>Walk-in/Vehicle: </label>
            <select
              name="visited_with"
              placeholder="Walk-in/Vehicle"
              onChange={handleChange}
            >
              <option value="Walk-In">Walk-In</option>
              <option value="Vehicle">Vehicle</option>
            </select>
          </div>
          <button type="submit" className="checkInButton">
            <p>Check In</p>
          </button>
          <div>
            <Link to="/login">
              <div className="linkToLogin">Login</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckIn;
