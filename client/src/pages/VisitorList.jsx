import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar/sidebar";

import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import "./visitorListStyle.css";
import { useNavigate } from "react-router-dom";

const VisitorList = () => {

  let navigate = useNavigate();

  const columns = [
    { field: "fullname", headerName: "Full Name", width: 140 },
    { field: "contactno", headerName: "Contact No.", width: 140 },
    {
      field: "purpose",
      headerName: "Purpose",
      width: 200,
    },
    { field: "visited_with", headerName: "Walk-In/Vehicle", width: 160 },
    { field: "check_in_time", headerName: "Check-In Time", width: 200 },
    {
      field: "check_out_time",
      headerName: "Check-Out Time",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];

  const handleCheckOut = async (id)=> {
    try {
      await axios.post("http://localhost:8800/checkoutvisitor", {
        id: id,
      });
      navigate("/visitorlist");
    } catch (err) {
      console.log(err);
    }
  };

  // Action Columns for View, Update and Delete
  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === "checked_in" ? (
              <div
                className="adminCheckOutButton"
                onClick={() => handleCheckOut(params.row.id)}
              >
                Check Out
              </div>
            ) : null}
          </div>
        );
      },
    },
  ];

  const [visitorData, setVisitorData] = useState([]);

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

  // when there is no data to be display in the table
  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No data found !
      </Stack>
    );
  }

  return (
    <div className="Container">
      <Sidebar />

      <div className="tableContainer">
        <h1>Visitor List</h1>
        <div className="datatable">
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={visitorData}
              columns={columns.concat(actionColumn)}
              autoPageSize
              isRowSelectable={() => false}
              disableColumnFilter
              disableColumnSelector
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-columnHeader":
                  { outline: "none" },
              }}
              components={{ NoRowsOverlay, Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default VisitorList;
