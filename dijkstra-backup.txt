function distance(current, node){

    let dx = Math.abs(current.x - node.x)
    let dy = Math.abs(current.y - node.y)

    let c = Math.sqrt(dx * dx + dy * dy)

    return c;
}

function dijkstra(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

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
            let current = queue[src]

            for (let i = 1; i < queue.length; i++){
                if (dist[queue[i]] < current){
                    current = queue[i]
                }
            }
            console.log(current) //, queue)
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            queue.splice(queue.indexOf(current), 1)

            for (let n in graph[current]['neighbors']){
                let neighbor = graph[current]['neighbors'][n]

                if (neighbor){

                    let alt = dist[current] + 1 //distance(graph[current]['actualCoordinates'], graph[neighbor]['actualCoordinates']) 
                    if (alt < dist[neighbor] && queue.includes(neighbor)){
                        dist[neighbor] = alt;
                        prev[neighbor] = current
                    }

                }

            }
        } else {
            console.log('done')
            clearInterval(id)
        } 
    }, 20)
}

export { dijkstra }