import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SuccessContextType {
  success: string | null;
  setSuccess: (success: string | null) => void;
  clearSuccess: () => void;
  hasSuccess: boolean;
}

const SuccessContext = createContext<SuccessContextType | undefined>(undefined);

export const useSuccess = () => {
  const context = useContext(SuccessContext);
  if (context === undefined) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }
  return context;
};

interface SuccessProviderProps {
  children: ReactNode;
}

export const SuccessProvider: React.FC<SuccessProviderProps> = ({ children }) => {
  const [success, setSuccess] = useState<string | null>(null);

  const clearSuccess = () => {
    setSuccess(null);
  };

  const value: SuccessContextType = {
    success,
    setSuccess,
    clearSuccess,
    hasSuccess: !!success,
  };

  return (
    <SuccessContext.Provider value={value}>
      {children}
    </SuccessContext.Provider>
  );
};



