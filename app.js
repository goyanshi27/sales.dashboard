async function initDashboard() {
    try {
        const response = await fetch('sales_data_updated.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                renderDashboard(results.data);
            }
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderDashboard(data) {
    // Basic formatting helpers
    const formatCurrency = (val) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(val);

    const formatDate = (str) => {
        const parts = str.split('-');
        return `${parts[1]}/${parts[2]}`; // MM/YYYY
    };

    // Calculate KPIs
    let totalSales = 0;
    let totalProfit = 0;
    let totalQuantity = 0;

    data.forEach(row => {
        if (row.Sales) totalSales += row.Sales;
        if (row.Profit) totalProfit += row.Profit;
        if (row.Quantity) totalQuantity += row.Quantity;
    });

    document.getElementById('kpi-total-sales').textContent = formatCurrency(totalSales);
    document.getElementById('kpi-total-profit').textContent = formatCurrency(totalProfit);
    document.getElementById('kpi-total-quantity').textContent = totalQuantity.toLocaleString();
    document.getElementById('kpi-aov').textContent = formatCurrency(totalSales / data.length);
    document.getElementById('kpi-margin').textContent = ((totalProfit / totalSales) * 100).toFixed(1) + '%';

    // 1. Sales Trend (Line Chart)
    const monthlyData = {};
    data.forEach(row => {
        if (!row.Date) return;
        const key = row.Date.substring(3); // Month-Year
        monthlyData[key] = (monthlyData[key] || 0) + row.Sales;
    });

    new Chart(document.getElementById('salesTrendChart'), {
        type: 'line',
        data: {
            labels: Object.keys(monthlyData),
            datasets: [{
                label: 'Monthly Sales',
                data: Object.values(monthlyData),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    // 2. Sales by Category (Bar Chart)
    const categoryData = {};
    data.forEach(row => {
        if (!row.Category) return;
        categoryData[row.Category] = (categoryData[row.Category] || 0) + row.Sales;
    });

    new Chart(document.getElementById('categoryChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: ['#6366f1', '#ec4899', '#06b6d4', '#f59e0b'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    // 3. Regional Performance (Pie Chart)
    const regionData = {};
    data.forEach(row => {
        if (!row.Region) return;
        regionData[row.Region] = (regionData[row.Region] || 0) + row.Sales;
    });

    new Chart(document.getElementById('regionChart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(regionData),
            datasets: [{
                data: Object.values(regionData),
                backgroundColor: ['#6366f1', '#8b5cf6', '#d946ef', '#0ea5e9'],
                borderWidth: 0,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#94a3b8' } }
            }
        }
    });

    // 4. Profit Chart (Line Chart for Profit)
    const profitTrend = {};
    data.forEach(row => {
        if (!row.Date) return;
        const key = row.Date.substring(3);
        profitTrend[key] = (profitTrend[key] || 0) + row.Profit;
    });

    new Chart(document.getElementById('profitChart'), {
        type: 'line',
        data: {
            labels: Object.keys(profitTrend),
            datasets: [{
                label: 'Monthly Profit',
                data: Object.values(profitTrend),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initDashboard);
