/**
 * Copyright 2017, Google, Inc.
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

// 1. imports                     imports
// 2. web detection geotgging     vision_web_entities_include_geo_results
// 3. text detection              vision_detect_document
// 4. safe search                 vision_detect_safe_search
// 5. print detect annotations    vision_detect_web

// XXX Update to be detectFulltext instead
function detectText(fileName) {
  // [START vision_detect_document]
  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Performs label detection on the local file
  client
    .textDetection(fileName)
    .then(results => {
      const pages = results[0].fullTextAnnotation.pages;
      pages.forEach(page => {
        page.blocks.forEach(block => {
          const blockWords = [];
          block.paragraphs.forEach(paragraph => {
            paragraph.words.forEach(word => blockWords.push(word));
            console.log(`Paragraph Confidence: ${paragraph.confidence.toFixed(2)}`);
          });

          let blockText = '';
          const blockSymbols = [];
          blockWords.forEach(word => {
            word.symbols.forEach(symbol => blockSymbols.push(symbol));
            let wordText = '';
            word.symbols.forEach(symbol => {
              wordText = wordText + symbol.text;
              console.log(`  Symbol text: ${symbol.text}`);
              console.log(`  Confidence: ${symbol.confidence.toFixed(2)}`);
            });
            console.log(`Word text: ${wordText}`);
            console.log(`Confidence: ${word.confidence.toFixed(2)}`);
            blockText = blockText + ` ${wordText}`;
          });

          console.log(`Block content: ${blockText}`);
          console.log(`Block confidence: ${block.confidence.toFixed(2)}`);
        });
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_detect_document]
}

function detectSafeSearch(fileName) {
  // [START vision_safe_search_detection]
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Performs safe search detection on the local file
  client
    .safeSearchDetection(fileName)
    .then(results => {
      const detections = results[0].safeSearchAnnotation;

      console.log('Safe search:');
      console.log(`Adult: ${detections.adult}`);
      console.log(`Medical: ${detections.medical}`);
      console.log(`Spoof: ${detections.spoof}`);
      console.log(`Violence: ${detections.violence}`);
      console.log(`Racy: ${detections.racy}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_safe_search_detection]
}

function detectWeb(fileName) {
  // [START vision_web_detection]
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Detect similar images on the web to a local file
  client
    .webDetection(fileName)
    .then(results => {
      const webDetection = results[0].webDetection;

      if (webDetection.bestGuessLabels.length) {
        webDetection.bestGuessLabels.forEach(label => {
          console.log(`Best guess label: ${label.label}`);
        });
      }

      if (webDetection.pagesWithMatchingImages.length) {
        const pages = webDetection.pagesWithMatchingImages;
        console.log(`Pages with matching images found: ${pages.length}`);

        pages.forEach(page => {
          console.log(`Page url: ${page.url}`);

          if (page.fullMatchingImages.length) {
            const fullMatchingImages = page.fullMatchingImages;
            console.log(`Full Matches found: ${fullMatchingImages.length}`);
            fullMatchingImages.forEach(image => {
              console.log(`Image url: ${image.url}`);
            });
          }

          if (page.partialMatchingImages.length) {
            const partialMatchingImages = page.partialMatchingImages;
            console.log(`Partial Matches found: ${partialMatchingImages.length}`);
            partialMatchingImages.forEach(image => {
              console.log(`Image url: ${image.url}`);
            });
          }
        });
      }

      if (webDetection.fullMatchingImages.length) {
        console.log(
          `Full matches found: ${webDetection.fullMatchingImages.length}`
        );
        webDetection.fullMatchingImages.forEach(image => {
          console.log(`  Image url: ${image.url}`);
        });
      }

      if (webDetection.partialMatchingImages.length) {
        console.log(
          `Partial matches found: ${webDetection.partialMatchingImages.length}`
        );
        webDetection.partialMatchingImages.forEach(image => {
          console.log(`  Image url: ${image.url}`);
        });
      }

      if (webDetection.webEntities.length) {
        console.log(`Web entities found: ${webDetection.webEntities.length}`);
        webDetection.webEntities.forEach(webEntity => {
          console.log(`  Score: ${webEntity.score}`);
          console.log(`  Description: ${webEntity.description}`);
        });
      }

      if (webDetection.visuallySimilarImages.length) {
        const visuallySimilarImages = webDetection.visuallySimilarImages;
        console.log(
          `Visually similar images found: ${visuallySimilarImages.length}`  
        );
        visuallySimilarImages.forEach(image => {
          console.log(`  Image url: ${image.url}`);
        });
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_web_detection]
}

// =========================================================================
// =========================================================================
// =========================================================================

function detectFaces(fileName) {
  // [START vision_face_detection]
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  client
    .faceDetection(fileName)
    .then(results => {
      const faces = results[0].faceAnnotations;

      console.log('Faces:');
      faces.forEach((face, i) => {
        console.log(`  Face #${i + 1}:`);
        console.log(`    Joy: ${face.joyLikelihood}`);
        console.log(`    Anger: ${face.angerLikelihood}`);
        console.log(`    Sorrow: ${face.sorrowLikelihood}`);
        console.log(`    Surprise: ${face.surpriseLikelihood}`);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_face_detection]
}

function detectLabels(fileName) {
  // [START vision_label_detection]
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Performs label detection on the local file
  client
    .labelDetection(fileName)
    .then(results => {
      const labels = results[0].labelAnnotations;
      console.log('Labels:');
      labels.forEach(label => console.log(label));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_label_detection]
}

function detectProperties(fileName) {
  // [START vision_image_property_detection]
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Performs property detection on the local file
  client
    .imageProperties(fileName)
    .then(results => {
      const properties = results[0].imagePropertiesAnnotation;
      const colors = properties.dominantColors.colors;
      colors.forEach(color => console.log(color));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_image_property_detection]
}


function detectFulltext(fileName) {
  // [START vision_fulltext_detection]

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Read a local image as a text document
  client
    .documentTextDetection(fileName)
    .then(results => {
      const fullTextAnnotation = results[0].fullTextAnnotation;
      console.log(fullTextAnnotation.text);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_fulltext_detection]
}

function detectFulltextGCS(bucketName, fileName) {
  // [START vision_fulltext_detection_gcs]

  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision').v1p1beta1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
  // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

  // Read a remote image as a text document
  client
    .documentTextDetection(`gs://${bucketName}/${fileName}`)
    .then(results => {
      const fullTextAnnotation = results[0].fullTextAnnotation;
      console.log(fullTextAnnotation.text);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_fulltext_detection_gcs]
}

require(`yargs`) // eslint-disable-line
  .demand(1)
  .command(
    `faces <fileName>`,
    `Detects faces in a local image file.`,
    {},
    opts => detectFaces(opts.fileName)
  )
  .command(
    `faces-gcs <bucketName> <fileName>`,
    `Detects faces in an image in Google Cloud Storage.`,
    {},
    opts => detectFacesGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `labels <fileName>`,
    `Detects labels in a local image file.`,
    {},
    opts => detectLabels(opts.fileName)
  )
  .command(
    `labels-gcs <bucketName> <fileName>`,
    `Detects labels in an image in Google Cloud Storage.`,
    {},
    opts => detectLabelsGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `landmarks <fileName>`,
    `Detects landmarks in a local image file.`,
    {},
    opts => detectLandmarks(opts.fileName)
  )
  .command(
    `landmarks-gcs <bucketName> <fileName>`,
    `Detects landmarks in an image in Google Cloud Storage.`,
    {},
    opts => detectLandmarksGCS(opts.bucketName, opts.fileName)
  )
  .command(`text <fileName>`, `Detects text in a local image file.`, {}, opts =>
    detectText(opts.fileName)
  )
  .command(
    `text-gcs <bucketName> <fileName>`,
    `Detects text in an image in Google Cloud Storage.`,
    {},
    opts => detectTextGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `logos <fileName>`,
    `Detects logos in a local image file.`,
    {},
    opts => detectLogos(opts.fileName)
  )
  .command(
    `logos-gcs <bucketName> <fileName>`,
    `Detects logos in an image in Google Cloud Storage.`,
    {},
    opts => detectLogosGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `properties <fileName>`,
    `Detects image properties in a local image file.`,
    {},
    opts => detectProperties(opts.fileName)
  )
  .command(
    `properties-gcs <bucketName> <fileName>`,
    `Detects image properties in an image in Google Cloud Storage.`,
    {},
    opts => detectPropertiesGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `safe-search <fileName>`,
    `Detects safe search properties in a local image file.`,
    {},
    opts => detectSafeSearch(opts.fileName)
  )
  .command(
    `safe-search-gcs <bucketName> <fileName>`,
    `Detects safe search properties in an image in Google Cloud Storage.`,
    {},
    opts => detectSafeSearchGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `crops <fileName>`,
    `Detects crop hints in a local image file.`,
    {},
    opts => detectCropHints(opts.fileName)
  )
  .command(
    `crops-gcs <bucketName> <fileName>`,
    `Detects crop hints in an image in Google Cloud Storage.`,
    {},
    opts => detectCropHintsGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `web <fileName>`,
    `Finds similar photos on the web for a local image file.`,
    {},
    opts => detectWeb(opts.fileName)
  )
  .command(
    `web-gcs <bucketName> <fileName>`,
    `Finds similar photos on the web for an image in Google Cloud Storage.`,
    {},
    opts => detectWebGCS(opts.bucketName, opts.fileName)
  )
  .command(
    `fulltext <fileName>`,
    `Extracts full text from a local image file.`,
    {},
    opts => detectFulltext(opts.fileName)
  )
  .command(
    `fulltext-gcs <bucketName> <fileName>`,
    `Extracts full text from an image in Google Cloud Storage.`,
    {},
    opts => detectFulltextGCS(opts.bucketName, opts.fileName)
  )
  .example(`node $0 faces ./resources/face_no_surprise.jpg`)
  .example(`node $0 faces-gcs my-bucket your-image.jpg`)
  .example(`node $0 labels ./resources/wakeupcat.jpg`)
  .example(`node $0 labels-gcs my-bucket your-image.jpg`)
  .example(`node $0 landmarks ./resources/landmark.jpg`)
  .example(`node $0 landmarks-gcs my-bucket your-image.jpg`)
  .example(`node $0 text ./resources/wakeupcat.jpg`)
  .example(`node $0 text-gcs my-bucket your-image.jpg`)
  .example(`node $0 logos ./resources/logos.png`)
  .example(`node $0 logos-gcs my-bucket your-image.jpg.png`)
  .example(`node $0 properties ./resources/landmark.jpg`)
  .example(`node $0 properties-gcs my-bucket your-image.jpg`)
  .example(`node $0 safe-search ./resources/wakeupcat.jpg`)
  .example(`node $0 safe-search-gcs my-bucket your-image.jpg`)
  .example(`node $0 crops ./resources/wakeupcat.jpg`)
  .example(`node $0 crops-gcs my-bucket your-image.jpg`)
  .example(`node $0 web ./resources/wakeupcat.jpg`)
  .example(`node $0 web-gcs my-bucket your-image.jpg`)
  .example(`node $0 fulltext ./resources/wakeupcat.jpg`)
  .example(`node $0 fulltext-gcs my-bucket your-image.jpg`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/vision/docs`)
  .help()
  .strict().argv;
