import { createContext, useState, useEffect, useContext } from "react";

const ProductContext = createContext({});

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log(userInfo);
  });

  return (
    <ProductContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </ProductContext.Provider>
  );
};

const useAppContext = () => useContext(ProductContext);

export { useAppContext };

export default AppProvider;
