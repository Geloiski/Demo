import React, { useEffect, useState } from 'react'
import { Box, Card, IconButton, Avatar, Badge, TextField, Radio, RadioGroup, FormControlLabel, MenuItem, Typography, Button, CircularProgress } from '@mui/material'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { MuiTelInput } from 'mui-tel-input'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SaveIcon from '@mui/icons-material/Save';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
//backend
import { db, storage } from '../utils/firebase';
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import moment from 'moment/moment';
import { useNavigate, useParams } from 'react-router-dom';

function Create() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [currentData, setCurrentData] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState('')
  const [image, setimage] = useState(null)
  const [birthday, setBirthday] = useState(dayjs(currentData.birthdate));
  const [mobileNum, setMobileNum] = useState('')
  const httpsReference = ref(storage, currentData.image);
  const [payload, setPayload] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    age: '',
    birthdate: '',
    address: '',
    gender: 'female',
    height: '',
    weight: '',
    status: 'single',
    religion: '',
    citizenship: '',
    occupation: '',
    languageSpoken: '',
    elementary: '',
    elementaryYearGraduated: '',
    highSchool: '',
    highSchoolYearGraduated: '',
    college: '',
    collegeYearGraduated: '',
    degree: '',
    skills: '',
    email: '',
  })

  const handleDate = (newValue) => {
    setBirthday(newValue)
    setPayload({ ...payload, birthdate: dayjs(newValue) });
  };
  const handleValidity = (newValue) => {
    setMobileNum(newValue);
  }

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
  const handleChange = (prop) => (event) => {
    setPayload({ ...payload, [prop]: event.target.value });
  };
  function handleImageChange(event) {
    console.log(event.target.files);
    setimage(event.target.files[0])
    setProfile(URL.createObjectURL(event.target.files[0]));
  }

  const handleReUpload = () => {
    if (currentData.image) {
      console.log("taas");
      setDoc(doc(db, "dataCollection", id), {
        image: profile === '' ? currentData.image : profile,
        firstname: payload.firstname === '' ? currentData.firstname : payload.firstname,
        lastname: payload.lastname === '' ? currentData.lastname : payload.lastname,
        middlename: payload.middlename === '' ? currentData.middlename : payload.middlename,
        age: payload.age === '' ? currentData.age : payload.age,
        birthdate: dayjs(payload.birthdate === '' ? currentData.birthdate : payload.birthdate).format('ll'),
        address: payload.address === '' ? currentData.address : payload.address,
        gender: payload.gender === '' ? currentData.gender : payload.gender,
        height: payload.height === '' ? currentData.height : payload.height,
        weight: payload.weight === '' ? currentData.weight : payload.weight,
        status: payload.status === '' ? currentData.status : payload.status,
        religion: payload.religion === '' ? currentData.religion : payload.religion,
        citizenship: payload.citizenship === '' ? currentData.citizenship : payload.citizenship,
        occupation: payload.occupation === '' ? currentData.occupation : payload.occupation,
        languageSpoken: payload.languageSpoken === '' ? currentData.languageSpoken : payload.languageSpoken,
        elementary: payload.elementary === '' ? currentData.elementary : payload.elementary,
        elementaryYearGraduated: payload.elementaryYearGraduated === '' ? currentData.elementaryYearGraduated : payload.elementaryYearGraduated,
        highSchool: payload.highSchool === '' ? currentData.highSchool : payload.highSchool,
        highSchoolYearGraduated: payload.highSchoolYearGraduated === '' ? currentData.highSchoolYearGraduated : payload.highSchoolYearGraduated,
        college: payload.college === '' ? currentData.college : payload.college,
        collegeYearGraduated: payload.collegeYearGraduated === '' ? currentData.collegeYearGraduated : payload.collegeYearGraduated,
        degree: payload.degree === '' ? currentData.degree : payload.degree,
        skills: payload.skills === '' ? currentData.skills : payload.skills,
        email: payload.email === '' ? currentData.email : payload.email,
        mobileNumber: mobileNum === '' ? currentData.mobileNumber : mobileNum,
      });
      navigate("/dashboard")
    }
    else if (image) {
      console.log("baba");
      const storageRef = ref(storage, `/files/${image.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          console.log(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDoc(doc(db, "dataCollection", id), {
              image: url,
              firstname: payload.firstname === '' ? currentData.firstname : payload.firstname,
              lastname: payload.lastname === '' ? currentData.lastname : payload.lastname,
              middlename: payload.middlename === '' ? currentData.middlename : payload.middlename,
              age: payload.age === '' ? currentData.age : payload.age,
              birthdate: dayjs(payload.birthdate === '' ? currentData.birthdate : payload.birthdate).format('ll'),
              address: payload.address === '' ? currentData.address : payload.address,
              gender: payload.gender === '' ? currentData.gender : payload.gender,
              height: payload.height === '' ? currentData.height : payload.height,
              weight: payload.weight === '' ? currentData.weight : payload.weight,
              status: payload.status === '' ? currentData.status : payload.status,
              religion: payload.religion === '' ? currentData.religion : payload.religion,
              citizenship: payload.citizenship === '' ? currentData.citizenship : payload.citizenship,
              occupation: payload.occupation === '' ? currentData.occupation : payload.occupation,
              languageSpoken: payload.languageSpoken === '' ? currentData.languageSpoken : payload.languageSpoken,
              elementary: payload.elementary === '' ? currentData.elementary : payload.elementary,
              elementaryYearGraduated: payload.elementaryYearGraduated === '' ? currentData.elementaryYearGraduated : payload.elementaryYearGraduated,
              highSchool: payload.highSchool === '' ? currentData.highSchool : payload.highSchool,
              highSchoolYearGraduated: payload.highSchoolYearGraduated === '' ? currentData.highSchoolYearGraduated : payload.highSchoolYearGraduated,
              college: payload.college === '' ? currentData.college : payload.college,
              collegeYearGraduated: payload.collegeYearGraduated === '' ? currentData.collegeYearGraduated : payload.collegeYearGraduated,
              degree: payload.degree === '' ? currentData.degree : payload.degree,
              skills: payload.skills === '' ? currentData.skills : payload.skills,
              email: payload.email === '' ? currentData.email : payload.email,
              mobileNumber: mobileNum === '' ? currentData.mobileNumber : mobileNum,
            });
            navigate("/dashboard")
          })
        }
      );
    }
  };

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
                {currentData.image === '' ?
                  <IconButton color="primary" aria-label="upload picture" component="label" sx={{ zIndex: 1 }}>
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
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
                        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                        <ChangeCircleIcon sx={{
                          fontSize: 52, opacity: 0.5,
                          "&:hover": {
                            opacity: 0.9
                          }
                        }} />
                      </IconButton>
                    }>
                    <Avatar
                      alt=""
                      src={profile === '' ? currentData.image : profile}
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
                    inputProps={{ sx: { textTransform: 'capitalize' } }}
                    defaultValue={currentData.firstname}
                    onChange={handleChange('firstname')}
                    sx={{ width: '180px' }}
                  />
                  <TextField
                    id="outlined-required"
                    label="Middle Name (Optional)"
                    inputProps={{ sx: { textTransform: 'capitalize' } }}
                    defaultValue={currentData.middlename}
                    onChange={handleChange('middlename')}
                    sx={{ width: '180px' }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    inputProps={{ sx: { textTransform: 'capitalize' } }}
                    defaultValue={currentData.lastname}
                    onChange={handleChange('lastname')}
                    sx={{ width: '180px' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Age"
                    defaultValue={currentData.age}
                    onChange={handleChange('age')}
                    type='number'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                        defaultValue={dayjs(currentData.birthdate)}
                        onChange={handleDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
                <TextField
                  required
                  id="outlined-required"
                  label="Address"
                  inputProps={{ sx: { textTransform: 'capitalize' } }}
                  defaultValue={currentData.address}
                  onChange={handleChange('address')}
                  sx={{ mb: 2 }}
                />
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', ml: 2 }}>Gender</Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  defaultValue={currentData.gender}
                  onChange={handleChange('gender')}
                >
                  <FormControlLabel control={<Box />} sx={{ flexGrow: .3, cursor: 'default' }} />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel control={<Box />} sx={{ flexGrow: .4, cursor: 'default' }} />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </Box>
            </Card>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'space-evenly' }}>
              <Card sx={{ width: '100%', height: '60%', mr: 5, p: 2 }} elevation={20}>
                <Box sx={{ width: '100%', height: '65%', mr: 5, display: 'flex', justifyContent: 'space-evenly' }}>
                  <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: 24, color: '#555', fontWeight: '400', mb: 1 }}>Additional Information</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                      <TextField
                        id="outlined-required"
                        label="Height(cm)"
                        defaultValue={currentData.height}
                        onChange={handleChange('height')}
                        type='number'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        sx={{ width: '210px' }}
                        size='small'
                      />
                      <TextField
                        id="outlined-required"
                        label="Weight(kg)"
                        defaultValue={currentData.weight}
                        onChange={handleChange('weight')}
                        type='number'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        sx={{ width: '210px' }}
                        size='small'
                      />
                    </Box>

                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      defaultValue={currentData.status}
                      onChange={handleChange('status')}
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
                      inputProps={{ sx: { textTransform: 'capitalize' } }}
                      defaultValue={currentData.religion}
                      onChange={handleChange('religion')}
                      sx={{ mb: 2 }}
                      size='small'
                    />
                    <TextField
                      id="outlined-required"
                      label="Citizenship"
                      inputProps={{ sx: { textTransform: 'capitalize' } }}
                      defaultValue={currentData.citizenship}
                      onChange={handleChange('citizenship')}
                      sx={{ mb: 2 }}
                      size='small'
                    />
                    <TextField
                      id="outlined-required"
                      label="Occupation"
                      inputProps={{ sx: { textTransform: 'capitalize' } }}
                      defaultValue={currentData.occupation}
                      onChange={handleChange('occupation')}
                      sx={{ mb: 2 }}
                      size='small'
                    />
                    <TextField
                      id="outlined-required"
                      label="Language Spoken"
                      defaultValue={currentData.languageSpoken}
                      onChange={handleChange('languageSpoken')}
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
                        inputProps={{ sx: { textTransform: 'capitalize' } }}
                        defaultValue={currentData.elementary}
                        onChange={handleChange('elementary')}
                        sx={{ width: '300px' }}
                        size='small'
                      />
                      <TextField
                        id="outlined-required"
                        label="Year Graduated"
                        defaultValue={currentData.elementaryYearGraduated}
                        onChange={handleChange('elementaryYearGraduated')}
                        sx={{ width: '100px' }}
                        size='small'
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                      <TextField
                        id="outlined-required"
                        label="High School"
                        inputProps={{ sx: { textTransform: 'capitalize' } }}
                        defaultValue={currentData.highSchool}
                        onChange={handleChange('highSchool')}
                        sx={{ width: '300px' }}
                        size='small'
                      />
                      <TextField
                        id="outlined-required"
                        label="Year Graduated"
                        defaultValue={currentData.highSchoolYearGraduated}
                        onChange={handleChange('highSchoolYearGraduated')}
                        sx={{ width: '100px' }}
                        size='small'
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                      <TextField
                        id="outlined-required"
                        label="College"
                        inputProps={{ sx: { textTransform: 'capitalize' } }}
                        defaultValue={currentData.college}
                        onChange={handleChange('college')}
                        sx={{ width: '300px' }}
                        size='small'
                      />
                      <TextField
                        id="outlined-required"
                        label="Year Graduated"
                        defaultValue={currentData.collegeYearGraduated}
                        onChange={handleChange('collegeYearGraduated')}
                        sx={{ width: '100px' }}
                        size='small'
                      />
                    </Box>
                    <TextField
                      id="outlined-required"
                      label="Degree Received"
                      inputProps={{ sx: { textTransform: 'capitalize' } }}
                      defaultValue={currentData.degree}
                      onChange={handleChange('degree')}
                      sx={{ mb: 2 }}
                      size='small'
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="Skills"
                      defaultValue={currentData.skills}
                      onChange={handleChange('skills')}
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
                      required
                      id="outlined-required"
                      label="Email"
                      defaultValue={currentData.email}
                      onChange={handleChange('email')}
                    />
                  </Box>
                  <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                    <MuiTelInput defaultCountry="PH" value={mobileNum === '' ? currentData.mobileNumber : mobileNum} onChange={handleValidity} label='Contact Number' required />
                  </Box>
                </Box>
              </Card>
              <Box sx={{ display: 'flex', width: '100%', p: 2 }}>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Box sx={{ width: '25%', display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button variant='contained' color='success' sx={{ width: '150px', marginX: 1 }} onClick={handleReUpload}>
                    Save <SaveIcon />
                  </Button>
                  <Button variant='contained' color='error' sx={{ width: '150px', marginX: 1 }}
                    onClick={() => {
                      if (window.confirm("Do you really want to leave?")) {
                        navigate('/dashboard')
                      }
                    }
                    }>
                    Back <DisabledByDefaultIcon sx={{ ml: 1 }} />
                  </Button>
                </Box>

              </Box>

            </Box>
          </Box>
        </Box>
      </Box >
    )
  }
}
export default Create