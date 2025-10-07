import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop HP', category: 'Electronics', price: 45000, stock: 15, supplier: 'Tech Suppliers' },
    { id: 2, name: 'Mouse Wireless', category: 'Electronics', price: 500, stock: 50, supplier: 'Gadget World' },
    { id: 3, name: 'Keyboard Mechanical', category: 'Electronics', price: 2500, stock: 8, supplier: 'Tech Suppliers' },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    supplier: '',
  });

  const handleAdd = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast.error('Please fill all fields');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      supplier: formData.supplier,
    };

    setProducts([...products, newProduct]);
    setIsAddOpen(false);
    setFormData({ name: '', category: '', price: '', stock: '', supplier: '' });
    toast.success('Product added successfully');
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      supplier: product.supplier,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id
        ? {
            ...p,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            supplier: formData.supplier,
          }
        : p
    );

    setProducts(updatedProducts);
    setIsEditOpen(false);
    setSelectedProduct(null);
    setFormData({ name: '', category: '', price: '', stock: '', supplier: '' });
    toast.success('Product updated successfully');
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success('Product deleted');
  };

  const handleDeduct = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product && product.stock > 0) {
      const updatedProducts = products.map((p) =>
        p.id === id ? { ...p, stock: p.stock - 1 } : p
      );
      setProducts(updatedProducts);
      toast.success('Stock deducted');
    } else {
      toast.error('No stock available');
    }
  };

  const ProductForm = ({ onSubmit, buttonText }: { onSubmit: () => void; buttonText: string }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Product Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Electronics"
          />
        </div>
        <div className="space-y-2">
          <Label>Supplier</Label>
          <Input
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            placeholder="Supplier name"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Price (₹)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label>Stock Quantity</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="0"
          />
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full">
        {buttonText}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your inventory items</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAdd} buttonText="Add Product" />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock < 10
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-success/10 text-success'
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeduct(product.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={handleUpdate} buttonText="Update Product" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
