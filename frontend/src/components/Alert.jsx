import React from "react";

const Alert = ({ type, message, description }) => {
  return (
    <div className={`alert alert-${type}`}>
      <strong>{message}</strong> - {description}
    </div>
  );
};

export default Alert;
