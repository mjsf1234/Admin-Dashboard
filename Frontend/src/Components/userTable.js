import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "reactstrap";
import { Button } from "react-bootstrap";

const DisplayTable = ({ sessionData, onDelete }) => {
  const statusHandler = (e) => {
    if (e.power_admin === "0" && e.super_admin === "0") {
      return <td>Hold</td>;
    }
    if (e.power_admin == "-1") {
      return <td>Rejected</td>;
    }
    if (e.power_admin === "1") {
      if (e.super_admin === "-1") {
        return <td>Rejected</td>;
      }
      if (e.super_admin === "1") {
        return <td>Approved</td>;
      } else {
        return <td>Hold</td>;
      }
    }
  };
  return (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Uploads</th>
          <th>power</th>
          <th>super</th>
          <th>Delete</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sessionData.map((e, i) => {
          return (
            <tr key={i}>
              <td>{e.id}</td>
              <td>{e.file}</td>
              <td>{e.power_admin.toString()}</td>
              <td>{e.super_admin.toString()}</td>
              <th>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    onDelete(e.id);
                  }}
                >
                  delete
                </Button>
              </th>
              {statusHandler(e)}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DisplayTable;
