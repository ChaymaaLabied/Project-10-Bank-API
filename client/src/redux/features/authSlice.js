import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// État initial pour la gestion de l'authentification
const initialState = {
  value: 0,
  error: "", // Message d'erreur en cas de problème
  token: "", // JWT token
  user: null, // Détails de l'utilisateur connecté
};

// URL de base pour les appels API
const BASE_URL = "http://localhost:3001/api/v1/user";

// Centralisation des headers avec ou sans token
// Cette fonction permet de réutiliser les mêmes headers dans différents appels API
const getHeaders = (token = "") => ({
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: token ? `Bearer ${token}` : "",
});

// Thunk pour la connexion (login)
export const login = createAsyncThunk("api/logIn", async (argument) => {
  const result = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email: argument.username,
      password: argument.password,
    }),
    headers: getHeaders(), // Utilisation de headers centralisés
  });

  // Traitement de la réponse
  const data = await result.json();
  if (data.status !== 200) {
    throw new Error("Login failed!"); // Gestion d'erreur en cas d'échec
  }
  return data; // Retourne les données si la connexion est réussie
});

// Thunk pour récupérer les détails utilisateur
export const getUserDetails = createAsyncThunk(
  "api/userDetails",
  async (arg, { getState }) => {
    // Récupère le token depuis le store Redux
    const state = getState();
    // Appel API pour récupérer les détails du profil
    const response = await fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: getHeaders(state.auth.token), // Envoie du token JWT dans les headers
    });
    const data = await response.json();
    return data;
  }
);

// Thunk pour modifier le profil utilisateur
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
      headers: getHeaders(state.auth.token),
    });
    const data = await response.json();
    return data;
  }
);

// Slice Redux pour gérer l'authentification
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.token = ""; // Réinitialise le token
      state.user = null; // Réinitialise l'utilisateur
    },
  },
  // Gestion des actions asynchrones (extraReducers)
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
    };

    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    };

    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.body.token;
        state.error = "";
      })
      .addCase(login.rejected, handleRejected)
      .addCase(getUserDetails.pending, handlePending)
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.body;
      })
      .addCase(getUserDetails.rejected, handleRejected)
      .addCase(editUserProfile.pending, handlePending)
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.body;
      })
      .addCase(editUserProfile.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
