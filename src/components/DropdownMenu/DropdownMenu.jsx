import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import './DropdownMenu.css';  // <-- Import the CSS file

const DropdownMenu = ({
    label,
    value,
    options,
    handleChange,
    nullable,
    minWidth,
}) => {
    return (
        <div className="dropdown-container">
            <FormControl 
                variant="standard" 
                className="dropdown-control" 
                // reduce minWidth by .8 if on screen < 1000px
                style={{ minWidth: (window.innerWidth <= 1200 ? minWidth *.8 : minWidth) }}
            >
                <InputLabel id="demo-simple-select-standard-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label={label}
                    className="dropdown-select"
                >
                    {nullable && (
                        <MenuItem value={null} className="dropdown-menu-item-emphasized">
                            <em>None</em>
                        </MenuItem>
                    )}
                    {options?.map((option) => (
                        <MenuItem
                            value={option.value}
                            key={option.value}
                            className="dropdown-menu-item"
                        >
                            {option.display}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DropdownMenu;
