import React, { useState } from 'react';
import { usePredictions } from '../context/PredictionsContext';

const countries = {
  groupeA: ['Allemagne', 'Ecosse', 'Hongrie', 'Suisse'],
  groupeB: ['Espagne', 'Croatie', 'Italie', 'Albanie'],
  groupeC: ['Slovénie', 'Danemark', 'Serbie', 'Angleterre'],
  groupeD: ['Pologne', 'Pays-Bas', 'Autriche', 'France'],
  groupeE: ['Belgique', 'Slovaquie', 'Roumanie', 'Ukraine'],
  groupeF: ['Turquie', 'Géorgie', 'Portugal', 'Tchéquie'],
}


const countryFlags = {
  Allemagne: 'https://flagcdn.com/w320/de.png',
  Ecosse: 'https://flagcdn.com/w320/gb-sct.png',
  Hongrie: 'https://flagcdn.com/w320/hu.png',
  Suisse: 'https://flagcdn.com/w320/ch.png',
  Espagne: 'https://flagcdn.com/w320/es.png',
  Croatie: 'https://flagcdn.com/w320/hr.png',
  Italie: 'https://flagcdn.com/w320/it.png',
  Albanie: 'https://flagcdn.com/w320/al.png',
  Slovénie: 'https://flagcdn.com/w320/si.png',
  Danemark: 'https://flagcdn.com/w320/dk.png',
  Serbie: 'https://flagcdn.com/w320/rs.png',
  Angleterre: 'https://flagcdn.com/w320/gb-eng.png',
  Pologne: 'https://flagcdn.com/w320/pl.png',
  'Pays-Bas': 'https://flagcdn.com/w320/nl.png',
  Autriche: 'https://flagcdn.com/w320/at.png',
  France: 'https://flagcdn.com/w320/fr.png',
  Belgique: 'https://flagcdn.com/w320/be.png',
  Slovaquie: 'https://flagcdn.com/w320/sk.png',
  Roumanie: 'https://flagcdn.com/w320/ro.png',
  Ukraine: 'https://flagcdn.com/w320/ua.png',
  Turquie: 'https://flagcdn.com/w320/tr.png',
  Géorgie: 'https://flagcdn.com/w320/ge.png',
  Portugal: 'https://flagcdn.com/w320/pt.png',
Tchéquie: 'https://flagcdn.com/w320/cz.png',
};

/**
 * Composant GroupForm pour saisir les prédictions d'un utilisateur.
 * @param {Object} props - Props pour le composant GroupForm.
 * @param {Function} props.onAddPrediction - Fonction pour ajouter une prédiction.
 * @param {string} props.deadline - Date limite pour soumettre les prédictions.
 * @returns {JSX.Element} JSX du formulaire de saisie des prédictions.
 */
const GroupForm = ({ deadline }) => {
  const formatGroupName = (groupName) => {
    return groupName.replace(/(.+)(.)$/, '$1 $2').toUpperCase()
  }

  const [user, setUser] = useState('');
  const [selectedCountries, setSelectedCountries] = useState({});
  const [totalSelections, setTotalSelections] = useState(0);
  const {addPrediction} = usePredictions()

  const [groups, setGroups] = useState({
    groupeA: '',
    groupeB: '',
    groupeC: '',
    groupeD: '',
    groupeE: '',
    groupeF: '',
  });

  const toggleCountrySelection = (group, country) => {
    const newSelections = { ...selectedCountries };
    const currentGroupSelection = newSelections[group] || [];

    console.log(group, country);
    if (currentGroupSelection.includes(country)) {
      newSelections[group] = currentGroupSelection.filter(c => c !== country)
      setTotalSelections(prevTotal => prevTotal - 1)
    } else {
      if (currentGroupSelection.length < 3 && totalSelections < 16) {
        newSelections[group] = [...currentGroupSelection, country]
        setTotalSelections(prevTotal => prevTotal + 1)
      }

    }

    setSelectedCountries(newSelections)
  }


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


    if (totalSelections !== 16) {
      return alert("Veuillez sélectionner 16 équipes")
    }

    const generateId = Math.floor(Math.random() * Date.now()).toString()

    addPrediction({ user, groups: selectedCountries, generateId });
  };

  return (
    
    <form onSubmit={handleSubmit} className='p-4 max-w-4xl mx-auto rounded-lg shadow-md'>
      <input
        type="text"
        name="user"
        placeholder="Utilisateur"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
        className='block w-full p-2 mb-4 border rounded-md'
      />
      {Object.keys(countries).map((group) => (
        <div key={group} className='mb-4'>
          <h3 className='font-semibold mb-2 text-lg'>{formatGroupName(group)}</h3>
          <div className='flex flex-nowrap gap-2 justify-between'>
            {countries[group].map((country, i) => (
              <button
              key={i}
              type="button"
              name={group}
              value={groups[group]}
              onClick={() => toggleCountrySelection(group, country)}
              required
              className={`relative flex items-center px-4 py-2 w-40 h-16 rounded-full border transition-colors duration-200 text-left overflow-hidden text-ellipsis whitespace-nowrap ${
                (selectedCountries[group] || []).includes(country)
                  ? 'border-green-800 text-green-950 bg-green-100 hover:border-orange-500 hover:text-orange-950 hover:bg-white'
                  : 'border-orange-500 text-orange-500 hover:border-green-500 hover:text-green-950'
              }`}
              style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
            >
              <div
                className="absolute top-0 left-0 h-full w-1/3 bg-cover bg-center transition-all duration-200 hover:w-2/3"
                style={{
                  backgroundImage: `url(${countryFlags[country]})`,
                }}
              ></div>
              <span className="ml-16">{country}</span>
            </button>

            ))}

          </div>

        </div>
      ))}
      <button type="submit" className='transition-colors duration-300 w-full bg-amber-500 text-white py-2 rounded-xl hover:bg-amber-600'>Soumettre la prédiction</button>
    </form>
  );
};

export default GroupForm;
