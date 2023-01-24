import { Units } from '../../types/types';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './styles/DropDown.module.scss';

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
  setStateFn: React.Dispatch<React.SetStateAction<string>>;
  axis: string;
  axisState: string;
}

// dropdown for customizable graphs
export default function DropDown({
  setStateFn,
  axis,
  axisState,
}: DropDownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value !== null) {
      setStateFn(event.target.value);
    }
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 150 }}>
        <Select
          displayEmpty
          value={axisState ? axisState : ''}
          onChange={handleChange}
          MenuProps={MenuProps}
          sx={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <MenuItem
            disabled
            value=''
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <em>Select {axis}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
