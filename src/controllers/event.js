const Event = require('../models/Event');

module.exports = {

  async index(req, res) {
    const event = await Event.find({});
    res.json({event});
  },

  async show(req, res){
    const { id } = req.params;
    const event = await Event.findById(id);
    res.json({event});
  },

  async store(req, res){
    const {title, developer, streetAddress, latlong} = req.body.data.attributes;
    
    const event = new Event({ title, developer, streetAddress, latlong });

    const error = event.validateSync();

    if (error) {
      const errorMessages = Object.values(error.errors).map(error => ({
        field: error.properties.path,
        message: error.properties.message
      }));

      res.status(400).json(errorMessages);
      return;
    }

    await event.save();
    res.json({event});
  },

  async update(req, res){
    const { id } = req.params;
    await Event.findByIdAndUpdate(id, req.body.devapp);

    const event = await Event.findById(id);

    res.json({event});
  }

};