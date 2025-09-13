import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { UserCard } from './UserCard';
import { SearchBar } from './SearchBar';
import { CreateUserForm } from './CreateUserForm';
import { useUsers } from '@/contexts/UserContext';
import { userService } from '@/services/userService';
import { Plus, Users, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export const Dashboard: React.FC = () => {
  const { users, loading, error, dispatch } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const fetchedUsers = await userService.fetchUsers();
        dispatch({ type: 'SET_USERS', payload: fetchedUsers });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load users. Please try again.' });
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, users.length]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (error) {
    return (
      <div className="min-h-screen bg-dashboard-bg p-6">
        <div className="max-w-7xl mx-auto">
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-gradient-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <p className="text-primary-foreground/80">Manage and explore user profiles</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search users..."
              />
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 whitespace-nowrap"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="bg-card rounded-lg p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Users</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{users.length}</p>
          </div>
          
          {searchTerm && (
            <div className="bg-card rounded-lg p-4 shadow-card border border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Search Results</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{filteredUsers.length}</p>
            </div>
          )}
        </div>

        {/* User Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
              </div>
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm ? 'No users found' : 'No users yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No users match "${searchTerm}". Try adjusting your search.`
                : 'Get started by adding your first user.'
              }
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-primary hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First User
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Create User Form */}
      <CreateUserForm 
        open={showCreateForm} 
        onOpenChange={setShowCreateForm}
      />
    </div>
  );
};