import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './UploadPhoto.css';

const UploadPhoto = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para subir la imagen a tu backend

    // Simulamos una subida exitosa
    setUploadSuccess(true);
    setTitle('');
    setDescription('');
    setSelectedTags([]);
    setImage(null);
  };

  const handleTagSelection = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  const tagsOptions = [
    'Naturaleza',
    'Autos',
    'Deportes',
    'Belleza',
    'Pintura',
    'Arquitectura',
    'Comida',
    'Viajes',
    'Moda',
    'Animales',
  ];

  const navigateToAlbumCreation = () => {
    // Navega a la ruta para crear álbum
    navigate('/create-album');
  };

  return (
    <div
      className="upload-photo-container"
      style={{
        backgroundImage: 'url(/PRUEBA3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="upload-photo-card">
        <form className="upload-photo-form" onSubmit={handleSubmit}>
          <div className="upload-section">
            <label className="upload-label">
              Título:
              <input
                className="upload-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label className="upload-label">
              Descripción:
              <textarea
                className="upload-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label className="upload-label">
              Etiquetas:
              <div className="tags-dropdown">
                <button
                  type="button"
                  className="tags-toggle-button"
                  onClick={() => setShowTags(!showTags)}
                  style={{ display: 'block', margin: '0 auto' }} // Centra el botón
                >
                  Seleccionar Etiquetas
                </button>
                {showTags && (
                  <div className="tags-container">
                    {tagsOptions.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                        onClick={() => handleTagSelection(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </label>
            <label className="upload-label">
              Imagen:
              <input
                className="upload-file-input"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                required
              />
            </label>
          </div>
          <button className="upload-button" type="submit">Subir</button>
        </form>
        {uploadSuccess && (
          <p className="upload-success">¡Fotografía subida con éxito!</p>
        )}
        <div className="create-album-link">
          <button className="create-album-button" onClick={navigateToAlbumCreation}>
            ¿Desea crear un álbum?
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
