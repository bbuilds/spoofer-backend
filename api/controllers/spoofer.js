const SpoofItem = require("../models/spoofitem");
const randomstring = require("randomstring");

const SpoofItemController = (module.exports = {
  create: (req, res) => {
    let name = randomstring.generate({ length: 8, charset: "alphabetic" });
    const { title, desc, img } = req.body;
    generateName = (callback) => {
      let name = randomstring.generate({ length: 8, charset: "alphabetic" });
      SpoofItem.find({ name }, (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, name);
        return generateName(callback);
      });
    }
    const spoofer = new SpoofItem({ title, desc, img, name });
    spoofer.save((err, spoofItem) => {
      if (err) return console.log(err);
      res.json(spoofItem);
    });
  },
  detail: (req, res) => {
    const { title, desc, img, name } = req.params;
    SpoofItem.findOne({ name: name }).then(spoofItems => {
      res.status(200).json({
        title: spoofItems.title,
        desc: spoofItems.desc,
        img: spoofItems.img
      });
    });
  },
  list: (req, res) => {
    SpoofItem.find().then(spoofItems => {
      res.status(200).json(spoofItems);
    });
  }
});