function distance(current, node){

    let dx = Math.abs(current.x - node.x)
    let dy = Math.abs(current.y - node.y)

    let c = Math.sqrt(dx * dx + dy * dy)

    return c;
}

function dijkstra(src, goal, graph){
    let dist = {}
    let visited =[]
    let queue = []
    let parent = {}

    for (let node in graph){
        dist[node] = Infinity;
        parent[node] = null;
    }
    dist[src] = 0;

    queue.push(src)
  
    let id = setInterval(() => {

        if (queue.length > 0){
            let current = Infinity;

            for (let e of queue){
                if (!visited.includes(e) && dist[e] < current){
                    current = e;
                }
            }
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            if (current == goal){
                clearInterval(id)
                let path = [goal];
                let currentNode = goal;     

                let id0 = setInterval(() => {

                    if (currentNode !== src){
                        currentNode = parent[currentNode]
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

            queue.splice(queue.indexOf(current), 1)
            visited.push(current);
            
            for (let n in graph[current]['neighbors']){
                let neighbor = graph[current]['neighbors'][n]
                
                let alt = dist[current] + distance(graph[current]['actualCoordinates'], graph[neighbor]['actualCoordinates'])
                
                if (!visited.includes(neighbor) && !queue.includes(neighbor) && alt < dist[neighbor]){
                    dist[neighbor] = alt;
                    parent[neighbor] = current;
                }
                
                if (!visited.includes(neighbor) && !queue.includes(neighbor)){
                    queue.push(neighbor)
                }
                
            }
        }
    }, 20)

    return null;
}
  
  export {dijkstra}