// import * as React from 'react';
// import { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Units } from '../../types/types';

import * as React from 'react';
// import { Theme, useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const options = Object.keys(Units);

interface DropDownProps {
  setStateFn: React.Dispatch<React.SetStateAction<string>>,
  axis: string,
  axisState: string,
}

export default function DropDown({ setStateFn, axis, axisState }:DropDownProps ) {
  const handleChange = (event: SelectChangeEvent) => {
    if(event.target.value !== null) {
      setStateFn(event.target.value);      
    }
  };
  // console.log(axisState)
  return (
    <div>
      <FormControl sx={{ m: 0, width: 200, border: 'none' }}>
        <Select
          displayEmpty
          value={axisState ? axisState : ''}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Select {axis}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
