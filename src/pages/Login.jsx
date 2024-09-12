import React, { useState } from "react";
import Logo from "../images/logo.jpeg";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../context/Admin";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import LogoMain from '../images/logo.jpeg'
import Cookies from 'js-cookie'

function Login() {
  const navigate = useNavigate();
  const { adminData, setAdminData } = useContext(LoginContext);

  const [Email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://backend.mydinemate.com/api/admin/login";
    const data = {
      email: Email,
      password: pass,
    };
    try {
      const result = await axios.post(url, data, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      await setAdminData(result.data);
    

      localStorage.setItem('token' , true)
      
      console.log(adminData.adminImageUrl);

      Cookies.set('token' , result.data.token , {expires : 1})
      Cookies.set('adminEmail' , Email, {expires : 2})
      Cookies.set('adminPass' , pass, {expires : 2})
      setError(null);
      navigate("/user");
    } catch (error) {
      setError(true);
      setData(null);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="container">
        <div className="row justify-center">
          <div className="col-12">
          <img src={LogoMain} alt="" className="main_logo" />
          </div>
          <div className="col-lg-5 col-sm-12">
            <div className={`h-200px ${error ? 'block' : 'hidden'}`}>
              <Alert variant="danger">
                <h2>Invalid Credentials</h2>
              </Alert>
            </div>
            <form
              className="bg-white p-4 rounded-lg shadow-lg"
              onSubmit={handleSubmit}
            >
              <div className="logo  ">
                <h3 className="text-center text-3xl">Login</h3>
                <Form.Label className="text-xl mt-3" htmlFor="inputPassword5">
                  Email
                </Form.Label>
                <Form.Control
                  className="py-2 px-3"
                  type="email"
                  id="inputPassword5"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="passwordHelpBlock"
                />
                <Form.Label className="text-xl mt-3" htmlFor="inputPassword5">
                  Password
                </Form.Label>
                <Form.Control
                  className="py-2 px-3"
                  type="password"
                  id="inputPassword5"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  aria-describedby="passwordHelpBlock"
                />
                <button
                  type="submit"
                  className="bg-[#2f007e] py-2 px-5 w-full rounded mt-4 text-xl text-white"
                >
                  Login
                </button>
              </div>
            </form>
            {/* <p className="text-center text-lg mt-4">
              don't have account -{" "}
              <Link to={"#"} className="text-[#2f007e]  ">
                Sign up
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
