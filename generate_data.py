import csv
import random
from datetime import datetime, timedelta

# Set seed for reproducibility
random.seed(42)

# Configuration
num_rows = 1000
start_date = datetime(2025, 1, 1)
end_date = datetime(2030, 12, 31) # Increased range for more data points

# Categories and Products
categories = {
    'Electronics': ['Laptops', 'Smartphones', 'Headphones', 'Tablets', 'Monitors'],
    'Furniture': ['Office Chairs', 'Desks', 'Bookshelves', 'Lamps', 'Sofas'],
    'Clothing': ['T-Shirts', 'Jeans', 'Jackets', 'Sneakers', 'Dresses'],
    'Home Decor': ['Wall Art', 'Vases', 'Scented Candles', 'Rug', 'Clocks']
}
regions = ['North', 'South', 'East', 'West']

# Data Lists
data = []

for _ in range(num_rows):
    # Random Date
    days_delta = random.randint(0, (end_date - start_date).days)
    date = start_date + timedelta(days=days_delta)
    
    # Random Category and Product
    category = random.choice(list(categories.keys()))
    product = random.choice(categories[category])
    
    # Random Region
    region = random.choice(regions)
    
    # Random Quantity
    quantity = random.randint(1, 15)
    
    # Base price per category (approximate in INR - conversion rate approx 83)
    base_prices = {
        'Electronics': 500 * 83,
        'Furniture': 200 * 83,
        'Clothing': 40 * 83,
        'Home Decor': 30 * 83
    }

    
    unit_price = base_prices[category] * random.uniform(0.8, 1.5)
    sales = round(unit_price * quantity, 2)
    
    # Profit margin between 15% and 45%
    profit_margin = random.uniform(0.15, 0.45)
    profit = round(sales * profit_margin, 2)
    
    data.append({
        'DateObj': date,
        'Product': product,
        'Category': category,
        'Region': region,
        'Sales': sales,
        'Profit': profit,
        'Quantity': quantity
    })

# Sort by Date Object
data.sort(key=lambda x: x['DateObj'])

# Prepare final data for CSV
final_data = []
for row in data:
    csv_row = row.copy()
    csv_row['Date'] = row['DateObj'].strftime('%d-%m-%Y')
    del csv_row['DateObj']
    final_data.append(csv_row)

# Save to CSV
fieldnames = ['Date', 'Product', 'Category', 'Region', 'Sales', 'Profit', 'Quantity']
output_file = 'c:/Users/Goyanshi Mohanty/OneDrive/Desktop/sales/sales_data_updated.csv'


with open(output_file, mode='w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(final_data)


print(f"Dataset generated successfully: {output_file}")
