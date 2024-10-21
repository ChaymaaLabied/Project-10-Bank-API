import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  error: "",
  token: "",
  user: null,
};

const BASE_URL = "http://localhost:3001/api/v1/user";

export const login = createAsyncThunk("api/logIn", async (argument) => {
  const result = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email: argument.username,
      password: argument.password,
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await result.json();
  if (data.status !== 200) {
    throw new Error("Login failed!");
  }
  return data;
});

export const getUserDetails = createAsyncThunk(
    "api/userDetails",
    async (arg, { getState }) => {
      // Accessing the entire Redux state
      const state = getState();
  
      const response = await fetch(`${BASE_URL}/profile`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.counter.token}`,
        },
      });
      const data = await response.json();
      return data;
    }
  );
  //MODIFIER LES PROFILS
export const editUserProfile = createAsyncThunk(
    "api/editUserProfile",
    async ({ firstName, lastName }, { getState }) => {
      const state = getState();
  
      const response = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        body: JSON.stringify({
          firstName,
          lastName,
        }),
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.counter.token}`,
        },
      });
      const data = await response.json();
      return data;
    }
  );

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // il est ou l'action ou reducer !! dekht
  reducers: {
    logout: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.body.token;
        state.error = "";
      })
      .addCase(getUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.body;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.body;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = counterSlice.actions;

export default counterSlice.reducer;
