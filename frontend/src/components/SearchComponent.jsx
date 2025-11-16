import React from 'react';
import { Box, FormControl, Select, MenuItem, InputBase, IconButton, Menu, Paper, MenuList, ClickAwayListener } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchComponent = ({
  foodData, location, onLocationChange, searchTerm, onSearchChange
}) => {
  const [suggestions, setSuggestions] = React.useState([]);
  const [openMenu, setOpenMenu] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (searchTerm.trim() !== '') {
      const allItems = Object.values(foodData).flatMap(ld => ld.items || []);
      const filtered = allItems.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSuggestions(filtered);
      setOpenMenu(true);
    } else {
      setSuggestions([]);
      setOpenMenu(false);
    }
  }, [searchTerm, foodData]);

  const handleSelect = (name) => {
    onSearchChange(name);
    setOpenMenu(false);
  };

  return (
    <Box sx={{ display: 'flex', mb: 4, gap: 2, alignItems: 'center' }}>
      <FormControl size="small" sx={{ flexShrink: 0, width: 200, backgroundColor: 'white' }}>
        <Select value={location} onChange={(e) => onLocationChange(e.target.value)} displayEmpty>
          {Object.keys(foodData).map(k => (
            <MenuItem key={k} value={k}>{foodData[k]?.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1, position: 'relative' }} ref={inputRef}>
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 1, p: 0.5, backgroundColor: 'white' }}>
          <InputBase
            placeholder="料理や店舗を検索する (Tìm kiếm món ăn/cửa hàng)"
            sx={{ ml: 1, flex: 1 }}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <IconButton sx={{ p: '10px' }} aria-label="search"><SearchIcon /></IconButton>
        </Box>

        <Menu
          anchorEl={inputRef.current}
          open={openMenu && suggestions.length > 0}
          onClose={() => setOpenMenu(false)}
          MenuListProps={{ dense: true }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Paper>
            <MenuList>
              {suggestions.slice(0, 5).map((item) => (
                <MenuItem key={item.id} onClick={() => handleSelect(item.name)}>
                  {item.name}
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Menu>
      </Box>
    </Box>
  );
};

export default SearchComponent;