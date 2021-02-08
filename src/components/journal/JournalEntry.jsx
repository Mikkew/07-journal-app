import React from "react";
import { useDispatch } from "react-redux";
import { activeNote } from "../../redux/actions/notes";

export const JournalEntry = ({ id, title, body, date, url, imageName }) => {
  const dispatch = useDispatch();
  const month = date.toDate().toLocaleString("es-MX", {month: 'short'});
  const day = date.toDate().toLocaleString("es-MX", {day: 'numeric'});

  const handleClick = () => {
    dispatch( activeNote( id, {date, title, body, url, imageName} ) )
  }

  return (
    <div className="journal__entry pointer" onClick={handleClick}>
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${url})`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-body">
        <span>{month}</span>
        <h4>{day}</h4>
      </div>
    </div>
  );
};
