import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Brain, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-primary rounded-2xl shadow-lg">
              <Package className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            MSME Smart Inventory
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            AI-Powered Inventory Management for Modern Businesses
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform your inventory management with intelligent forecasting, fraud detection, 
            and automated supplier recommendations. Built for MSMEs who want to grow smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Inventory</h3>
            <p className="text-muted-foreground">
              Real-time stock tracking with intelligent low-stock alerts and automated reordering
            </p>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
              <Brain className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
            <p className="text-muted-foreground">
              Get intelligent insights on suppliers, fraud detection, and demand forecasting
            </p>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="p-3 bg-success/10 rounded-lg w-fit mb-4">
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sales Forecasting</h3>
            <p className="text-muted-foreground">
              Predict future demand with ML-powered analytics for better planning
            </p>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="p-3 bg-destructive/10 rounded-lg w-fit mb-4">
              <Shield className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fraud Detection</h3>
            <p className="text-muted-foreground">
              Verify supplier reliability and prevent fraud with AI-powered analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
