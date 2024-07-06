import React, { createContext, useState } from 'react';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(null);

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
};
