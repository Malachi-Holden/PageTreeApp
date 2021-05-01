import TreeIndexPathOutOfBoundsError from '../errors/TreeIndexPathOutOfBoundsError.js';
import {createTree, addChildToRoot, addChildToNodeAtIndexPath, deleteNodeAtIndexPath} from '../models/LinkedTree.js';

describe('createTree', ()=>{
  test('createTree creates a tree with the given root node', ()=>{
    let testTree = createTree('root');
    expect(testTree.children.length).toEqual(0);
    expect(testTree.data).toEqual('root');
  });
});

describe('addChildToRoot', ()=>{
  let testTree = null;

  beforeEach(()=>{
    testTree = {
      data: 'root',
      children: []
    };
  });

  test('with no children should create one child', ()=>{
    addChildToRoot(testTree, 'child');
    expect(testTree.children[0].data).toEqual('child');
  });

  test('with several children should make last child', ()=>{
    testTree.children = [{
        data: 'child1',
        children: []
      },
      {
        data: 'child2',
        children: []
      }
    ];
    addChildToRoot(testTree, 'child3');
    let expectedResultChildren = [{
        data: 'child1',
        children: []
      },
      {
        data: 'child2',
        children: []
      },
      {
        data: 'child3',
        children: []
      }
    ];
    expect(testTree.children).toEqual(expectedResultChildren);
  });
});

describe('addChildToNodeAtIndexPath', ()=>{
  let testTree = null;

  beforeEach(()=>{
    testTree = {
      data: 'root',
      children: []
    };
  });

  test('with empty list should add child to root', ()=>{
    addChildToNodeAtIndexPath(testTree, [], "child");
    expect(testTree.children[0].data).toEqual("child");
  });

  test('with list should add child correct place', ()=>{
    addChildToNodeAtIndexPath(testTree, [], "child");
    addChildToNodeAtIndexPath(testTree, [0], "child1");
    expect(testTree.children[0].children[0].data).toEqual("child1");
  });

  test('on nonexistent child should throw error', ()=>{
    addChildToNodeAtIndexPath(testTree, [], "child");
    expect(()=>addChildToNodeAtIndexPath(testTree, [1], "child2"))
    .toThrow(new TreeIndexPathOutOfBoundsError('No node at 1 -- element 0 of index path: 1. Node at only has 1 children.'));
  });
  
});


describe('deleteNodeAtIndexPath', ()=>{
  let testTree = null;

  beforeEach(()=>{
    testTree = {
      data: 'root',
      children: []
    };
  });

  test('with empty index path should throw error', ()=>{
    addChildToNodeAtIndexPath(testTree, [], "child");
    addChildToNodeAtIndexPath(testTree, [0], "child1");
    expect(()=>deleteNodeAtIndexPath(testTree, [])).toThrow(new TreeIndexPathOutOfBoundsError('Cannot delete root'));
  });

  test('with list should delete appropriate node', ()=>{
    addChildToNodeAtIndexPath(testTree, [], "child");
    addChildToNodeAtIndexPath(testTree, [0], "grandchild0");
    addChildToNodeAtIndexPath(testTree, [0], "grandchild1");
    deleteNodeAtIndexPath(testTree, [0, 0]);
    expect(testTree.children[0].children.length).toEqual(1);
    expect(testTree.children[0].children[0].data).toEqual("grandchild1");
  });
});