import React from 'react';

/**
 * Composant Results pour afficher les résultats des prédictions par utilisateur.
 * @param {Object} props - Props pour le composant Results.
 * @param {Array} props.predictions - Liste des prédictions des utilisateurs.
 * @param {Object} props.realResults - Résultats réels attendus pour chaque groupe.
 * @returns {JSX.Element} JSX des résultats des prédictions.
 */
const Results = ({ predictions, realResults }) => {

  /**
   * Calcule le score d'une prédiction par rapport aux résultats réels.
   * @param {Object} prediction - Prédiction d'un utilisateur.
   * @returns {number} Score calculé pour la prédiction.
   */
  const calculateScore = (prediction) => {
    let score = 0;
    Object.keys(realResults).forEach((group) => {
      if (prediction.groups[group] === realResults[group].join(', ')) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div>
      <h2>Résultats</h2>
      {predictions.map((prediction, index) => (
        <div key={index}>
          <h3>Utilisateur: {prediction.user}</h3>
          <p>Score: {calculateScore(prediction)}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
