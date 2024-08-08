.update-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ececec00; /* Fondo transparente */
}

.update-form {
    background: rgba(241, 241, 241, 0); 
    padding: 0px;
    border-radius: 0px;
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.3);
    text-align: left;
    width: 350px;
    position: relative; /* Para permitir el posicionamiento absoluto de los botones */
}

.update-form h2 {
    margin-bottom: 20px;
    color: #333;
    text-align: center; /* Centrar el título */
}

.update-form label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

.update-form input[type="text"],
.update-form input[type="email"],
.update-form input[type="biografia"],
.update-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box; 
    font-size: 16px;
}

.update-form textarea {
    height: 100px;
}

.btn-update {
    display: inline-block;
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
}

.btn-update:hover {
    background-color: #0056b3;
}

/* Alinear los botones a la derecha */
.button-group {
    display: flex;
    justify-content: flex-end; /* Alinear a la derecha */
    margin-top: 20px; /* Espacio superior */
}

.button-group button {
    margin-left: 10px; /* Espacio entre los botones */
}

@media (max-width: 400px) {
    .update-form {
        width: 90%;
        padding: 20px;
    }
}
