import React, { Component, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar';
import Generations from './components/Generations';
import axios from 'axios';
import myJson from './assets/data.json';
import csvToJson from 'convert-csv-to-json';
import btkData from './assets/BTK_Data-Ajith.csv';

const App = () => {

  const [treeData, setTreeData] = useState(myJson);

  console.log(btkData);
  const getData = () => {

    // Make a request for a user with a given ID
    axios.get('assets/data.json')
      .then(function (response) {
        // handle success
        console.log(response);
        setTreeData(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }

  useEffect(() => {
    if (!treeData.length) {
      //getData();
    }
  }, [treeData])

  return (
    <Container>
      <CssBaseline />
      <NavBar />
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <Generations data={treeData}></Generations>
      </Box>
    </Container>
  )
}
export default App
