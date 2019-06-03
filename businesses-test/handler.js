'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Business = require('./models/business.js');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
      Business.create(JSON.parse(event.body))
        .then(business => callback(null, {
          statusCode: 200,
          body: JSON.stringify(business)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the business.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Business.findById(event.pathParameters.id)
        .then(business => callback(null, {
          statusCode: 200,
          body: JSON.stringify(business)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the business.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Business.find()
        .then(businesss => callback(null, {
          statusCode: 200,
          body: JSON.stringify(businesss)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the businesss.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Business.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(business => callback(null, {
          statusCode: 200,
          body: JSON.stringify(business)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the businesss.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Business.findByIdAndRemove(event.pathParameters.id)
        .then(business => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed business with id: ' + business._id, business: business })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the businesss.'
        }));
    });
};
