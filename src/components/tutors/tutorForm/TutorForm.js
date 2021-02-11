import React, { useState, useReducer } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { addNewTutorOperation } from "../../../redux/operations/tutorOperations";
import { getTutorsIsLoading } from "../../../redux/selectors/tutorsSelectors";
import { TutorFormContainer } from "./TutorFormStyled";

const stackOptions = ["HTML", "Java Script", "React", "Node"];
const positionOptions = ["Mentor", "Tutor", "Manager"];

const initialState = {
  firstName: "",
  lastName: "",
  stack: "HTML",
  position: "Mentor",
};

const reducer = (state, { type, payload = "" }) => {
  switch (type) {
    case "firstName":
      return { ...state, firstName: payload };
    case "lastName":
      return { ...state, lastName: payload };
    case "stack":
      return { ...state, stack: payload };
    case "position":
      return { ...state, position: payload };
    case "resetData":
      return { ...initialState };

    default:
      return state;
  }
};

const TutorForm = ({ isLoading }) => {
  const [state, setState] = useReducer(reducer, initialState);

  // const isLoading = useSelector(getTutorsIsLoading);

  // const [state, setState] = useState({ ...initialState });
  const dispatch = useDispatch();

  const onHandleChange = (evt) => {
    const { name, value } = evt.target;
    setState({ type: name, payload: value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewTutorOperation(state));
    // dispatch(addNewTutor(state, tutors));
    setState({ type: "resetData" });
  };

  return (
    <TutorFormContainer>
      {isLoading && <h2>...Send data</h2>}
      <form onSubmit={onHandleSubmit}>
        <label>
          First name
          <input
            type='text'
            data-id=""
            value={state.firstName}
            onChange={onHandleChange}
            name='firstName'
          />
        </label>
        <label>
          Last name
          <input
            type='text'
            value={state.lastName}
            onChange={onHandleChange}
            name='lastName'
          />
        </label>
        <label>
          Stack
          <select value={state.stack} onChange={onHandleChange} name='stack'>
            {stackOptions.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Position
          <select
            value={state.position}
            onChange={onHandleChange}
            name='position'>
            {positionOptions.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button type='submit'>Add Tutor</button>
      </form>
    </TutorFormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    // isLoading: state.tutors.isLoading
    isLoading: getTutorsIsLoading(state),
  };
};

export default connect(mapStateToProps)(TutorForm);
