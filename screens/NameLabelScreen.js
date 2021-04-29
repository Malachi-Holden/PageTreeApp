import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {rename} from '../models/slices/LabelSlice.js';

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textInput: {
    borderWidth: 1,
    padding: 5,
    width: '70%'
  }
});

class NameLabelScreen extends Component{


  render(){
    return(<View style={styles.container}>
      <Text>The label: {this.props.labelValue}</Text>
      <View style={styles.textInput}>
        <TextInput onChangeText={(text)=>this.props.rename(text)}/>
      </View>
    </View>);
  }
}

const mapStateToProps = (state)=>({
  labelValue: state.nameLabel.labelValue
});

const mapDispatchToProps = {rename};

export default connect(mapStateToProps, mapDispatchToProps)(NameLabelScreen);