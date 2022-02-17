import React, { useEffect, useState } from "react";
import "./UserHomepage.css";
import axios from "./Axios";
import DisplayTable from "./table";

const UserHomepage = ({ loggedUser, setLoggedUser }) => {
  const INIT_UPLOAD_DATA = {
    id: "",
    file: "",
    power_admin: "0",
    super_admin: "0",
  };

  const [selectedImg, setSelectedImg] = useState(INIT_UPLOAD_DATA);
  const [sessionData, setSessionData] = useState([]);

  async function getData() {
    await axios
      .get("/getdata", {
        params: { email: loggedUser.email },
      })
      .then((res) => {
        setSessionData(res.data[0].uploads);
      })
      .catch((e) => console.log(e));
  }

  const selectedImgHandler = (e) => {
    setSelectedImg((prev) => {
      return { ...prev, file: e.target.value, id: Math.random().toString() };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const temp_User_data = {
      email: loggedUser.email,
      uploads: selectedImg,
    };
    axios
      .post("/uploads", temp_User_data)
      .then((response) => {
        getData();
      })
      .catch((e) => console.log("error" + e));
  };
  //deleting the booking
  async function deleteHandler(id) {
    const newData = await axios.get("/delete", {
      params: { id: id, email: loggedUser.email },
    });
    getData();
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="homepage">
      <h1>Homepage</h1>
      <div>
        <p>Welcome {loggedUser.name}</p>
        <p>Email {loggedUser.email}</p>
      </div>

      <form onSubmit={submitHandler}>
        <input type="file" onChange={selectedImgHandler}></input>
        <br></br>
        <br></br>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>

      <br></br>

      {sessionData.length > 0 && (
        <div style={{ width: "90%" }}>
          <h2>Uploded Datas</h2>
          <DisplayTable sessionData={sessionData} onDelete={deleteHandler} />
        </div>
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
      <div></div>
    </div>
  );
};

export default UserHomepage;
