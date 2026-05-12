import mongoose from 'mongoose';


const TestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
});


// ✅ Export the model
export const Test = mongoose.model('Test', TestSchema);

