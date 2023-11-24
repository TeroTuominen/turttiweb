const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    name: String,
    categoryId: mongoose.Types.ObjectId,
}, {
    timestamps: true,
});

const Forum = mongoose.model('Forum', ForumSchema);
module.exports = Forum;