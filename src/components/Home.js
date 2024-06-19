import React, { useState, useEffect } from 'react';
import GroupForm from './GroupForm';
import UserPredictions from './UserPredictions';
import Results from './Results';
import { savePrediction, getPredictions } from '../services/predictionsService';
import {  NavLink } from 'react-router-dom';


const Home = () => {

    const [predictions, setPredictions] = useState(getPredictions());
    const [realResults] = useState({
      groupeA: ['Allemagne', 'Ecosse', 'Hongrie', 'Suisse'],
      groupeB: ['Espagne', 'Croatie', 'Italie', 'Albanie'],
      groupeC: ['Slovénie', 'Danemark', 'Serbie', 'Angleterre'],
      groupeD: ['Pologne', 'Pays-Bas', 'Autriche', ' France'],
      groupeE: ['Belgique', 'Slovaquie', 'Roumanie', 'Ukraine'],
      groupeF: ['Turquie', 'Géorgie', 'Portugal', '(République) Tchéquie'],
    });
    const [deadline] = useState(new Date().toISOString().split('T')[0]);
  
    useEffect(() => {
      // Sauvegarde les prédictions dans le stockage local à chaque changement.
      savePrediction(predictions);
    }, [predictions]);
  
    /**
     * Ajoute une nouvelle prédiction à la liste des prédictions.
     * @param {Object} newPrediction - Nouvelle prédiction à ajouter.
     */
    const handleAddPrediction = (newPrediction) => {

      setPredictions([...predictions, newPrediction]);
    };
  


    return (
        <>
            <h1>Application de Prédiction pour l'Euro 2024</h1>
            <NavLink to="/"> Accueil </NavLink>
            <NavLink to="/admin/panel">Panel Admin</NavLink>
            <GroupForm
                onAddPrediction={handleAddPrediction}
                deadline={deadline}
            />
            <UserPredictions predictions={predictions} />
            <Results predictions={predictions} realResults={realResults} />
            <NavLink to="/admin/panel">Aller sur le panel admin</NavLink>
        </>
    )
}


export default Home