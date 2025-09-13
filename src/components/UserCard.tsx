import React from 'react';
import { User } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <Card 
      className="p-6 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:bg-card-hover group border-border/50 hover:border-primary/20"
      onClick={handleCardClick}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            ID: {user.id}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
            <span className="truncate">{user.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span>{user.phone}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="truncate">{user.company.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{user.address.city}, {user.address.zipcode}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground italic">
            "{user.company.catchPhrase}"
          </p>
        </div>
      </div>
    </Card>
  );
};