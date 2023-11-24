import React from "react";
import "./Button.css";

export default function ({ children, type, onClick, label }) {
    return (
        <button className="button" type={type} onClick={onClick}>
            {label || children}
        </button>
    );
}
