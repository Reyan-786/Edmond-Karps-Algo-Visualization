export function bfs(source, target, graph) {
    const queue = [source];
    const visited = new Set();
    const path = {};

    while (queue.length > 0) {
        const currentNode = queue.shift();

        // console.log("Current Node:", currentNode); // Debug print

        if (currentNode === target) {
            const result = reconstructPath(path, source, target);
            // console.log("Path Found:", result); // Debug print
            return result;
        }

        visited.add(currentNode);

        for (const link of graph.links) {
            if (link.source === currentNode && !visited.has(link.target) && link.residualCapacity > 0) {
                queue.push(link.target);
                path[link.target] = currentNode;
            }
            if (link.target === currentNode && !visited.has(link.source) && link.flow > 0) {
                queue.push(link.source);
                path[link.source] = currentNode;
            }
        }
    }

    return null;
}

function reconstructPath(path, source, target) {
    const result = [];
    let current = target;
    while (current !== source) {
        result.unshift(current);
        current = path[current];
    }
    result.unshift(source);
    return result;
}


export function edmondkarp(source, target, graph) {

    const residualGraph = JSON.parse(JSON.stringify(graph));
    let maxflow = 0;
    let minCapacity = Infinity;
    while (true) {
        const augmentedPath = bfs(source, target, residualGraph);
        console.log(augmentedPath);
        if (!augmentedPath) {
            alert("No More Augmenting Path Found!");
            break;
        }
        
        
        for (let i = 0; i < augmentedPath.length - 1; i++) {
            const link = findLink(augmentedPath[i], augmentedPath[i + 1], residualGraph);
            minCapacity = Math.min(minCapacity, link.residualCapacity);
        }

        maxflow += minCapacity;

        for (let i = 0; i < augmentedPath.length - 1; i++) {
            updateFlow(augmentedPath[i], augmentedPath[i + 1], minCapacity, graph);
            updateFlow(augmentedPath[i], augmentedPath[i + 1], minCapacity, residualGraph);
        }
    }
    return maxflow;

}
function findLink(source,target,graph ) {
    return graph.links.find(link => link.source === source && link.target === target );
}

function updateFlow (source , target, amount , graph ) {
    const link = findLink(source, target, graph);
    link.flow += amount;
    link.residualCapacity-= amount;
    const reverseLink = findLink(target, source, graph);
    if (reverseLink) {
        reverseLink.residualCapacity += amount;
    }
}

