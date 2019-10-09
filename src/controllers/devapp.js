const Devapp = require('../models/Devapp');
const { deserializeAttributes, serializeResponse, singleEntityIncludes, collectionEntityIncludes } = require('../utils');

const relationships = [
  { relationship: 'events' },
  { relationship: 'blockchain', type: 'blockchains', relType: 'one' }
];

module.exports = {

  async index(req, res) {
    const devapps = await Devapp.find({});

    const data = devapps.map(devapp => serializeResponse('devapps', devapp, relationships));
    const included = collectionEntityIncludes(devapps, relationships);
    
    res.setHeader('Content-Type', 'application/vnd.api+json');
    res.json({data, included});
  },

  async show(req, res){
    const { id } = req.params;
    const devapp = await Devapp.findById(id);
    
    const data = serializeResponse('devapps', devapp, relationships);
    const included = singleEntityIncludes(devapp, relationships);
    
    res.setHeader('Content-Type', 'application/vnd.api+json');
    res.json({data, included});
  },

  async store(req, res){
    const cleanAttributes = deserializeAttributes(req.body);
    const devapp = new Devapp(cleanAttributes);

    const error = devapp.validateSync();

    if (error) {
      const errorMessages = Object.values(error.errors).map(error => ({
        field: error.properties.path,
        message: error.properties.message
      }));

      res.status(400).json(errorMessages);
      return;
    }

    devapp.events.push({
      eventType: 'Status Change', 
      data: 'Application Created'
    });

    await devapp.save();

    const data = serializeResponse('devapps', devapp, relationships);
    const includes = singleEntityIncludes(devapp, relationships);
    
    res.setHeader('Content-Type', 'application/vnd.api+json');
    res.json({data, includes});
  },

  async update(req, res){
    const { id } = req.params;
    await Devapp.findByIdAndUpdate(id, req.body.devapp);

    const devapp = await Devapp.findById(id);

    const data = serializeResponse('devapps', devapp, relationships);
    const included = singleEntityIncludes(devapp, relationships);
    
    res.setHeader('Content-Type', 'application/vnd.api+json');
    res.json({data, included});
  }

};