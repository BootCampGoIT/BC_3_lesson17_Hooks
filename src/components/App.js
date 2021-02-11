import React, { useEffect, createContext } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../themes/GlobalStyle";

import { useDispatch } from "react-redux";

import { getStudentsOperation } from "../redux/operations/studentsOperations";
import { getTutorsOperation } from "../redux/operations/tutorOperations";
import Navigation from "./navigation/Navigation";
import { useSelector } from "react-redux";
import light from "../themes/light";
import usePersitedTheme from "../hooks/persistedTheme";
import dark from "../themes/dark";

export const myMessage = createContext({ text: "hello" }); //{text: "hello"}
export const myTheme = createContext({ theme: "light" });

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getTutorsOperation());
      dispatch(getStudentsOperation());
    }
    // eslint-disable-next-line
  }, []);

  const [theme, setTheme] = usePersitedTheme("theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        <button type='button' onClick={toggleTheme}>
          Check color
        </button>
      </ThemeProvider>
    </div>
  );
};

export default App;

// const getSomething = () => {
//   const arg = 5;
//   return () => {
//     console.log(arg);
//   };
// };

// const newFunc = getSomething();

// newFunc()
// newFunc()

// =======================================
// let i = 10;
// let q = 0;

// const reqursion = () => {
//   if (i !== q) {
//     q += 1;
//     console.log(q);
//     reqursion();
//   }
// };

// reqursion();
