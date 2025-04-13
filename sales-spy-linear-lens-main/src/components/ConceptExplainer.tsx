
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ConceptExplainer: React.FC = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">About Linear Regression</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="concept">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="concept">Concept</TabsTrigger>
            <TabsTrigger value="equation">Equation</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="concept" className="space-y-4 pt-4">
            <p>
              <strong>Simple Linear Regression</strong> is a statistical method that models the 
              relationship between two variables: an independent variable X (Advertising Spend) 
              and a dependent variable Y (Sales).
            </p>
            <p>
              The model attempts to find the best-fitting straight line through the data points, 
              known as the regression line. This line represents the trend or relationship between 
              the variables.
            </p>
            <div className="bg-secondary p-3 rounded-md mt-2">
              <h4 className="font-medium mb-2">Key Assumptions:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>There is a linear relationship between the variables</li>
                <li>The data points are independent of each other</li>
                <li>The variance of the residuals is constant (homoscedasticity)</li>
                <li>The residuals follow a normal distribution</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="equation" className="space-y-4 pt-4">
            <p>
              The simple linear regression equation is:
            </p>
            <div className="bg-secondary p-3 rounded-md text-center my-4">
              <p className="font-mono font-medium">Y = β₀ + β₁X + ε</p>
            </div>
            <ul className="space-y-2">
              <li><strong>Y</strong>: Dependent variable (Sales)</li>
              <li><strong>X</strong>: Independent variable (Advertising Spend)</li>
              <li><strong>β₀</strong>: Y-intercept (constant) - sales when advertising is zero</li>
              <li><strong>β₁</strong>: Slope - change in sales for each unit change in advertising</li>
              <li><strong>ε</strong>: Error term (residuals) - variation not explained by the model</li>
            </ul>
            <p className="mt-2">
              The model estimates β₀ and β₁ by minimizing the sum of squared residuals (the 
              differences between observed and predicted values).
            </p>
          </TabsContent>
          <TabsContent value="metrics" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">R² (Coefficient of Determination)</h4>
                <p className="text-sm">
                  R² measures the proportion of variance in the dependent variable (Sales) that can 
                  be explained by the independent variable (Advertising Spend). It ranges from 0 to 1:
                </p>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>R² close to 1: Advertising strongly explains sales variations</li>
                  <li>R² close to 0: Advertising poorly explains sales variations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">MSE (Mean Squared Error)</h4>
                <p className="text-sm">
                  MSE is the average of squared differences between predicted and actual values. 
                  Lower values indicate better fit. The units are squared (dollars²).
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">RMSE (Root Mean Squared Error)</h4>
                <p className="text-sm">
                  RMSE is the square root of MSE, bringing the error metric back to the original units 
                  (dollars). It represents the standard deviation of the residuals.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConceptExplainer;
