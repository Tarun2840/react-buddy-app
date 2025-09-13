import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

interface UserContextType extends UserState {
  dispatch: React.Dispatch<UserAction>;
  addUser: (user: Omit<User, 'id'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false, error: null };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: [],
    loading: false,
    error: null,
  });

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...state.users.map(u => u.id), 0) + 1,
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
  };

  return (
    <UserContext.Provider value={{ ...state, dispatch, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};