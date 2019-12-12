import axios from 'axios';
import _ from 'lodash';

const makeChildren = (list, person) => {
    let getChildren = _.filter(list, (o) => o.gsx$father.$t === person.id);
    
    let children = [];

    // Terminate the recursive if there's no father id
    if (!getChildren.length) return;

    getChildren.forEach((ele) => {
      let person = {};
      person.name = ele.gsx$name.$t;
      person.id = ele.gsx$id.$t;
      person.gender = ele.gsx$gender.$t;

      children.push(person);
    })

    person.children = _.cloneDeep(children);

    person.children.forEach((ele) => {
      makeChildren(list, ele)
    })
  }

  const prepareData = (list) => {
    // First Parent data preparation
    let people = {};
    people.name = list[0]["gsx$name"]["$t"];
    people.id = list[0]["gsx$id"]["$t"];
    people.gender = list[0]["gsx$gender"]["$t"];

    if (!people.children) {
      makeChildren(list, people)
    }
   
    return people;

  }

  const getData = (url, setData) => {

    // Make a request for a user with a given ID
    axios.get(url)
      .then(function (response) {
        // handle success
        
        let data = prepareData(response.data.feed.entry);

        console.log(data);
        setData(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }

  export default getData;