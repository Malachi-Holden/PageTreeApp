import TreeIndexPathOutOfBoundsError from '../errors/TreeIndexPathOutOfBoundsError.js';

export const createTree = (treeData)=>{
  console.log("createtree:", treeData);
  return ({
    data: treeData,
    children: []
  });
};

export const addChildToRoot = (tree, childData)=>{
  tree.children.push(createTree(childData));
};

export const addChildToNodeAtIndexPath = (tree, indexPath, childData)=>{
  addChildToRoot(getNodeAtIndexPath(tree, indexPath), childData);
}

export const deleteChild = (tree, childIndex)=>{
  tree.children.splice(childIndex, 1);
};

export const deleteNodeAtIndexPath = (tree, indexPath)=>{
  if (indexPath.length === 0){
    throw new TreeIndexPathOutOfBoundsError('Cannot delete root');
  }
  let parentIndexPath = indexPath.slice(0, indexPath.length -1);
  let lastIndex = indexPath[indexPath.length -1];
  let parentNode = getNodeAtIndexPath(tree, parentIndexPath);
  if (lastIndex >= parentNode.children.length){
    throw new TreeIndexPathOutOfBoundsError('No node at '+ lastIndex +' -- element '+indexPath.length - 1+' of index path: ' + indexPath +'. Node at ' + parentIndexPath + 'only has ' + parentNode.children.length + ' children.')
  }
  deleteChild(parentNode, lastIndex);
}

export const getNodeAtIndexPath = (tree, indexPath)=>{
  let currentNode = tree;
  for (let i = 0; i < indexPath.length; i++){
    let index = indexPath[i];
    if (index >= currentNode.children.length){
      throw new TreeIndexPathOutOfBoundsError('No node at '+ index+' -- element '+i+' of index path: ' + indexPath+'. Node at ' + indexPath.slice(0, i) + 'only has ' + currentNode.children.length + ' children.');
    }
    currentNode = currentNode.children[index];
  }
  return currentNode;
}