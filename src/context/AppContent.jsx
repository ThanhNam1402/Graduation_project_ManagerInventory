import { createContext, useState, useEffect, useContext } from "react";

const AppContent = createContext({});

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {});

  return (
    <AppContent.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AppContent.Provider>
  );
};

const useAppContext = () => useContext(AppContent);

// eslint-disable-next-line react-refresh/only-export-components
export { useAppContext };
export default AppProvider;
