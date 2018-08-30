/**
 * Copyright 2018, Google, LLC.
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

function addProductToProductSet(
    projectId,
    location,
    productId,
    productSetId
  ) {
    // [START vision_product_search_add_product_to_product_set]

  const vision = require('@google-cloud/vision').v1p3beta1;

  var client = new vision.ProductSearchClient();

  var productSetPath = client.productSetPath(projectId, location, productSetId);

  var productPath = client.productPath(projectId, location, productId);

  var request = {
    name: productSetPath,
    product: productPath
  };
  
  client.addProductToProductSet(request)
    .then(responses => {
      console.log(`Product added to product set.`);
    })
    .catch(err => {
      console.error(err);
    });

    // [END vision_product_search_add_product_to_product_set]
  }

require(`yargs`) // eslint-disable-line
.demand(1)
.command(
  `addProductToProductSet <projectId> <location> <productId> <productSetId>`,
  `Add a Product to Product Set`,
  {},
  opts =>
  addProductToProductSet(
      opts.projectId,
      opts.location,
      opts.productId,
      opts.productSetId
    )
)
.example(`node $0 COMMAND ARG`)
.wrap(120)
.recommendCommands()
.epilogue(`For more information, see https://cloud.google.com/vision/docs`)
.help()
.strict().argv;
