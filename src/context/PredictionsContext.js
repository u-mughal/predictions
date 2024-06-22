import { createContext, useContext, useEffect, useState } from "react";

const PredictionsContext = createContext(null);

export const PredictionsProvider = ({children}) => {

const [predictions, setPredictions] = useState(() => {
    const savedPredictions  = localStorage.getItem('predictions');
    return savedPredictions ? JSON.parse(savedPredictions) : [];
})


useEffect(() => {

localStorage.setItem("predictions", JSON.stringify(predictions))

}, [predictions])

/**
 * Sauvegarde les prédictions dans le stockage local.
 * @param {Array} predictions - Liste des prédictions à sauvegarder.
 */
const addPrediction = (newPrediction) => {

    setPredictions([...predictions, newPrediction])
}


/**
 * Efface les prédictions pour un utilisateur spécifique du stockage local.
 * @param {String} id - ID de l'utilisateur dont les prédictions doivent être effacées.
 * @returns {Array} Liste des prédictions mises à jour après suppression.
 */
const clearPredictionsById = (generateId) => {
    const updatedPredictions = predictions.filter(prediction => prediction.generateId !== generateId); 
    setPredictions(updatedPredictions)
};

return (
    <PredictionsContext.Provider value={{ predictions, addPrediction, clearPredictionsById}}>
        {children}
    </PredictionsContext.Provider>
)

}

export const usePredictions = () => useContext(PredictionsContext)