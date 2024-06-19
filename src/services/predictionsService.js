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
 * @param {String} id - ID de l'utilisateur dont les prédictions doivent être effacées.
 * @returns {Array} Liste des prédictions mises à jour après suppression.
 */
export const clearPredictionsById = (generateId) => {

  const predictions = getPredictions();
  console.log(predictions);
  const updatedPredictions = predictions.filter(prediction => prediction.generateId !== generateId); 
  savePrediction(updatedPredictions);
  return updatedPredictions;
};
