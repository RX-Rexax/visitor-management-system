import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./checkOutStyle.css";

const CheckOut = () => {
  const { currentUser, dispatchAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/checkoutvisitor", {
        id: currentUser.id,
      });
      dispatchAuth({ type: "CHECK_OUT" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="checkOutContainer" key={currentUser.id}>
        <h1>Welcome!</h1>
        <div className="detail-container">
          <label>Full Name: </label>
          <div className="details">{currentUser.fullname}</div>
        </div>
        <div className="detail-container">
          <label>Contact No.: </label>
          <div className="details">{currentUser.contactno}</div>
        </div>
        <div className="detail-container">
          <label>Purpose of Visit: </label>
          <div className="details">{currentUser.purpose}</div>
        </div>
        <div className="detail-container">
          <label>Walk-In/Vehicle: </label>
          <div className="details">{currentUser.visited_with}</div>
        </div>
        <div className="detail-container">
          <label>Check-In Time: </label>
          <div className="details">{currentUser.check_in_time}</div>
        </div>
        <button className="checkOutButton" onClick={handleClick}>
          <p>Check out</p>
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
