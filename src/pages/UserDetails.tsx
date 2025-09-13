import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useUsers } from '@/contexts/UserContext';
import { userService } from '@/services/userService';
import { User } from '@/contexts/UserContext';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  MapPin, 
  Navigation,
  User as UserIcon,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users } = useUsers();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      setLoading(true);
      
      // First try to find user in context
      const contextUser = users.find(u => u.id === parseInt(id));
      if (contextUser) {
        setUser(contextUser);
        setLoading(false);
        return;
      }

      // If not found in context, fetch from API
      try {
        const fetchedUser = await userService.fetchUserById(parseInt(id));
        setUser(fetchedUser);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user details",
          variant: "destructive",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, users, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dashboard-bg">
        <div className="bg-gradient-primary text-white shadow-lg">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <Skeleton className="h-10 w-32 bg-white/20" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">User not found</h2>
          <p className="text-muted-foreground mb-4">The requested user could not be found.</p>
          <Button onClick={() => navigate('/')} className="bg-gradient-primary hover:opacity-90">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-gradient-primary text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-primary-foreground/80">@{user.username}</p>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white self-start">
              User ID: {user.id}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Contact Information */}
        <Card className="p-6 mb-6 shadow-card border border-border/50">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary" />
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                <a 
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Information */}
          <Card className="p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Address
            </h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Street Address</p>
                <p className="font-medium text-foreground">
                  {user.address.street} {user.address.suite}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">City & Zip</p>
                <p className="font-medium text-foreground">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
              
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">GPS Coordinates</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Latitude</p>
                    <p className="text-sm font-mono">{user.address.geo.lat}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Longitude</p>
                    <p className="text-sm font-mono">{user.address.geo.lng}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Company Information */}
          <Card className="p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company
            </h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="text-lg font-semibold text-foreground">{user.company.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Motto</p>
                <p className="font-medium text-foreground italic">
                  "{user.company.catchPhrase}"
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Business</p>
                <p className="text-sm text-muted-foreground">{user.company.bs}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};