import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Histogram = ({ data }) => {
    const chartData = {
        labels: data.months,
        datasets: [
            {
                label: "Validated",
                data: data.validated,
                backgroundColor: "#4CAF50",
                maxBarThickness: 50,
            },
            {
                label: "Pending",
                data: data.pending,
                backgroundColor: "#FFEB3B",
                maxBarThickness: 50,
            },
            {
                label: "Cancelled",
                data: data.cancelled,
                backgroundColor: "#F44336",
                maxBarThickness: 50,
            },
        ],
    };
    

    return (
        <div className="p-6">
            <Bar
                data={chartData}
                width={530}
                height={500}
                options={{
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => {
                                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                                },
                            },
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            stacked: true,
                            title: {
                                display: true,
                                text: "Number of Invoices",
                                font: {
                                    size: 16,
                                },
                            },
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 14,
                                }
                            },
                            stacked: true,
                            title: {
                                display: true,
                                text: "Months",
                                font: {
                                    size: 16,
                                },
                            },
                        },
                    },
                }}                
            />
        </div>
    );
};

export default Histogram;
