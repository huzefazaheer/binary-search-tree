class Node{
    constructor(value = null){
        this.value = value
        this.rightNode = null
        this.leftNode = null
    }
}

function createBST(){

    let tree = new Node()

    const prettyPrint = (node = tree, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.rightNode !== null) {
          prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.leftNode !== null) {
          prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
     

    function buildTree(arr){
        arr = arr.sort(function(a, b){return a-b})
        if (arr.length== 1 ) {
            insert (arr[0])
            return
        }
        let midval = arr[Math.floor(arr.length/2)]
        insert (midval)
        let lArr = arr.splice(0, Math.floor(arr.length/2))
        let rArr = arr.splice(arr.indexOf(midval) + 1, arr.length)
        if (lArr.length > 0) buildTree(lArr)
        if (rArr.length > 0) buildTree(rArr)
    }

    function insert(value, node = tree){
        if (node.value == null) {
            node.value = value
        }else {
            if(node.value != value){
                if(node.value > value){
                    if(node.leftNode == null) node.leftNode = new Node(value)
                    else return insert(value, node.leftNode)
                }else{
                    if(node.rightNode == null) node.rightNode = new Node(value)
                    else return insert(value, node.rightNode)
                }
            }
        }
    }

    function deleteItem(value, node = tree, prevnode = tree){
        if(node.value == value){
            let tmp = node
            if(node.leftNode == null && node.rightNode == null){
                // no children
                if(prevnode.leftNode == node){
                    prevnode.leftNode = null
                }else prevnode.rightNode = null

            }else if(node.rightNode == null){
                // one child
                if(prevnode.leftNode == node){
                    prevnode.leftNode = node.leftNode
                }else prevnode.rightNode = node.leftNode

            }else if(node.leftNode == null){
                // one child
                if(prevnode.leftNode == node){
                    prevnode.leftNode = node.rightNode
                }else prevnode.rightNode = node.rightNode

            }else{
                // two children
                let i = node.leftNode
                let previ = i
                while(i.rightNode){
                    previ = i
                    i = i.rightNode
                }
                node.value = i.value
                if(previ.leftNode == i){
                    previ.leftNode = i.rightNode
                }else previ.rightNode = i.rightNode
            }
        }else{
            if(node.value > value && node.leftNode != null) return deleteItem(value, node.leftNode, node)
            if(node.value < value && node.rightNode != null) return deleteItem(value, node.rightNode, node)
        }
    }

    function find(value, node = tree){
        if(node.value == value){
            return node
        }else{
            if(node.value > value && node.leftNode != null) return find(value, node.leftNode)
            if(node.value < value && node.rightNode != null) return find(value, node.rightNode)
        }
    }

    function inOrder(fn, node = tree){
        if(node.leftNode){
            inOrder(fn, node.leftNode)
        }
        fn(node.value)
        if(node.rightNode){
            inOrder(fn, node.rightNode)
        }
    }

    function preOrder(fn, node = tree){
        fn(node.value)
        if(node.leftNode){
            preOrder(fn, node.leftNode)
        }
        if(node.rightNode){
            preOrder(fn, node.rightNode)
        }
    }

    function postOrder(fn, node = tree){ 
        if(node.leftNode){
            postOrder(fn, node.leftNode)
        }
        if(node.rightNode){
            postOrder(fn, node.rightNode)
        }
        fn(node.value)
    }

    function levelOrder(fn, node = tree) {
        if (!node) return;
    
        let queue = [];
        queue.push(node);
    
        while (queue.length > 0) {
            let node = queue.shift();
            fn(node.value)
    
            if (node.leftNode) queue.push(node.leftNode);
            if (node.rightNode) queue.push(node.rightNode);
        }
    }

    async function reBalance(node = tree){

        let queue = [], arr = []
        let i =0
        if (node != null)queue.push(node)
            else return 0
        while(queue.length > 0){
            let tmp = queue.shift()
            arr.push(tmp.value)
            if(tmp.leftNode != null) queue.push(tmp.leftNode)
            if(tmp.rightNode != null) queue.push(tmp.rightNode)
            i++
            
        }

        tree = new Node()
        buildTree(arr)
    }

    function getDepth(value, node = tree, x = 0){
        if(node.value == value){
            return x
        }else{
            if(node.value > value && node.leftNode != null) return getDepth(value, node.leftNode, x = x+1)
            if(node.value < value && node.rightNode != null) return getDepth(value, node.rightNode, x = x +1)
        }
    }  

    function getHeight(node){

        if(node == null){
            return - 1
        }

        return Math.max(getHeight(node.leftNode), getHeight(node.rightNode)) + 1
    }


    function isBalanced(node = tree){
        if (node === null) return true;

        let lHeight = getHeight(node.leftNode);
        let rHeight = getHeight(node.rightNode);
        // console.log(node.value, lHeight, rHeight, lHeight - rHeight)
        if (Math.abs(lHeight - rHeight) > 1){
            return false;
        }
        return isBalanced(node.leftNode) && isBalanced(node.rightNode);
    }


    return {insert, buildTree, deleteItem, find, prettyPrint, inOrder, preOrder, postOrder, levelOrder, reBalance, getHeight, getDepth, isBalanced, tree}
}


let data = [5, 11, 9, 8, 55, 44, 2, 6]

const bst = createBST()
bst.buildTree(data)
bst.prettyPrint()
bst.getDepth(2)
console.log(bst.isBalanced())
bst.insert(101)
bst.insert(200)
bst.insert(500)
bst.insert(600)
bst.insert(5000)
bst.prettyPrint()
console.log(bst.isBalanced())
bst.reBalance()
bst.prettyPrint()
console.log(bst.isBalanced())
bst.inOrder(console.log)
// bst.preOrder(console.log)
// bst.postOrder(console.log)