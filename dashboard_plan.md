# Sales Performance Analysis: Dashboard Plan

This document outlines the KPIs, visuals, and business questions for the Sales Performance Analysis dashboard.

## 1. Top 5 Key Performance Indicators (KPIs)
These metrics provide an immediate snapshot of the business's health.

| KPI | Description | Why it matters |
|---|---|---|
| **Total Sales** | Sum of all transaction values (INR). | Primary growth indicator. |
| **Total Profit** | Total revenue minus estimated costs (INR). | Measure of financial sustainability. |

| **Profit Margin (%)** | (Total Profit / Total Sales) * 100. | Efficiency of operations and pricing. |
| **Average Order Value (AOV)** | Total Sales / Total Orders (Transactions). | Understands customer spending behavior. |
| **Total Units Sold** | Total quantity of products moved. | Tracks inventory turnover and demand. |

## 2. Power BI Visualizations
Recommended charts to identify trends and patterns.

- **Sales Trend (Line Chart)**: `Sales` by `Date` (Month/Quarter). 
    - *Purpose*: Identify seasonality and growth trajectories.
- **Category Performance (Clustered Column Chart)**: `Sales` and `Profit` by `Category`.
    - *Purpose*: Compare which categories drive the most revenue vs. profit.
- **Regional Distribution (Map or Treemap)**: `Sales` by `Region`.
    - *Purpose*: Identify top-performing and underperforming geographical areas.
- **Product Contribution (Donut Chart)**: Top 10 `Products` by `Sales`.
    - *Purpose*: Visualize product concentration and dependency on top sellers.

## 3. Key Business Questions
The dashboard is designed to answer these critical questions:

1. **Which product categories are most profitable?** (Helps in resource allocation).
2. **Are there specific months where sales spike?** (Assists in inventory planning).
3. **Which region requires more marketing focus due to low sales?** (Strategic growth).
4. **Is our average order value increasing over time?** (Customer loyalty/Pricing strategy).
5. **Which top 5 products contribute to 80% of our revenue?** (Pareto Principle analysis).

## 4. Dataset Overview
- **File**: `sales_data.csv`
- **Rows**: 1,000
- **Timeframe**: 2025 - 2030
- **Columns**: `Date`, `Product`, `Category`, `Region`, `Sales`, `Profit`, `Quantity`
