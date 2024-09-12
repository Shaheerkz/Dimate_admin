import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../context/Admin";
import ResturentTable from "../component/dashboard/ResturentTable";
import ResturentDummyTr from "../component/dashboard/ResturentDummyTr";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilter , faUpload , faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal} from "react-bootstrap";
import Profile from '../images/resturent-img.png'
import User from '../images/user.png'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";


function ResturentManagment() {


  const navigate = useNavigate()

  const [file, setFile] = useState(Profile);
  const [imageUrl, setImageUrl] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { adminData } = useContext(LoginContext);
  const [isFilter, setisFilter] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [resturentName, setresturentName] = useState("");
  const [resturentEmail, setresturentEmail] = useState("");
  const [resturentpass, setresturentpass] = useState("");
  const [resturentNumb, setresturentNumb] = useState("");

  let token = Cookies.get('token')





  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://backend.mydinemate.com/api/admin/listRestaurants",
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log(data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      console.log(error);
    }
  };


  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(adminData.token);
    

    const data = {
     restaurantName: resturentName,
  restaurantEmail: resturentEmail,
  restaurantPassword: resturentpass,
  restaurantImageUrl: file,
  restaurantNumber: resturentNumb
    };
    try {
     const result = await axios.post(
        "https://backend.mydinemate.com/api/admin/signupRestaurant", data ,
        {
          headers: {
            Accept: '/',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          
        }
      );

      console.log(result.data);
      handleClose()
      
    } catch (err) {
      console.log(err.message);
    }
  };

  const openFilter = () => {
    setisFilter(!isFilter);
  };

  const closeFilter = () => {
    setisFilter(!isFilter);
  };
  const handleUpload = async(e)=>{
    await setFile(URL.createObjectURL(e.target.files[0]));
    const url ='https://backend.mydinemate.com/api/upload/uploadToCloud'
    const formData = new FormData();
    formData.append('image', file)
    const res = await axios.post(url , formData ,{
      headers: {
        'Content-Type': 'multipart/form-data', 
        'accept': '*/*',
      }
    })

    // setImageUrl(res.data.result[0])
    console.log(res.data );
    
  }

  useEffect(() => {
    let cookie = Cookies.get('token')
    if(cookie){
      fetchUsers()
    }
    else{
      navigate('/')
    }
  }, []);
  return (
    <main>
      <h1>Resturent Managment</h1>
      <div className="date flex gap-2">
        <input
          type="input"
          name=""
          id=""
          className="py-3 w-[300px] px-10 rounded-md mr-2"
          placeholder="search..."
        />
        <button className="bg-[#2f007e] px-5 py-3 rounded-md text-white">
          Search
        </button>
      </div>
      <div className="insights">
        <div className="sales">
          <div className="middle">
            <div className="left">
              <h3>Total sales</h3>
              <h1>250</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>82%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">last 24 hours</small>
        </div>
        <div className="expenses">
          <div className="middle">
            <div className="left">
              <h3>Deliverd</h3>
              <h1>144</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>61%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">last 24 hours</small>
        </div>
        <div className="income">
          <div className="middle">
            <div className="left">
              <h3>Pending</h3>
              <h1>27</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>47%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">last 24 hours</small>
        </div>
      </div>
      <div className="row justify-between my-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <h3 className="text-4xl text-[#2f007e]">Resturent List</h3>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 relative">
          <div
            className={`bg-white shadow-lg w-full rounded-md p-4 absolute ${
              isFilter ? "block" : "hidden"
            }`}
            style={{ transition: "1s" }}
          >
            <div className="flex justify-between items-center">
              <p className="text-2xl">Filters</p>
              <button
                onClick={closeFilter}
                className="text-[#2f007e] bg-white p-2 flex items-center justify-center text-2xl rounded-lg shadow-lg"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center gap-1 text-xl">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                />
                <p>Active Resturent</p>
              </div>
              <div className="flex items-center gap-1 text-xl">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                />
                <p>Deactive Resturent</p>
              </div>
              <div className="flex items-center gap-1 text-xl">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                />
                <p>sort By Name</p>
              </div>
              <div className="flex items-center gap-1 text-xl">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                />
                <p>Sort By Time</p>
              </div>
              <p className="text-xl my-2">Modified :-</p>
              <div className="flex items-center gap-1 text-xl">
                <Form.Check // prettier-ignore
                  type={"radio"}
                  name="Modified"
                  label={"Deleted"}
                />
                <Form.Check // prettier-ignore
                  type={"radio"}
                  name="Modified"
                  label={"Edited"}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end ">
            <button
              onClick={openFilter}
              className="text-[#2f007e] bg-white p-2 text-2xl rounded-lg shadow-lg"
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <button
              onClick={handleShow}
              className="bg-[#2f007e] rounded-lg py-3 px-6 text-white"
            >
              Add Resturent
            </button>
          </div>
        </div>
      </div>
      <Table className="orders">
        <thead>
          <tr>
            <th className="py-2">Resturent name</th>
            <th className="py-2">Joining Date</th>
            <th className="py-2">Email</th>
            <th className="py-2">Status</th>
            <th className="py-2">opts</th>
          </tr>
        </thead>
        {data.length ? (
          data.map((res) => (
            <tbody>
              <ResturentTable
                td1={res.restaurantName}
                td2={res.createdAt}
                td3={res.restaurantEmail}
                td4={res.restaurantStatus}
              />
            </tbody>
          ))
        ) : (
          <ResturentDummyTr />
        )}
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Resturent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form className="flex flex-col gap-2" onSubmit={handleAdd}>
              <div>
              <div className="col-md-8 col-lg-9">
            <img src={file} className='h-[100px] w-[90px]' alt="Profile" />
            <div className="pt-2">
              <label
                className="btn btn-primary btn-sm"
                htmlFor="upload"
              >
                <FontAwesomeIcon icon={faUpload} />
              </label>
              <input type='file' required id='upload' name='upload' className='hidden' onChange={handleUpload}/>
              <button
                onClick={(e)=>{
                  e.preventDefault();
                  setFile(User)
                }}
                className="btn btn-danger btn-sm"
                title="Remove my profile image"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
              </div>
              <div>
                <Form.Label htmlFor="inputPassword5">Resturent Name</Form.Label>
                <Form.Control
                  type="text"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  value={resturentName}
                  required
                  onChange={(e)=>setresturentName(e.target.value)}
                />
              </div>
              <div>
                <Form.Label htmlFor="inputPassword3">Resturent Number</Form.Label>
                <Form.Control
                  type="text"
                  id="inputPassword3"
                  aria-describedby="passwordHelpBlock"
                  value={resturentNumb}
                  required
                  onChange={(e)=>setresturentNumb(e.target.value)}
                />
              </div>
              <div>
                <Form.Label htmlFor="inputPassword4">Resturent Email</Form.Label>
                <Form.Control
                  type="text"
                  id="inputPassword4"
                  aria-describedby="passwordHelpBlock"
                  value={resturentEmail}
                  onChange={(e)=>setresturentEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Form.Label htmlFor="inputPassword4">Resturent Password</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPassword4"
                  aria-describedby="passwordHelpBlock"
                  value={resturentpass}
                  onChange={(e)=>setresturentpass(e.target.value)}
                  required
                />
              </div>
               <div>
               <button
               type="submit"
              className="bg-[#2f007e] rounded-lg py-3 px-6 text-white"
            >
              Add Resturent
            </button>
               </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default ResturentManagment;
