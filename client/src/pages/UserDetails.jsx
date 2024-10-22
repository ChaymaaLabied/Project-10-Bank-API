import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserProfile, getUserDetails } from "../redux/features/slice";
import "../style/editForm.css";

export default function UserDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.counter.token);

  // Récupérer les détails de l'utilisateur depuis le store
  const currentUser = useSelector((state) => state.counter.user);

  // États locaux pour gérer les valeurs de l'édition des noms
  const [isEditOn, setIsEditOn] = useState(false); // Gérer l'état d'édition (actif ou non)
  const [editFirstName, setEditFirstName] = useState(currentUser?.firstName); // Prénom modifiable
  const [editLastName, setEditLastName] = useState(currentUser?.lastName); // Nom modifiable

  // Mettre à jour les champs d'édition quand currentUser est récupéré
  useEffect(() => {
    if (currentUser) {
      setEditFirstName(currentUser.firstName);
      setEditLastName(currentUser.lastName);
    }
  }, [currentUser]);

  // Fonction pour gérer la sauvegarde des modifications
  const handleSave = () => {
    dispatch(
      editUserProfile({
        firstName: editFirstName,
        lastName: editLastName,
      })
    );
    setIsEditOn(false); // Terminer l'édition après sauvegarde
  };

  // Fonction pour annuler l'édition et réinitialiser les champs
  const handleCancel = () => {
    setEditFirstName(currentUser?.firstName); // Réinitialiser le prénom
    setEditLastName(currentUser?.lastName); // Réinitialiser le nom
    setIsEditOn(false); // Fermer le mode édition
  };

  // Vérifier si l'utilisateur est authentifié (sinon, redirection vers l'accueil)
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Récupérer les détails de l'utilisateur 
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back</h1>
        {!isEditOn ? (
          <>
            <h2>
              {currentUser && (
                <>{`${currentUser.firstName} ${currentUser.lastName}`}!</>
              )}
            </h2>
            {/* Bouton pour activer le mode édition */}
            <button
              className="edit-button"
              onClick={() => {
                setIsEditOn(true);
              }}
            >
              Edit Name
            </button>
          </>
        ) : (
          <form className="content">
            <div className="col one-saveBtn">
              {/* Champ pour éditer le prénom */}
              <input
                type="text"
                className="input"
                id="firstname"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
              {/* Bouton de sauvegarde, désactivé si un champ est vide */}
              <button
                type="button"
                className={`edit-button formBtn ${
                  !editFirstName || !editLastName ? "edit-button-disabled" : ""
                }`} // Appliquer la classe si désactivé
                onClick={handleSave}
                disabled={!editFirstName || !editLastName} // Désactiver si un des champs est vide
              >
                Save
              </button>
            </div>
            <div className="col two-cancelBtn">
              {/* Champ pour éditer le nom */}
              <input
                type="input"
                className="input"
                id="lastname"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
              {/* Bouton pour annuler l'édition */}
              <button
                type="button"
                className="edit-button formBtn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {/* Sections pour afficher les comptes de l'utilisateur */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
