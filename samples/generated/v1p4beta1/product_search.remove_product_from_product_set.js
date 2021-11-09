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

function main(name, product) {
  // [START vision_v1p4beta1_generated_ProductSearch_RemoveProductFromProductSet_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name for the ProductSet to modify.
   *  Format is:
   *  `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`
   */
  // const name = 'abc123'
  /**
   *  Required. The resource name for the Product to be removed from this
   *  ProductSet.
   *  Format is:
   *  `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`
   */
  // const product = 'abc123'

  // Imports the Vision library
  const {ProductSearchClient} = require('@google-cloud/vision').v1p4beta1;

  // Instantiates a client
  const visionClient = new ProductSearchClient();

  async function callRemoveProductFromProductSet() {
    // Construct request
    const request = {
      name,
      product,
    };

    // Run request
    const response = await visionClient.removeProductFromProductSet(request);
    console.log(response);
  }

  callRemoveProductFromProductSet();
  // [END vision_v1p4beta1_generated_ProductSearch_RemoveProductFromProductSet_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
