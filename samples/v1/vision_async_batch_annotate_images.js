// DO NOT EDIT! This is a generated sample ("LongRunningPromiseAwait",  "vision_async_batch_annotate_images")
'use strict';

// sample-metadata:
//   title: Async Batch Image Annotation
//   description: Perform async batch image annotation
//   usage: node samples/v1/vision_async_batch_annotate_images.js [--input_image_uri "gs://cloud-samples-data/vision/label/wakeupcat.jpg"] [--output_uri "gs://your-bucket/prefix/"]

// [START vision_async_batch_annotate_images]
// [START vision_async_batch_annotate_images_core]

const vision = require('@google-cloud/vision').v1;

/** Perform async batch image annotation */
async function sampleAsyncBatchAnnotateImages(inputImageUri, outputUri) {
  const client = new vision.ImageAnnotatorClient();
  // const inputImageUri = 'gs://cloud-samples-data/vision/label/wakeupcat.jpg';
  // const outputUri = 'gs://your-bucket/prefix/';
  const source = {
    imageUri: inputImageUri,
  };
  const image = {
    source: source,
  };
  const type = 'LABEL_DETECTION';
  const featuresElement = {
    type: type,
  };
  const type2 = 'IMAGE_PROPERTIES';
  const featuresElement2 = {
    type: type2,
  };
  const features = [featuresElement, featuresElement2];
  const requestsElement = {
    image: image,
    features: features,
  };
  
  // Each requests element corresponds to a single image.  To annotate more
  // images, create a request element for each image and add it to
  // the array of requests 
  const requests = [requestsElement];
  const gcsDestination = {
    uri: outputUri,
  };

  // The max number of responses to output in each JSON file
  const batchSize = 2;
  const outputConfig = {
    gcsDestination: gcsDestination,
    batchSize: batchSize,
  };
  const request = {
    requests: requests,
    outputConfig: outputConfig,
  };

  // Create a job whose results you can either wait for now, or get later
  const [operation] = await client.asyncBatchAnnotateImages(request);

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  // The output is written to GCS with the provided output_uri as prefix
  const gcsOutputUri = response.outputConfig.gcsDestination.uri;
  console.log(`Output written to GCS with prefix: ${gcsOutputUri}`);
}


// [END vision_async_batch_annotate_images_core]
// [END vision_async_batch_annotate_images]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('input_image_uri', {
    default: 'gs://cloud-samples-data/vision/label/wakeupcat.jpg',
    string: true
  })
  .option('output_uri', {
    default: 'gs://your-bucket/prefix/',
    string: true
  })
  .argv;

sampleAsyncBatchAnnotateImages(argv.input_image_uri, argv.output_uri).catch(console.error);
