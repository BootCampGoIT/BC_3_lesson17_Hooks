import { useState, useEffect } from "react";

// const light = { color: "white" };
// const dark = { color: "black" };
// key = "theme";

const getColorTheme = (key, initialState) => {
  const storageValue = localStorage.getItem(key);
  if (storageValue) {
    return JSON.parse(storageValue);
  } else return initialState;
};




const usePersitedTheme = (key, initialState) => {
    
  const [state, setState] = useState(getColorTheme(key, initialState));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default usePersitedTheme;

// const [state, setState] = usePersitedTheme()
