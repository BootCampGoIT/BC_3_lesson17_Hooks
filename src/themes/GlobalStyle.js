import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text}
}

 .app {
  padding: 0 20px;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

.list {
  list-style: none;
  display: flex;
  margin-right: 20px;
}

.right {
  justify-content: flex-end;
}

.listItem {
  margin-right: 20px;
}
.listItem:last-child {
  margin-right: 0;
}

.link {
  text-decoration: none;
}

.activeLink {
  color: ${(props) => props.theme.colors.main};
}

button {
  background-color: ${(props) => props.theme.colors.main};
  color: #ffffff;
  height: 30px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 50pc;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
}

label {
  font-size: 12px;
  line-height: 20px;
}

input, select {
  border: 1px solid #819ff5;
  height: 25px;
  border-radius: 50pc;
  outline: none;
  margin-bottom: 10px;
  width: 100%;
}

form {
  width: 300px;
  margin: 0 auto;
}

`;

export default GlobalStyle;
