import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // Nuevo archivo CSS para estilos personalizados

const SearchResults = ({ searchQuery }) => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    if (query) {
      fetchResults(query);
    }
  }, [location.search]);

  const fetchResults = (query) => {
    // Simular la búsqueda de fotografías por etiquetas
    const allPhotos = [
      {
        id: 1,
        image: 'prueba1.jpg',
        title: 'Nuevo Corte',
        description: 'Serenidad, Tranquilidad y paz',
        photographer: {
          id: 1,
          name: 'Pablito Morata',
          profileImage: '3135768.png',
          isVerified: false,
        },
        tags: ['belleza', 'tranquilidad', 'paz']
      },
      {
        id: 2,
        image: 'prueba2.jpg',
        title: 'Bendecida',
        description: 'Feliz inicio de semana',
        photographer: {
          id: 2,
          name: 'Martina Martini',
          profileImage: '3135768.png',
          isVerified: false,
        },
        tags: ['belleza', 'buenas vibras', 'semana']
      },
    ];
    
    const filteredResults = allPhotos.filter(photo => 
      photo.tags && photo.tags.includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div className="search-results-container">
      <h3>Resultados de búsqueda para "{searchQuery}"</h3>
      <div className="photo-grid">
        {results.map((photo, index) => (
          <div key={index} className="photo-card">
            <img src={photo.image} alt={photo.title} className="photo-image" />
            <div className="photo-info">
              <h4>{photo.title}</h4>
              <p>{photo.description}</p>
              <p className="photographer">
                Fotógrafo: <a href={`/perfil/${photo.photographer.id}`}>{photo.photographer.name}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
