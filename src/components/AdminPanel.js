import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePredictions } from '../context/PredictionsContext';

/**
 * Composant AdminPanel pour gérer les résultats réels, les délais et effacer les prédictions par utilisateur.
 * @param {Object} props - Props pour le composant AdminPanel.
 * @param {Function} props.onSetRealResults - Fonction pour définir de nouveaux résultats réels.
 * @param {Function} props.onSetDeadline - Fonction pour définir une nouvelle date limite.
 * @param {Object} props.realResults - Objet des résultats réels actuels.
 * @param {Object} props.deadline - Valeur actuelle de la date limite.
 * @returns {JSX.Element} JSX du composant AdminPanel.
 */
const AdminPanel = ({ onSetRealResults, onSetDeadline, realResults, deadline }) => {
  const [newResults, setNewResults] = useState(realResults);
  const [newDeadline, setNewDeadline] = useState(deadline);
  const [selectedUser, setSelectedUser] = useState('');
  const [id, setId] = useState("")
  const {predictions, clearPredictionsById} = usePredictions()
  /**
   * Gère le changement dans les champs d'entrée des résultats réels.
   * @param {Object} e - Objet de l'événement.
   */
  const handleResultsChange = (e) => {
    const { name, value } = e.target;
    setNewResults({
      ...newResults,
      [name]: value.split(', '),
    });
  };

  /**
   * Gère le changement dans le champ d'entrée de la date limite.
   * @param {Object} e - Objet de l'événement.
   */
  const handleDeadlineChange = (e) => {
    setNewDeadline(e.target.value);
  };

  /**
   * Gère la soumission du formulaire pour mettre à jour les résultats réels et la date limite.
   * @param {Object} e - Objet de l'événement.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSetRealResults(newResults);
    onSetDeadline(newDeadline);
  };

  /**
   * Gère l'effacement des prédictions pour l'utilisateur sélectionné.
   */
  const handleClear = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir effacer toutes les prédictions pour ${selectedUser} ?`)) {
      clearPredictionsById(id);
    }

    setId("")

  };



  return (
    <div>
      <h2>Panneau d'administration</h2>
      <NavLink to="/"> Accueil </NavLink>
      <NavLink to="/admin/panel">Panel Admin</NavLink>
      <form onSubmit={handleSubmit}>
        {Object.keys(newResults).map((group) => (
          <div key={group}>
            <label>{group.toUpperCase()}</label>
            <input
              type="text"
              name={group}
              value={newResults[group].join(', ')}
              onChange={handleResultsChange}
              required
            />
          </div>
        ))}
        <div>
          <label>Date limite</label>
          <input
            type="date"
            value={newDeadline}
            onChange={handleDeadlineChange}
            required
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
      <div>
        <label>Sélectionner l'utilisateur pour effacer les prédictions</label>
        <select value={id} onChange={(e) => setId(e.target.value)}> 
          <option value="" disabled>Sélectionner un utilisateur</option>
          {Array.from(new Set(predictions.map(p =>  (
            <option key={p.generateId} value={p.generateId}>{p.user}</option>
          ))))}
        </select>
        <button onClick={handleClear}>Effacer les prédictions de l'utilisateur</button>
      </div>
    </div>
  );
};

export default AdminPanel;
