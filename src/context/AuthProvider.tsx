import React, {createContext, useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

interface AuthProviderProps {
  children: any;
}

export const AuthContext = createContext<any>(null);

export function AuthProvider(props: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<any>(null);


  // App-level online/offline status: online when app starts/active, offline when background/closed
  useEffect(() => {
   
  }, []);

  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,       
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
