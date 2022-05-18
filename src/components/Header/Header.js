import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home")
  const location = useLocation()
  const navigate = useNavigate()
  const [ search, setSearch ] = useState("")

  useEffect(() => {
    if ( location.pathname === "/") { 
    setActiveTab("Home")
    } else if ( location.pathname === "/add") { 
        setActiveTab("AddUser")
    } else if ( location.pathname === "/about") {
        setActiveTab("About")
    }
  }, [location])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?name=${search}`)
    setSearch("")
  }
   
  return (
    <div className="header">
        <p className="logo" onClick={() => navigate("/") }>User Management System</p>
        <div className="header-right">

            <Link className='link' to='/'>
                <p 
                className={`${activeTab === "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
                >
                    Home
                </p>
            </Link>

            <Link to='/add'>
                <p 
                className={`${activeTab === "AddUser" ? "active" : ""}`}
                onClick={() => setActiveTab("AddUser")}
                >
                    Add User
                </p>
            </Link>

            <Link to='/about'>
                <p 
                className={`${activeTab === "About" ? "active" : ""}`}
                onClick={() => setActiveTab("About")}
                >
                    About
                </p>
            </Link>

            <form onSubmit={handleSubmit} >
                <input 
                    type="text" 
                    className="inputField" 
                    placeholder="Search Full Name..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </form>
            
        </div>
    </div>
  )
}

export default Header