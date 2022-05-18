import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import app from '../../lib/firebase'
import './Search.css'

const Search = () => {
  const [ data, setData ] = useState({})

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery()
  const search = query.get("name")

  useEffect(() => { 
    app.child("Users").orderByChild("name").equalTo(search).on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val()
        setData(data)
      }
    })
  }, [search])

  return (
    <>
      <div style={{marginTop: "100px"}}>
        <Link to="/">
          <button className="btn btn-edit">Go Home</button>
        </Link>
        { Object.keys(data).length === 0 ? (
          <h2>No user found with the name: {query.get("name")}</h2>
        ) : (
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

                  </tr>
              </thead>

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
                          </tr>
                      )
                  })}
              </tbody>
          </table>
        )}
      </div>
    </>
    
  )
}

export default Search