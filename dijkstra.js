function distance(current, node){

    let dx = Math.abs(current.x - node.x)
    let dy = Math.abs(current.y - node.y)

    let c = Math.sqrt(dx * dx + dy * dy)

    return c;
}

function dijkstra(src, goal, graph){
    let dist = {}
    let prev = {}
    let queue = []
    for (let node in graph){
        dist[node] = Infinity
        prev[node] = null
        queue.push(node)
    }
    dist[src] = 0

    let id = setInterval(() => {
        if (queue.length > 0){
            
            let current = 0

            for (let i = 0; i < queue.length; i++){
                if (dist[queue[i]] < current){
                    current = queue[i]
                }
            }
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            queue.splice(queue.indexOf(current), 1)

            for (let neighbor in graph[current]['neighbors']){

                console.log(graph[current])
                let alt = dist[current] + distance(graph[current]['actualCoordinates'], graph[neighbor]['actualCoordinates']) 

                if (alt < dist[neighbor] && queue.includes(neighbor)){
                    dist[neighbor] = alt;
                    prev[neighbor] = current
                }
            }
        } else clearInterval(id)
    }, 20)
}

export { dijkstra }