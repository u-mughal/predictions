import React, { useState } from 'react';

/**
 * Composant GroupForm pour saisir les prédictions d'un utilisateur.
 * @param {Object} props - Props pour le composant GroupForm.
 * @param {Function} props.onAddPrediction - Fonction pour ajouter une prédiction.
 * @param {string} props.deadline - Date limite pour soumettre les prédictions.
 * @returns {JSX.Element} JSX du formulaire de saisie des prédictions.
 */
const GroupForm = ({ onAddPrediction, deadline }) => {
  const [user, setUser] = useState('');
  const [groups, setGroups] = useState({
    groupeA: '',
    groupeB: '',
    groupeC: '',
    groupeD: '',
    groupeE: '',
    groupeF: '',
  });

  /**
   * Gère le changement dans les champs d'entrée des groupes de prédictions.
   * @param {Object} e - Objet de l'événement.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroups({
      ...groups,
      [name]: value,
    });
  };

  /**
   * Gère la soumission du formulaire pour ajouter la prédiction.
   * Affiche une alerte si la date limite est dépassée.
   * @param {Object} e - Objet de l'événement.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const { groupeA, groupeB, groupeC, groupeD, groupeE, groupeF } = groups;

    // if (new Date() > new Date(deadline)) {
    //   alert('La date limite pour les prédictions est dépassée.');
    //   return;
    // }

    
    const groupsData = { groupeA, groupeB, groupeC, groupeD, groupeE, groupeF };

    for (let [key, value] of Object.entries(groupsData)){ 
      if(value.trim() === "") {
         return alert('Veuillez remplir tout les groupes')
      }
    }
      

    const generateId = Math.floor(Math.random() * Date.now()).toString()
    
    onAddPrediction({ user, groups, generateId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="user"
        placeholder="Utilisateur"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      {Object.keys(groups).map((group) => (
        <div key={group}>
          <label>{group.toUpperCase()}</label>
          <input
            type="text"
            name={group}
            value={groups[group]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Soumettre la prédiction</button>
    </form>
  );
};

export default GroupForm;
