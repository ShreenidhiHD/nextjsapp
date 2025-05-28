import mongoose from 'mongoose';

export async function connect(){
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        mongoose.connect(mongoUri);
        const connection = mongoose.connection;

        connection.on('Connected', () => {
            console.log("MongoDB Connected Succesfully");
        })
        connection.on('Error', (err) => {
            console.log('Connection error.'  + err );
            process.exit();
        })

    } catch (error) {
        console.log('somehting went wrong');
        console.log(error)
    }

}