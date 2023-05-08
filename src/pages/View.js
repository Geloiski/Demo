import React, { useEffect, useState } from 'react'
import { Box, Card, Avatar, TextField, Radio, RadioGroup, FormControlLabel, MenuItem, Typography, Button, CircularProgress } from '@mui/material'
import dayjs from 'dayjs';
import { MuiTelInput } from 'mui-tel-input'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//backend
import { db } from '../utils/firebase';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';

function View() {
    let { id, name } = useParams();
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentData, setCurrentData] = useState({})

    const civilStatus = [
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

    const handleBack = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const docRef = doc(db, "dataCollection", id);
            const docSnap = await getDoc(docRef);
            setCurrentData(docSnap.data())
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }
        fetchData()
    }, [id])

    if (isLoading === true) {
        return (
            <Box style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
                <CircularProgress color="secondary" size={100} />
            </Box>
        )
    } else {
        return (
            <Box sx={{ width: '100%', backgroundColor: '#e5e5e5' }}>
                <Box sx={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <Card sx={{ width: '30%', height: '70vh', mr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', p: 2, flexDirection: 'column' }} elevation={20}>
                            <Box sx={{ display: 'flex', height: '30%', mb: 5, mt: 5 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={currentData.image}
                                    sx={{
                                        width: 200, height: 200,
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 5 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                    <TextField
                                        id="outlined-required"
                                        label="First Name"
                                        inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                        value={currentData.firstname}
                                        sx={{ width: '180px' }}
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Middle Name (Optional)"
                                        inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                        value={currentData.middlename}
                                        sx={{ width: '180px' }}
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Last Name"
                                        inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                        value={currentData.lastname}
                                        sx={{ width: '180px' }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TextField
                                        id="outlined-required"
                                        label="Age"
                                        value={currentData.age}
                                        type='number'
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', color: '#fff', readOnly: true }}
                                        sx={{ width: '45%', mt: 1, mb: 2 }}
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Birthday"
                                        value={currentData.birthdate}
                                        inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                        sx={{ width: '45%', mt: 1, mb: 2 }}
                                    />
                                </Box>
                                <TextField
                                    id="outlined-required"
                                    label="Address"
                                    inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                    value={currentData.address}
                                    sx={{ mb: 2 }}
                                />
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold', ml: 2 }}>Gender</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={currentData.gender}
                                >
                                    <FormControlLabel control={<Box />} sx={{ flexGrow: .3, cursor: 'default' }} />
                                    <FormControlLabel value="female" control={<Radio inputProps={{ readOnly: true }} />} label="Female" />
                                    <FormControlLabel control={<Box />} sx={{ flexGrow: .4, cursor: 'default' }} />
                                    <FormControlLabel value="male" control={<Radio inputProps={{ readOnly: true }} />} label="Male" />
                                </RadioGroup>
                            </Box>
                        </Card>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'space-evenly' }}>
                            <Box sx={{ display: 'flex', width: '100%', p: 2 }}>
                                <Box sx={{ flexGrow: 1 }}></Box>
                                <Button variant='contained' color='warning' sx={{ width: '150px', marginX: 1 }} onClick={() => handleBack()}>
                                    <ArrowBackIcon /> Back
                                </Button>
                            </Box>
                            <Card sx={{ width: '100%', height: '60%', mr: 5, p: 2 }} elevation={20}>
                                <Box sx={{ width: '100%', height: '65%', mr: 5, display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontSize: 24, color: '#555', fontWeight: '400', mb: 1 }}>Additional Information</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                            <TextField
                                                id="outlined-required"
                                                label="Height(cm)"
                                                value={currentData.height}
                                                inputProps={{ readOnly: true }}
                                                sx={{ width: '210px' }}
                                                size='small'
                                            />
                                            <TextField
                                                id="outlined-required"
                                                label="Weight(kg)"
                                                value={currentData.weight}
                                                inputProps={{ readOnly: true }}
                                                sx={{ width: '210px' }}
                                                size='small'
                                            />
                                        </Box>

                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Select"
                                            value={currentData.status}
                                            inputProps={{ readOnly: true }}
                                            sx={{ mb: 2 }}
                                            size='small'
                                        >
                                            {civilStatus.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            id="outlined-required"
                                            label="Religion"
                                            inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                            value={currentData.religion}
                                            sx={{ mb: 2 }}
                                            size='small'
                                        />
                                        <TextField
                                            id="outlined-required"
                                            label="Citizenship"
                                            inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                            value={currentData.citizenship}
                                            sx={{ mb: 2 }}
                                            size='small'
                                        />
                                        <TextField
                                            id="outlined-required"
                                            label="Occupation"
                                            inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                            value={currentData.occupation}
                                            sx={{ mb: 2 }}
                                            size='small'
                                        />
                                        <TextField
                                            id="outlined-required"
                                            label="Language Spoken"
                                            value={currentData.languageSpoken}
                                            inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                            helperText='Please seperate by ","'
                                            sx={{ mb: 2 }}
                                            size='small'
                                        />
                                    </Box>
                                    <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontSize: 24, color: '#555', fontWeight: '400', mb: 1 }}>Educational Background</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                            <TextField
                                                id="outlined-required"
                                                label="Elementary"
                                                inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                                value={currentData.elementary}
                                                sx={{ width: '300px' }}
                                                size='small'
                                            />
                                            <TextField
                                                id="outlined-required"
                                                label="Year Graduated"
                                                value={currentData.elementaryYearGraduated}
                                                inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                                sx={{ width: '100px' }}
                                                size='small'
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                            <TextField
                                                id="outlined-required"
                                                label="High School"
                                                inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                                value={currentData.highSchool}
                                                sx={{ width: '300px' }}
                                                size='small'
                                            />
                                            <TextField
                                                id="outlined-required"
                                                label="Year Graduated"
                                                value={currentData.highSchoolYearGraduated}
                                                inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                                sx={{ width: '100px' }}
                                                size='small'
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                                            <TextField
                                                id="outlined-required"
                                                label="College"
                                                inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                                value={currentData.college}
                                                sx={{ width: '300px' }}
                                                size='small'
                                            />
                                            <TextField
                                                id="outlined-required"
                                                label="Year Graduated"
                                                value={currentData.collegeYearGraduated}
                                                inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                                sx={{ width: '100px' }}
                                                size='small'
                                            />
                                        </Box>
                                        <TextField
                                            id="outlined-required"
                                            label="Degree Received"
                                            inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                            value={currentData.degree}
                                            sx={{ mb: 2 }}
                                            size='small'
                                        />
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Skills"
                                            value={currentData.skills}
                                            inputProps={{ sx: { textTransform: 'capitalize' }, readOnly: true }}
                                            multiline
                                            size='small'
                                            rows={4}
                                        />
                                    </Box>
                                </Box>
                            </Card>
                            <Card sx={{ width: '100%', height: '20%', mr: 5, p: 2, mt: 1 }} elevation={10}>
                                <Typography sx={{ mb: 2, fontSize: 24, color: '#555', fontWeight: '400' }}>Contact Information</Typography>
                                <Box sx={{ width: '100%', mr: 5, display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                        <TextField
                                            id="outlined-required"
                                            label="Email"
                                            value={currentData.email}
                                            inputProps={{ readOnly: true }}
                                        />
                                    </Box>
                                    <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                                        <MuiTelInput defaultCountry="PH" value={currentData.mobileNumber} inputProps={{ readOnly: true }} label='Contact Number' />
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Box >
        )
    }
}
export default View