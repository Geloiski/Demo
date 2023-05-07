import React, { useState } from 'react'
import { Box, Card, IconButton, Avatar, Badge, TextField, Radio, RadioGroup, FormControlLabel, MenuItem, Typography } from '@mui/material'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import remy from '../1.jpg'
function View() {
    const [profile, setProfile] = useState('')
    const [birthDate, setBirthDate] = useState(new Date('2014-08-18'));
    const currencies = [
        {
            value: 'single',
            label: 'Single',
        },
        {
            value: 'married',
            label: 'Married',
        },
        {
            value: 'divorced',
            label: 'Divorced',
        },
        {
            value: 'separated',
            label: 'Separated',
        },
        {
            value: 'widowed',
            label: 'Widowed',
        },
    ];
    const [value, setValue] = useState('')

    const handleChange = (newValue) => {
        setValue(newValue)
    }
    return (
        <Box sx={{ width: '100%', backgroundColor: '#e5e5e5' }}>
            <Box sx={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <Card sx={{ width: '30%', height: '70vh', mr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', p: 2, flexDirection: 'column' }} elevation={20}>
                        <Box sx={{ display: 'flex', height: '30%', mb: 5, mt: 5 }}>
                            {profile === '' ?
                                <IconButton color="primary" aria-label="upload picture" component="label" sx={{ zIndex: 1 }}>
                                    <input hidden accept="image/*" type="file" />
                                    <Avatar
                                        sx={{ width: 200, height: 200 }}
                                    >
                                        <AddAPhotoIcon sx={{ fontSize: 52 }} />
                                    </Avatar>
                                </IconButton>
                                :
                                <Badge overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <IconButton color="primary" aria-label="upload picture" component="label" sx={{ zIndex: 1 }}>
                                            <input hidden accept="image/*" type="file" />
                                            <ChangeCircleIcon sx={{
                                                fontSize: 52, opacity: 0.5,
                                                "&:hover": {
                                                    opacity: 0.9
                                                }
                                            }} />
                                        </IconButton>
                                    }>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={remy}
                                        sx={{
                                            width: 200, height: 200,
                                        }}
                                    />
                                </Badge>}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="First Name"
                                    sx={{ width: '180px' }}
                                />
                                <TextField
                                    id="outlined-required"
                                    label="Middle Name (Optional)"
                                    sx={{ width: '180px' }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Last Name"
                                    sx={{ width: '180px' }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Age"
                                    sx={{ width: '45%', mt: 1, mb: 2 }}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DesktopDatePicker
                                            required
                                            label="Birthdate"
                                            inputFormat="MM/dd/yyyy"
                                            maxDate={dayjs()}
                                            minDate={dayjs('1900-01-01')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <TextField
                                required
                                id="outlined-required"
                                label="Address"
                                sx={{ mb: 2 }}
                            />
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold', ml: 2 }}>Gender</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel control={<Box />} sx={{ flexGrow: .3, cursor: 'default' }} />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel control={<Box />} sx={{ flexGrow: .4, cursor: 'default' }} />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </Box>
                    </Card>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'space-evenly' }}>
                        <Card sx={{ width: '100%', height: '65%', mr: 5, p: 2 }} elevation={20}>
                            <Box sx={{ width: '100%', height: '65%', mr: 5, display: 'flex', justifyContent: 'space-evenly' }}>
                                <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ mb: 1 }}>Additional Information</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                        <TextField
                                            id="outlined-required"
                                            label="Height(cm)"
                                            sx={{ width: '180px' }}
                                        />
                                        <TextField
                                            id="outlined-required"
                                            label="Weight(kg)"
                                            sx={{ width: '180px' }}
                                        />
                                    </Box>

                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Select"
                                        defaultValue="single"
                                        sx={{ mb: 2 }}
                                    >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="outlined-required"
                                        label="Religion"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Citizenship"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Occupation"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Language Spoken"
                                        helperText='Please seperate by ","'
                                        sx={{ mb: 2 }}
                                    />
                                </Box>
                                <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ mb: 1 }}>Educational Background</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                        <TextField
                                            id="outlined-required"
                                            label="Elementary"
                                            sx={{ width: '300px' }}
                                        />
                                        <TextField
                                            id="outlined-required"
                                            label="Year Graduated"
                                            sx={{ width: '100px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                        <TextField
                                            id="outlined-required"
                                            label="High School"
                                            sx={{ width: '300px' }}
                                        />
                                        <TextField
                                            id="outlined-required"
                                            label="Year Graduated"
                                            sx={{ width: '100px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                        <TextField
                                            id="outlined-required"
                                            label="College"
                                            sx={{ width: '300px' }}
                                        />
                                        <TextField
                                            id="outlined-required"
                                            label="Year Graduated"
                                            sx={{ width: '100px' }}
                                        />
                                    </Box>
                                    <TextField
                                        id="outlined-required"
                                        label="Degree Received"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Skills"
                                        multiline
                                        rows={4}
                                    />
                                </Box>
                            </Box>
                        </Card>
                        <Card sx={{ width: '100%', height: '25%', mr: 5, p: 2 }} elevation={20}>
                            <Typography sx={{ mb: 2 }}>Contact Information</Typography>
                            <Box sx={{ width: '100%', height: '25%', mr: 5, display: 'flex', justifyContent: 'space-evenly' }}>
                                <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Email"
                                    />
                                </Box>
                                <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                    <MuiTelInput defaultCountry="PH" value={value} onChange={handleChange} label='Contact Number' />
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default View