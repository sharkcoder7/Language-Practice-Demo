import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button, Card, ButtonGroup} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Beginner from '../data/beginner';
import Intermediate from '../data/intermediate';
import Advanced from '../data/advanced';
import Randomizer from 'react-randomizer';
import ModalHistory from './ModalHistory';

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
      showTranslation: false,
      showModalHistory: false
    }
  }

  componentWillMount() {
    let questions;
    if(this.props.difficulty === 'all') {
      questions = Randomizer.randomizeArray(Beginner.concat(Intermediate, Advanced));
    } else if(this.props.difficulty === 'beginner') {
      questions = Randomizer.randomizeArray(Beginner);
    } else if(this.props.difficulty === 'intermediate') {
      questions = Randomizer.randomizeArray(Intermediate);
    } else if(this.props.difficulty === 'advanced') {
      questions = Randomizer.randomizeArray(Advanced);
    }
    const currentQuestion = questions[0];
    const remainingQuestions = questions.slice(1);
    this.setState({questions, remainingQuestions, currentQuestion});
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

  handleTraversePress = buttonIndex => {
    const currentIndex = this.state.currentIndex;
    if(buttonIndex === 0 && currentIndex !== 0) {
      this.traverseQuestions('previous');
    }
    if(buttonIndex === 1) {
      this.toggleModalHistory();
    }
    if(buttonIndex === 2 && currentIndex !== this.state.previousQuestions.length - 1) {
      this.traverseQuestions('next');
    }
  }

  traverseQuestions = action => {
    let newIndex;
    if(action === 'previous') {
      newIndex = this.state.currentIndex - 1;
    } else if(action === 'next') {
      newIndex = this.state.currentIndex + 1;
    } else {
      newIndex = action;
    }
    this.setState({currentQuestion: this.state.previousQuestions[newIndex]});
    this.setState({currentIndex: newIndex});
  }

  toggleTranslation = () => {
    this.setState({showTranslation: !this.state.showTranslation});
  }

  toggleModalHistory = () => {
    this.setState({showModalHistory: !this.state.showModalHistory});
  }

  render() {
    return (
      <View style={styles.container}>
        <ButtonGroup
          buttons={['Previous', 'History', 'Next']}
          selectedBackgroundColor="blue"
          onPress={this.handleTraversePress}
        />
        <TouchableOpacity onPress={this.toggleTranslation}>
          <View>
            <Card
              containerStyle={{width: 300, height: 300}}
              imageStyle={{width: 100, height: 100}}
              imageWrapperStyle={{alignItems: 'center'}}
              title={!this.state.showTranslation? `Question #${this.state.currentIndex + 1}` : `Question #${this.state.currentIndex + 1} Translated`}
              image={require('../assets/question_mark.png')}>
              { !this.state.showTranslation ? 
                <Text style={{marginBottom: 10, fontSize: 30, fontWeight: 'bold'}}>
                  {this.state.currentQuestion ? this.state.currentQuestion.question : null}
                </Text> :
                <Text style={{marginBottom: 10, fontSize: 30, fontWeight: 'bold'}}>
                  {this.state.currentQuestion ? this.state.currentQuestion.translation : null}
                </Text>
              }
            </Card>
          </View>
        </TouchableOpacity>
        <Button
          raised
          backgroundColor="green"
          icon={{name: 'autorenew'}}
          title='Generate Another Question'
          onPress={this.randomQuestion}
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
        <ModalHistory 
          showModalHistory={this.state.showModalHistory}
          previousQuestions={this.state.previousQuestions} 
          toggleModalHistory={this.toggleModalHistory}
          traverseQuestions={this.traverseQuestions}
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