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
    }
]

app.post('/', (req, res) => {
    const newUser = {
        id: ++users.length,
        ...req.body
    };
    users.push(newUser)
    res.json(newUser)
})

app.get('/', (req, res) => {
    res.json({
        count: users.length,
        users
    })
})

app.put('/:id', (req, res) => {
    const newUser = {
        id: ++users.length,
        ...req.body
    }
    const userIndex = users.filter(user => user.id == req.params.id)
    users.splice(userIndex.id, 1, req.body)
    users.pop()
    res.json(users)
})

app.delete('/:id', (req, res) => {
    const userIndex = users.filter(user => user.id == req.params.id)
    users.splice(userIndex.id, 1)
    res.json({ status: "success" })
})

app.patch('/:id', (req, res) => {
    const userIndex = users.filter(user => user.id == req.params.id)
    users[--userIndex[0].id] =  {
        ...userIndex[0],
        ...req.body,
        id: parseInt(req.params.id)
    }
    
    res.json(users[userIndex[0].id])
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})