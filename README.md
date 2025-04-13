# sales-spy-linear-regression

# Sales Spy: Linear Lens 📊

An interactive data visualization tool that demonstrates the power of linear regression in analyzing the relationship between advertising spend and sales.

## 🔍 Overview

Sales Spy: Linear Lens is a web application that allows users to:

- Generate synthetic data with adjustable parameters
- Visualize the relationship between advertising spend and sales
- Train a simple linear regression model
- Evaluate model performance with key metrics (R², MSE, RMSE)
- Interpret results with clear visualizations and explanations

Perfect for educational purposes, business presentations, or exploring the fundamentals of predictive analytics.

Screenshot
![Screenshot 2025-04-13 203731](https://github.com/user-attachments/assets/65c1f2ae-0fd3-4b2c-8e36-3152253ecbd2)
![Screenshot 2025-04-13 203852](https://github.com/user-attachments/assets/a12ae416-ddf7-4ed2-9bea-afbd2af92173)





## ✨ Features

- **Interactive Data Generation**: Control sample size, slope, intercept, and noise levels
- **Dynamic Visualization**: Real-time scatter plots with regression line
- **Train/Test Split**: Automatically splits data for model validation
- **Model Metrics**: Clear display of R-squared, MSE, and RMSE
- **Data Tables**: View training and testing datasets
- **Educational Component**: Built-in explanations of linear regression concepts

## 🛠️ Technology Stack

- React
- TypeScript
- Tailwind CSS
- Recharts (for data visualization)
- shadcn/ui (for UI components)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sales-spy-linear-lens.git
cd sales-spy-linear-lens
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 How to Use

1. **Generate Data**: Adjust the parameters (sample size, slope, intercept, noise) and click "Generate Data"
2. **Train Model**: Click "Run Regression Model" to fit a linear regression line to the data
3. **Analyze Results**: View the scatter plot, regression line, and model metrics
4. **Interpret**: Use the metrics card to understand the relationship between advertising and sales

## 📊 Understanding the Output

- **R² (R-squared)**: Indicates how well the model explains the variance in sales data
- **MSE (Mean Squared Error)**: Average of squared differences between predicted and actual values
- **RMSE (Root Mean Squared Error)**: Square root of MSE, more intuitive to interpret as it's in the same units as sales

## 🔧 Customization

Feel free to modify the parameters to simulate different business scenarios:

- High slope: Strong advertising impact on sales
- Low slope: Minimal advertising impact
- High noise: Many external factors influencing sales
- Low noise: Advertising spend is the dominant factor in sales performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- This project was inspired by the need for intuitive visualization tools in data science education
- Special thanks to all the open-source libraries that made this possible

---


