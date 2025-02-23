class Node{
    constructor(value = null){
        this.value = value
        this.rightNode = null
        this.leftNode = null
    }

    // constructor(value = null, leftNode = null, rightNode = null){
    //     this.value = value
    //     this.rightNode = rightNode
    //     this.leftNode = leftNode
    // }
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
        let midval
        if(arr.length > 0){
            if(arr.length == 1){
                insert (arr[0])
            }else{
                midval = arr[Math.round(arr.length/2)]
                insert (midval)
                buildTree(arr.splice(0, Math.round(arr.length/2)))
                buildTree(arr.splice(Math.round(arr.length/2), arr.length))
            }
        }
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


    return {insert, buildTree, deleteItem, find, prettyPrint}
}


let data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const bst = createBST()
bst.buildTree(data)
bst.prettyPrint()
bst.deleteItem(8)
bst.prettyPrint()

