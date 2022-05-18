import{ useState, useEffect } from 'react'
import app from '../../lib/firebase'
import { Link } from 'react-router-dom'
import './Home.css'
import { toast } from 'react-toastify'

const Home = () => {
  const [ data, setData ] = useState({})
  const [ sortedData, setSortedData ] = useState([])
  const [ sort, setSort ] = useState(false)

  useEffect(() => { 
    app.child("Users").on("value", (snapshot) => {
        if (snapshot.val() !== null) { 
            setData({...snapshot.val()})
        } else { 
            setData({})
        }
    })

    return () => { 
        setData({})
    }
  }, [])

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) { 
        app.child(`Users/${id}`).remove((err) => { 
            if (err) { 
                toast.err(err)
            } else { 
                toast.success("User Deleted Successfully!")
            }
        })
    }
  }

  const handleChange = (e) => { 
    setSort(true)
    app.child("Users").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
        let sortedData = []
        snapshot.forEach((snap) => { 
            sortedData.push(snap.val())
        })
        setSortedData(sortedData)
    })
  }

  const handleReset = () => { 
    setSort(false)
    app.child("Users").on("value", (snapshot) => {
        if (snapshot.val() !== null) { 
            setData({...snapshot.val()})
        } else { 
            setData({})
        }
    })
  }

  const filterData = (value) => {
      app.child("Users").orderByChild("status").equalTo(value).on("value", (snapshot) => { 
          if (snapshot.val()) { 
              const data = snapshot.val()
              setData(data)
          }
      })
  }

  return <>
        <div className="box">
            <div style={{marginLeft: "2em"}}>
                <label>Sort By: </label>
                <select className="dropdown" name="colValue" onChange={handleChange}>
                    <option>Please Select</option>
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="email">E-mail</option>
                    <option value="country">Country</option>
                    <option value="contact">Contact</option>
                    <option value="status">Status</option>
                </select>
            
                <button className="btn btn-reset" onClick={handleReset}>Reset</button>
                <br/>
            </div>

            <div style={{marginRight: "2em"}}>
                <label>Status: </label>
                <button className="btn btn-active" onClick={() => filterData("Active")}>Active</button>
                <button className="btn btn-inactive" onClick={() => filterData("Inactive")}>Inactive</button>
            </div>
        </div>

        <div style={{marginTop: "100px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>
                            No.
                        </th>

                        <th style={{textAlign: "center"}}>
                            Name
                        </th>

                        <th style={{textAlign: "center"}}>
                            E-mail
                        </th>

                        <th style={{textAlign: "center"}}>
                            Age
                        </th>

                        <th style={{textAlign: "center"}}>
                            Country
                        </th>

                        <th style={{textAlign: "center"}}>
                            Contact Info
                        </th>

                        <th style={{textAlign: "center"}}>
                            Status
                        </th>
                        
                        { !sort && (
                            <th style={{textAlign: "center"}}>
                                Action
                            </th>
                        )}
                    </tr>
                </thead>
                { !sort && (
                    <tbody>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].email}</td>
                                    <td>{data[id].age}</td>
                                    <td>{data[id].country}</td>
                                    <td>{data[id].contact}</td>
                                    <td>{data[id].status}</td>
                                    <td>
                                        <Link to={`/update/${id}`}>
                                            <button className="btn btn-edit">Edit</button>
                                        </Link>

                                        <button 
                                            className="btn btn-delete"
                                            onClick={() => onDelete(id)}
                                        >
                                            Delete
                                        </button>

                                        <Link to={`/view/${id}`}>
                                            <button className="btn btn-view">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                )}
                { sort && (
                    <tbody>
                        { sortedData.map((item, index) => { 
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.age}</td>
                                    <td>{item.country}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                )}
                
            </table>
        </div>
    </>
}

export default Home