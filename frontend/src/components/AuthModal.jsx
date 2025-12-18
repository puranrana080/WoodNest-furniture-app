import { Modal, Box } from '@mui/material'
import { useState } from 'react'

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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {/* FORM */}
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded-md"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-md"
          />

          <button className="w-full bg-wood text-white py-2 rounded-md  bg-black ">
            {isLogin ? 'Login' : 'Register'}
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
