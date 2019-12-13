import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import constants from './../constants/constants';
const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" color="green">
                        {constants.btk}
                    </Typography>
                    <Box mx={2} right>
                        <Typography variant="h5">
                            {constants.btkSubText}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;