class Node{
    constructor(value = null){
        this.value = value
        this.rightNode = null
        this.leftNode = null
    }
}

function createBinaryTree(){
    let tree = new Node()
    
    function buildTree (arr){
        while (arr.length >1) {
            let mid1 = Math.round(arr.length / 2)
            insert(arr[mid1])
            let tmp = arr.splice(mid1, arr.length)
            arr = arr.splice(0, mid1)
            buildTree(tmp)
        }
    }

    function insert(value, node = tree){
        if(node.value == null){
            node.value = value
            return
        }
        if(node.value > value){
            if(node.leftNode == null){
                node.leftNode = new Node(value)
                return
            }else return insert(value, node.leftNode)
        }else{
            if(node.rightNode == null){
                node.rightNode = new Node(value)
                return
            }else return insert(value, node.rightNode)   
        }
    }

    function levelOrder(fn, node = tree){
        if(node.leftNode == null){
            fn(node)
        }else {
            levelOrder(fn, node.leftNode)
        }
        if(node.rightNode == null){
            fn(node)
        }else{
            levelOrder(fn, node.rightNode)
        }
    }

    function deleteItem(value, node = tree){
        if(node.leftNode != null && node.leftNode.value == value){
            tmp = node.leftNode
        }
    }

    function find(){

    }

    function inOrder(){

    }

    function preOrder(){

    }
    
    function postOrder(){

    }

    function height(){

    }

    function depth(){

    }

    function isBalanced(){

    }

    function reBalance(){

    }

    return {buildTree, insert, levelOrder, find}

}

let data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

let binaryTree = createBinaryTree();
binaryTree.buildTree(data)
// binaryTree.levelOrder(console.log)
binaryTree.find(23)
// console.log(binaryTree.tree)