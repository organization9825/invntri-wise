import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '248',
      icon: Package,
      change: '+12%',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Sales',
      value: '₹1.2M',
      icon: DollarSign,
      change: '+8%',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Low Stock Alerts',
      value: '14',
      icon: AlertTriangle,
      change: '-3',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Forecast Trend',
      value: '+15%',
      icon: TrendingUp,
      change: 'This month',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your inventory.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
              <h3 className="font-semibold">Add New Product</h3>
              <p className="text-sm text-muted-foreground">
                Quickly add items to your inventory
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer">
              <h3 className="font-semibold">Run AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get intelligent insights on your stock
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-success" />
              <div className="flex-1">
                <p className="text-sm font-medium">Product added</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium">Low stock alert</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Sales forecast updated</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
