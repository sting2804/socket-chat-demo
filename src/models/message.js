const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const MessageSchema = new Schema({
        conversationId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        author: {
            type: String, //auth0 user id
            required: true
        }
    },
    {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });

module.exports = mongoose.model('Message', MessageSchema);