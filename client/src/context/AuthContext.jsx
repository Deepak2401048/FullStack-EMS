import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Best-effort hydration from localStorage (prevents runtime crash)
    const savedRole = localStorage.getItem('emsRole');
    const savedUserRaw = localStorage.getItem('emsUser');

    if (savedRole) setRole(savedRole);

    if (savedUserRaw) {
      try {
        setUser(JSON.parse(savedUserRaw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      // Minimal API; can be expanded later
      setUser,
    }),
    [user, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Fail safe: returns a default shape so pages don’t crash
    return { user: null, role: null, setUser: () => {} };
  }
  return ctx;
};
