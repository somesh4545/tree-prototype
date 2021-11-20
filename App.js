import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

function Queue() {
  this.elements = [];
}
Queue.prototype.enqueue = function (e) {
  this.elements.push(e);
};
// remove an element from the front of the queue
Queue.prototype.dequeue = function () {
  return this.elements.shift();
};
function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
}

function Tree(data) {
  var node = new Node(data);
  this._root = node;
}

Tree.prototype.traverseDF = function (callback) {
  // this is a recurse and immediately-invoking function
  (function recurse(currentNode) {
    // step 2
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this._root);
};

Tree.prototype.traverseBF = function (callback) {
  var queue = new Queue();

  queue.enqueue(this._root);

  var currentTree = queue.dequeue();
  while (currentTree) {
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }
    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

Tree.prototype.contains = function (callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.add = function (data, toData, traversal) {
  var child = new Node(data),
    parent = null,
    callback = function (node) {
      if (node.data === toData) {
        parent = node;
      }
    };
  this.contains(callback, traversal);
  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

Tree.prototype.remove = function (data, fromData, traversal) {
  var tree = this,
    parent = null,
    childToRemove = null,
    index;
  var callback = function (node) {
    if (node.data === fromData) {
      parent = node;
    }
  };
  this.contains(callback, traversal);
  if (parent) {
    index = findIndex(parent.children, data);
    if (index === undefined) {
      throw new Error('Node to remove does not exist.');
    } else {
      childToRemove = parent.children.splice(index, 1);
    }
  } else {
    throw new Error('Parent does not exist.');
  }
  return childToRemove;
};

function findIndex(arr, data) {
  var index;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].data === data) {
      index = i;
    }
  }
  return index;
}

// tree.add('VP of Happiness', 'CEO', tree.traverseBF);
// tree.add('VP of Finance', 'CEO', tree.traverseBF);
// tree.add('VP of Sadness', 'CEO', tree.traverseBF);
// tree.add('Director of Puppies', 'VP of Finance', tree.traverseBF);
// tree.add('Manager of Puppies', 'Director of Puppies', tree.traverseBF);

// tree.traverseDF(function (node) {
//   console.log(node.data);
// });

// tree is an example of a root node
// tree.contains(function (node) {
//   if (node.data === 'CEO') {
//     console.log(node);
//   }
// }, tree.traverseBF);

// tree.add('1', 'CEO', tree.traverseBF);
// tree.add('2', 'CEO', tree.traverseBF);
// tree.add('3', 'CEO', tree.traverseBF);
// tree.add('11', '1', tree.traverseBF);
// tree.add('12', '1', tree.traverseBF);
// tree.add('13', '1', tree.traverseBF);
// tree.add('21', '2', tree.traverseBF);

var tree = new Tree('CEO');
// console.log('BF');

// tree.traverseBF(function (node) {
//   console.log(node);
// });
const App = () => {
  const [Tree, setTree] = useState([]);
  const [name, setName] = useState('Son1');
  const [parent, setParent] = useState('CEO');
  const [child, setChild] = useState('');
  const [total, setTotal] = useState(1);
  /*  const add = () => {
    setTotal(prev => prev + 1);
    console.log(total);
    if (total > 1) {
      setTree(prev => [
        ...prev,
        <View key={total}>
          <Svg height="30" width="300">
            <Line x1="0" y1="0" x2="0" y2="100" stroke="red" strokeWidth="2" />
          </Svg>
          <View
            style={[styles.card, {position: 'absolute', top: top, left: left}]}>
            <Text>{total}</Text>
          </View>
        </View>,
      ]);
    } else {
      setTree(prev => [
        ...prev,
        <View key={total}>
          style=
          {{
            width: 100,
            backgroundColor: 'blue',
            height: 100,
            position: 'absolute',
            top: top,
            left: left,
          }}
          ><Text>{total.toString()}</Text>
        </View>,
      ]);
    }
    Tree.push(<View style={styles.card}></View>);
    console.log(Tree);
    tree();
  };*/

  useEffect(() => {
    // add('1', 'CEO');
    // add('2', 'CEO');
    // add('3', 'CEO');
    // add('11', '1');
    // add('12', '1');
    // add('13', '1');
    // add('14', '1');
  }, []);

  const add = (name, parent) => {
    setTotal(prev => prev + 1);
    if (parent.length === 0) {
      tree.add(name, null, tree.traverseBF);
    } else {
      tree.add(name, parent, tree.traverseBF);
    }
    console.log('Iteration: ' + total);
    setTree([]);
    let tempParent = '';
    let tempPrevNode = '';
    var x = 0;
    tree.traverseBF(function (node) {
      if (node.parent != null && tempParent.data == node.parent.data) {
        Tree.map(item => {
          if (item.id == tempPrevNode.data) {
            // if (node.data == 'W')
            //   console.log('children count ' + tempPrevNode.children.length);
            let val = 30;
            if (tempPrevNode.children.length > 1) {
              val = tempPrevNode.children.length * 30;
              Tree.map(it => {
                tempParent.children.forEach(child => {
                  if (child.data == it.id) it.left = it.left + 30;
                });
                // if (tempPrevNode.parent == it.id) {
                //   console.log(it.parent);
                // }
              });

              console.log(val);
            }
            setTree(prev => [
              ...prev,
              {id: node.data, left: item.left + val, top: -20},
            ]);
          }
        });
      } else {
        // console.log('from else: ' + node.data);
        if (node.parent != null) {
          tempParent = node.parent;
        }
        // i = 0;
        setTree(prev => [...prev, {id: node.data, left: 10, top: 20}]);
      }
      tempPrevNode = node;
      x++;
      /*  if (node.parent != null) {
        var count = 0;
        tree.contains(function (temp) {
          if (temp.data == node.parent.data) {
            console.log('parent data: ' + temp);
            let res = temp;
            console.log('count of children: ' + res.children.length);
            // if(res.children.length > 1) flag = true;
            count = res.children.length;
          }
        }, tree.traverseBF);
        if (count >= 2) {
          setTree(prev => [...prev, {id: node.data, left: 200, top: -100}]);
        } else {
          setTree(prev => [...prev, {id: node.data, left: 100, top: 100}]);
        }
      } else {
        setTree(prev => [...prev, {id: node.data, left: 100, top: 100}]);
      } */
      // console.log(node.parent);
    });
    // setTotal(prev => prev + 1);
    // setTree(prev => [...prev, {id: total, top, left}]);
  };
  // const tree = () => {
  //   let data = [];
  //   for (let i = 0; i < total; i++) {
  //     data.push(<View style={styles.card}></View>);
  //   }
  //   console.log(data);
  //   setTree(data);
  //   return data;
  // };
  return (
    <View style={{flex: 1, backgroundColor: 'lavender'}}>
      <View
        style={{
          width: '100%',
          flex: 1,
          height: '100%',
          overflow: 'scroll',
          // flexWrap: 'wrap',
          backgroundColor: '#000',
        }}>
        {Tree.map(item => {
          // console.log(parseInt(item.left));
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => console.log('press')}
              style={{
                zIndex: 100,
                width: 20,
                height: 20,
                backgroundColor: 'blue',
                position: 'relative',
                marginLeft: parseInt(item.left),
                marginTop: parseInt(item.top),
              }}>
              <Text>{item.id}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setParent(text)}
          value={parent}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setChild(text)}
          value={child}
        />
        <Button
          onPress={() => add(name, parent)}
          title="Add"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: 'blue',
  },
  input: {
    color: 'white',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
