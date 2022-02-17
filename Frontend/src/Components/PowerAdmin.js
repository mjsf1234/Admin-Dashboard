import React, { useEffect, useState } from "react";
import axios from "./Axios";
import AdminTable from "./adminTable";

const PowerAdmin = ({ setLoggedUser }) => {
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
    await axios
      .get("/pstatusupdate", {
        params: { id: id, email: email, status: 1 },
      })
      .then((res) => {
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function declineHandler(id, email) {
    const newData = await axios.get("/pstatusupdate", {
      params: { id: id, email: email, status: -1 },
    });
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1> Power Admin </h1>
      {allUserDetails.length > 0 && (
        <AdminTable
          allUserDetails={allUserDetails}
          onApprove={approveHandler}
          onDecline={declineHandler}
          user={"power_admin"}
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
export default PowerAdmin;
