import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

function ChartComponent({ data, lineColor = 'rgba(75, 192, 192, 1)', backgroundColor = 'rgba(75, 192, 192, 0.2)' }) {
    useEffect(() => {
        const ctx = document.getElementById('grafico-vistas').getContext('2d');
        // Destruir el gráfico anterior si existe
        const existingChart = ChartJS.getChart('grafico-vistas');
        if (existingChart) {
            existingChart.destroy();
        }
        new ChartJS(ctx, {
            type: 'line',
            data: {
                ...data,
                datasets: data.datasets.map(dataset => ({
                    ...dataset,
                    borderColor: lineColor,
                    backgroundColor: backgroundColor
                }))
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                        beginAtZero: true,
                        grid: {
                            color: '#ccc'
                        },
                        ticks: {
                            color: '#fff'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#fff'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuad'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Gráfico de Vistas',
                        color: '#fff',
                        font: {
                            size: 20
                        }
                    }
                }
            }
        });
    }, [data, lineColor, backgroundColor]);

    return <canvas id="grafico-vistas" width="400" height="300"></canvas>;
}

export default ChartComponent;
