function distance(current, node){

    let dx = Math.abs(current.x - node.x)
    let dy = Math.abs(current.y - node.y)

    let c = Math.sqrt(dx * dx + dy * dy)

    return c;
}

let idDijsktra, idDijsktra0;
function dijkstra(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

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
  
    idDijsktra = setInterval(() => {

        if (queue.length > 0){
            let current = Infinity;

            for (let e of queue){
                if (!visited.includes(e) && dist[e] < current){
                    current = e;
                }
            }
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            if (current == goal){
                clearInterval(idDijsktra)
                let path = [goal];
                let currentNode = goal;     

                idDijsktra0 = setInterval(() => {

                    if (currentNode !== src){
                        currentNode = parent[currentNode]
                        if (currentNode != src && goal != currentNode){
                            document.querySelector(`div[data-index='${currentNode}']`).classList.remove('solved')
                            document.querySelector(`div[data-index='${currentNode}']`).classList.add('solution')
                        }
                        
                        path.unshift(currentNode)
                    } else {
                        clearInterval(idDijsktra0)
                    }

                }, 20)
            }

            queue.splice(queue.indexOf(current), 1)
            visited.push(current);
            
            for (let n in graph[current]['neighbors']){
                let neighbor = graph[current]['neighbors'][n]
                
                if (!neighbor) continue;

                // ALT
                // 1. 4x REPEAT - ALT ALWAYS SAME = EVERY NEIGHBOR COORDINATE DISTANCE ALWAYS EQUAL
                // 2. IF + 1 WILL BE SAME AS DFS
                // 3. USE .UNSHIFT OR .POP ON FINDING MIN V SIMILAR TO BFS 
                
                // TRY: alt = dist + 1
                let alt = dist[current] + distance(graph[current]['actualCoordinates'], graph[neighbor]['actualCoordinates'])
                console.log('current: ', current, 'alt: ', alt)
                if (!visited.includes(neighbor) && !queue.includes(neighbor) && alt < dist[neighbor]){
                    dist[neighbor] = alt;
                    parent[neighbor] = current;
                }
                
                if (!visited.includes(neighbor) && !queue.includes(neighbor)){
                    queue.push(neighbor)
                }
                
            }
        }
    }, 15)

    return null;
}
  
export {dijkstra, idDijsktra, idDijsktra0}