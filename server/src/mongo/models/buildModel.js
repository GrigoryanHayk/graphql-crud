const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function buildModel(name, schema, methods = null) {
    const builtSchema = new Schema(schema, { timestamps: true });

    if (methods !== null) {
        builtSchema.methods = methods;
    }

    return mongoose.model(name, builtSchema);
};

module.exports = buildModel;