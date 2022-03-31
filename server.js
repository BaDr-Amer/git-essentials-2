import express from "express";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let users = [
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
   let user=req.body
  console.log(user)
   user.id+=1
   users.push(user)
   res.send(users)
    
})

app.get('/', (req, res) => {
    console.log(req.body)

  })


app.put('/', (req, res) => {
    console.log(req.body.id)   
let index=users.findIndex
(u=>u.id===parseInt(req.body.id));
users[index]=req.body
console.log(index)
res.send(users)
})

app.delete('/', (req, res) => {
   users=null
   res.send(users)
})

app.patch('/', (req, res) => {
   
    let index = users.findIndex(
      u => u.id === parseInt(req.body.id)
    );
    for (let key in req.body) {
      users[index][key] = req.body[key];
    }
    res.send(users)
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})