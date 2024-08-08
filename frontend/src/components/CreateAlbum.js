import React, { useState } from 'react';
import './CreateAlbum.css'; // Archivo CSS para estilos personalizados

const CreateAlbum = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null); // Estado para la foto actual seleccionada

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setCurrentPhoto(e.target.files[0]); // Guardar la foto seleccionada en el estado
  };

  const addPhoto = () => {
    if (currentPhoto) {
      setPhotos([...photos, currentPhoto]); // Agregar la foto actual al array de fotos
      setCurrentPhoto(null); // Limpiar la foto actual después de agregarla
    }
  };

  const deletePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1); // Eliminar la foto en el índice especificado
    setPhotos(updatedPhotos);
  };

  const saveAlbum = () => {
    // Aquí iría la lógica para guardar el álbum en la base de datos y asociarlo al perfil del usuario
    console.log('Álbum guardado:', { title, description, photos });
    // Podrías usar Axios o fetch para enviar los datos al backend
    // Luego, mostrar el álbum en el portafolio del usuario
    // Aquí podrías redirigir al usuario a su portafolio o mostrar un mensaje de éxito
  };

  return (
    <div
      className="create-album-container"
      style={{
        backgroundImage: 'url(/PRUEBA3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div className="create-album-card">
        <form className="create-album-form" onSubmit={(e) => e.preventDefault()}>
          <label className="create-album-label">
            Título del Álbum:
            <input
              className="create-album-input"
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </label>
          <label className="create-album-label">
            Descripción del Álbum:
            <textarea
              className="create-album-textarea"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </label>
          <label className="create-album-label">
            Fotos del Álbum:
            <input
              className="create-album-file-input"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
              required
            />
            <button
              type="button"
              className="add-photo-button"
              onClick={addPhoto}
            >
              Agregar Foto
            </button>
          </label>
          <div className="album-photos">
            {photos.map((photo, index) => (
              <div key={index} className="album-photo">
                <img
                  className="album-photo-preview"
                  src={URL.createObjectURL(photo)}
                  alt={`Foto ${index + 1}`}
                />
                <button
                  className="delete-photo-button"
                  onClick={() => deletePhoto(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <button className="save-album-button" onClick={saveAlbum}>
            Guardar Álbum
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbum;
