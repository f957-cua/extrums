import React from "react";
import "./index.css";

interface INotify {
    message: String,
}

const Notify: React.FC<INotify> = ({ message }) => (
    <div className="notify-container">
        <p>{message}</p>
    </div>)

export default Notify;