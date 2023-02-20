function dfs(src, goal, graph){
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

    let queue = [ src ]
    let visited = []

    let id = setInterval(() => {
        if (queue.length > 0){
            let current = queue.pop()

            if (current == goal){
                console.log(current, goal)
                clearInterval(id)                
            }
            // console.log(current)
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')

            for (let n in graph[current]['neighbors']){
                let node= graph[current]['neighbors'][n]
                if (!visited.includes(node)){
                    queue.push(node)
                    visited.push(node)
                }
            }
        }
    }, 10)
}

export { dfs }