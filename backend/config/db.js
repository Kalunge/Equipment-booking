import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log(`Mongodb connceted: ${conn.connection.host}`.yellow.bold)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold)
    process.exit(1)
  }
}

export default connectDb