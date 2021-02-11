import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewStudent } from "../../../redux/actions/studentsActions";
import {
  addNewStudentOperation,
  editStudentOperation,
} from "../../../redux/operations/studentsOperations";
import { StudentFormContainer } from "./StudentFormStyled";

const initialState = {
  firstName: "",
  lastName: "",
};

const StudentForm = ({
  data = { ...initialState },
  isEdit = false,
  setEditFormOpen,
}) => {
  // const students = useSelector((state) => state.students.items);
  const [state, setState] = useState({ ...data });

  const [addedStudents, setAddedStudents] = useState([]);

  const dispatch = useDispatch();

  const onHandleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = useMemo(() =>
    addedStudents.map((item) => ({
      firstName: item.firstName,
    })), [addedStudents]
  );

  useEffect(() => {
    console.log("Hello");
  }, [filteredStudents]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setAddedStudents((prev) => [...prev, state]);

    // if (isEdit) {
    //   setEditFormOpen(false);
    //   // dispatch(editStudentOperation(state));
    // } else dispatch(addNewStudentOperation(state));

    setState({ ...initialState });
  };
  const onClose = () => {
    setEditFormOpen(false);
  };

  const resetData = () => {
    setState({ ...data });
  };

  return (
    <StudentFormContainer>
      <form onSubmit={onHandleSubmit}>
        <label>
          First name
          <input
            type='text'
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
        <button type='submit'>{isEdit ? "Edit student" : "Add Student"}</button>
        <button type='button' onClick={resetData}>
          Reset
        </button>
        {isEdit && (
          <>
            <button type='button' onClick={onClose}>
              Close
            </button>
          </>
        )}
      </form>
      <ul>
        {filteredStudents.map((item, idx) => (
          <li key={idx}>{item.firstName}</li>
        ))}
      </ul>
    </StudentFormContainer>
  );
};

export default StudentForm;
