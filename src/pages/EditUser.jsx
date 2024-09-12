import React, { useCallback, useEffect, useState  , useLayoutEffect} from "react";
import profile from ".././images/user.png";
import { Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../context/Admin";
import Cookies from 'js-cookie'
function EditUser() {


  const navigate = useNavigate()
  let token = Cookies.get('token')
  const {adminData } = useContext(LoginContext);

  const { userId } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [name, setname] = useState(data.name);
  const [last, setlast] = useState();
  const [email, setemail] = useState();
  const [numb, setnumb] = useState("91 313 4556");
  const [img  , setimg] = useState(profile);
  const [address, setaddress] = useState("street no : 124 abc town ,  usa");


  const fetchData = async()=>{
    const response = await axios.get('https://backend.mydinemate.com/api/admin/getUsers', {
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}` 
      }})

      const data = response.data

      const res = await data.find((user)=>user._id === userId)
      console.log(res);
      setData(res)
      setname(res.name)
      setemail(res.email)
      setnumb(res.number)
      setaddress(res.userLocation)
      setlast(res.profileInfo.userNickName)

      
  }

  useEffect(() => {
    let cookie = Cookies.get('token')
    if(cookie){
      fetchData()
    }
    else{
      navigate('/')
    }


  }, []);


  return (
    <main>
      <Link className="bg-[#2f007e] text-white rounded-md shadow-lg px-5 py-3 my-3 block w-fit" to={'/user'}>back</Link>
      <h1>Edit User</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 my-3">
        <div className="row items-center">
          <div className="col-lg-4 col-sm-12">
            <img
              src={img}
              width={100}
              height={130}
              alt="+"
              className="rounded-full broder-[#2f007e] border-2"
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-sm-12">
            <Form.Label htmlFor="name" className="text-2xl">
              first name
            </Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby="passwordHelpBlock"
              className="py-3 text-xl"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="col-lg-6 col-sm-12">
            <Form.Label htmlFor="name" className="text-2xl">
              last name
            </Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby="passwordHelpBlock"
              className="py-3 text-xl"
              value={last}
              onChange={(e) => setlast(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-lg-6 col-sm-12">
            <Form.Label htmlFor="name" className="text-2xl">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              id="name"
              aria-describedby="passwordHelpBlock"
              className="py-3 text-xl"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="col-lg-6 col-sm-12">
            <Form.Label htmlFor="name" className="text-2xl">
              phone number
            </Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby="passwordHelpBlock"
              className="py-3 text-xl"
              value={numb}
              onChange={(e) => setnumb(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12">
            <Form.Label htmlFor="name" className="text-2xl">
              Address
            </Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby="passwordHelpBlock"
              className="py-3 text-xl "
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
        </div>
        <div className="row items-center">
          <div className="col-lg-6 col-sm-12">
            <Form.Label htmlFor="name" className="text-2xl">
              Status
            </Form.Label>
            <Form.Select aria-label="Default select example" className="py-4">
              <option value="1" defaultChecked>
                Active
              </option>
              <option value="2">Deactive</option>
            </Form.Select>
          </div>
          <div className="col-lg-6 col-sm-12">
            <button className="bg-[#2f007e] text-white rounded-md shadow-lg px-5 py-4 mt-[35px]  w-full ">
              Update
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditUser;
