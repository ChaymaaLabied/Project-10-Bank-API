import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  // Récupère les erreurs de connexion depuis le store Redux
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Récupère le token utilisateur depuis le store Redux
  const token = useSelector((state) => state.auth.token);

  // États locaux pour les champs du formulaire
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Gérer la soumission du formulaire de connexion
  const handleSubmit = () => {
    dispatch(
      login({
        username: username,
        password: password,
      })
    );
  };

  // Rediriger vers la page "user" si l'utilisateur est connecté (token présent)
  useEffect(() => {
    if (token) {
      navigate("/user");
    }
  }, [token, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              // Mettre à jour l'état avec la valeur saisie par l'utilisateur
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              // Mettre à jour l'état avec la valeur saisie par l'utilisateur
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* Afficher un message d'erreur si une erreur survient */}
          {error && <span>{error}</span>}
          <button
            type="button"
            className="sign-in-button"
            // Appel de la fonction handleSubmit lors du clic sur le bouton
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
