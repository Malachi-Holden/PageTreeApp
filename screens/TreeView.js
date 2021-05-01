import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import InputAlert from '../components/InputAlert.js';
import { connect } from 'react-redux';
import {replaceTree, addChild, addChildAtIndexPath, deleteNode} from '../models/slices/TreeSlice.js';
import {getNodeAtIndexPath} from '../models/LinkedTree.js';
import TreeNodeScreen from './TreeNodeScreen.js';

const Stack = createStackNavigator();

class TreeView extends Component{
  // show the first screen on the far left
  // when you tap on a child node, if there is space for it, show it to the right of the right-most node screen
  // if there is no more space, tab all the screens to the left and create space
  // when the user taps the back button, tab all the screens to the right and show the most recent out of view screen
  render(){
    return(<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Node"
          component={TreeNodeScreen}
          initialParams={{indexPath: []}}
        />
      </Stack.Navigator>
    </NavigationContainer>);
  }
}