const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect('mongodb://localhost/pidgeonDB')
  .then(()=>{console.log('Connected to MongoDB')})
  .catch(err => {console.log('Error connecting to MongoDB:', err.message)});
}

connect();

const testSchema = new mongoose.Schema({
  name: String,
  url: {type:String, unique:true},
  isPigdeon: Boolean,
  confidence: Number,
  isLiked: Boolean
});

const Test = mongoose.model('Test', testSchema);

module.exports = {
  connect,
  Test,

  getAll: function() {
    return Test.find().sort({isLiked: -1}).sort({confidence: -1});
  },

  save: function(bird) {
    let newBird = new Test(bird);
    return newBird.save();
  },

  updateName: function(target) {
    return Test.updateOne({url: target.url}, {name: target.name});
  },

  updateStatus: function(target) {
    return Test.updateOne({url: target.url}, {isPigdeon: !target.isPigdeon});
  },

  updateLike: function(target) {
    return Test.updateOne({url: target.url}, {isLiked: !target.isLiked});
  },

  deleteBird: function(target) {
    return Test.deleteOne({_id: target._id});
  }
}