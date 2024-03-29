import React, { useState, ChangeEvent } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormGroup,
  Checkbox,
  Button,
  Box,
  InputLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { SelectChangeEvent } from '@mui/material/Select'
import todoType from './types'

export default function InputDialog() {
  const [open, setOpen] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [ownerError, setOwnerError] = useState(false)
  const [durationError, setDurationError] = useState(false)
  const [dayError, setDayError] = useState(false)
  const [time, setTime] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  })

  const initialValues = {
    todo_id: '',
    description: '',
    owner: '',
    priority: 'Low',
    day: '',
    morning: false,
    afternoon: false,
    evening: false,
    completed: false,
    duration: '',
  }

  const [formValues, setFormValues] = useState<todoType>(initialValues)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const {
      description,
      owner,
      priority,
      day,
      morning,
      afternoon,
      evening,
      duration,
    } = formValues
    setDescriptionError(false)
    setOwnerError(false)
    setDayError(false)
    setDurationError(false)

    if (formValues.description === '') {
      setDescriptionError(true)
    }
    if (formValues.owner === '') {
      setOwnerError(true)
    }
    if (formValues.day === '') {
      setDayError(true)
    }
    if (formValues.duration === '') {
      setDurationError(true)
    }

    if (
      formValues.description &&
      formValues.owner &&
      formValues.day &&
      formValues.duration
    ) {
      try {
        const body = {
          description,
          owner,
          priority,
          day,
          morning,
          afternoon,
          evening,
          duration,
        }
        await fetch('http://localhost:5000/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        // window.location.href = "/";
        window.location.reload()
      } catch (error: any) {
        console.error(error.message)
      }
      setFormValues(initialValues)
      handleClose()
    }
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormValues({
      ...formValues,
      ['day']: e.target.value,
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime({ ...time, [event.target.name]: event.target.checked as boolean })
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    })
  }

  const { morning, afternoon, evening } = time

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        style={{
          backgroundColor: 'green',
          margin: '5px',
        }}
      >
        + New Todo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Input New Todo</DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={onSubmitForm}>
            <Grid container alignItems="center" direction="column">
              <TextField
                id="description"
                name="description"
                type="text"
                margin="normal"
                label="Todo description"
                variant="outlined"
                sx={{ width: 400 }}
                required
                error={descriptionError}
                value={formValues.description}
                onChange={handleInputChange}
              />
              <TextField
                id="owner"
                name="owner"
                label="Enter owner"
                type="text"
                sx={{ width: 400 }}
                required
                error={ownerError}
                value={formValues.owner}
                onChange={handleInputChange}
              />
              <br />
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <RadioGroup
                  name="priority"
                  value={formValues.priority}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    key="Low"
                    value="Low"
                    control={<Radio size="small" />}
                    label="Low"
                  />
                  <FormControlLabel
                    key="Medium"
                    value="Medium"
                    control={<Radio size="small" />}
                    label="Medium"
                  />
                  <FormControlLabel
                    key="High"
                    value="High"
                    control={<Radio size="small" />}
                    label="High"
                  />
                </RadioGroup>
              </FormControl>

              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl required sx={{ minWidth: 400 }}>
                  <InputLabel id="simple-select-label">Day</InputLabel>
                  <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={formValues.day}
                    label="Day"
                    required
                    error={dayError}
                    onChange={handleSelectChange}
                    fullWidth
                  >
                    <MenuItem key={'Monday'} value={'Monday'}>
                      Monday
                    </MenuItem>
                    <MenuItem key={'Tuesday'} value={'Tuesday'}>
                      Tuesday
                    </MenuItem>
                    <MenuItem key={'Wednesday'} value={'Wednesday'}>
                      Wednesday
                    </MenuItem>
                    <MenuItem key={'Thursday'} value={'Thursday'}>
                      Thursday
                    </MenuItem>
                    <MenuItem key={'Friday'} value={'Friday'}>
                      Friday
                    </MenuItem>
                    <MenuItem key={'Saturday'} value={'Saturday'}>
                      Saturday
                    </MenuItem>
                    <MenuItem key={'Sunday'} value={'Sunday'}>
                      Sunday
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <br />
              <FormLabel>Time Range</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="morning"
                      onChange={handleCheckboxChange}
                      checked={morning}
                    />
                  }
                  label="Morning"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="afternoon"
                      onChange={handleCheckboxChange}
                      checked={afternoon}
                    />
                  }
                  label="Afternoon"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="evening"
                      onChange={handleCheckboxChange}
                      checked={evening}
                    />
                  }
                  label="Evening"
                />
                <TextField
                  id="duration"
                  name="duration"
                  label="Enter duration"
                  type="text"
                  required
                  error={durationError}
                  sx={{ width: 400 }}
                  value={formValues.duration}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Grid alignItems="center">
            <Button
              onClick={(event) => onSubmitForm(event)}
              variant="contained"
              color="primary"
              type="submit"
              style={{
                backgroundColor: 'green',
                margin: '5px',
              }}
            >
              Submit
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              style={{
                backgroundColor: 'error',
                margin: '5px',
              }}
            >
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}
