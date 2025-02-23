const temperatureEl = document.getElementById("temperature");
const moistureEl = document.getElementById("moisture");
const phEl = document.getElementById("ph");
const gasEl = document.getElementById("gas");

async function fetchSensorData() {
    try {
        let response = await fetch("http://your-arduino-ip/data"); // Replace with your Arduino IP
        let data = await response.json();
        
        temperatureEl.innerText = `${data.temperature} °C`;
        moistureEl.innerText = `${data.moisture} %`;
        phEl.innerText = `${data.ph}`;
        gasEl.innerText = `${data.gas} PPM`;

        updateChart(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

setInterval(fetchSensorData, 5000); // Refresh every 5 seconds

// Chart.js - Displaying live sensor data
const ctx = document.getElementById("sensorChart").getContext("2d");
const sensorChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Temperature (°C)",
                borderColor: "red",
                data: [],
            },
            {
                label: "Moisture (%)",
                borderColor: "blue",
                data: [],
            },
            {
                label: "pH Level",
                borderColor: "green",
                data: [],
            },
            {
                label: "Gas Levels (PPM)",
                borderColor: "orange",
                data: [],
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

function updateChart(data) {
    let time = new Date().toLocaleTimeString();
    let labels = sensorChart.data.labels;
    if (labels.length > 10) labels.shift();
    labels.push(time);

    sensorChart.data.datasets[0].data.push(data.temperature);
    sensorChart.data.datasets[1].data.push(data.moisture);
    sensorChart.data.datasets[2].data.push(data.ph);
    sensorChart.data.datasets[3].data.push(data.gas);

    sensorChart.update();
}
