const Node = require('./nodeserver');
let instance = null;

class ServerList
{
    constructor()
    {
        if(!instance)
        {
            instance = this;
        }

        this.Nodes = [];

        return instance;
    };

    // This will actually contain a loop
    // sending http requests to all nodes
    pollNodes()
    {
        this.Nodes =
        [
            new Node({
                "Name": "Node-0",
                "IP": "255.255.255.255",
                "Capacity": 3,
                "Clients": 3
            }),
            new Node({
                "Name": "Node-1",
                "IP": "255.255.255.255",
                "Capacity": 3,
                "Clients": 2
            }),
            new Node({
                "Name": "Node-2",
                "IP": "255.255.255.255",
                "Capacity": 3,
                "Clients": 3
            })
        ];
    }


    getAllNodes()
    {
        return this.Nodes;
    }

    getSuitableNode()
    {
        console.log(this.Nodes.length)
        for(let node of this.Nodes)
        {
            console.log(node.Name);
            console.log(node.getConnectable());
            if(node.getClientCount() < 3)
            {
               return node.getConnectable.bind(node);
            }
            else
            {
                console.log("bitch");
            }
        }
    }

}

module.exports = ServerList;







