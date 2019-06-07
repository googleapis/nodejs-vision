// DO NOT EDIT! This is a generated sample ("Request",  "vision_batch_annotate_files")
'use strict';

// sample-metadata:
//   title:
//   description: Perform batch file annotation
//   usage: node samples/v1/vision_batch_annotate_files.js [--file_path "resources/kafka.pdf"]

// [START vision_batch_annotate_files]
// [START vision_batch_annotate_files_core]

const vision = require('@google-cloud/vision').v1;

const fs = require('fs');
/**
 * Perform batch file annotation
 *
 * @param filePath {string} Path to local pdf file, e.g. /path/document.pdf
 */
function sampleBatchAnnotateFiles(filePath) {
  const client = new vision.ImageAnnotatorClient();
  // const filePath = 'resources/kafka.pdf';

  // Supported mime_type: application/pdf, image/tiff, image/gif
  const mimeType = 'application/pdf';
  const content = fs.readFileSync(filePath).toString('base64');
  const inputConfig = {
    mimeType: mimeType,
    content: content,
  };
  const type = 'DOCUMENT_TEXT_DETECTION';
  const featuresElement = {
    type: type,
  };
  const features = [featuresElement];

  // The service can process up to 5 pages per document file. Here we specify the first, second, and
  // last page of the document to be processed.
  const pagesElement = 1;
  const pagesElement2 = 2;
  const pagesElement3 = -1;
  const pages = [pagesElement, pagesElement2, pagesElement3];
  const requestsElement = {
    inputConfig: inputConfig,
    features: features,
    pages: pages,
  };
  const requests = [requestsElement];
  client.batchAnnotateFiles({requests: requests})
    .then(responses => {
      const response = responses[0];
      for (const imageResponse of response.responses[0].responses) {
        console.log(`Full text: ${imageResponse.fullTextAnnotation.text}`);
        for (const page of imageResponse.fullTextAnnotation.pages) {
          for (const block of page.blocks) {
            console.log(`\nBlock confidence: ${block.confidence}`);
            for (const par of block.paragraphs) {
              console.log(`\tParagraph confidence: ${par.confidence}`);
              for (const word of par.words) {
                console.log(`\t\tWord confidence: ${word.confidence}`);
                for (const symbol of word.symbols) {
                  console.log(`\t\t\tSymbol: ${symbol.text}, (confidence: ${symbol.confidence})`);
                }
              }
            }
          }
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END vision_batch_annotate_files_core]
// [END vision_batch_annotate_files]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('file_path', {
    default: 'resources/kafka.pdf',
    string: true
  })
  .argv;

sampleBatchAnnotateFiles(argv.file_path);