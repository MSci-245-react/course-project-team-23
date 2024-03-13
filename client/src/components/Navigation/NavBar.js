import React from 'react';
import {AppBar, Toolbar, Button} from '@mui/material';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar
      position="sticky"
      style={{backgroundColor: '#4caf50', zIndex: 1100}}
    >
      <Toolbar>
        <Button variant="h6" component={Link} to="/" color="inherit">
          Landing
        </Button>
        <Button variant="h6" component={Link} to="/Recipes" color="inherit">
          Discover Recipes
        </Button>
        <Button
          variant="h6"
          component={Link}
          to="/ShoppingList"
          color="inherit"
        >
          Shopping List
        </Button>
        <Button variant="h6" component={Link} to="/UserInfo" color="inherit">
          Your Info
        </Button>
        <Button
          variant="h6"
          component={Link}
          to="/Recommendations"
          color="inherit"
        >
          Recommendations
        </Button>
        {/* Include additional navigation links as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
