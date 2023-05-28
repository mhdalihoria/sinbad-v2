import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Form = ({ data, setSelected, selected, label, style = {} }) => {


  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const optionElements = data?.map((item) => {
    return (
      <MenuItem value={item.id} key={item.id}>
        {item.name}
      </MenuItem>
    );
  });

  return (
    <FormControl fullWidth style={style}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        label={label}
        onChange={handleChange}
      >
        {optionElements}
      </Select>
    </FormControl>
  );
};

export default Form;
