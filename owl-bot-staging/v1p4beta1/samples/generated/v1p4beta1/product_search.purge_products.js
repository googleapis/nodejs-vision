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

function main(parent) {
  // [START vision_purge_products_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Specify which ProductSet contains the Products to be deleted.
   */
  // const productSetPurgeConfig = ''
  /**
   *  If delete_orphan_products is true, all Products that are not in any
   *  ProductSet will be deleted.
   */
  // const deleteOrphanProducts = true
  /**
   *  Required. The project and location in which the Products should be deleted.
   *  Format is `projects/PROJECT_ID/locations/LOC_ID`.
   */
  // const parent = 'abc123'
  /**
   *  The default value is false. Override this value to true to actually perform
   *  the purge.
   */
  // const force = true

  // Imports the Vision library
  const {ProductSearchClient} = require('@google-cloud/vision').v1p4beta1;

  // Instantiates a client
  const visionClient = new ProductSearchClient();

  async function purgeProducts() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const [operation] = await visionClient.purgeProducts(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  purgeProducts();
  // [END vision_purge_products_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
