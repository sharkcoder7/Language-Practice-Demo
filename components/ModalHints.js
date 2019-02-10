import React from 'react';
import {Text, View, Modal} from 'react-native';
import {Button} from 'react-native-elements';

export default class ModalHints extends React.Component {
  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.props.showModalHints} 
        onRequestClose={() => this.props.toggleModal('Hints')}>
        <Text style={{marginTop: 30, marginBottom: 30, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Hints</Text>
        <Button
          raised
          title="Back"
          onPress={() => this.props.toggleModal('Hints')}
        />
      </Modal>
    )
  }
}