import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../redux/actions/auth";
import { startNewNote } from "../../redux/actions/notes";
import { JournalEntries } from "./JournalEntries";

export const SideBar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    console.log("logout");
    dispatch(startLogout());
  };

  const handleNewAdd = () => {
    dispatch( startNewNote() );
  }

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mb-5">
          <i className="far fa-moon mt-5"></i>
          <span> {name}</span>
        </h3>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="journal__new-entry" onClick={handleNewAdd}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New Entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
