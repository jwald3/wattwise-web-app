import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DropdownMenu = ({ label, value, options, handleChange, nullable }) => {
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label={label}
                >
                    {
                        nullable && (
                            <MenuItem value={null}>
                                <em>None</em>
                            </MenuItem>
                        )
                    }
                    {
                        options?.map((option) => (
                            <MenuItem value={option} key={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
};

export default DropdownMenu;
