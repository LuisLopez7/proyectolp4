import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Report.css'; // Importa tu archivo CSS de estilos personalizados

const Reporte = () => {
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { postId } = useParams();
    const navigate = useNavigate();

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar el reporte al administrador
        console.log(`Reportando post ${postId} por motivo: ${reason} con descripción: ${description}`);
        setSubmitted(true);
        setTimeout(() => navigate('/feed'), 3000); // Redirige a feed después de 3 segundos
    };

    return (
        <div className="report-container">
            <div className="report-card">
                <div className="report-header">Reportar</div>
                <div className="report-body">
                    {submitted ? (
                        <div className="report-alert">
                            Gracias por hacer de esta red social un lugar más seguro.
                            <i className="fas fa-check-circle"></i>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="report-label">¿Por qué quieres reportar esta publicación?</label>
                                <small className="report-text">Tu reporte es anónimo.</small>
                                <select
                                    value={reason}
                                    onChange={handleReasonChange}
                                    required
                                    className="report-select"
                                >
                                    <option value="">Selecciona un motivo</option>
                                    <option value="Violencia u organizaciones peligrosas">Violencia u organizaciones peligrosas</option>
                                    <option value="Información falsa">Información falsa</option>
                                    <option value="Estafa o fraude">Estafa o fraude</option>
                                    <option value="Bullying o acoso">Bullying o acoso</option>
                                    <option value="Infracción de la propiedad intelectual">Infracción de la propiedad intelectual</option>
                                    <option value="Drogas">Drogas</option>
                                    <option value="Desnudez">Desnudez</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                            {reason && (
                                <div className="form-group mt-3">
                                    <label className="report-label">Describa el motivo</label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        required
                                        className="report-textarea"
                                    />
                                </div>
                            )}
                            <button type="submit" className="report-btn">Enviar reporte</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reporte;
