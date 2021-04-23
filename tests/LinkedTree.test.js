import TreeIndexPathOutOfBoundsError from '../errors/TreeIndexPathOutOfBoundsError.js';
import LinkedTree from '../models/LinkedTree.js';


describe('addChildToNodeAtIndexPath', ()=>{
  let testTree = null;

  beforeEach(()=>{
    testTree = new LinkedTree();
  });

  test('with null on empty tree should create root', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    expect(testTree.rootNode.nodeData).toEqual("root");
  });

  test('with empty list should add child to root', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    expect(testTree.rootNode.children[0].nodeData).toEqual("child");
  });

  test('with list should add child correct place', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    testTree.addChildToNodeAtIndexPath([0], "child1");
    expect(testTree.rootNode.children[0].children[0].nodeData).toEqual("child1");
  });

  test('on empty tree without null index path should throw error', ()=>{
    expect(()=>testTree.addChildToNodeAtIndexPath([0,1]))
    .toThrow(new TreeIndexPathOutOfBoundsError('Tree is empty. Use addRoot(rootData) to set root.'));
  });

  test('on nonexistent child should throw error', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    expect(()=>testTree.addChildToNodeAtIndexPath([1]))
    .toThrow(new TreeIndexPathOutOfBoundsError('No node at 1 -- element 0 of index path: 1. Node at only has 1 children.'));
  });
  
});

describe('addRoot', ()=>{
  let testTree = null;

  beforeEach(()=>{
    testTree = new LinkedTree();
  });

  test('on empty tree should create root', ()=>{
    testTree.addRoot("root");
    expect(testTree.rootNode.nodeData).toEqual("root");
  });

  test('on non-empty tree should create root with no children', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    testTree.addChildToNodeAtIndexPath([0], "child1");
    testTree.addRoot("root");
    expect(testTree.rootNode.children.length).toEqual(0);
  });
});

describe('deleteNodeAtIndexPath', ()=>{
  let testTree = null;

  beforeEach(()=>{
    testTree = new LinkedTree();
  });

  test('with empty index path should delete root', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    testTree.addChildToNodeAtIndexPath([0], "child1");
    testTree.deleteNodeAtIndexPath([]);
    expect(testTree.rootNode).toBeNull();
  });

  test('with list should delete appropriate node', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    testTree.addChildToNodeAtIndexPath([0], "grandchild0");
    testTree.addChildToNodeAtIndexPath([0], "grandchild1");
    testTree.deleteNodeAtIndexPath([0, 0]);
    expect(testTree.rootNode.children[0].children.length).toEqual(1);
    expect(testTree.rootNode.children[0].children[0].nodeData).toEqual("grandchild1");
  });

  test('on empty tree should throw error', ()=>{
    expect(()=>testTree.deleteNodeAtIndexPath([])).toThrow(new TreeIndexPathOutOfBoundsError('Tree is empty. No need to delete.'));
  });
});

describe('getSubTreeAtIndexPath', ()=>{
  let testTree = null;

  beforeEach(()=>{
    testTree = new LinkedTree();
  });

  test('with empty index path returns this', ()=>{
    expect(testTree.getSubTreeAtIndexPath([])).toBe(testTree);
  });

  test('returns correct subtree', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    testTree.addChildToNodeAtIndexPath([0], "grandchild0");
    testTree.addChildToNodeAtIndexPath([0], "grandchild1");

    let subTree = testTree.getSubTreeAtIndexPath([0]);
    expect(subTree.rootNode.nodeData).toEqual("child");
    expect(subTree.rootNode.children.length).toEqual(2);
  });

  test('with non empty index path on empty tree throws error', ()=>{
    expect(()=>{testTree.getSubTreeAtIndexPath([0])}).toThrow(new TreeIndexPathOutOfBoundsError('Tree is empty.'));
  });

  test('with bad index path throws error', ()=>{
    testTree.addChildToNodeAtIndexPath(null, "root");
    testTree.addChildToNodeAtIndexPath([], "child");
    testTree.addChildToNodeAtIndexPath([0], "grandchild0");
    testTree.addChildToNodeAtIndexPath([0], "grandchild1");
    expect(()=>{testTree.getSubTreeAtIndexPath([1])})
    .toThrow(new TreeIndexPathOutOfBoundsError('No node at 1 -- element 0 of index path: 1. Node at only has 1 children.'));
  });
});