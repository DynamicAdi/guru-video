import { useState, useEffect, useContext, createContext } from "react";

const ArrayContext = createContext();

export const useArray = () => useContext(ArrayContext);

export const ArrayProvider = ({ children }) => {
  const [myArray, setMyArray] = useState([]);
  // console.log(myArray);

  useEffect(() => {
    const savedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    setMyArray(savedArray);
  }, []);

  useEffect(() => {
    localStorage.setItem("myArray", JSON.stringify(myArray));
  }, [myArray]);

  const addToArray = (newItem) => {
    setMyArray((prevArray) => [...prevArray, newItem]);
  };
  const removeFromArray = (id) => {
    setMyArray((prevArray) => {
      return prevArray.filter((item) => item !== id);
    });
  };

  const isInArray = (id) => {
    return myArray.includes(id)
  };

  return (
    <ArrayContext.Provider
      value={{ myArray, addToArray, removeFromArray, isInArray }}
    >
      {children}
    </ArrayContext.Provider>
  );
};
