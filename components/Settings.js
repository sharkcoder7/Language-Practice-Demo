import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{padding: 25, fontSize: 20,}}>Select Your Difficulty:</Text>
        <View style={{padding: 10}}>
          <Button
            raised
            backgroundColor="#66CDAA"
            title='All Difficulties'
            icon={{name: 'forward'}}
            onPress={() => Actions.main({difficulty: 'all'})}
          />
        </View>
        <Button
          raised
          backgroundColor="green"
          title='Beginner'
          icon={{name: 'forward'}}
          onPress={() => Actions.main({difficulty: 'beginner'})}
        />
        <Button
          raised
          backgroundColor="#D2691E"
          title='Intermediate'
          icon={{name: 'forward'}}
          onPress={() => Actions.main({difficulty: 'intermediate'})}
        />
        <Button
          raised
          backgroundColor="red"
          title='Advanced'
          icon={{name: 'forward'}}
          onPress={() => Actions.main({difficulty: 'advanced'})}
        />
        <View style={{paddingTop: 30}}>
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
});