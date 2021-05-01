import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import {createTree} from './models/LinkedTree.js';
import TreeNodeScreen from './screens/TreeNodeScreen.js';
import store from './store.js';
import {replaceTree} from './models/slices/TreeSlice.js';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

export default class App extends Component {

  componentDidMount(){
    store.dispatch(replaceTree(createTree('correct title from app')));
  }
  
  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Node"
            component={TreeNodeScreen}
            initialParams={{indexPath: []}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    );
  }
};
