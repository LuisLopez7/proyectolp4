import React, { useState, useEffect } from 'react';
import ChartComponent from './Chart'; 
import './App.css';

function Estadisticas() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [vistas, setVistas] = useState(0);
    const [likes, setLikes] = useState(0);
    const [comentarios, setComentarios] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Vistas',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    });

    const handleFiltrar = async () => {
        console.log(`Filtrar desde: ${fechaInicio} hasta: ${fechaFin}`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Estadisticas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
            const data = await response.json();
            setVistas(data.vistas);
            setLikes(data.likes);
            setComentarios(data.comentarios);
            setChartData({
                labels: data.labels,
                datasets: [{
                    label: 'Vistas',
                    data: data.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    useEffect(() => {
        const cargarEstadisticasIniciales = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Estadisticas`);
                const data = await response.json();
                setVistas(data.vistas);
                setLikes(data.likes);
                setComentarios(data.comentarios);
                setChartData({
                    labels: data.labels,
                    datasets: [{
                        label: 'Vistas',
                        data: data.values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error("Error al obtener los datos iniciales:", error);
            }
        };

        cargarEstadisticasIniciales();
    }, []);

    return (
        <section id="Estadisticas">
            <h2>Estadísticas de Publicaciones</h2>
            <div className="filtro-fechas">
                <label htmlFor="fecha-inicio">Desde:</label>
                <input type="date" id="fecha-inicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                <label htmlFor="fecha-fin">Hasta:</label>
                <input type="date" id="fecha-fin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                <button onClick={handleFiltrar}>Filtrar</button>
            </div>
            <div className="estadisticas-contenido">
                <div className="estadistica">
                    <h3>Total de Vistas</h3>
                    <p>{vistas}</p>
                </div>
                <div className="estadistica">
                    <h3>Total de "Me gusta"</h3>
                    <p>{likes}</p>
                </div>
                <div className="estadistica">
                    <h3>Total de Comentarios</h3>
                    <p>{comentarios}</p>
                </div>
            </div>
            <div className="graficos">
                <h3>Visualizaciones de Datos</h3>
                <ChartComponent data={chartData} />
            </div>
        </section>
    );
}

export default Estadisticas;
