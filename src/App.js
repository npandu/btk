import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Container>
        <CssBaseline />
        <NavBar />
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            Create React App v4-beta example
        </Typography>

        </Box>
      </Container>
    )
  }
}
export default App
