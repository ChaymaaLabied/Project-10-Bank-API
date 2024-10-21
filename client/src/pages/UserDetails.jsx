import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserProfile, getUserDetails } from "../redux/features/slice";
import "../style/editForm.css";

export default function UserDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.counter.token);

  const currentUser = useSelector((state) => state.counter.user);
  const [isEditOn, setIsEditOn] = useState(false);
  const [editFirstName, setEditFirstName] = useState(currentUser?.firstName);
  const [editLastName, setEditLastName] = useState(currentUser?.lastName);

  const handleSave = () => {
    // je dois tt mettre dans une fct
    dispatch(
      editUserProfile({
        firstName: editFirstName,
        lastName: editLastName,
      })
    );
    setEditFirstName(""); // Vider le champ après la sauvegarde
    setEditLastName(""); // Vider le champ après la sauvegarde
    setIsEditOn(false); // Terminer l'édition
  };

  const handleCancel = () => {
    setEditFirstName("");
    setEditLastName("");
    setIsEditOn(false);
  };

  // PRIVATE ROUTE, SHOULD NOT ACCESS WITHOUT TOKEN

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

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
              <input
                type="text"
                className="input"
                id="firstname"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
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
              <input
                type="input"
                className="input"
                id="lastname"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />

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
