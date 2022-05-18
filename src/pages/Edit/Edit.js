import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import app from '../../lib/firebase'
import { toast } from 'react-toastify'
import './Edit.css'

const initailState = {
    name: "",
    email: "", 
    age: "",
    contact: "",
    country: "",
    status: "",
}

const Edit = () => {
  const [ state, setState ] = useState(initailState)
  const [ data, setData ] = useState({})

  const { name, email, age, contact, country, status } = state

  const navigate = useNavigate()

  const { id } = useParams()

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
  }, [id])

  useEffect(() => {
    if (id) {
        setState({...data[id]})
    } else { 
        setState({...initailState})
    }

    return () => { 
        setState({...initailState})
    }
  }, [id, data])

  const handleSubmit = (e) => {
    e.preventDefault()

    if ( !name || !email || !age || !contact || !country || !status ) {
        toast.error("Please provide valid crendentials in all the fields!")
    } else { 
        if (!id) { 
            app.child("Users").push(state, (err) => { 
                if (err) { 
                    toast.error(err)
                } else { 
                    toast.success("User Added Successfully!")
                }
            })
        } else { 
            app.child(`Users/${id}`).set(state, (err) => { 
                if (err) { 
                    toast.error(err)
                } else { 
                    toast.success("User Updated Successfully!")
                }
            })
        }

        setTimeout(() => navigate('/'), 500)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({...state, [name]: value})
  }

  return (
    <div style={{marginTop: '100px'}}>
        <form 
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter your Full name"
                value={name || ""}
                onChange={handleInputChange}
            />

            <label htmlFor="email">E-mail</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your Email address"
                value={email || ""}
                onChange={handleInputChange}
            />

            <label htmlFor="age">Age</label>
            <input 
                type="number" 
                id="age" 
                name="age" 
                placeholder="Enter your Age"
                value={age || ""}
                onChange={handleInputChange}
            />

            <label htmlFor="country">Country</label>
            <input 
                type="text" 
                id="country" 
                name="country" 
                placeholder="Enter your Country of Residence"
                value={country || ""}
                onChange={handleInputChange}
            />

            <label htmlFor="contact">Contact Info</label>
            <input 
                type="tel" 
                id="contact" 
                name="contact" 
                placeholder="Enter your Phone Number"
                value={contact || ""}
                onChange={handleInputChange}
            />

            <label htmlFor="status">Status</label>
            <input 
                type="text" 
                id="status" 
                name="status" 
                placeholder="Your Status"
                value={status || ""}
                onChange={handleInputChange}
            />

            <input type='submit' value={id ? "Update" : "Save"} />

        </form>
    </div>
  )
}

export default Edit