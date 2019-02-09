import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Card} from 'react-native-elements';
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
    const newRemaining = this.state.remainingQuestions.slice(1);
    this.setState({currentQuestion});
    this.setState({remainingQuestions: newRemaining});
    this.setState({showStartButton: false});
  }

  randomQuestion = () => {
    const newPrevious = this.state.previousQuestions.concat([this.state.currentQuestion]);
    this.setState({previousQuestions: newPrevious});
    if(this.state.remainingQuestions.length === 1) {
      const currentQuestion = this.state.remainingQuestions[0];
      const randomized = Randomizer.randomizeArray(this.state.questions);
      this.setState({remainingQuestions: randomized});
      this.setState({currentQuestion});
    } else {
      const currentQuestion = this.state.remainingQuestions[0];
      const newRemaining = this.state.remainingQuestions.slice(1);
      this.setState({remainingQuestions: newRemaining});
      this.setState({currentQuestion});
    }
  }

  render() {
    console.log(this.state.remainingQuestions, 'remaining questions')
    console.log(this.state.previousQuestions, 'previous questions')
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
              onPress={this.start}
            />
          </View>
          :
          <View style={styles.container}>
            <Card
              title='Question'
              image={require('../assets/question_mark.png')}>
              <Text style={{marginBottom: 10, fontSize: 30, fontWeight: 'bold'}}>
              {this.state.currentQuestion.question}
              </Text>
            </Card>
            <Button
              raised
              backgroundColor="green"
              icon={{name: 'autorenew'}}
              title='Next Random Question'
              onPress={this.randomQuestion}
            />
            {this.state.previousQuestions.length ? <Button
              raised
              backgroundColor="red"
              icon={{name: 'replay'}}
              title='Previous Question'
              onPress={() => console.log('previous question pressed')}
            /> : null}
            <View style={{paddingTop: 50}}>
            <Button
              raised
              backgroundColor="blue"
              icon={{name: 'home'}}
              title='Back to Home'
              onPress={() => Actions.root()}
            />
            </View>
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