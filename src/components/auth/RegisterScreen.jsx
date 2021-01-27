import React from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../redux/actions/ui";
import { startRegisterWithEmailPasswordName } from "../../redux/actions/auth";

export const RegisterScreen = () => {
  const [
    { name, lastName, email, password, confirm },
    handleInputChange,
  ] = useForm({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const dispatch = useDispatch();
  const {msgError} = useSelector(state => state.ui);

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Formulario Correcto");
      dispatch( startRegisterWithEmailPasswordName(name, lastName, email, password));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch( setError("El Nombre es requerido") );
      return false;
    } else if (lastName.trim().length === 0) {
      dispatch( setError("El Apellido es requerido") );
      return false;
    } else if (!validator.isEmail(email.trim())) {
      dispatch(setError("No es un email"));
      return false;
    } else if (!validator.equals(password, confirm)) {
      dispatch(setError("Las contraseñas no son iguales"));
      return false;
    } else if( password.trim().length < 5){
      dispatch(setError("Las contraseña no puede ser menos de 6 caracteres"));
      return false;
    }
    dispatch( removeError() );
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        { msgError && 
          <div className="auth__alert-error">
            {msgError}
          </div>
        }
        <input
          className="auth__input mt-1"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="auth__input mt-1"
          type="text"
          placeholder="LastName"
          name="lastName"
          autoComplete="off"
          value={lastName}
          onChange={handleInputChange}
        />
        <input
          className="auth__input mt-1"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input mt-1"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          className="auth__input mt-1 mb-5"
          type="password"
          placeholder="Confirm Password"
          name="confirm"
          value={confirm}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mt-1 mb-5">
          Register
        </button>
        <Link to="/auth/login" className="link">
          {"¿Ya está registrado?"}
        </Link>
      </form>
    </>
  );
};
