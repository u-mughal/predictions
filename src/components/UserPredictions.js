import React from 'react';

/**
 * Composant UserPredictions pour afficher les prédictions des utilisateurs.
 * @param {Object} props - Props pour le composant UserPredictions.
 * @param {Array} props.predictions - Liste des prédictions des utilisateurs.
 * @returns {JSX.Element} JSX des prédictions des utilisateurs.
 */
const UserPredictions = ({ predictions }) => {
  return (
    <div>
      <h2>Prédictions</h2>
      {predictions.map((prediction, index) => (
        <div key={index}>
          <h3>Utilisateur: {prediction.user}</h3>
          {Object.entries(prediction.groups).map(([group, result]) => (
            <p key={group}>{group.toUpperCase()}: {result}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserPredictions;
