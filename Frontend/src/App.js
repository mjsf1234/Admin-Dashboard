import "./App.css";
import axios from "./Components/Axios";
import { useEffect, useState } from "react";
import Login from "./Components/login";
import UserHomepage from "./Components/UserHomepage";
import Register from "./Components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PowerAdmin from "./Components/PowerAdmin";
import SuperAdmin from "./Components/SuperAdmin";
import PowerLogin from "./Components/PowerLogin";
import PowerRegister from "./Components/PowerRegister";
import SuperLogin from "./Components/SuperLogin";
import SuperRegister from "./Components/SuperRegister";

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  useEffect(() => {}, [loggedUser]);
  return (
    <div className="App">
      <Router>
        <Switch>
          {/*_____________ User Routes______________ */}
          <Route exact path="/">
            {loggedUser && loggedUser._id && loggedUser.type === "user" ? (
              <UserHomepage
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            ) : (
              <Login setLoggedUser={setLoggedUser} />
            )}
          </Route>

          <Route path="/login">
            <Login setLoggedUser={setLoggedUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          {/* ____Power admin routes_____*/}

          <Route path="/powerlogin">
            <PowerLogin setLoggedUser={setLoggedUser} />
          </Route>
          <Route path="/poweradmin">
            {loggedUser &&
            loggedUser._id &&
            loggedUser.type === "power_admin" ? (
              <PowerAdmin setLoggedUser={setLoggedUser} />
            ) : (
              // console.log("power admin logged in")
              <PowerLogin setLoggedUser={setLoggedUser} />
            )}
          </Route>
          <Route path="/powerregister">
            <PowerRegister />
          </Route>

          {/* ____Power admin routes_____*/}

          <Route path="/superlogin">
            <SuperLogin setLoggedUser={setLoggedUser} />
          </Route>

          <Route path="/superadmin">
            {loggedUser &&
            loggedUser._id &&
            loggedUser.type === "super_admin" ? (
              <SuperAdmin setLoggedUser={setLoggedUser} />
            ) : (
              <SuperLogin setLoggedUser={setLoggedUser} />
            )}
          </Route>
          <Route path="/superregister">
            <SuperRegister />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
