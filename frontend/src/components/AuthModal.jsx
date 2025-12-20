import { Modal, Box } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/authSlice'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE = "http://localhost:3000/api";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px'

}

const AuthModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isLogin) {
        const res = await axios.post(`${API_BASE}/auth/login`, { email: formData.email, password: formData.password })
        localStorage.setItem("token", res.data.token)
        dispatch(loginSuccess(res.data.user))
        toast.success('Logged in successfully')
        handleClose()
      } else {
        await axios.post(`${API_BASE}/auth/register`, formData)
        const res = await axios.post(`${API_BASE}/auth/login`, { email: formData.email,phone:formData.phone, password: formData.password })
        localStorage.setItem("token", res.data.token)
        dispatch(loginSuccess(res.data.user))
        toast.success('Registered and logged in successfully')
        handleClose()
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <button type="submit" disabled={loading} className="w-full bg-wood text-white py-2 rounded-md bg-black disabled:opacity-50">
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-wood font-medium ml-1"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </Box>
    </Modal>
  )
}

export default AuthModal
