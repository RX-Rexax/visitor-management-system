import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "./datatable.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Datatable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState(null);
  const [sortedField, setSortedField] = useState(null);

  let navigate = useNavigate();

  const handleCheckOut = async (id) => {
    try {
      await axios.post("http://localhost:8800/checkoutvisitor", {
        id: id,
      });
      navigate("/visitorlist");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    if (field === sortedField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
      setSortedField(field);
    }
  };

  const filteredData = data
    .filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortedField) {
        const aValue = a[sortedField];
        const bValue = b[sortedField];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
            : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
        } else {
          return aValue > bValue ? 1 : -1;
        }
      } else {
        return 0;
      }
    });
  return (
    <div className="table-container">
      <Form className="d-flex mb-3">
        <FormControl
          type="search"
          placeholder="Search"
          className="searchBar"
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr className="table-header">
            <th onClick={() => handleSort("fullname")}>Full Name</th>
            <th onClick={() => handleSort("contactno")}>Contact No.</th>
            <th onClick={() => handleSort("purpose")}>Purpose</th>
            <th onClick={() => handleSort("visited_with")}>Walk-In/Vehicle</th>
            <th onClick={() => handleSort("check_in_time")}>Check-In Time</th>
            <th onClick={() => handleSort("check_out_time")}>Check-Out Time</th>
            <th onClick={() => handleSort("status")}>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="table-row">
              <td>{item.fullname}</td>
              <td>{item.contactno}</td>
              <td>{item.purpose}</td>
              <td>{item.visited_with}</td>
              <td>{item.check_in_time}</td>
              <td>{item.check_out_time}</td>
              <td>{item.status}</td>
              {item.status === "checked_in" ? (
                <td>
                  <div
                    className="adminCheckOutButton"
                    onClick={() => handleCheckOut(item.id)}
                  >
                    checkout
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Datatable;
