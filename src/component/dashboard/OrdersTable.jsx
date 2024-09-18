import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { LoginContext } from "../../context/Admin";
import ApiReviews from "./ApiReviews";
import DummyReviews from "./DummyReviews";
import axios from "axios";
import Insights from "./Insights";

function OrdersTable() {

  const {adminData , setuserData , userData} = useContext(LoginContext)
  const  [data, setData] = useState([]);
  const  [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://backend.mydinemate.com/api/admin/getUsers', {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${adminData.token}` 
        }
      });
      setData(response.data); 
      setuserData(response.data);
      console.log('api Data',data);
      setError(null);
    
    }
    catch (err) {
      setError(err.response ? err.response.data : err.message);
      console.log(error);
      
    }

    
}

  useEffect( () => {    
    fetchUsers()
  }, [])
  
  


  return (
      
      <main>
      <h1>Reviews Managment</h1>
      <Insights />
      <div className="row justify-between my-5">
          <div className="col-lg-6 col-md-8 col-sm-6">
          <h3 className="text-4xl text-[#2f007e]">Reviews</h3>
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
          </div>
          
            {/* <div className="col-lg-2 col-md-6 col-sm-6">
              <Link className="bg-[#2f007e] rounded-lg py-3 px-6 text-white">
                Add User
              </Link>
            </div> */}
          </div>
          <Table className="orders">
        <thead>
          <tr>
            <th className="py-2">name</th>
            <th className="py-2">Profile Rating</th>
            <th className="py-2">Profile Review</th>
            <th className="py-2">Email</th>
            <th className="py-2">Options</th>
          </tr>
        </thead>
        {
          data.lenght ? <tbody>
            {data.map((user)=>(<ApiReviews/>))}
          </tbody> : <DummyReviews/>
        }
    
      </Table>
  </main>
  );
}

export default OrdersTable;
