import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DropdownMenu = ({
    label,
    value,
    options,
    handleChange,
    nullable,
    minWidth,
}) => {
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: minWidth }}>
                <InputLabel id="demo-simple-select-standard-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label={label}
                    style={{ fontSize: 14 }}
                >
                    {nullable && (
                        <MenuItem value={null} style={{ fontSize: 16 }}>
                            <em>None</em>
                        </MenuItem>
                    )}
                    {options?.map((option) => (
                        <MenuItem
                            value={option.value}
                            key={option.value}
                            style={{ fontSize: 16 }}
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
