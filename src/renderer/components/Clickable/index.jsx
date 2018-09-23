import React from "react";

const Clickable = ({ children, onClick, disabled }) => (
    <div onClick={(disabled) ? null : onClick} style={{ display: "grid" }}>
        {children}
    </div>
);

export default Clickable;
