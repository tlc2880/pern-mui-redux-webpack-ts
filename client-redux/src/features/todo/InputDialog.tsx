import React, { useState, ChangeEvent } from 'react';
import { createTodo } from "./todoSlice";
import { useAppDispatch } from "../../app/hooks";
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
  } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from '@mui/material/Select';
import todoType from '../../types'

const InputDialog = () => {
    const initialValues = {
    todo_id: "",
    description: "",
    owner: "",
    priority: "low",
    day: "Monday",
    morning: false,
    afternoon: false,
    evening: false,
    completed: false,
    duration: ""
  };

  const [ open, setOpen ] = useState(false);
  const [ formValues, setFormValues ] = useState<todoType>(initialValues);
  const [ day, setDay ] = useState("Monday");
  const [ time, setTime ] = useState({
    morning: true,
    afternoon: false,
    evening: false
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(createTodo(formValues));
    window.location.reload();
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    setFormValues({...formValues, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event: any) => {
    setTime({ ...time, [event.target.name]: event.target.checked as boolean });
    setFormValues({...formValues, [event.target.name]: event.target.checked });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  };

  const { morning, afternoon, evening } = time;

  return (
    <>
      <Button 
        onClick={handleClickOpen}
        variant="contained" 
        color="primary" 
        style={{
          backgroundColor: "green",
          margin: "5px"
        }}>
        + New Todo
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
      <CloseIcon />
      </IconButton>  
      <DialogTitle>Input New Todo</DialogTitle>
      <DialogContent>
          
        <form onSubmit={onSubmitForm}>
          <Grid container alignItems="center" direction="column">
            <br />
            <TextField
              autoFocus
              id="description"
              name="description"
              type="text"
              label="Enter description"
              sx={{ width: 400 }}
              value={formValues.description}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="owner"
              name="owner"
              label="Enter owner"
              type="text"
              sx={{ width: 400 }}
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
                  key="low"
                  value="low"
                  control={<Radio size="small" />}
                  label="Low"
                />
                <FormControlLabel
                  key="medium"
                  value="medium"
                  control={<Radio size="small" />}
                  label="Medium"
                />
                <FormControlLabel
                  key="high"
                  value="high"
                  control={<Radio size="small" />}
                  label="High"
                />
            </RadioGroup>
          </FormControl>

          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl >
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Day"
                onChange={handleSelectChange}
              >
                <MenuItem key={"Monday"} value={"Monday"}>Monday</MenuItem>
                <MenuItem key={"Tuesday"} value={"Tuesday"}>Tuesday</MenuItem>
                <MenuItem key={"Wednesday"} value={"Wednesday"}>Wednesday</MenuItem>
                <MenuItem key={"Thursday"} value={"Thursday"}>Thursday</MenuItem>
                <MenuItem key={"Friday"} value={"Friday"}>Friday</MenuItem>
                <MenuItem key={"Saturday"} value={"Saturday"}>Saturday</MenuItem>
                <MenuItem key={"Sunday"} value={"Sunday"}>Sunday</MenuItem>
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
                    checked = {morning}
                  />} 
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
                  />}
                label="Evening" 
              />
            </FormGroup>
              <TextField
                id="duration"
                name="duration"
                label="Enter duration"
                type="text"
                sx={{ width: 400 }}
                value={formValues.duration}
                onChange={handleInputChange}
              />
            </Grid>
          </form>
        </DialogContent>
        
        <DialogActions>
        <Grid alignItems="center" >
          <Button 
            onClick={onSubmitForm}
            variant="contained" 
            color="primary" 
            type="submit" 
            style={{
              backgroundColor: "green",
              margin: "5px"
            }}>
            Submit
          </Button>
          <Button 
            onClick={handleClose}
            variant="contained"
            color="error"
            style={{
              backgroundColor: "error",
              margin: "5px"
            }}>
            Cancel
          </Button>
          </ Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InputDialog;