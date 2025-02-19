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
        let arrlength = arr.length
        let midindex = Math.round(arrlength/2)
        
        return insert(midindex)
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
            if(node.rightNode == null){
                return fn(node.value)
            }else{
                levelOrder(fn, node.rightNode)
            }
        }else {
            levelOrder(fn, node.leftNode)
        }
    }

    return {buildTree, insert, levelOrder}

}

let data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

let binaryTree = createBinaryTree();
// binaryTree.buildTree(data)
binaryTree.insert(3)
binaryTree.insert(2)
binaryTree.insert(1)
binaryTree.levelOrder(console.log)