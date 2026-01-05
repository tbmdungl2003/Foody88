import React, { memo } from 'react';
import { Box, FormControl, Select, MenuItem, Autocomplete, TextField } from '@mui/material';


const SearchComponent = memo(({
  foodData, location, onLocationChange, searchTerm, onSearchChange
}) => {
  const [suggestions, setSuggestions] = React.useState([]);

  React.useEffect(() => {
    if (searchTerm.trim() !== '') {
      const allItems = Object.values(foodData).flatMap(ld => ld.items || []);
      const filtered = allItems.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, foodData]);

  return (
    <Box sx={{ display: 'flex', mb: 4, gap: 2, alignItems: 'center' }}>
      <FormControl size="small" sx={{ flexShrink: 0, width: 200, backgroundColor: 'white' }}>
        <Select value={location} onChange={(e) => onLocationChange(e.target.value)} displayEmpty>
          <MenuItem value="all"> 
              すべての地域
          </MenuItem>
          {Object.keys(foodData).map(k => (
            <MenuItem key={k} value={k}>{foodData[k]?.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Autocomplete
        freeSolo
        options={suggestions.slice(0, 5).map((item) => item.name)}
        inputValue={searchTerm}
        onInputChange={(event, value) => onSearchChange(value)}
        onChange={(event, value) => {
          if (value) {
            onSearchChange(value);
          }
        }}
        sx={{ flexGrow: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="料理や店舗を検索する"
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                padding: '0.5px'
              }
            }}
          />
        )}
      />
    </Box>
  );
});

export default SearchComponent;