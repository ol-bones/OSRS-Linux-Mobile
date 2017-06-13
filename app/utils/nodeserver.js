class Node
{

    constructor(args)
    {
        this.Name = args.Name || "Unknown Node";
        this.IP = args.IP || "0.0.0.0";
        this.Capacity = args.Capacity || 0;
        this.Clients = args.Clients || Infinity;
    }

    getClientCount()
    {
        return this.Clients;
    }

    getConnectable()
    {
        return ({"Port": "99999"});
    }

}

module.exports = Node;













