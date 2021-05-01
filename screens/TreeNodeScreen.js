import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import InputAlert from '../components/InputAlert.js';
import { connect } from 'react-redux';
import {replaceTree, addChild, addChildAtIndexPath, deleteNode} from '../models/slices/TreeSlice.js';
import {getNodeAtIndexPath} from '../models/LinkedTree.js';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  treeList:{
    width: '90%'
  },

  addButton:{
    position:'absolute',
    right: 50,
    bottom: 50,
    width: 70,
    height: 70,
    borderRadius: 70/2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#459cb0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2
  },
  
  listItem:{
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },

  trashCanButton:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2
  }
});

class TreeListItem extends Component{
  render(){
    return (
    <View style={styles.listItem}>
      <TouchableOpacity
      style={{flexGrow: 1}}
      onPress={this.props.onPress}>
        <Text style={{fontSize: 20}}>
          {this.props.child.data}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.props.onDeleteChild} style={styles.trashCanButton}>
        <Image style={{height: 44, width: 44, tintColor: '#852424'}} source={require('../assets/trash.webp')} />
      </TouchableOpacity>
    </View>);
  }
}

class TreeList extends Component{
  onDeleteChild=(index)=>{
    if (this.props.onDeleteChild){
      this.props.onDeleteChild(index);
    }
  }

  render(){
    return(<FlatList style={this.props.style}
      data={this.props.tree.children.map((child, index)=>{return {key: index.toString(), child: child, index: index}})}
      renderItem={({item})=><TreeListItem child={item.child}
        onPress={()=>{this.props.onChildPressed(item.index)}}
        onDeleteChild={()=>this.onDeleteChild(item.index)}/>
      }
      />);
  }
}

class TreeNodeScreen extends Component{
  constructor(props){
    super(props);
    this.currentIndexPath = this.props.route.params.indexPath;
  }

  state = {
    tree: this.props.route.params.tree,
    newChildAlertVisible: false,
    deleteChildAlertVisible: false,
    childToDelete: -1
  }

  componentDidMount(){
    this.props.navigation.setOptions({title: getNodeAtIndexPath(this.props.reduxTree, this.currentIndexPath).data});
  }

  componentDidUpdate(){
    this.props.navigation.setOptions({title: getNodeAtIndexPath(this.props.reduxTree, this.currentIndexPath).data});
  }

  onChildPressed = (childIndex)=>{
    let childIndexPath = [...this.currentIndexPath, childIndex];
    this.props.navigation.push('Node', {indexPath: childIndexPath});
  }

  deleteChildAlert = (index)=>{
    this.setState({childToDelete: index});
  }

  onDeleteChild = (text)=>{
    let indexPath = [...this.currentIndexPath, this.state.childToDelete];
    this.props.deleteNode(indexPath);
    this.setState({deleteChildAlertVisible: false, childToDelete: -1});
  }

  addChild = (nodeText)=>{
    this.props.addChildAtIndexPath({indexPath: this.currentIndexPath, childData: nodeText});
    this.setState({newChildAlertVisible: false});
  }

  render(){
    return(<View style={styles.container}>
      <TreeList style={styles.treeList} tree={getNodeAtIndexPath(this.props.reduxTree, this.currentIndexPath)} onChildPressed={this.onChildPressed} onDeleteChild={(index)=>this.setState({deleteChildAlertVisible: true, childToDelete: index})} />
      <InputAlert
        visible={this.state.newChildAlertVisible}
        onConfirm={this.addChild}
        confirmText='Add child'
        onCancel={(text)=>this.setState({newChildAlertVisible: false})}
        cancelText='Cancel'
      />
      <InputAlert
        hasInput={false}
        visible={this.state.deleteChildAlertVisible}
        onConfirm={this.onDeleteChild}
        confirmText='Delete Child'
        onCancel={(text)=>this.setState({deleteChildAlertVisible: false, childToDelete: -1})}
        cancelText='Cancel'
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={()=>this.setState({newChildAlertVisible: true})}
      >
        <Text 
          style={{
            textAlign:'center',
            color:'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 1
          }}>Add Child</Text>
      </TouchableOpacity>
    </View>);
  }
}

const mapStateToProps = (state)=>({
  reduxTree: state.tree.tree
});

const mapDispatchToProps = {replaceTree, addChild, addChildAtIndexPath, deleteNode};

export default connect(mapStateToProps, mapDispatchToProps)(TreeNodeScreen);