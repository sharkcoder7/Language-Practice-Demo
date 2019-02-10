import React from 'react';
import {Text, View, Modal, WebView} from 'react-native';
import {Button} from 'react-native-elements';

export default class ModalWebView extends React.Component {
  render() {
    const uri = 'http://translate.google.com';
    return (
      <Modal
        animationType='slide'
        visible={this.props.showModalWebView} 
        onRequestClose={() => this.props.toggleModal('WebView')}>
        <Text style={{marginTop: 30, marginBottom: 30, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Google Translate</Text>
        <Button
          raised
          title="Back"
          onPress={() => this.props.toggleModal('WebView')}
        />
        <WebView
          source={{uri}}
        />
      </Modal>
    )
  }
}