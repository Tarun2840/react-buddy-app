import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUsers } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface CreateUserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({ open, onOpenChange }) => {
  const { addUser } = useUsers();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    company: { name: '', catchPhrase: '', bs: '' },
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: { lat: '0', lng: '0' }
    }
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('company.')) {
      const companyField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        company: { ...prev.company, [companyField]: value }
      }));
    } else if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      if (addressField === 'lat' || addressField === 'lng') {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            geo: { ...prev.address.geo, [addressField]: value }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          address: { ...prev.address, [addressField]: value }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addUser(formData);
    toast({
      title: "Success",
      description: "User created successfully!",
    });
    
    // Reset form
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: { name: '', catchPhrase: '', bs: '' },
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '0', lng: '0' }
      }
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.company.name}
              onChange={(e) => handleInputChange('company.name', e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.address.city}
              onChange={(e) => handleInputChange('address.city', e.target.value)}
              placeholder="Enter city"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
              Create User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};