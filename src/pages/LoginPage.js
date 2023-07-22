import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API_URL } from "../utils/constants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      /// Implementation
      // console.log('proceed');
      fetch(API_URL + "user/" + username) // Gunakan API_URL di sini
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          //console.log(resp)
          if (Object.keys(resp).length === 0) {
            alert("Please enter valid username");
          } else {
            if (resp.password === password) {
              alert("Success");
              history.push("/admin");
              sessionStorage.setItem('username', username);
            } else {
              alert("Please enter valid credentials");
            }
          }
        })
        .catch((err) => {
          alert("Login failed due to: " + err.message);
        });
    }
  };
  

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      /// Implementation
      // console.log('proceed');
      let inputObj = {
        username: username,
        password: password,
      };
      fetch("https://localhost:44308/User/Authenticate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputObj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            alert("Login failed, invalid credentials");
          } else {
            alert("Success");
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("jwttoken", resp.jwtToken);
            history.push("/admin");
          }
        })
        .catch((err) => {
          alert("Login failed due to: " + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      alert("Please enter username");
    }
    if (password === "" || password === null) {
      result = false;
      alert("Please enter password");
    }
    return result;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={proceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Admin Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>User Name</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;