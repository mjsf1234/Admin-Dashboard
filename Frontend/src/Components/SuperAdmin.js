import React, { useEffect, useState } from "react";
import axios from "./Axios";
import AdminTable from "./adminTable";

const SuperAdmin = ({ setLoggedUser }) => {
  const [allUserDetails, setAllUserDetails] = useState([]);

  async function getData() {
    await axios
      .get("/getalldata", {})
      .then((res) => {
        setAllUserDetails(res.data);
      })
      .catch((e) => console.log(e));
  }

  async function approveHandler(id, email) {
    const newData = await axios.get("/sstatusupdate", {
      params: { id: id, email: email, status: 1 },
    });
    getData();
  }

  async function declineHandler(id, email) {
    await axios
      .get("/sstatusupdate", {
        params: { id: id, email: email, status: -1 },
      })
      .then((res) => {
        getData();
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="super-admin">
      <h1> Super Admin </h1>
      {allUserDetails.length > 0 && (
        <AdminTable
          allUserDetails={allUserDetails}
          onApprove={approveHandler}
          onDecline={declineHandler}
          user={"super_admin"}
        />
      )}
      <div>
        <button
          className="homepage-button"
          onClick={() => {
            setLoggedUser({});
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default SuperAdmin;
