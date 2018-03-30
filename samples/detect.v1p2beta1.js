/**
 * Copyright 2018, Google, Inc.
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

'use strict';


function detectPdfText(bucketName, fileName) {
  // [START vision_async_detect_document_ocr]

  // Imports the Google Cloud client libraries
  var vision = require('@google-cloud/vision').v1p2beta1;

  // Creates a client
  var client = new vision.ImageAnnotatorClient();

  let gcsSourceUri = `gs://${bucketName}/${fileName}`;
  let gcsDestinationUri = `gs://${bucketName}/${fileName}.json`;

  console.log(gcsDestinationUri);

  let request = {
    requests: [
      {
        inputConfig: {
          // Supported mime_types are: 'application/pdf' and 'image/tiff'
          mimeType: 'application/pdf',
          gcsSource: {
            uri: gcsSourceUri
          }
        },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION'
          }
        ],
        outputConfig: {
          gcsDestination: {
            uri: gcsDestinationUri
          }
        }
      }
    ]
  };

  client
    .asyncBatchAnnotateFiles(request)
    .then(results => {
      console.log(results);      
      const operation = results[0];
      // Get a Promise representation of the final result of the job
      operation.promise().then(filesResponse => {
        let destinationUri = filesResponse[0]['responses'][0]['outputConfig']['gcsDestination']['uri'];
        //console.log('Json saved to: ' + destinationUri);
        return destinationUri;
      }).catch(function(error) {
        console.log(error);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  // [END vision_async_detect_document_ocr]
}


//.usage('$0 <command> <local-image-file>', 'Cloud Vision Beta API Samples')
require(`yargs`) // eslint-disable-line
  .demand(1)
  .command(
    `pdf <bucketName> <fileName>`,
    `Extracts full text from a pdf file`,
    {},
    opts => detectPdfText(opts.bucketName, opts.fileName)
  )
  .example(`node $0 pdf my-bucket my-pdf.pdf`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/vision/docs`)
  .help()
  .strict().argv;


