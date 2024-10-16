import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  chmicha: "kbida diali",
  error: "",
  token: "",
};

export const login = createAsyncThunk("api/logIn", async (argument) => {
  const result = await fetch("http://localhost:3001/api/v1/user/login", {
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
  if (data.status!==200) {
    throw new Error("Login failed!");
  }
  return data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    husband: (state, action) => {
      state.chmicha = action.payload;
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
      });
  },
});

// Action creators are generated for each case reducer function
export const { husband } = counterSlice.actions;

export default counterSlice.reducer;
