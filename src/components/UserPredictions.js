import React from 'react';
import { usePredictions } from '../context/PredictionsContext';

/**
 * Composant UserPredictions pour afficher les prédictions des utilisateurs.
 * @param {Object} props - Props pour le composant UserPredictions.
 * @param {Array} props.predictions - Liste des prédictions des utilisateurs.
 * @returns {JSX.Element} JSX des prédictions des utilisateurs.
 */
const UserPredictions = () => {
  const { predictions } = usePredictions()

  const formatGroupName = (groupName) => {
    return groupName.replace(/(.+)(.)$/, '$1 $2').toUpperCase();
  };

  return (
    <div className='p-4 rounded-lg shadow-md max-w-xl mx-auto bg-white'>
      <h2 className='text-2xl font-bold mb-4 text-amber-500'>Prédictions</h2>
      {predictions.map((prediction, index) => (
        <div key={index} className='mb-6 p-4 border rounded-md bg-white'>
          <h3 className='text-lg font-semibold mb-2 text-black'>Utilisateur: {prediction.user}</h3>
          {Object.entries(prediction.groups).map(([group, result]) => (
            <div key={group} className='mb-4'>
              <h4 className='font-semibold mb-2 text-black'>{formatGroupName(group)}</h4>
              <div className='flex flex-wrap gap-2'>
                {result.map((country, i) => (
                  <span
                    key={i}
                    className='px-4 py-2 rounded-full border border-black text-black transition-colors duration-300'>
                    {country}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserPredictions;
