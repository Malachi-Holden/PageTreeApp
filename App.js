import { Link, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import {createTree} from './models/LinkedTreeRedux.js';
import TreeNodeScreen from './screens/TreeNodeScreen.js';
import store from './store.js';
import { Provider } from 'react-redux';
import NameLabelScreen from './screens/NameLabelScreen.js';

const Stack = createStackNavigator();

export default class App extends Component {
  
  render(){
    let reduxTree = createTree('replacement redux root');
    store.dispatch({type: 'replaceTree', payload: reduxTree});
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Node"
            component={TreeNodeScreen}
            initialParams={{indexPath: []}}
            />
            <Stack.Screen name="Label"
            component={NameLabelScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    );
  }
};
