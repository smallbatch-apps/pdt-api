const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  transactionHash: String,
  eventType: String,
  owner: String,
  ownerCompany: String,
  to: String,
  documentName: String,
  documentFile: String,
  data: String,
  timestamp: {type: Date, default: Date.now}
});

const BlockchainSchema = new Schema({
  creationTime: {type: Date, default: null },
  lodged: { type: Boolean, default: false },
  lodgementTime: {type: Date, default: null },
  approved: { type: Boolean, default: false },
  approvalTime: {type: Date, default: null },
  noticeOfDetermination: {type: String, default: '' },
  constructionCertificateLodged: { type: Boolean, default: false },
  constructionCertificateLodgementTime: {type: Date, default: null },
  constructionCertificateIssued: { type: Boolean, default: false },
  constructionCertificateIssuedTime: {type: Date, default: null },
  constructionCertificate: {type: String, default: '' },
  subdivisionCertificateLodged: { type: Boolean, default: false },
  subdivisionCertificateLodgementTime: {type: Date, default: null },
  subdivisionCertificateIssued: { type: Boolean, default: false },
  subdivisionCertificateIssuedTime: {type: Date, default: null },
  subdivisionCertificate: {type: String, default: '' }
}, { toJSON: { virtuals: true } });

BlockchainSchema.virtual('status').get(function(){
  
  if(!this.lodged) {
    return 'Triage';
  }
  
  if(!this.approved) {
    return 'Lodged';
  }
  
  if(!this.constructionCertificateLodged) {
    return 'Approved';
  }
  
  if(!this.constructionCertificateIssued){
    return 'CC Lodged';
  }
  
  if(!this.subdivisionCertificateLodged) {
    return 'CC Issued';
  }

  if(!this.subdivisionCertificateIssued){
    return 'SC Lodged';
  }

  return 'SC Issued';
});

const DevappSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user'},
  applicationId: String,
  title: {
    type: String,
    trim: true,
    required: true
  },
  cost: {
    type: String,
    trim: true,
    required: true
  },
  streetAddress: {
    type: String,
    trim: true,
    required: true
  },
  latlong: {
    type: String,
    trim: true,
    required: true
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  blockchain: {
    type: BlockchainSchema,
    default: BlockchainSchema
  },
  events: [EventSchema]
});

const Devapp = mongoose.model('devapp', DevappSchema);

module.exports = Devapp;