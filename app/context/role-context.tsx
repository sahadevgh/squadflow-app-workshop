'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'admin' | 'learner';

interface RoleContextType {
  role: Role;
  selectedLearnerId: string | null;
  setRole: (role: Role) => void;
  setSelectedLearnerId: (id: string | null) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('admin');
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const savedRole = localStorage.getItem('squadflow-role') as Role;
    const savedLearnerId = localStorage.getItem('squadflow-learner-id');
    
    if (savedRole) {
      setRole(savedRole);
    }
    if (savedLearnerId) {
      setSelectedLearnerId(savedLearnerId);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever role changes
    localStorage.setItem('squadflow-role', role);
  }, [role]);

  useEffect(() => {
    // Save to localStorage whenever selectedLearnerId changes
    if (selectedLearnerId) {
      localStorage.setItem('squadflow-learner-id', selectedLearnerId);
    } else {
      localStorage.removeItem('squadflow-learner-id');
    }
  }, [selectedLearnerId]);

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <RoleContext.Provider value={{ role, selectedLearnerId, setRole, setSelectedLearnerId }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    // Return default role context during SSR/hydration
    return {
      role: 'admin' as const,
      selectedLearnerId: null,
      setRole: () => {},
      setSelectedLearnerId: () => {},
    };
  }
  return context;
}
