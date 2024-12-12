// Chart configuration function
function createChartConfig(label, color) {
    return {
        type: "line",
        data: {
            labels: Array.from({ length: 10 }, (_, i) => `T-${10 - i}`),
            datasets: [
                {
                    label: label,
                    borderColor: color,
                    backgroundColor: `${color}1A`,
                    data: Array.from({ length: 10 }, () => Math.random() * 100),
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Time" } },
                y: { title: { display: true, text: "Usage" } },
            },
        },
    };
}

// Initialize charts for electricity, water, and gas
const electricityCtx = document.getElementById("electricityChart").getContext("2d");
const waterCtx = document.getElementById("waterChart").getContext("2d");
const gasCtx = document.getElementById("gasChart").getContext("2d");

const electricityChart = new Chart(electricityCtx, createChartConfig("Electricity Usage (kWh)", "#0073e6"));
const waterChart = new Chart(waterCtx, createChartConfig("Water Usage (Liters)", "#34c759"));
const gasChart = new Chart(gasCtx, createChartConfig("Gas Usage (m³)", "#ff3b30"));

// Update chart data periodically
function updateChart(chart) {
    const newData = Math.random() * 100;
    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(newData);
    chart.update();
}

// Real-time updates
function updateRealTimeData() {
    updateChart(electricityChart);
    updateChart(waterChart);
    updateChart(gasChart);
}

setInterval(updateRealTimeData, 3000); // Update every 3 seconds


function updateRealTimeTips() {
    const electricityUsage = electricityChart.data.datasets[0].data.at(-1);
    const waterUsage = waterChart.data.datasets[0].data.at(-1);
    const gasUsage = gasChart.data.datasets[0].data.at(-1);

    // Update Electricity Tips
    const electricityTip = document.getElementById("electricity-tip").querySelector("p");
    if (electricityUsage > 80) {
        electricityTip.textContent = "Your electricity usage is high! Turn off lights in unused rooms.";
    } else if (electricityUsage > 50) {
        electricityTip.textContent = "Moderate electricity usage. Consider using LED bulbs.";
    } else {
        electricityTip.textContent = "Electricity usage is optimal. Keep using energy-efficient devices.";
    }

    // Update Water Tips
    const waterTip = document.getElementById("water-tip").querySelector("p");
    if (waterUsage > 300) {
        waterTip.textContent = "High water usage! Fix leaks and reduce shower time.";
    } else if (waterUsage > 150) {
        waterTip.textContent = "Moderate water usage. Use a bucket instead of a running tap.";
    } else {
        waterTip.textContent = "Water usage is optimal. Great job conserving water!";
    }

    // Update Gas Tips
    const gasTip = document.getElementById("gas-tip").querySelector("p");
    if (gasUsage > 40) {
        gasTip.textContent = "Gas usage is high! Cover pots while cooking to save gas.";
    } else if (gasUsage > 20) {
        gasTip.textContent = "Moderate gas usage. Ensure burners are clean for efficiency.";
    } else {
        gasTip.textContent = "Gas usage is optimal. Regular maintenance is key!";
    }
}

// Update tips every 3 seconds along with charts
setInterval(() => {
    updateRealTimeData();
    updateRealTimeTips();
}, 3000);

function checkForLeaks() {
    const alertsContainer = document.getElementById("alerts-container");
    alertsContainer.innerHTML = ""; // Clear previous alerts

    const electricityUsage = electricityChart.data.datasets[0].data.at(-1);
    const waterUsage = waterChart.data.datasets[0].data.at(-1);
    const gasUsage = gasChart.data.datasets[0].data.at(-1);

    let issuesDetected = false;

    // Check for electricity leaks
    if (electricityUsage > 90) {
        const alert = document.createElement("p");
        alert.textContent = "⚠️ High electricity usage detected! Possible leakage or faulty appliances.";
        alert.classList.add("alert-high");
        alertsContainer.appendChild(alert);
        issuesDetected = true;
    }

    // Check for water leaks
    if (waterUsage > 400) {
        const alert = document.createElement("p");
        alert.textContent = "⚠️ High water usage detected! Check for leaks in pipes or faucets.";
        alert.classList.add("alert-high");
        alertsContainer.appendChild(alert);
        issuesDetected = true;
    }

    // Check for gas leaks
    if (gasUsage > 50) {
        const alert = document.createElement("p");
        alert.textContent = "⚠️ High gas usage detected! Possible leakage or malfunctioning equipment.";
        alert.classList.add("alert-high");
        alertsContainer.appendChild(alert);
        issuesDetected = true;
    }

    // Display no issues message if everything is normal
    if (!issuesDetected) {
        const noIssuesMessage = document.createElement("p");
        noIssuesMessage.textContent = "✅ No issues detected. All systems are functioning normally.";
        alertsContainer.appendChild(noIssuesMessage);
    }
}

// Integrate the leak detection with the real-time data updates
setInterval(() => {
    updateRealTimeData();
    updateRealTimeTips();
    checkForLeaks();
}, 3000); // Updates every 3 seconds

