let idDfs, idDfs0;
function dfs(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('preview-start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('preview-end')

    let queue = [ src ]
    let visited = []
    let parent = {}

    idDfs = setInterval(() => {
        if (queue.length > 0){
            let current = queue.pop()

            if (current == goal){
                clearInterval(idDfs) 
                
                let path = [goal];
                let currentNode = goal;     

                idDfs0 = setInterval(() => {

                    if (currentNode !== src){
                        currentNode = parent[currentNode]
                        console.log(currentNode)
                        if (currentNode != src && goal != currentNode){
                            document.querySelector(`div[data-index='${currentNode}']`).classList.remove('solved')
                            document.querySelector(`div[data-index='${currentNode}']`).classList.add('solution')
                        }
                        
                        path.unshift(currentNode)
                    } else {
                        clearInterval(idDfs0)
                    }

                }, 20)

            }
            // console.log(current)
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            for (let n in graph[current]['neighbors']){
                let node = graph[current]['neighbors'][n]
                if (!visited.includes(node) && node){
                    queue.push(node)
                    visited.push(node)
                    parent[node] = current

                }
            }
        }
    }, 15)
}

function dfs_FAST(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('preview-start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('preview-end')

    let queue = [ src ]
    let visited = []
    let parent = {}

    while (queue.length > 0){
        let current = queue.pop()

        if (current != src && current != goal){
            document.querySelector(`div[data-index='${current}']`).classList.add('preview-visited')
        }

        if (current == goal){
            break
        }

        for (let n in graph[current]['neighbors']){
            let node = graph[current]['neighbors'][n]
            
            if (!visited.includes(node) && node){
                queue.push(node)
                visited.push(node)
                parent[node] = current

            }
        }
    }

    let path = [goal];
    let currentNode = goal;     

    while (currentNode !== src){
        currentNode = parent[currentNode]
        
        if (currentNode != src && goal != currentNode){
            document.querySelector(`div[data-index='${currentNode}']`).classList.remove('preview-visited')
            document.querySelector(`div[data-index='${currentNode}']`).classList.add('preview-path')
        }
        
        path.unshift(currentNode)
    } 
}

export { dfs, idDfs, idDfs0, dfs_FAST }