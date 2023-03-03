let idBfs, idBfs0;
function bfs(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

    let queue = [ src ]
    let visited = []
    let parent = {}

    idBfs = setInterval(() => {
        if (queue.length > 0){
            let current = queue.shift()

            if (current == goal){
                clearInterval(idBfs)                
                
                let path = [goal];
                let currentNode = goal;     

                idBfs0 = setInterval(() => {

                    if (currentNode !== src){
                        currentNode = parent[currentNode]
                        
                        if (currentNode != src && goal != currentNode){
                            document.querySelector(`div[data-index='${currentNode}']`).classList.remove('solved')
                            document.querySelector(`div[data-index='${currentNode}']`).classList.add('solution')
                        }
                        
                        path.unshift(currentNode)
                    } else {
                        clearInterval(idBfs0)
                    }

                }, 20)

            }
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            for (let n in graph[current]['neighbors']){
                let node;
                if (graph[current]['neighbors'][n]){ // CHECK FOR NULL NEIGHBORS
                    node = graph[current]['neighbors'][n]
                }

                if (!visited.includes(node) && node){ // && graph[node]['state'] == 'empty' && node
                    queue.push(node)
                    visited.push(node)
                    parent[node] = current
                }
            }
        }
    }, 15)
}

function bfs_FAST(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('preview-start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('preview-end')

    let queue = [ src ]
    let visited = []
    let parent = {}

    while (queue.length > 0){
        let current = queue.shift()

        if (current != src && current != goal){
            document.querySelector(`div[data-index='${current}']`).classList.add('preview-visited')
        }

        if (current == goal){
            break;
        }

        for (let n in graph[current]['neighbors']){
            let node;
            if (graph[current]['neighbors'][n]){ // CHECK FOR NULL NEIGHBORS
                node = graph[current]['neighbors'][n]
            }

            if (!visited.includes(node) && node){ // && graph[node]['state'] == 'empty' && node
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
export { bfs, idBfs, idBfs0, bfs_FAST }
