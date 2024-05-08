import Style from './agecal.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

const AgeCal = () => {
    const currentDate = dayjs(); // Get the current date
    const [fromDate, setFromDate] = useState(null); // Initialize fromDate as null
    const [ageYears, setAgeYears] = useState(null); // Initialize ageYears as null
    const [ageMonths, setAgeMonths] = useState(null); // Initialize ageMonths as null
    const [ageDays, setAgeDays] = useState(null); // Initialize ageDays as null

    const handleDateChange = (newValue) => {
        setFromDate(newValue); // Update fromDate state
    };

    const isButtonDisabled = !fromDate; // Button is disabled if fromDate is null

    const currentageHandler = () => {
        if (fromDate) {
            const age = dayjs().diff(fromDate, 'year'); // Calculate years difference
            const remainingMonths = dayjs().diff(fromDate.add(age, 'year'), 'month'); // Calculate remaining months
            const remainingDays = dayjs().diff(fromDate.add(age, 'year').add(remainingMonths, 'month'), 'day'); // Calculate remaining days
            setAgeYears(age);
            setAgeMonths(remainingMonths);
            setAgeDays(remainingDays);
        }
    };

    return (
        <div className={Style.container}>
            <div className={Style.boxcont}>
                <div className={Style.heading}>Age calculator</div>
                <center className={Style.selectext}>select your birth date :</center>
                <br />
                <div className={Style.dateparent}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date of Birth"
                                value={fromDate}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Date of Birth" />
                                )}
                                slotProps={{ textField: { size: 'small' } }}
                                maxDate={currentDate}
                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                        <button onClick={currentageHandler} disabled={isButtonDisabled} style={{ cursor: isButtonDisabled ? 'not-allowed' : 'pointer' }}>calculate age</button>
                    </div>
                </div>
                <br /><br /><hr />
                <center>
                    {
                        ageYears || ageMonths || ageDays ? 
                        <>
                                <div><span className={Style.numb}>{ageYears}</span> <span className={Style.mont}>Years</span> </div>
                                <div><span className={Style.numb}>{ageMonths}</span> <span className={Style.mont}>Months</span> </div>
                                <div><spam className={Style.numb}>{ageDays}</spam> <span className={Style.mont}>Days</span> </div>
                        </>
 
                            : <>
                                <center className={Style.loader}></center>
                            </>
                    }

                </center>
            </div>
            <center className={Style.copyrights}>© Design by Gaganraj</center>
            
        </div>
    );
};

export default AgeCal;
