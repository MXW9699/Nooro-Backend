import express from 'express'

import {taskRouter} from './Routers/TaskRouter'

const app = express()
const PORT = 3000
app.use(express.json());
app.use(express.urlencoded());

app.use('/tasks', taskRouter)

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})