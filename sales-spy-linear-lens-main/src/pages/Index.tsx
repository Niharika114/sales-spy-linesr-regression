
import React, { useState, useEffect } from 'react';
import { 
  generateSyntheticData, 
  calculateLinearRegression, 
  calculatePredictions, 
  calculateMetrics,
  splitData
} from '@/utils/dataUtils';
import RegressionChart from '@/components/RegressionChart';
import MetricsCard from '@/components/MetricsCard';
import DataSettingsCard from '@/components/DataSettingsCard';
import DataTable from '@/components/DataTable';
import ConceptExplainer from '@/components/ConceptExplainer';
import { toast } from '@/components/ui/use-toast';

interface DataPoint {
  id: number;
  advertisingSpend: number;
  sales: number;
  predicted?: number;
}

const Index = () => {
  // State for data generation settings
  const [settings, setSettings] = useState({
    sampleSize: 50,
    slope: 2.5,
    intercept: 5000,
    noise: 4000,
    testSize: 0.2,
  });

  // Data states
  const [allData, setAllData] = useState<DataPoint[]>([]);
  const [trainData, setTrainData] = useState<DataPoint[]>([]);
  const [testData, setTestData] = useState<DataPoint[]>([]);
  
  // Model states
  const [model, setModel] = useState<{ slope: number; intercept: number } | null>(null);
  const [metrics, setMetrics] = useState<{ rSquared: number; mse: number; rmse: number } | null>(null);
  const [predictionData, setPredictionData] = useState<DataPoint[]>([]);

  // Generate initial data on component mount
  useEffect(() => {
    generateNewData();
  }, []);

  // Handle settings changes
  const handleSettingsChange = (key: string, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Generate new synthetic data
  const generateNewData = () => {
    // Reset model when generating new data
    setModel(null);
    setMetrics(null);
    setPredictionData([]);

    // Generate the data with current settings
    const newData = generateSyntheticData(
      settings.sampleSize,
      settings.slope,
      settings.intercept,
      settings.noise
    );
    
    setAllData(newData);
    
    // Split into training and testing sets
    const { trainData: train, testData: test } = splitData(newData, settings.testSize);
    setTrainData(train);
    setTestData(test);

    toast({
      title: "Data Generated",
      description: `Generated ${settings.sampleSize} data points with a ${settings.testSize * 100}% test split.`,
    });
  };

  // Run the linear regression model
  const runRegressionModel = () => {
    if (trainData.length === 0) {
      toast({
        title: "No Data",
        description: "Please generate data first before running the model.",
        variant: "destructive",
      });
      return;
    }

    // Calculate regression on training data
    const newModel = calculateLinearRegression(trainData);
    setModel(newModel);

    // Make predictions on all data
    const predictedAllData = calculatePredictions(allData, newModel);
    setPredictionData(predictedAllData);

    // Calculate metrics on test data
    const predictedTestData = calculatePredictions(testData, newModel);
    const newMetrics = calculateMetrics(predictedTestData);
    setMetrics(newMetrics);

    toast({
      title: "Model Trained",
      description: `Linear regression model trained with R² of ${newMetrics.rSquared.toFixed(2)}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container py-6">
          <h1 className="text-4xl font-bold text-gradient">Sales Spy: Linear Lens</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Explore the relationship between advertising spend and sales through linear regression
          </p>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RegressionChart 
              data={predictionData.length > 0 ? predictionData : allData} 
              model={model}
              title="Advertising Spend vs. Sales"
            />
          </div>
          <div>
            <DataSettingsCard 
              settings={settings} 
              onSettingsChange={handleSettingsChange}
              onGenerateData={generateNewData}
              onRunModel={runRegressionModel}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricsCard model={model} metrics={metrics} />
          <ConceptExplainer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trainData.length > 0 && (
            <DataTable 
              data={trainData} 
              title={`Training Data (${trainData.length} samples)`}
              showPredictions={predictionData.length > 0}
            />
          )}
          {testData.length > 0 && (
            <DataTable 
              data={testData} 
              title={`Test Data (${testData.length} samples)`}
              showPredictions={predictionData.length > 0}
            />
          )}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Sales Spy: Linear Lens — An interactive linear regression visualization tool
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
