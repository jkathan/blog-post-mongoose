'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var authorSchema = mogoose.schema({
    firstName: 'string',
    lastName: 'string'.
    userName: {
        type: 'string',
        unique: true
    }
});

const blogPostSchema = mongoose.Schema({
     title: { type: String, required: true },
     content: { type: String, required: true },
     author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
     created: { type: Date, default: Date.now}, 
});

blogPostSchema.pre('find', function(next) {
  this.populate('author');
  next();
});

blogPostSchema.pre('findOne', function(next) {
  this.populate('author');
  next();
});

blogPostSchema.virtual("completeName").get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.completeName,
    created: this.created
  };
};

var Author = mongoose.model('Author', authorSchema);
const Blog = mongoose.model("Blog", blogPostSchema);

module.exports = { Author, Blog };
