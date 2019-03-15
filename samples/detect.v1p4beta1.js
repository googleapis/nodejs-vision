/**
 * Copyright 2019, Google,LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */

'use strict';

async function detectBatchAnnotateFiles(fileName) {
  // [START vision_batch_annotate_files_beta]
  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision').v1p4beta1;
  const fs = require('fs');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = `/path/to/localDocument.pdf`;

  const inputConfig = {
    // Other supported mime_types: image/tiff' or 'image/gif'
    mimeType: 'application/pdf',
    content: fs.readFileSync(fileName),
  };
  const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        // Annotate the first two pages and the last one (max 5 pages)
        // First page starts at 1, and not 0. Last page is -1.
        pages: [1, 2, -1]
      },
    ],
  };

  const [result] = await client.batchAnnotateFiles(request);
  const responses = result.responses[0].responses;

  responses.forEach(response => {
    response.fullTextAnnotation.pages.forEach(page => {
      page.blocks.forEach(block => {
        console.log(`\nBlock confidence: ${block.confidence}`);
        block.paragraphs.forEach(paragraph => {
          console.log(`\tParagraph confidence: ${paragraph.confidence}`);
          paragraph.words.forEach(word => {
            var symbol_texts = [];
            for (var i = 0; i < word.symbols.length; i++) {
              symbol_texts.push(word.symbols[i].text)
            }
            const word_text = symbol_texts.join('');
            console.log(`\t\tWord text: ${word_text} (confidence: ${word.confidence})`);
            word.symbols.forEach(symbol => {
              console.log(`\t\t\tSymbol: ${symbol.text} (confidence: ${symbol.confidence})`);
            })
          })
        })
      })
    })
  });
  // [END vision_batch_annotate_files_beta]
}

async function detectBatchAnnotateFilesGCS(gcsSourceUri) {
  // [START vision_fulltext_detection_pdf_gcs_beta]
  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision').v1p4beta1;
  const fs = require('fs');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = `/path/to/localDocument.pdf`;

  const inputConfig = {
    // Supported mime_types are: 'application/pdf' and 'image/tiff'
    mimeType: 'application/pdf',
    gcsSource: {
      uri: gcsSourceUri,
    },
  };
  const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        // Annotate the first two pages and the last one (max 5 pages)
        // First page starts at 1, and not 0. Last page is -1.
        pages: [1, 2, -1]
      },
    ],
  };

  const [result] = await client.batchAnnotateFiles(request);
  const responses = result.responses[0].responses;

  responses.forEach(response => {
    response.fullTextAnnotation.pages.forEach(page => {
      page.blocks.forEach(block => {
        console.log(`\nBlock confidence: ${block.confidence}`);
        block.paragraphs.forEach(paragraph => {
          console.log(`\tParagraph confidence: ${paragraph.confidence}`);
          paragraph.words.forEach(word => {
            var symbol_texts = [];
            for (var i = 0; i < word.symbols.length; i++) {
              symbol_texts.push(word.symbols[i].text)
            }
            const word_text = symbol_texts.join('');
            console.log(`\t\tWord text: ${word_text} (confidence: ${word.confidence})`);
            word.symbols.forEach(symbol => {
              console.log(`\t\t\tSymbol: ${symbol.text} (confidence: ${symbol.confidence})`);
            })
          })
        })
      })
    })
  });
  // [END vision_fulltext_detection_pdf_gcs_beta]
}

require(`yargs`)
  .demand(1)
  .command(
    `detectBatchAnnotateFiles <fileName>`,
    `Detects annotations in a local file`,
    {},
    opts => detectBatchAnnotateFiles(opts.fileName)
  )
  .command(
    `detectBatchAnnotateFilesGCS <uri>`,
    `Detects annotations in a GCS of file`,
    {},
    opts => detectBatchAnnotateFilesGCS(opts.uri)
  )
  .example(`node $0 detectBatchAnnotateFiles ./resources/kafka.pdf`)
  .example(`node $0 detectBatchAnnotateFilesGCS gs://cloud-samples-data/vision/document_understanding/kafka.pdf`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/vision/docs`)
  .help()
  .strict().argv;
