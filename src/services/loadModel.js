const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const url = 'https://storage.googleapis.com/dicodingmlgc-bucket-danar/model.json';
    return tf.loadGraphModel(process.env.MODEL_URL || url);
}
module.exports = loadModel;