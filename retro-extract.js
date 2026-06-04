const path = require('path');
const RetroDatasetExtractor = require('./agent/tools/RetroDatasetExtractor');

const rootPath = __dirname;
const extractor = new RetroDatasetExtractor(rootPath);

extractor.extract().catch(console.error);
