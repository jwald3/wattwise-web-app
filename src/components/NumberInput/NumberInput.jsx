import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// input adornment
import InputAdornment from "@mui/material/InputAdornment";
// money icon
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IconButton } from "@mui/material";

function NumberInput() {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const pattern = /^([0-9](\.[0-9]{0,3})?)?$/;

        if (pattern.test(inputValue)) {
            setValue(inputValue);
        }
    };

    return (
        <TextField
            label="Rate"
            placeholder="x.xxx" // Placeholder text
            value={value}
            onChange={handleChange}
            inputProps={{
                maxLength: 5,
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment 
                        position="end"
                        classes={{
                            root: "MuiInputAdornment-root MuiInputAdornment-positionEnd MuiInputAdornment-outlined MuiInputAdornment-sizeMedium",
                        }}
                    >
                        <IconButton edge="end" size="medium">
                            <AttachMoneyIcon fontSize="inherit" classes={{root: "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"}} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default NumberInput;
