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
    user=req.body
    user['id']=ID++
    users.push(user)
    
    res.send(user)
})

app.get('/', (req, res) => {
    res.send(users)
})

app.put('/', (req, res) => {})