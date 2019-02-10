import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-elements';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class CardDisplay extends React.Component {

  onSwipe = (gestureName, gestureState) => {
    const{SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        this.props.toggleModal('Hints');
        break;
      case SWIPE_DOWN:
        this.props.toggleTranslation();
        break;
      case SWIPE_LEFT:
        this.props.handleTraverse(2);
        break;
      case SWIPE_RIGHT:
        this.props.handleTraverse(0);
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}
      >
        <Card
          containerStyle={styles.card}
          title={!this.props.showTranslation ? `Question #${this.props.currentIndex + 1}` : `Question #${this.props.currentIndex + 1} Translated`}
          titleStyle={{color: 'white', fontSize: 20}}
          image={require('../assets/question-mark.png')}
          imageStyle={{width: 75, height: 75}}
          imageWrapperStyle={{alignItems: 'center'}}>
          { !this.props.showTranslation ? 
            <Text style={styles.cardText}>
              {this.props.currentQuestion ? this.props.currentQuestion.question : null}
            </Text> :
            <Text style={styles.cardText}>
              {this.props.currentQuestion ? this.props.currentQuestion.translation : null}
            </Text>
          }
        </Card>
      </GestureRecognizer>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 300, 
    height: 290,
    backgroundColor:'rgba(52, 52, 52, 0.1)'
  },
  cardText: {
    marginBottom: 10,
    color: 'white',
    fontSize: 30, 
    fontWeight: 'bold'
  }
});