import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";

function ResturentTable(props) {
  const token = cookies.get("token");
  const [id, setid] = useState(null);

  const deletRes = async () => {
    const url = `https://backend.mydinemate.com/api/admin/deleteRestaurant`;
    if(id !== null){
      try {
        const res = await axios.delete('https://backend.mydinemate.com/api/admin/deleteRestaurant',
          {
            params: {
              restaurantId: id,
            },
            headers: {
              accept: "*/*",
              'Authorization': `Bearer ${token}`
            },
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    } 
  };

  return (
    <tr key={props.id}>
      <td className="py-2">{props.td1}</td>
      <td className="py-2">{props.td2}</td>
      <td className="py-2">{props.td3}</td>
      <td className="py-2">
        <span
          className={`${props.td4
              ? "border-green-700 w-fit p-2 rounded-full border-2 bg-[#14c80f73] text-center"
              : "border-red-600 w-fit p-2 rounded-full border-2 bg-[#ee0f0f66] text-center"
            }`}
        >
          {props.td4 ? "active" : "deactive"}
        </span>
      </td>
      <td>
        <button
          id={props.id}
          onClick={(e) => {
            console.log(e.target);
            setid(e.target.id);
            setTimeout(() => {
              deletRes();
            }, 2000)
          }}
          className="bg-red-600 rounded-lg px-3 py-2 text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ResturentTable;