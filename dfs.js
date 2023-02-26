function dfs(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

    let queue = [ src ]
    let visited = []
    let parent = {}

    let id = setInterval(() => {
        if (queue.length > 0){
            let current = queue.pop()

            if (current == goal){
                clearInterval(id) 
                
                let path = [goal];
                let currentNode = goal;     

                let id0 = setInterval(() => {

                    if (currentNode !== src){
                        currentNode = parent[currentNode]
                        console.log(currentNode)
                        if (currentNode != src && goal != currentNode){
                            document.querySelector(`div[data-index='${currentNode}']`).classList.remove('solved')
                            document.querySelector(`div[data-index='${currentNode}']`).classList.add('solution')
                        }
                        
                        path.unshift(currentNode)
                    } else {
                        clearInterval(id0)
                    }

                }, 20)

            }
            // console.log(current)
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            for (let n in graph[current]['neighbors']){
                let node= graph[current]['neighbors'][n]
                if (!visited.includes(node)){
                    queue.push(node)
                    visited.push(node)
                    parent[node] = current

                }
            }
        }
    }, 10)
}

export { dfs }