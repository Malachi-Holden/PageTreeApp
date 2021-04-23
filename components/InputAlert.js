import React, { Component } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

class InputAlert extends Component{
  static defaultProps = {
    hasInput: true
  }

  state={
    inputText: ''
  }

  onCancel=()=>{
    if (this.props.onCancel){
      this.props.onCancel(this.state.inputText);
    }
  }

  onConfirm=()=>{
    if (this.props.onConfirm){
      this.props.onConfirm(this.state.inputText);
    }
  }

  render(){
    return(<Modal
      visible={this.props.visible}
      animationType='fade'
      transparent={true}
      onRequestClose={this.props.onCancel}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          alignItems: 'center',
          justifyContent: 'center', 
        }}
        onPress={this.props.onCancel}
        activeOpacity={1}
      >
        <View
        style={{
          backgroundColor: 'white',
          width: '80%'
        }}>
          <View style={{
            borderColor: 'black',
            borderWidth: 1
          }}
          visible={this.props.hasInput}>
            <TextInput
            style={{width:'100%'}}
            onChangeText={(text)=>this.setState({inputText: text})} />
          </View>
          <TouchableOpacity onPress={this.onCancel}>
            <Text>{this.props.cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onConfirm}>
            <Text>{this.props.confirmText}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>);
  }
}

export default InputAlert;