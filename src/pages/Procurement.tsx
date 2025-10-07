import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Procurement() {
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [forecast, setForecast] = useState<any>(null);
  const [bestSupplier, setBestSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProcurementData();
  }, []);

  const fetchProcurementData = async () => {
    setLoading(true);
    try {
      // Fetch low stock alerts
      const lowStockRes = await fetch('http://127.0.0.1:8001/low_stock_alert');
      if (lowStockRes.ok) {
        const data = await lowStockRes.json();
        setLowStock(data.low_stock_items || []);
      }

      // Fetch low stock forecast
      const forecastRes = await fetch('http://127.0.0.1:8001/low_stock_forecast');
      if (forecastRes.ok) {
        const data = await forecastRes.json();
        setForecast(data);
      }

      // Fetch best supplier
      const supplierRes = await fetch('http://127.0.0.1:8001/best_supplier_for_low_stock');
      if (supplierRes.ok) {
        const data = await supplierRes.json();
        setBestSupplier(data);
      }

      toast.success('Procurement data loaded');
    } catch (error) {
      toast.error('Failed to load procurement data');
      // Set mock data for demo
      setLowStock([
        { item_name: 'Laptop HP', current_stock: 5, reorder_level: 10 },
        { item_name: 'Mouse Wireless', current_stock: 8, reorder_level: 15 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Procurement Agent</h1>
        <p className="text-muted-foreground">
          Smart inventory monitoring and supplier recommendations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Items needing restock</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {lowStock.length > 0 ? (
              <div className="space-y-3">
                {lowStock.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-warning/10 rounded-lg border border-warning/20"
                  >
                    <h4 className="font-semibold text-sm">{item.item_name}</h4>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Stock: {item.current_stock}</span>
                      <span>Reorder: {item.reorder_level}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No low stock items
              </p>
            )}
          </CardContent>
        </Card>

        {/* Demand Forecast */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle>Demand Forecast</CardTitle>
                <CardDescription>Predicted requirements</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {forecast ? (
              <div className="space-y-3">
                <div className="p-4 bg-accent/10 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Next 30 Days</div>
                  <div className="text-2xl font-bold text-accent mt-1">
                    {forecast.predicted_demand || '250'} units
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>Category</span>
                    <span className="font-medium">{forecast.category || 'Electronics'}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>Confidence</span>
                    <span className="font-medium">{forecast.confidence || '87'}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No forecast available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Best Supplier */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <ThumbsUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <CardTitle>Best Supplier</CardTitle>
                <CardDescription>Recommended vendor</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {bestSupplier ? (
              <div className="space-y-3">
                <div className="p-4 bg-success/10 rounded-lg">
                  <h4 className="font-bold text-success text-lg">
                    {bestSupplier.supplier_name || 'Kiran Industries'}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {bestSupplier.category || 'Electronics'}
                  </p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>Rating</span>
                    <span className="font-medium">
                      ⭐ {bestSupplier.rating || '4.2'}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>Avg Order Value</span>
                    <span className="font-medium">
                      ₹{(bestSupplier.avg_order_value || 1519.83).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>Status</span>
                    <span className="font-medium text-success">
                      {bestSupplier.fraud_status || 'Non-Fraud'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No supplier data
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
