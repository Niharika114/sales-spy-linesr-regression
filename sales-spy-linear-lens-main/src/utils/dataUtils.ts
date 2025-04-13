// Function to generate synthetic data with a linear relationship plus some noise
export function generateSyntheticData(
  sampleSize: number,
  slope: number,
  intercept: number,
  noiseFactor: number
) {
  const data = [];
  
  for (let i = 0; i < sampleSize; i++) {
    // Generate advertising spend between 1000 and 10000
    const advertisingSpend = Math.random() * 9000 + 1000;
    
    // Calculate sales based on the linear model with some random noise
    const noise = (Math.random() - 0.5) * noiseFactor;
    const sales = intercept + slope * advertisingSpend + noise;
    
    data.push({
      id: i + 1,
      advertisingSpend: Math.round(advertisingSpend),
      sales: Math.max(0, Math.round(sales)), // Prevent negative sales
    });
  }
  
  return data;
}

// Simple linear regression calculation
export function calculateLinearRegression(data: { advertisingSpend: number; sales: number }[]) {
  const n = data.length;
  
  // Calculate means
  let sumX = 0;
  let sumY = 0;
  
  for (const point of data) {
    sumX += point.advertisingSpend;
    sumY += point.sales;
  }
  
  const meanX = sumX / n;
  const meanY = sumY / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  for (const point of data) {
    numerator += (point.advertisingSpend - meanX) * (point.sales - meanY);
    denominator += Math.pow(point.advertisingSpend - meanX, 2);
  }
  
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;
  
  return { slope, intercept };
}

// Calculate predictions for all data points
export function calculatePredictions(
  data: { id: number; advertisingSpend: number; sales: number }[],
  model: { slope: number; intercept: number }
) {
  return data.map((point) => ({
    ...point,
    predicted: Math.round(model.intercept + model.slope * point.advertisingSpend),
  }));
}

// Calculate regression metrics
export function calculateMetrics(
  data: { sales: number; predicted: number }[]
) {
  const n = data.length;
  
  // Calculate actual mean
  let sumActual = 0;
  for (const point of data) {
    sumActual += point.sales;
  }
  const meanActual = sumActual / n;
  
  // Calculate SST, SSR, and SSE
  let sse = 0; // Sum of squared errors
  let sst = 0; // Total sum of squares
  let ssr = 0; // Regression sum of squares
  
  for (const point of data) {
    sse += Math.pow(point.sales - point.predicted, 2);
    sst += Math.pow(point.sales - meanActual, 2);
    ssr += Math.pow(point.predicted - meanActual, 2);
  }
  
  // Calculate metrics
  const rSquared = 1 - (sse / sst);
  const mse = sse / n;
  const rmse = Math.sqrt(mse);
  
  return {
    rSquared: parseFloat(rSquared.toFixed(4)),
    mse: parseFloat(mse.toFixed(2)),
    rmse: parseFloat(rmse.toFixed(2)),
  };
}

// Split data into training and testing sets
export function splitData(
  data: any[],
  testSize: number = 0.2
) {
  // Shuffle data
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  
  const testCount = Math.floor(shuffled.length * testSize);
  const testData = shuffled.slice(0, testCount);
  const trainData = shuffled.slice(testCount);
  
  return { trainData, testData };
}
