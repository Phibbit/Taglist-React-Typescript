import { useState } from 'react'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Box, Button } from '@mui/material';

interface DatePickerProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}
export default function DatePicker({ date, setDate }: DatePickerProps) {
  const [label, setLabel] = useState('Set a due date')
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={date}
        minDateTime={new Date()}
        onChange={(newValue) => {
          let date = newValue?.toString()
          if (date && date < Date()) setLabel('Invalid Date')
          else setLabel('Due Date')
          setDate(newValue);
        }}
      />
      <Box position={'absolute'} bottom={-30}>
        {date &&
          <Button sx={{ fontSize: 12 }} onClick={() => {
            setDate(null)
            setLabel('Set a due date')
          }}>Clear Date</Button>
        }
      </Box>
    </LocalizationProvider>
  );
}