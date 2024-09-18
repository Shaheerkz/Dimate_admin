import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../../context/Admin";
import UserDummyRow from "./UserDummyRow";
import UserApiRow from "./UserApiRow";
import Insights from "./Insights";
import Cookies from 'js-cookie'


function UserTable() {


  const navigate = useNavigate()
  const {adminData , setuserData , storeToken} = useContext(LoginContext)
  let token = Cookies.get('token')
  let admin = Cookies.get('adminName')

 


  const  [isFilter, setisFilter] = useState(false);
  const  [data, setData] = useState([]);
  const  [error, setError] = useState("");



  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://backend.mydinemate.com/api/admin/getUsers', {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}` 
        }
      });
      await setuserData(response.data);
       await setData(response.data);        
      setError(null);
    
    }
    catch (err) {
      setError(err.response ? err.response.data : err.message);
      console.log(error);
      
    }

    
}

  useEffect(() => { 

    let cookie = Cookies.get('token')
    if(cookie){
      console.log(storeToken);
      console.log("adminName",admin);
      
      fetchUsers()
    }
    else{
      console.log(storeToken);
      navigate('/')
    }
      
  }, [])
 
  console.log("tokin aja  ",storeToken);
  




  const [currentPage, setCurrentPage] = useState(1); // current page state
  const usersPerPage = 20; // Number of users per page

  // Calculate the index range for users to be displayed
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / usersPerPage);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   


  const openFilter = () =>{
    setisFilter(!isFilter)
  }

  const closeFilter = ()=>{
    setisFilter(!isFilter)
  }
  return (
    


    <main>
      <h1>Dashboard</h1>
      
      <Insights/>
      <div className="row justify-between my-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <h3 className="text-4xl text-[#2f007e]">USERS <span className="text-sm">20 users per page</span></h3>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 relative">
          <div className={`bg-white shadow-lg w-full rounded-md p-4 absolute ${isFilter ? 'block' : 'hidden'}`} style={{transition:'1s'}}>
            <div className="flex justify-between items-center">
              <p className="text-2xl">Filters</p>
              <button onClick={closeFilter} className="text-[#2f007e] bg-white p-2 flex items-center justify-center text-2xl rounded-lg shadow-lg">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
            <div className="flex items-center gap-1 text-xl">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                />
                <p>Active User</p>
              </div>
              <div className="flex items-center gap-1 text-xl">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                />
                <p>Deactive User</p>
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
               <p className="text-xl my-2">Gender :-</p>
              <div className="flex items-center gap-1 text-xl">

                <Form.Check // prettier-ignore
                  type={"radio"}
                  name="gender"
                  label={"Male"}
                />
                <Form.Check // prettier-ignore
                  type={"radio"}
                  name="gender"
                  label={"Female"}
                />
                
                
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
          <div className="flex gap-2 justify-end " >
            <button onClick={openFilter} className="text-[#2f007e] bg-white p-2 text-2xl rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faFilter} />
            </button>
       
            {/* <Link className="bg-[#2f007e] rounded-lg py-3 px-6 text-white">
              Add User
            </Link> */}
          </div>
        </div>
      </div>
      <div className="date flex gap-2">
        <input
          type="email"
          name=""
          id=""
          className="py-3 w-[300px] px-10 rounded-md mr-2"
          placeholder="search  by email"
        />
        <button className="bg-[#2f007e] px-5 py-3 rounded-md text-white">
          Search
        </button>
      </div>
      <div className="flex gap-3 items-center my-2">
      <p>pages : </p>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
            className="bg-[#2f007e] text-white text-lg  h-[30px] w-[28px] flex items-center justify-center"
          >
            {i + 1}
          </button>
        ))}
      </div>
      </div>
      <div style={{overflowX : 'scroll'}}>
      <Table className="shadow-xl">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>Joined</th>
            {/* {data.length ? <th>Status</th> : <th colSpan={2}>Status</th>} */}
             <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        {data.length ? <tbody>
          {currentUsers.map((items, index) => (
              <UserApiRow
                index={indexOfFirstUser + index + 1}
                key={items._id}
                id={items._id}
                td1={items.name}
                td2={items.createdAt}
                td3={items.userStatus}
                td4={items.email}
              />
            ))}
        </tbody> : <UserDummyRow/>}
        
      </Table>
      </div>
     
    </main>
  );
}

export default UserTable;
