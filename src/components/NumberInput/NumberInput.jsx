import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// input adornment
import InputAdornment from "@mui/material/InputAdornment";
// money icon
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IconButton } from "@mui/material";

function NumberInput({ label }) {
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
            label={label}
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
                    >
                        <IconButton
                            edge="end"
                            size="medium"
                            disabled={true}
                        >
                            <AttachMoneyIcon
                                fontSize="inherit"
                                style={{ color: "rgba(0, 0, 0, 0.54)" }}
                            />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default NumberInput;
