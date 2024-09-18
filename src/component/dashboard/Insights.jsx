import React , {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { LoginContext } from '../../context/Admin'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Insights() {
  const navigate = useNavigate()
    const {adminData} = useContext(LoginContext)
    const token = Cookies.get('token')

    const [data, setdata] = useState([])

    const fetchInsight = async () =>{
        const url="https://backend.mydinemate.com/api/admin/getTotalUsersandSubscribedUsers"

        const response = await axios.get(url, {
            headers : {
                accept: '*/*',
                'Authorization' : `Bearer ${token}`
            }
        })

       await setdata(response.data)
       
        
    }

    useEffect(() => {
        if(token){
          fetchInsight()
        }
        else{
          navigate('/')
        }
    }, []);

  return (
    <div className="insights">
    <div className="sales">
      <div className="middle">
        <div className="left">
          <h3>Total User</h3>
          <h1>{data.totalUsers}</h1>
        </div>
        <div className="progress">
          <svg>
            <circle cx="40" cy="40" r="36"></circle>
          </svg>
          <div className="number">
            <p>100%</p>
          </div>
        </div>
      </div>
      <small className="text-muted">last 24 hours</small>
    </div>
    <div className="expenses">
      <div className="middle">
        <div className="left">
          <h3>NonSuscribed User</h3>
          <h1>{data.nonSubscribedUsers}</h1>
        </div>
        <div className="progress">
          <svg>
          <circle cx="34" cy="41" r="32"></circle></svg>
          <div className="number">
            <p>99%</p>
          </div>
        </div>
      </div>
      <small className="text-muted">last 24 hours</small>
    </div>
    <div className="income">
      <div className="middle">
        <div className="left">
          <h3>Suscribed User</h3>
          <h1>{data.subscribedUsers}</h1>
        </div>
        <div className="progress">
          <svg>
            <circle cx="40" cy="50" r="32" stroke="blue"></circle>
          </svg>
          <div className="number">
            <p>1%</p>
          </div>
        </div>
      </div>
      <small className="text-muted">last 24 hours</small>
    </div>
  </div>
    )
}

export default Insights