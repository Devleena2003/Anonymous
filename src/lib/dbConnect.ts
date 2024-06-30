import mongoose from 'mongoose'

type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("already connected to database")
        return
    }

    try {
        const db = await mongoose.connect("mongodb+srv://devleena2003:y6FuxRQijKMbEu2J@cluster0.kc09ur8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        connection.isConnected = db.connections[0].readyState
        
        console.log('db connected successfully')
    }
    catch (error) {
        console.log('database connection failed', error)
      process.exit(1)  
    }
}

export default dbConnect