import * as yup from 'yup';
import { Autocomplete } from '@react-google-maps/api';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Formik } from 'formik';
import { PlanFormInterface, PlanInterface } from '../../interfaces';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import styles from './styles/PlanCreatorDrawer.module.css';
import usePlansStore from '../../store/PlansStore';

export default function Form() {
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { plans, setPlans } = usePlansStore((state) => ({
    plans: state.plans,
    setPlans: state.setPlans,
  }));
  const createPlan = httpsCallable(getFunctions(), 'createPlan');

  const initialValues: PlanFormInterface = {
    title: '',
    duration: 0,
    startTime: new Date(),
    isPrivate: false,
    locationName: '',
    locationCoords: { lat: 0, lng: 0 },
    charges: 0,
    otherDetails: '',
    maxAttendees: 0,
  };

  const validationSchema = yup.object({
    title: yup.string().required(),
    duration: yup.number().required().min(0),
    startTime: yup.date().required(),
    isPrivate: yup.boolean().required(),
    locationName: yup.string().required(),
    locationCoords: yup.object({
      lat: yup.number().required(),
      lng: yup.number().required(),
    }),
    charges: yup.number().required().min(0),
    otherDetails: yup.string(),
    maxAttendees: yup.number().required().min(0),
  });

  const onSubmit = async (values: PlanFormInterface) => {
    createPlan({
      title: values.title,
      duration: values.duration,
      startTime: values.startTime,
      isPrivate: values.isPrivate,
      location: {
        name: values.locationName,
        coordinates: values.locationCoords,
      },
      charges: values.charges,
      otherDetails: values.otherDetails,
    })
      .then((plan) => {
        toast('Plan created successfully!');
        setPlans([...plans, plan.data as PlanInterface]);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Some error creating Plan...');
      });
  };

  return (
    <Box className={styles.container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, handleSubmit, handleChange, touched, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label='Title'
                name='title'
                variant='outlined'
                fullWidth
                defaultValue={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={errors.title}
              />

              <TextField
                label='Duration'
                name='duration'
                variant='outlined'
                fullWidth
                defaultValue={values.duration}
                onChange={handleChange}
                error={touched.duration && Boolean(errors.duration)}
                helperText={
                  touched.duration && Boolean(errors.duration)
                    ? String(errors.duration)
                    : 'In hours'
                }
                InputProps={{
                  endAdornment: <InputAdornment position='start'>h</InputAdornment>,
                }}
              />

              <DateTimePicker
                label='Start Time'
                onChange={(value) => setFieldValue('startTime', value, true)}
                value={values.startTime}
                renderInput={(params) => (
                  <TextField
                    name='startTime'
                    variant='outlined'
                    fullWidth
                    error={touched.startTime && Boolean(errors.startTime)}
                    helperText={
                      touched.startTime && Boolean(errors.startTime) ? String(errors.startTime) : ''
                    }
                    {...params}
                  />
                )}
              />

              <Autocomplete
                onLoad={setAutoComplete}
                onPlaceChanged={() => {
                  const lat = autoComplete?.getPlace()?.geometry?.location?.lat();
                  const lng = autoComplete?.getPlace()?.geometry?.location?.lng();
                  setFieldValue('locationCoords', { lat, lng });
                }}
              >
                <TextField
                  label='Venue'
                  name='locationName'
                  variant='outlined'
                  fullWidth
                  defaultValue={values.locationName}
                  onChange={handleChange}
                  error={touched.locationName && Boolean(errors.locationName)}
                  helperText={errors.locationName}
                />
              </Autocomplete>

              <TextField
                label='Charges'
                name='charges'
                variant='outlined'
                type='number'
                fullWidth
                defaultValue={values.charges}
                onChange={handleChange}
                error={touched.charges && Boolean(errors.charges)}
                helperText={
                  touched.charges && Boolean(errors.charges)
                    ? String(errors.charges)
                    : 'Charges for entire duration'
                }
                InputProps={{
                  startAdornment: <InputAdornment position='start'>€</InputAdornment>,
                }}
              />

              <TextField
                type='number'
                label='Max Attendeed'
                name='maxAttendees'
                variant='outlined'
                fullWidth
                defaultValue={values.maxAttendees}
                onChange={handleChange}
                error={touched.maxAttendees && Boolean(errors.maxAttendees)}
                helperText={errors.maxAttendees}
              />

              <TextField
                label='Other Details'
                name='otherDetails'
                variant='outlined'
                fullWidth
                defaultValue={values.otherDetails}
                onChange={handleChange}
                error={touched.otherDetails && Boolean(errors.otherDetails)}
                helperText={errors.otherDetails}
              />

              <Box className={styles.switch}>
                <FormControlLabel
                  label='Is Private?'
                  name='isPrivate'
                  labelPlacement='start'
                  value={values.isPrivate}
                  control={<Switch />}
                  onChange={handleChange}
                />
              </Box>

              <Button variant='contained' type='submit'>
                Create
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
