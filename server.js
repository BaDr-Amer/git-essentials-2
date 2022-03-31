import express from "express";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = [
    {
        id: 1,
        name: 'John',
        profile: {
            address1: 'address 1',
            address2: 'address 2'
        }
    },
    {
        id: 2,
        name: 'Doe',
        profile: {
            address1: 'address 3',
            address2: 'address 4'
        }
    },
    {
        id: 3,
        name: 'mark',
        profile: {
            address1: 'address 5',
            address2: 'address 6'
        }
    },
    {
        id: 4,
        name: 'aseel',
        profile: {
            address1: 'address 7',
            address2: 'address 8'
        }
    }
]

app.post('/', (req, res) => {
    users.push(req.body)
    res.send(req.body)
})

app.get('/:id/:name/:address1/:address2', (req, res) => {
    res.send({
        id : req.params.id,
        name: req.params.name,
        profile: {
            address1 : req.params.address1,
            address2 : req.params.address2,
        },
    })
})

app.get('/', (req, res) => {
    res.send(users)
})

app.put('/:id', (req, res) => {
    let id = +req.params.id;
    let body = req.body;
    let index = users.findIndex(us => us.id === id);
    if(index >= 0){
        let updatedUsers = {id: id, ...body};
        users[index] = updatedUsers;
        res.send(updatedUsers);
        console.log(index);
    }else{
        res.status(404).send("No user found");
    }
})

app.delete('/:id', (req, res) => {
    let id = +req.params.id;
    let index = users.findIndex(us => us.id === id);
    let deletedUser = users.splice(index,1);
    res.send(deletedUser);
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})