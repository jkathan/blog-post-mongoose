'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const blogPostSchema = mongoose.Schema({
     title: { type: String, required: true },
     content: { type: String, required: true },
     author: {
        firstName: String,
        lastName: String,
     }, 
     created: { type: Date, default: Date.now}, 
});

blogPostSchema.virtual("completeName").get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

restaurantSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.completeName,
    created: this.created
  };
};

const Blog = mongoose.model("Blog", blogPostSchema);

module.exports = { Blog };
