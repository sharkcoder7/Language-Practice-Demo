import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Questions from '../json_files/questions';
import Randomizer from 'react-randomizer';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      remainingQuestions: [],
      previousQuestions: [],
      currentQuestion: null,
      currentTranslationAlt: null,
      showStartButton: true
    }
  }

  componentDidMount() {
    const questions = Randomizer.randomizeArray(Questions);
    this.setState({questions, remainingQuestions: questions});
  }

  start = () => {
    const currentQuestion = this.state.remainingQuestions[0];
    console.log(typeof question, 'one question')
    this.setState({currentQuestion})
    this.setState({showStartButton: false});
  }

  render() {
    console.log(this.state.questions, 'questions')
    console.log(this.state.remainingQuestions, 'remaining questions')
    return (
      <View style={styles.container}>
        {
          this.state.showStartButton ?
          <View style={styles.container}>
            <Button
              raised
              backgroundColor="green"
              icon={{name: 'forward'}}
              title='Start'
              onPress={() => this.start()}
            />
          </View>
          :
          <View style={styles.container}>
            <Text>{this.state.currentQuestion.question}</Text>
            <Button
              raised
              backgroundColor="green"
              icon={{name: 'autorenew'}}
              title='Next Question'
              onPress={() => Actions.main()}
            />
            <Button
              raised
              backgroundColor="red"
              icon={{name: 'replay'}}
              title='Previous Question'
              onPress={() => console.log('previous question pressed')}
            />
            <Button
              raised
              backgroundColor="blue"
              icon={{name: 'home'}}
              title='Back to Home'
              onPress={() => Actions.root()}
            />
          </View>
        }
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