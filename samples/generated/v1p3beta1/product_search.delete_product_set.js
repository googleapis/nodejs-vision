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

function main(name) {
  // [START vision_v1p3beta1_generated_ProductSearch_DeleteProductSet_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Resource name of the ProductSet to delete.
   *  Format is:
   *  `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`
   */
  // const name = 'abc123'

  // Imports the Vision library
  const {ProductSearchClient} = require('@google-cloud/vision').v1p3beta1;

  // Instantiates a client
  const visionClient = new ProductSearchClient();

  async function callDeleteProductSet() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await visionClient.deleteProductSet(request);
    console.log(response);
  }

  callDeleteProductSet();
  // [END vision_v1p3beta1_generated_ProductSearch_DeleteProductSet_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
