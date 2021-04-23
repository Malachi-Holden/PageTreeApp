import React, { Component } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

class HideableTextInput extends Component{
  render(){
    if (this.props.hasInput){
      return (
        <View style={{
          borderWidth: 1,
          padding: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          ...this.props.style
        }}>
          <TextInput
          style={{width:'100%'}}
          onChangeText={this.props.onChangeText} />
        </View>
      );
    }
    return (<View/>);
  }
}

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
          width: '80%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2
        }}>
          <HideableTextInput
            hasInput={this.props.hasInput}
            onChangeText={(text)=>this.setState({inputText: text})}
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10
            }}
          />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10
          }}>
            <TouchableOpacity onPress={this.onCancel}>
              <Text
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 1,
                  fontWeight: "600",
                  color: "#454545"
                }}
              >{this.props.cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onConfirm}>
              <Text
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 1,
                  color: "#454545"
                }}
              >{this.props.confirmText}</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </TouchableOpacity>
    </Modal>);
  }
}

export default InputAlert;