import TreeIndexPathOutOfBoundsError from '../errors/TreeIndexPathOutOfBoundsError.js';

class TreeNode{
  constructor(nodeData){
    this.nodeData = nodeData;
    this.children = [];
  }

  addChild(childData){
    this.children.push(new TreeNode(childData));
  }

  depthFirstForEach(eachLambda){
    eachLambda(this);
    for (child of this.children){
      child.depthFirstForEach(eachLambda);
    }
  }

  breadthFirstForEach(eachLambda){
    //maybe use a while loop and keep track of the current level? Seach through every node
    // for efficiency, keep a reference to each node at each level? Maybe in an array?
    // this will not be space efficient
    // code one and then look up a better one?
  }

  getNodeAtIndexPath(indexPath){
    let currentNode = this;
    for (let i = 0; i < indexPath.length; i++){
      let index = indexPath[i];
      if (index >= currentNode.children.length){
        throw new TreeIndexPathOutOfBoundsError('No node at '+ index+' -- element '+i+' of index path: ' + indexPath+'. Node at ' + indexPath.slice(0, i) + 'only has ' + currentNode.children.length + ' children.');
      }
      currentNode = currentNode.children[index];
    }
    return currentNode;
  }

  addChildToNodeAtIndexPath(indexPath, childData){
    this.getNodeAtIndexPath(indexPath).addChild(childData);
  }

  deleteChildAtIndexPath(indexPath){
    let parentIndexPath = indexPath.slice(0, indexPath.length -1);
    let lastIndex = indexPath[indexPath.length -1];
    let parentNode = this.getNodeAtIndexPath(parentIndexPath);
    if (lastIndex >= parentNode.children.length){
      throw new TreeIndexPathOutOfBoundsError('No node at '+ lastIndex +' -- element '+indexPath.length - 1+' of index path: ' + indexPath +'. Node at ' + parentIndexPath + 'only has ' + parentNode.children.length + ' children.')
    }
    parentNode.children.splice(lastIndex, 1);
  }
}

class LinkedTree{
  constructor(rootNode = null){
    this.rootNode = rootNode;
  }

  addRoot(rootData){
    this.addChildToNodeAtIndexPath(null, rootData);
  }

  addChildToNodeAtIndexPath(indexPath, childData){
    if (!indexPath){
      this.rootNode = new TreeNode(childData);
      return;
    }
    if (!this.rootNode){
      throw new TreeIndexPathOutOfBoundsError('Tree is empty. Use addRoot(rootData) to set root.');
    }
    this.rootNode.addChildToNodeAtIndexPath(indexPath, childData);
  }

  deleteNodeAtIndexPath(indexPath){
    if(!this.rootNode){
      throw new TreeIndexPathOutOfBoundsError('Tree is empty. No need to delete.');
    }
    if (indexPath.length === 0){
      this.rootNode = null;
      return;
    }
    this.rootNode.deleteChildAtIndexPath(indexPath);
  }

  getSubTreeAtIndexPath(indexPath){
    if (indexPath.length === 0){
      return this;
    }
    if(!this.rootNode){
      throw new TreeIndexPathOutOfBoundsError('Tree is empty.');
    }
    return new LinkedTree(this.rootNode.getNodeAtIndexPath(indexPath));
  }

  data(){
    return this.rootNode.nodeData;
  }

  children(){
    return this.rootNode.children.map((child)=>new LinkedTree(child));
  }
}

export default LinkedTree;