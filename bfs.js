function bfs(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

    let queue = [ src ]
    let visited = []
    let parent = {}

    let id = setInterval(() => {
        if (queue.length > 0){
            let current = queue.shift()

            if (current == goal){
                console.log(current, goal)
                clearInterval(id)                
                
                // let path = [current]
                // while(parent[current]){ //parent[current]
                //     document.querySelector(`div[data-index='${current}']`).classList.add('path')
                //     current = parent[current]
                //     path.push(parent[current])
                //     console.log(path)
                // }
                // alert('done')
                // let div = document.querySelectorAll(`div[data-index]`)
                // div.forEach(divs => {
                //     if (path.includes(div.dataset.index)){
                //         div.classList.add('path')
                //     }
                // })

            }
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            for (let n in graph[current]['neighbors']){
                let node;
                if (n){
                    node = graph[current]['neighbors'][n]
                }
                
                // CHECKING OUTSIDE OF BOX - UNDEFINED 
                // UNDEFINED CONFLICTING WITH STATE
                // UPDATE NEIGHBORS IF STATE BARRIER

                // if (!node || !graph[node]['state']){ 
                //     console.log(node, graph[node], current)
                //     console.log(graph)

                // }

                if (!visited.includes(node)){ // && graph[node]['state'] == 'empty' && node
                    queue.push(node)
                    visited.push(node)
                    parent[node] = current
                }
            }
        }
    }, 10)
}

export { bfs }
