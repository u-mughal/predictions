import React, { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import { savePrediction, getPredictions, clearPredictionsById } from './services/predictionsService';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

/**
 * Application principale pour la prédiction de l'Euro 2024.
 * Gère l'état des prédictions, des résultats réels, de la date limite et les interactions avec l'utilisateur.
 * @returns {JSX.Element} JSX de l'application principale.
 */
const App = () => {
  const [predictions, setPredictions] = useState(getPredictions());
  const [realResults, setRealResults] = useState({
    groupeA: ['Allemagne', 'Ecosse', 'Hongrie', 'Suisse'],
    groupeB: ['Espagne', 'Croatie', 'Italie', 'Albanie'],
    groupeC: ['Slovénie', 'Danemark', 'Serbie', 'Angleterre'],
    groupeD: ['Pologne', 'Pays-Bas', 'Autriche', ' France'],
    groupeE: ['Belgique', 'Slovaquie', 'Roumanie', 'Ukraine'],
    groupeF: ['Turquie', 'Géorgie', 'Portugal', '(République) Tchéquie'],
  });
  const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Sauvegarde les prédictions dans le stockage local à chaque changement.
    savePrediction(predictions);
  }, [predictions]);



  /**
   * Met à jour les résultats réels des groupes.
   * @param {Object} results - Nouveaux résultats réels des groupes.
   */
  const handleSetRealResults = (results) => {
    setRealResults(results);
  };

  /**
   * Met à jour la date limite de soumission des prédictions.
   * @param {string} newDeadline - Nouvelle date limite au format ISO (YYYY-MM-DD).
   */
  const handleSetDeadline = (newDeadline) => {
    setDeadline(newDeadline);
  };

  /**
   * Efface les prédictions d'un utilisateur spécifique.
   * @param {string} user - Utilisateur dont les prédictions doivent être effacées.
   */
  const handleClearPredictionsById= (id) => {
    const updatedPredictions = clearPredictionsById(id);
    setPredictions(updatedPredictions);
  };

  return (


      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/admin/panel' element={ <AdminPanel 
        onSetRealResults={handleSetRealResults} 
        onSetDeadline={handleSetDeadline} 
        onClearPredictionsById={handleClearPredictionsById} 
        deadline={deadline}
        realResults={realResults}
        predictions={predictions}
      />} />
      </Routes>

  );
};

export default App;
