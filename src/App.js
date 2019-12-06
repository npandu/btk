import React, { Component, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar';
import Generations from './components/Generations';
import axios from 'axios';
import _ from 'lodash';

const App = () => {

  const [treeData, setTreeData] = useState([]);

  const prepareData = (list) => {
    let people = {};
    people.name = list[0]["gsx$name"]["$t"];
    people.id = list[0]["gsx$id"]["$t"];

    let getMale = _.filter(list, (o) => o.gsx$gender.$t === "M" && o.gsx$father.$t);

    if (!people.children) {
      let getChildren = _.filter(getMale, (o) => o.gsx$father.$t === people.id)
      let children = [];

      getChildren.forEach((ele) => {
        let person = {};
        person.name = ele.gsx$name.$t;
        person.id = ele.gsx$id.$t;

        children.push(person);
      })

      people.children = _.cloneDeep(children);

    }



      // Second
      people.children.forEach((ele) => {
        if (!ele.children) {
          let getChildren = _.filter(getMale, (o) => o.gsx$father.$t === ele.id)
          let children = [];

          getChildren.forEach((ele) => {
            let person = {};
            person.name = ele.gsx$name.$t;
            person.id = ele.gsx$id.$t;

            children.push(person);
          })

          ele.children = _.cloneDeep(children);

          //Third
          ele.children.forEach((ele) => {
            let getChildren = _.filter(getMale, (o) => o.gsx$father.$t === ele.id)
            let children = [];

            getChildren.forEach((ele) => {
              let person = {};
              person.name = ele.gsx$name.$t;
              person.id = ele.gsx$id.$t;

              children.push(person);
            })

            ele.children = _.cloneDeep(children);

            //Fourth
            ele.children.forEach((ele) => {
              let getChildren = _.filter(getMale, (o) => o.gsx$father.$t === ele.id)
              let children = [];

              getChildren.forEach((ele) => {
                let person = {};
                person.name = ele.gsx$name.$t;
                person.id = ele.gsx$id.$t;

                children.push(person);
              })

              ele.children = _.cloneDeep(children);
            })

          })
        }
      })


    return people;

  }

  const getData = () => {

    // Make a request for a user with a given ID
    axios.get('https://spreadsheets.google.com/feeds/list/1wpyciQu2aXL8IzqQBXtwMyP4oGBuJc82K9B--jqVwHk/1/public/values?alt=json')
      .then(function (response) {
        // handle success
        
        let data = prepareData(response.data.feed.entry);

        console.log(data);
        setTreeData(data);
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
      getData();
    }
  }, [])

  return (
    <Container>
      <CssBaseline />
      <NavBar />
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Generations of People from Kudapattu
        </Typography>
        <Generations data={treeData}></Generations>
      </Box>
    </Container>
  )
}
export default App
