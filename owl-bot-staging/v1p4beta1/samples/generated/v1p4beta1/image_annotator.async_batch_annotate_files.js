// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(requests) {
  // [START vision_async_batch_annotate_files_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Individual async file annotation requests for this batch.
   */
  // const requests = 1234

  // Imports the Vision library
  const {ImageAnnotatorClient} = require('@google-cloud/vision').v1p4beta1;

  // Instantiates a client
  const visionClient = new ImageAnnotatorClient();

  async function asyncBatchAnnotateFiles() {
    // Construct request
    const request = {
      requests,
    };

    // Run request
    const [operation] = await visionClient.asyncBatchAnnotateFiles(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  asyncBatchAnnotateFiles();
  // [END vision_async_batch_annotate_files_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
