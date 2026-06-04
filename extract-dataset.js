const path = require('path');
const DatasetExtractor = require('./agent/tools/DatasetExtractor');

const rootPath = __dirname;
const extractor = new DatasetExtractor(rootPath);

extractor.extract().catch(console.error);
