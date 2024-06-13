/**
 * Sauvegarde les prédictions dans le stockage local.
 * @param {Array} predictions - Liste des prédictions à sauvegarder.
 */
export const savePrediction = (predictions) => {
  localStorage.setItem('predictions', JSON.stringify(predictions));
};

/**
 * Récupère les prédictions depuis le stockage local.
 * @returns {Array} Liste des prédictions récupérées.
 */
export const getPredictions = () => {
  return JSON.parse(localStorage.getItem('predictions')) || [];
};

/**
 * Efface les prédictions pour un utilisateur spécifique du stockage local.
 * @param {string} user - Utilisateur dont les prédictions doivent être effacées.
 * @returns {Array} Liste des prédictions mises à jour après suppression.
 */
export const clearPredictionsByUser = (user) => {
  const predictions = getPredictions();
  const updatedPredictions = predictions.filter(prediction => prediction.user !== user);
  savePrediction(updatedPredictions);
  return updatedPredictions;
};
