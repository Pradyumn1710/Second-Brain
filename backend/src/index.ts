import express  from 'express'
import mainRouter from './routes/app.ts'


const app = express()


app.use(express.json())
app.use('/',mainRouter)






app.listen(3000,()=>
console.log("Backend is running on port 3000")
)