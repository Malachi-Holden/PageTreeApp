import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import LinkedTree from './models/LinkedTree.js';
import TreeNodeScreen from './screens/TreeNodeScreen.js';

const Stack = createStackNavigator();

export default class App extends Component {
  
  // create app with each page corresponding to tree node data, user added items with data string as headers
  render(){
    let baseTree = new LinkedTree();
    baseTree.addRoot("root");
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Node"
          component={TreeNodeScreen}
          initialParams={{tree: baseTree}}
          />
        </Stack.Navigator>
    </NavigationContainer>
    );
  }
};
