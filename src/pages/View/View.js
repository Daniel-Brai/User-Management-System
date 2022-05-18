import { useState, useEffect } from 'react'
import app from '../../lib/firebase'
import { useParams, Link } from 'react-router-dom'
import './View.css'

const View = () => {
  const [ user, setUser ] = useState({})

  const { id } = useParams()

  useEffect(() => {
    app.child(`Users/${id}`).get().then((snapshot) => { 
      if (snapshot.exists()) { 
        setUser({...snapshot.val()})
      } else { 
        setUser({})
      }
    })
  }, [id])

  // console.log(user)
  return (
    <div style={{marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>User Details</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />

          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />

          <strong>E-mail: </strong>
          <span>{user.email}</span>
          <br />
          <br />

          <strong>Age: </strong>
          <span>{user.age}</span>
          <br />
          <br />

          <strong>Country: </strong>
          <span>{user.country}</span>
          <br />
          <br />

          <strong>Phone No: </strong>
          <span>{user.contact}</span>
          <br />
          <br />

          <Link to="/">
            <button className="btn btn-edit">Go Home</button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default View