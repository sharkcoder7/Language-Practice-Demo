import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Select Your Difficulty:</Text>
        <View style={styles.buttonAll}>
          <Button
            raised
            backgroundColor="#66CDAA"
            borderRadius={10}
            title='All Difficulties'
            icon={{name: 'forward'}}
            onPress={() => Actions.main({difficulty: 'all'})}
          />
        </View>
        <View style={styles.buttonLevel}>
          <Button
            raised
            backgroundColor="green"
            borderRadius={10}
            title='Beginner'
            icon={{name: 'forward'}}
            onPress={() => Actions.main({difficulty: 'beginner'})}
          />
        </View>
        <View style={styles.buttonLevel}>
          <Button
            raised
            backgroundColor="#D2691E"
            borderRadius={10}
            title='Intermediate'
            icon={{name: 'forward'}}
            onPress={() => Actions.main({difficulty: 'intermediate'})}
          />
        </View>
        <View style={styles.buttonLevel}>
          <Button
            raised
            backgroundColor="red"
            borderRadius={10}
            title='Advanced'
            icon={{name: 'forward'}}
            onPress={() => Actions.main({difficulty: 'advanced'})}
          />
        </View>
        <View style={styles.buttonHome}>
          <Button
            raised
            backgroundColor="blue"
            icon={{name: 'home'}}
            title='Back to Home'
            onPress={() => Actions.root()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 25, 
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonAll: {
    padding: 10,
    width: 210
  },
  buttonLevel: {
    padding: 5,
    width: 200
  },
  buttonHome: {
    paddingTop: 30
  }
});