
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DataSettingsCardProps {
  settings: {
    sampleSize: number;
    slope: number;
    intercept: number;
    noise: number;
    testSize: number;
  };
  onSettingsChange: (key: string, value: number) => void;
  onGenerateData: () => void;
  onRunModel: () => void;
}

const DataSettingsCard: React.FC<DataSettingsCardProps> = ({
  settings,
  onSettingsChange,
  onGenerateData,
  onRunModel,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Data & Model Settings</CardTitle>
        <CardDescription>
          Adjust parameters to generate synthetic data and run the regression model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="sample-size">Sample Size</Label>
              <span className="text-sm text-muted-foreground">{settings.sampleSize} data points</span>
            </div>
            <Slider
              id="sample-size"
              min={10}
              max={200}
              step={10}
              value={[settings.sampleSize]}
              onValueChange={(value) => onSettingsChange('sampleSize', value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="true-slope">True Coefficient (Slope)</Label>
              <span className="text-sm text-muted-foreground">{settings.slope.toFixed(2)}</span>
            </div>
            <Slider
              id="true-slope"
              min={0.5}
              max={5}
              step={0.1}
              value={[settings.slope]}
              onValueChange={(value) => onSettingsChange('slope', value[0])}
            />
            <p className="text-xs text-muted-foreground">
              How much each $1 of advertising impacts sales (higher = stronger effect)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="true-intercept">True Intercept (Base Sales)</Label>
              <span className="text-sm text-muted-foreground">${settings.intercept.toLocaleString()}</span>
            </div>
            <Slider
              id="true-intercept"
              min={0}
              max={10000}
              step={500}
              value={[settings.intercept]}
              onValueChange={(value) => onSettingsChange('intercept', value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Base sales with zero advertising
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="noise-factor">Noise Factor</Label>
              <span className="text-sm text-muted-foreground">{settings.noise.toLocaleString()}</span>
            </div>
            <Slider
              id="noise-factor"
              min={0}
              max={10000}
              step={500}
              value={[settings.noise]}
              onValueChange={(value) => onSettingsChange('noise', value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Random variation in the data (higher = more realistic but less clear pattern)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="test-size">Test Set Size</Label>
              <span className="text-sm text-muted-foreground">{settings.testSize * 100}%</span>
            </div>
            <Slider
              id="test-size"
              min={0.1}
              max={0.5}
              step={0.05}
              value={[settings.testSize]}
              onValueChange={(value) => onSettingsChange('testSize', value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Percentage of data to use for testing (not used in training)
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onGenerateData} 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Generate New Data
          </Button>
          <Button 
            onClick={onRunModel} 
            className="flex-1 bg-teal-600 hover:bg-teal-700"
          >
            Run Regression
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSettingsCard;
