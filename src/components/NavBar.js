import React from 'react';
import { AppBar, Box, Toolbar, Typography, Grid } from '@material-ui/core';
import constants from './../constants/constants';
const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" color="green">
                                {constants.btk}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Box mx={2} right>
                                <Typography variant="h6">
                                    {constants.btkSubText}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>


                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;