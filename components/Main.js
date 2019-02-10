import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
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
      currentIndex: 0,
      currentTranslationAlt: null,
      showStartButton: true,
      showTranslation: false,
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
    this.setState({previousQuestions: [currentQuestion]});
  }

  randomQuestion = () => {
    const newPrevious = this.state.previousQuestions.concat([this.state.remainingQuestions[0]]);
    this.setState({previousQuestions: newPrevious});
    this.setState({currentIndex: newPrevious.length - 1});
    const currentQuestion = this.state.remainingQuestions[0];
    this.setState({currentQuestion});
    this.setState({showTranslation: false});
    if(this.state.remainingQuestions.length === 1) {
      const randomized = Randomizer.randomizeArray(this.state.questions);
      this.setState({remainingQuestions: randomized});
    } else {
      const newRemaining = this.state.remainingQuestions.slice(1);
      this.setState({remainingQuestions: newRemaining});
    }
  }

  traverseQuestions = (action) => {
    let newIndex;
    if(action === 'previous') {
      newIndex = this.state.currentIndex - 1;
    } else if(action === 'next') {
      newIndex = this.state.currentIndex + 1;
    }
    this.setState({currentQuestion: this.state.previousQuestions[newIndex]});
    this.setState({currentIndex: newIndex});
  }

  toggleTranslation = () => {
    this.setState({showTranslation: !this.state.showTranslation});
  }

  render() {
    console.log(this.state.remainingQuestions, 'remaining questions')
    console.log(this.state.previousQuestions, 'previous questions')
    console.log(this.state.currentIndex, 'index')
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
            <TouchableHighlight onPress={this.toggleTranslation}>
              <View>
                <Card
                  title={!this.state.showTranslation? `Question #${this.state.currentIndex + 1}` : `Question #${this.state.currentIndex + 1} Translated`}
                  image={require('../assets/question_mark.png')}>
                  { !this.state.showTranslation ? 
                    <Text style={{marginBottom: 10, fontSize: 30, fontWeight: 'bold'}}>
                      {this.state.currentQuestion.question}
                    </Text> :
                    <Text style={{marginBottom: 10, fontSize: 30, fontWeight: 'bold'}}>
                      {this.state.currentQuestion.translation}
                    </Text>
                  }
                </Card>
            </View>
            </TouchableHighlight>
            <Button
              raised
              backgroundColor="green"
              icon={{name: 'autorenew'}}
              title='Next Random Question'
              onPress={this.randomQuestion}
            />
            {this.state.previousQuestions.length > this.state.currentIndex + 1 ? <Button
              raised
              backgroundColor="#66CDAA"
              icon={{name: 'check'}}
              title='Next Question'
              onPress={() => this.traverseQuestions('next')}
            /> : null}
            {this.state.currentIndex > 0 ? <Button
              raised
              backgroundColor="red"
              icon={{name: 'replay'}}
              title='Previous Question'
              onPress={() => this.traverseQuestions('previous')}
            /> : null}
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