
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, Line, LineChart, ComposedChart } from 'recharts';

interface DataPoint {
  id: number;
  advertisingSpend: number;
  sales: number;
  predicted?: number;
}

interface RegressionChartProps {
  data: DataPoint[];
  model: { slope: number; intercept: number } | null;
  title: string;
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

const RegressionChart: React.FC<RegressionChartProps> = ({ data, model, title }) => {
  // Generate points for the regression line if model exists
  const regressionLineData = model ? [
    { 
      advertisingSpend: Math.min(...data.map(d => d.advertisingSpend)), 
      predicted: model.intercept + model.slope * Math.min(...data.map(d => d.advertisingSpend)) 
    },
    { 
      advertisingSpend: Math.max(...data.map(d => d.advertisingSpend)), 
      predicted: model.intercept + model.slope * Math.max(...data.map(d => d.advertisingSpend)) 
    }
  ] : [];

  return (
    <Card className="w-full h-[400px] shadow-md">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
            <XAxis 
              dataKey="advertisingSpend" 
              name="Advertising Spend" 
              label={{ value: 'Advertising Spend ($)', position: 'insideBottom', offset: -10 }} 
              tickFormatter={formatCurrency} 
            />
            <YAxis 
              name="Sales" 
              label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }} 
              tickFormatter={formatCurrency} 
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
              labelFormatter={(value) => `Advertising: $${Number(value).toLocaleString()}`}
            />
            <Legend />
            <Scatter name="Actual Data" dataKey="sales" fill="#3b82f6" />
            {model && (
              <>
                {/* Draw regression line using the two endpoint points */}
                <Line 
                  name="Regression Line" 
                  dataKey="predicted" 
                  data={regressionLineData} 
                  stroke="#14b8a6" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={false}
                  isAnimationActive={false}
                />
                {/* Draw the prediction points */}
                <Scatter 
                  name="Predicted Sales" 
                  dataKey="predicted" 
                  fill="#14b8a6" 
                  shape="cross" 
                  legendType="none"
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RegressionChart;
