import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Table } from "reactstrap";

const AdminTable = ({ allUserDetails, onApprove, onDecline, user }) => {
  const [userData, setUserData] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (user == "power_admin") {
      const UserData = allUserDetails.map((element) => {
        return {
          ...element,
          uploads: element.uploads.filter(
            (subElement) => subElement.power_admin === "0"
          ),
        };
      });
      setUserData(UserData);
    } else {
      const UserData = allUserDetails.map((element) => {
        return {
          ...element,
          uploads: element.uploads.filter(
            (subElement) => subElement.super_admin === "0"
          ),
        };
      });
      setUserData(UserData);
    }
  }, [allUserDetails]);

  return (
    <div className="admintable">
      <Table hover className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Uploads</th>
            <th>Accept</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.email}</td>
                <td>
                  {user.uploads.map((img, i) => {
                    return <p key={i}>{img.file}</p>;
                  })}
                </td>
                <td>
                  {user.uploads.map((img, i) => {
                    return (
                      <div key={i} style={{ margin: "0.2rem" }}>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            onApprove(img.id, user.email);
                            setFlag(!flag);
                          }}
                        >
                          Accept
                        </Button>
                      </div>
                    );
                  })}
                </td>
                <td>
                  {user.uploads.map((img, i) => {
                    return (
                      <div key={i} style={{ margin: "0.2rem" }}>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            onDecline(img.id, user.email);
                            setFlag(!flag);
                          }}
                        >
                          Decline
                        </Button>
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default AdminTable;
