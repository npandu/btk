import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar';
import ProTip from './components/ProTip';
import Copyright from './components/Copyright';

class App extends Component {
  render() {
    return (
      <Container>
        <NavBar />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
    )
  }
}
export default App
