import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" color="green">
                        Binary Tree Kudapattu
                </Typography>
                    <Box mx={2} right>
                        <Typography variant="h5">
                            Generations of People from Kudapattu
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;