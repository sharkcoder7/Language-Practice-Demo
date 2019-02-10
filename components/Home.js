import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/background.jpeg')}
          style={{flex: 1, position: 'absolute'}}
        />
        <Image source={require('../assets/dice-transparent.png')}
          style={{width: 100, height: 75}}/>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white', padding: 50}}>Language Dice</Text>
        <View>
          <Text style={{padding: 25, fontSize: 20, color: 'white'}}>Select Your Language:</Text>
          <Button
            raised
            backgroundColor="blue"
            icon={{name: 'language'}}
            title='French'
            onPress={() => Actions.settings()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});