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
                if (n){
                    node = graph[current]['neighbors'][n]
                }

                if (!visited.includes(node)){ // && graph[node]['state'] == 'empty' && node
                    queue.push(node)
                    visited.push(node)
                    parent[node] = current
                }
            }
        }
    }, 15)
}

export { bfs, idBfs, idBfs0 }
