import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Language Dice</Text>
        <Text>Select Your Language</Text>
        <Button
          raised
          backgroundColor="blue"
          icon={{name: 'language'}}
          title='French'
          onPress={() => Actions.main()}
        />
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
});