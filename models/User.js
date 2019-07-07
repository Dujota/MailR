const mongoose = require('mongoose');
// Schema object will define the properties for each collection (what record will look like)
const { Schema } = mongoose;

// declare the schema by passing an object to the constructor that defines property: dataType
const userSchema = new Schema({ googleId: String });

// let Mongoose know we wnat to use/create a new collection defined by the schema above.
mongoose.model('users', userSchema);

module.exports = userSchema;
