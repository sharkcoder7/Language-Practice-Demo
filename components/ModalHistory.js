import React from 'react';
import {StyleSheet, Text, View, Modal, ScrollView} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {Button} from 'react-native-elements';

export default class ModalHistory extends React.Component {
  render() {
    return (
      <Modal
        style={{backgroundColor: '#6495ED'}}
        animationType='slide'
        visible={this.props.showModalHistory} 
        onRequestClose={this.props.toggleModalHistory}>
          <Text style={{marginTop: 30, textAlign: 'center'}}>Questions History</Text>
          <Button
            raised
            title="Back"
            onPress={this.props.toggleModalHistory}
          />
          <ScrollView>
          <List>
            {this.props.previousQuestions.map((question, i) => {
              return (
                <ListItem
                  key={i}
                  title={(i + 1) + '  ' + question.question}
                  onPress={() => {
                    this.props.traverseQuestions(i);
                    this.props.toggleModalHistory();
                  }}
                >{question.question}</ListItem>
              )
            })}
          </List>
          </ScrollView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6495ED'
  },
});