import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView, 
  TextInput,
  TouchableHighlight
} from 'react-native';

export default class viewAll extends Component{
  constructor(props){
    super(props);
    this.state = {
      pic: {
        uri: 'https://s3.amazonaws.com/greenfield-hr44/Screen+Shot+2016-07-28+at+10.09.51+PM.png'
      },
      itineraries: []
    };
  }

  componentDidMount(){
    // Ajax get request when page render
    this.getRequest ();
  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>

        <Text style={styles.welcome}>
          Itineraries of {this.props.username}
          <Image source={this.state.pic} style={{width: 30, height: 30}}/> 
        </Text>

        {this.state.itineraries.map(function(itinerary, index){
          return (
            <TouchableHighlight key = {index} onPress={ () => this.gotoViewOne(itinerary.id)}>
            <Text key={index} style={styles.buttonText}> {itinerary.numDays} days trip to {itinerary.location} </Text>
            </TouchableHighlight>
          )}.bind(this)
        )}
      </ScrollView>
      </View>
    );
  }

  gotoViewOne(index){
    // setting the current itinerary to show in view one page  
    this.props.setCurrentItinerary(index); 
    this.props.navigator.push({name: 'viewOne'});
  }

  goToViewAll (){
   // setting parent class once login 
   this.props.setName(this.state.username);
   this.props.navigator.push({name: 'viewAll'}); 
  }

  getRequest () {
    // Posting user Id to get all itineraries in response  
    fetch('https://esccc.herokuapp.com/classes/userItineraries', 
    {method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     credentials: 'same-origin',        
     body: JSON.stringify({user: this.props.username})
    })
    .then(function(response) {
      return response.json(); 
    }).then((data) => {
      this.setState({itineraries: data});
    })
    .catch(function(err) {
      console.log('err', err);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  welcome: {
    fontSize: 25,
    fontFamily: 'Kohinoor Bangla',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  input: {
    height: 40,
    fontSize: 15,
    marginLeft: 10
  },
  buttonText: {

    fontSize: 10,
    fontWeight: 'bold', 
    padding:15, 
    height:45, 
    overflow:'hidden', 
    borderRadius:5, 
    backgroundColor: '#4db6ac',
    margin: 10
  }
});