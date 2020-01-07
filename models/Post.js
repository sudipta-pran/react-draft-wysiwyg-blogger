const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: Object,
        required: true
    }
},  { minimize: false })

module.exports = Post = mongoose.model('post', PostSchema)