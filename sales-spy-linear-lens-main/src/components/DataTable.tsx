
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataPoint {
  id: number;
  advertisingSpend: number;
  sales: number;
  predicted?: number;
}

interface DataTableProps {
  data: DataPoint[];
  title: string;
  showPredictions: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, title, showPredictions }) => {
  // Only show a subset of the data to avoid overwhelming the UI
  const displayData = data.slice(0, 10);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Advertising Spend</TableHead>
                <TableHead>Actual Sales</TableHead>
                {showPredictions && <TableHead>Predicted Sales</TableHead>}
                {showPredictions && <TableHead>Error</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>${item.advertisingSpend.toLocaleString()}</TableCell>
                  <TableCell>${item.sales.toLocaleString()}</TableCell>
                  {showPredictions && item.predicted !== undefined && (
                    <TableCell>${item.predicted.toLocaleString()}</TableCell>
                  )}
                  {showPredictions && item.predicted !== undefined && (
                    <TableCell>
                      <span className={item.predicted > item.sales ? 'text-green-600' : 'text-red-600'}>
                        {item.predicted > item.sales ? '+' : ''}
                        ${(item.predicted - item.sales).toLocaleString()}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.length > 10 && (
          <p className="text-sm text-muted-foreground mt-4">
            Showing 10 of {data.length} records
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
