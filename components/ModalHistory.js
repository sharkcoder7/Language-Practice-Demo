import React from 'react';
import {Text, View, Modal, ScrollView} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {Button} from 'react-native-elements';

export default class ModalHistory extends React.Component {
  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.props.showModalHistory} 
        onRequestClose={this.props.toggleModalHistory}>
        <Text style={{marginTop: 30, marginBottom: 30, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Questions History</Text>
        <Button
          raised
          title="Back"
          onPress={() => this.props.toggleModal('History')}
        />
        <ScrollView>
          <List>
            {this.props.previousQuestions && this.props.previousQuestions.map((question, i) => {
              return (
                <ListItem
                  key={question.id}
                  title={(i + 1) + '  ' + question.question}
                  subtitle={question.translation}
                  underlayColor='#6495ED'
                  containerStyle={i === this.props.currentIndex ? {backgroundColor: '#ADD8E6'} : {}}
                  onPress={() => {
                    this.props.traverseQuestions(i);
                    this.props.toggleModal('History');
                  }}
                />
              )
            })}
          </List>
        </ScrollView>
      </Modal>
    )
  }
}