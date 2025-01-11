import express  from 'express'
import {router} from './routes/app'
import cors  from 'cors'


const app = express()


app.use(express.json())
app.use(cors())

app.use('/routes',router)


app.listen(3000,()=>
console.log("Backend is running on port 3000")
)