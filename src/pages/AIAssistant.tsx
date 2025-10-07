import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldAlert, Users, TrendingUp, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AIAssistant() {
  const [fraudResult, setFraudResult] = useState<{ is_fraud: boolean } | null>(null);
  const [supplierResult, setSupplierResult] = useState<any>(null);
  const [forecastResult, setForecastResult] = useState<{ predicted_sales: number } | null>(null);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleFraudDetection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ ...loading, fraud: true });
    
    const formData = new FormData(e.currentTarget);
    const data = {
      order_count: parseInt(formData.get('order_count') as string),
      return_rate: parseFloat(formData.get('return_rate') as string),
      account_age_months: parseInt(formData.get('account_age_months') as string),
      payment_delay_days: parseInt(formData.get('payment_delay_days') as string),
      complaint_count: parseInt(formData.get('complaint_count') as string),
      delivery_time_days: parseInt(formData.get('delivery_time_days') as string),
      rating: parseFloat(formData.get('rating') as string),
      category: formData.get('category') as string,
    };

    try {
      const response = await fetch('http://127.0.0.1:8005/items/fraud_detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setFraudResult(result);
      toast.success('Fraud detection completed');
    } catch (error) {
      toast.error('Failed to check fraud detection');
    } finally {
      setLoading({ ...loading, fraud: false });
    }
  };

  const handleSupplierRecommendation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ ...loading, supplier: true });

    const formData = new FormData(e.currentTarget);
    const data = {
      order_count: parseInt(formData.get('order_count') as string),
      return_rate: parseFloat(formData.get('return_rate') as string),
      account_age_months: parseInt(formData.get('account_age_months') as string),
      rating: parseFloat(formData.get('rating') as string),
      category: formData.get('category') as string,
    };

    try {
      const response = await fetch('http://127.0.0.1:8001/best_supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setSupplierResult(result);
      toast.success('Supplier recommendation received');
    } catch (error) {
      toast.error('Failed to get supplier recommendation');
    } finally {
      setLoading({ ...loading, supplier: false });
    }
  };

  const handleSalesForecast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ ...loading, forecast: true });

    const formData = new FormData(e.currentTarget);
    const data = {
      date: formData.get('date') as string,
      season: formData.get('season') as string,
      event: formData.get('event') as string,
      day_of_week: formData.get('day_of_week') as string,
      holiday: formData.get('holiday') as string,
      discount_rate: parseFloat(formData.get('discount_rate') as string),
    };

    try {
      const response = await fetch('http://127.0.0.1:8003/predict_year', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setForecastResult(result);
      toast.success('Sales forecast calculated');
    } catch (error) {
      toast.error('Failed to get sales forecast');
    } finally {
      setLoading({ ...loading, forecast: false });
    }
  };

  // Mock chart data
  const chartData = [
    { month: 'Jan', actual: 30000, predicted: 33000 },
    { month: 'Feb', actual: 35000, predicted: 36000 },
    { month: 'Mar', actual: 32000, predicted: 34000 },
    { month: 'Apr', actual: 38000, predicted: 40000 },
    { month: 'May', actual: 42000, predicted: forecastResult?.predicted_sales || 43000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Intelligence Zone</h1>
        <p className="text-muted-foreground">
          Leverage AI-powered tools for smart business decisions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Fraud Detection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>Verify supplier reliability</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFraudDetection} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Order Count</Label>
                  <Input name="order_count" type="number" defaultValue="10" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Return Rate</Label>
                  <Input name="return_rate" type="number" step="0.01" defaultValue="0.1" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Account Age (months)</Label>
                  <Input name="account_age_months" type="number" defaultValue="12" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Payment Delay (days)</Label>
                  <Input name="payment_delay_days" type="number" defaultValue="1" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Complaints</Label>
                  <Input name="complaint_count" type="number" defaultValue="0" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Delivery Time (days)</Label>
                  <Input name="delivery_time_days" type="number" defaultValue="2" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Rating</Label>
                  <Input name="rating" type="number" step="0.1" defaultValue="4.0" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Category</Label>
                  <Input name="category" defaultValue="Electronics" required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading.fraud}>
                {loading.fraud ? 'Analyzing...' : 'Check Fraud'}
              </Button>
              {fraudResult && (
                <div
                  className={`p-4 rounded-lg text-center font-semibold ${
                    fraudResult.is_fraud
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-success/10 text-success'
                  }`}
                >
                  {fraudResult.is_fraud ? '⚠️ Fraud Detected' : '✓ Non-Fraud Supplier'}
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Supplier Recommendation */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Supplier Recommendation</CardTitle>
                <CardDescription>Find the best supplier</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSupplierRecommendation} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Order Count</Label>
                  <Input name="order_count" type="number" defaultValue="50" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Return Rate</Label>
                  <Input name="return_rate" type="number" step="0.01" defaultValue="0.05" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Account Age (months)</Label>
                  <Input name="account_age_months" type="number" defaultValue="24" required />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Rating</Label>
                  <Input name="rating" type="number" step="0.1" defaultValue="4.5" required />
                </div>
                <div className="space-y-1 col-span-2">
                  <Label className="text-xs">Category</Label>
                  <Input name="category" defaultValue="Electronics" required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading.supplier}>
                {loading.supplier ? 'Finding...' : 'Get Recommendation'}
              </Button>
              {supplierResult?.best_supplier && (
                <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                  <h4 className="font-semibold text-primary">
                    🏆 {supplierResult.best_supplier.supplier_name}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Rating: {supplierResult.best_supplier.rating}</div>
                    <div>Category: {supplierResult.best_supplier.category}</div>
                    <div className="col-span-2">
                      Avg Order: ₹{supplierResult.best_supplier.avg_order_value?.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Sales Forecasting */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle>Sales Forecasting</CardTitle>
                <CardDescription>Predict future sales with AI</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <form onSubmit={handleSalesForecast} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Date</Label>
                    <Input name="date" defaultValue="23-10-2025" required />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Season</Label>
                    <Input name="season" defaultValue="spring" required />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Event</Label>
                    <Input name="event" defaultValue="none" required />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Day of Week</Label>
                    <Input name="day_of_week" defaultValue="monday" required />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Holiday</Label>
                    <Input name="holiday" defaultValue="Yes" required />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Discount Rate</Label>
                    <Input name="discount_rate" type="number" step="0.01" defaultValue="0" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading.forecast}>
                  {loading.forecast ? 'Predicting...' : 'Predict Sales'}
                </Button>
                {forecastResult && (
                  <div className="p-4 bg-accent/10 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Predicted Sales</div>
                    <div className="text-2xl font-bold text-accent">
                      ₹{forecastResult.predicted_sales.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                )}
              </form>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Sales Trend Chart</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="predicted" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
