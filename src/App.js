import React, { Component, useState, useEffect } from 'react';
import { Box, CssBaseline, Typography, Grid } from '@material-ui/core';
import NavBar from './components/NavBar';
import FullWidthTabs from './components/Tabs';

const App = () => {

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <Grid container>
        <Grid item xs={12}>
          <FullWidthTabs />
        </Grid>
      </Grid>

    </div>
  )
}
export default App
