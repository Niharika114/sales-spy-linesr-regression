
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricsCardProps {
  model: { slope: number; intercept: number } | null;
  metrics: {
    rSquared: number;
    mse: number;
    rmse: number;
  } | null;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ model, metrics }) => {
  if (!model || !metrics) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Model Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No model has been trained yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Model Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Regression Equation</h3>
          <div className="bg-secondary p-3 rounded-md">
            <p className="font-mono text-sm">
              Sales = {model.intercept.toFixed(2)} + {model.slope.toFixed(4)} × Advertising Spend
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            This means for every additional $1 spent on advertising, we expect 
            sales to increase by ${model.slope.toFixed(4)}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary p-4 rounded-md">
            <p className="text-sm text-muted-foreground">R² (Coefficient of Determination)</p>
            <p className="text-2xl font-bold">{metrics.rSquared.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.rSquared >= 0.7 
                ? "Strong correlation between advertising and sales" 
                : metrics.rSquared >= 0.5 
                  ? "Moderate correlation between advertising and sales" 
                  : "Weak correlation between advertising and sales"}
            </p>
          </div>
          
          <div className="bg-secondary p-4 rounded-md">
            <p className="text-sm text-muted-foreground">MSE (Mean Squared Error)</p>
            <p className="text-2xl font-bold">{metrics.mse.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Average squared difference between predicted and actual sales
            </p>
          </div>
          
          <div className="bg-secondary p-4 rounded-md">
            <p className="text-sm text-muted-foreground">RMSE (Root Mean Squared Error)</p>
            <p className="text-2xl font-bold">${metrics.rmse.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Average error in sales prediction (in dollars)
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Interpretation</h3>
          <div className="bg-secondary p-4 rounded-md">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Base sales:</strong> With zero advertising spend, the model predicts 
                ${Math.max(0, Math.round(model.intercept)).toLocaleString()} in sales.
              </li>
              <li>
                <strong>Advertising impact:</strong> Each $1,000 spent on advertising is associated 
                with an additional ${(model.slope * 1000).toFixed(2)} in sales.
              </li>
              <li>
                <strong>Model accuracy:</strong> The model explains {(metrics.rSquared * 100).toFixed(0)}% 
                of the variation in sales. The remaining {(100 - metrics.rSquared * 100).toFixed(0)}% 
                is due to other factors not included in the model.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
