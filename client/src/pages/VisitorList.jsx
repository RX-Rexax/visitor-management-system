import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./visitorListStyle.css";
import Datatable from "../components/Datatable/datatable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VisitorList = () => {
  const [visitorData, setVisitorData] = useState([]);
  const navigate = useNavigate();
  const { currentUser, dispatchAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllVisitors = async () => {
      try {
        const res = await axios.get("http://localhost:8800/visitors");
        setVisitorData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllVisitors();
  });

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    dispatchAuth({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="Container">
      <div class="sidebar">
        <a class="active" href="#home">
          Home
        </a>
        <a href="/" onClick={handleLogout}>Logout</a>
      </div>

      <div className="content">
        <div className="tableContainer">
          <h1>Visitor List</h1>
          <h3>Welcome {currentUser.username}!</h3>
          <div className="datatable">
            <Datatable data={visitorData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorList;
