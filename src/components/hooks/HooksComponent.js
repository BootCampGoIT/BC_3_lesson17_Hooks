import axios from "axios";
import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useMemo,
} from "react";
import { myMessage, myTheme } from "../App";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      return state;
  }
};

const HooksComponent = () => {
  //reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  const ref = useRef("");
  const ref1 = useRef(null);

  //context
  const message = useContext(myMessage);
  const themeValue = useContext(myTheme);
  //state
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [result, setResult] = useState({});

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onAddValue = () => {
    setData((prevData) => [...prevData, value]);
    setValue("");
  };

  const getResult = useMemo(() => {
    return ;
  }, [result]);

  useEffect(() => {
    console.log("DATA");
  }, [result]);

  const getStudents = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/students.json`
    );
    const students = Object.keys(response.data).map((key) => ({
      ...response.data[key],
      id: key,
    }));

    return students;
  };

  const deleteItem = (e) => {
    const { id } = e.target;
    setStudents((prevStudents) => [
      ...prevStudents.filter((element) => element.id !== id),
    ]);
  };

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
    return () => {
      console.log("component will unmount");
    };
  }, []);

  useEffect(() => {}, []);

  const handleChangeRef = (e) => {
    ref.current = ref1.current.value;
    console.log("ref.current :>> ", ref.current);
  };

  return (
    <div>
      <h2>useReducer</h2>
      <h4>Count: {state.count}</h4>
      <button
        type='button'
        onClick={() => dispatch({ type: "increment", payload: 1 })}>
        +
      </button>
      <button
        type='button'
        onClick={() => dispatch({ type: "decrement", payload: 1 })}>
        -
      </button>

      <h4>========================</h4>

      <button type='button' onClick={() => setResult({ value: 20 })}>
        GET RESULT {getResult}
      </button>

      <h4>========================</h4>
      <h2>useRef</h2>
      {/* <h4>Value: {ref.current}</h4> */}
      <input ref={ref1} type='text' onChange={handleChangeRef} />

      <h4>========================</h4>

      <h2>Hooks</h2>

      <h3>Value: {value}</h3>
      <h3>Message: {message.text}</h3>
      <h3>Theme Value: {themeValue.theme}</h3>

      <input type='text' onChange={handleChange} value={value} />

      <button type='button' onClick={onAddValue}>
        Add
      </button>
      <ul>
        {students.map((element) => (
          <li key={element.id}>
            <span>{element.firstName}</span>
            <button id={element.id} type='button' onClick={deleteItem}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HooksComponent;
