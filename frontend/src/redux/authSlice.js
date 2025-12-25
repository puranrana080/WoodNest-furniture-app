import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage
const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Load latest address from localStorage
const loadLatestAddressFromStorage = () => {
  try {
    const addr = localStorage.getItem("latestAddress");
    return addr ? JSON.parse(addr) : null;
  } catch {
    return null;
  }
};

// Save user to localStorage
const saveUserToStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Save latest address to localStorage
const saveLatestAddressToStorage = (addr) => {
  localStorage.setItem("latestAddress", JSON.stringify(addr));
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    user: loadUserFromStorage(),
    latestAddress: loadLatestAddressFromStorage(),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.latestAddress = action.payload.latestAddress;
      saveUserToStorage(action.payload.user);
      if (action.payload.latestAddress) saveLatestAddressToStorage(action.payload.latestAddress);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.latestAddress = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("latestAddress");
      localStorage.removeItem("cart");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
