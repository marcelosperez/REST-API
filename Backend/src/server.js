import app from './app.js';
import mongoose from 'mongoose';

const MONGO_URI = "mongodb://devhouse:devhouse@ac-ktyeier-shard-00-00.krdlxvy.mongodb.net:27017,ac-ktyeier-shard-00-01.krdlxvy.mongodb.net:27017,ac-ktyeier-shard-00-02.krdlxvy.mongodb.net:27017/?ssl=true&replicaSet=atlas-hdygfd-shard-0&authSource=admin&appName=Cluster0";


mongoose.connect(MONGO_URI)
    //starts the server only after MongoDB connects successfully 
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(3333, () => console.log('Server running on port 3333'));
	})
	.catch(err => {
		console.error('Failed to connect to MongoDB:', err);
		process.exit(1);
	});