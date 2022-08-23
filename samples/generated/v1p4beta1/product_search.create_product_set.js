// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(parent, productSet) {
  // [START vision_v1p4beta1_generated_ProductSearch_CreateProductSet_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The project in which the ProductSet should be created.
   *  Format is `projects/PROJECT_ID/locations/LOC_ID`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The ProductSet to create.
   */
  // const productSet = {}
  /**
   *  A user-supplied resource id for this ProductSet. If set, the server will
   *  attempt to use this value as the resource id. If it is already in use, an
   *  error is returned with code ALREADY_EXISTS. Must be at most 128 characters
   *  long. It cannot contain the character `/`.
   */
  // const productSetId = 'abc123'

  // Imports the Vision library
  const {ProductSearchClient} = require('@google-cloud/vision').v1p4beta1;

  // Instantiates a client
  const visionClient = new ProductSearchClient();

  async function callCreateProductSet() {
    // Construct request
    const request = {
      parent,
      productSet,
    };

    // Run request
    const response = await visionClient.createProductSet(request);
    console.log(response);
  }

  callCreateProductSet();
  // [END vision_v1p4beta1_generated_ProductSearch_CreateProductSet_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
