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

function addProductToProductSet(projectId, location, productId, productSetId) {
  // [START vision_product_search_add_product_to_product_set]

  const vision = require('@google-cloud/vision').v1p3beta1;

  var client = new vision.ProductSearchClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = 'Your Google Cloud project Id';
  // const location = 'A compute region name';
  // const productId = 'Id of the product';
  // const productSetId = 'Id of the product set';

  var productSetPath = client.productSetPath(projectId, location, productSetId);

  var productPath = client.productPath(projectId, location, productId);

  var request = {
    name: productSetPath,
    product: productPath,
  };

  client
    .addProductToProductSet(request)
    .then(() => {
      console.log(`Product added to product set.`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END vision_product_search_add_product_to_product_set]
}

function listProductsInProductSet(projectId, location, productSetId) {
  // [START vision_product_search_list_products_in_product_set]

  const vision = require('@google-cloud/vision').v1p3beta1;

  var client = new vision.ProductSearchClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = 'Your Google Cloud project Id';
  // const location = 'A compute region name';
  // const productSetId = 'Id of the product set';

  var productSetPath = client.productSetPath(projectId, location, productSetId);

  var request = {
    name: productSetPath,
  };

  //client
  // .addProductToProductSet(request)
  // .then(responses => {
  //   var response = responses[0];
  //   console.log(`response.name: ${response[0].name}`);
  //   console.log(`response.uri: ${response.uri}`);
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  client.listProductsInProductSet(request).then(results => {
    const products = results[0];
    products.forEach(product => {
      console.log(`Product name: ${product.name}`);
      console.log(`Product display name: ${product.displayName}`);
    });
  });
  // [END vision_product_search_list_products_in_product_set]
}

function removeProductFromProductSet(
  projectId,
  location,
  productId,
  productSetId
) {
  // [START vision_product_search_remove_product_from_product_set]

  const vision = require('@google-cloud/vision').v1p3beta1;

  var client = new vision.ProductSearchClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = 'Your Google Cloud project Id';
  // const location = 'A compute region name';
  // const productId = 'Id of the product';
  // const productSetId = 'Id of the product set';

  var productSetPath = client.productSetPath(projectId, location, productSetId);

  var productPath = client.productPath(projectId, location, productId);

  var request = {
    name: productSetPath,
    product: productPath,
  };

  client
    .removeProductFromProductSet(request)
    .then(() => {
      console.log(`Product removed from product set.`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END vision_product_search_remove_product_from_product_set]
}

require(`yargs`) // eslint-disable-line
  .demand(1)
  .command(
    `addProductToProductSet <projectId> <location> <productId> <productSetId>`,
    `Add a product to product set`,
    {},
    opts =>
      addProductToProductSet(
        opts.projectId,
        opts.location,
        opts.productId,
        opts.productSetId
      )
  )
  .command(
    `listProductsInProductSet <projectId> <location> <productSetId>`,
    `List all products in a product set`,
    {},
    opts =>
      listProductsInProductSet(opts.projectId, opts.location, opts.productSetId)
  )
  .command(
    `removeProductFromProductSet <projectId> <location> <productId> <productSetId>`,
    `Remove a products from a product set`,
    {},
    opts =>
      removeProductFromProductSet(
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
