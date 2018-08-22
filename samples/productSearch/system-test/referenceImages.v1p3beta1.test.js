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

const path = require(`path`);
const uuid = require(`uuid`);
const vision = require('@google-cloud/vision').v1p3beta1;
const productSearch = new vision.ProductSearchClient();
const test = require(`ava`);
const tools = require(`@google-cloud/nodejs-repo-tools`);
const cmd = `node referenceImages.v1p3beta1.js`;
const cwd = path.join(__dirname, `..`);

// Shared fixture data for product tests
const testProduct = {
  projectId: process.env.GCLOUD_PROJECT,
  location: 'us-west1',
  productId: 'test_product_id_1',
  productDisplayName: 'test_product_display_name_1',
  productCategory: 'homegoods',
  productReferenceImageId: 'referenceImageId1234',
  productImageUri: 'gs://python-docs-samples-tests/product_search/shoes_1.jpg',
};
testProduct.productPath = productSearch.productPath(
  testProduct.projectId,
  testProduct.location,
  testProduct.productId
);
testProduct.createdProductPaths = [];

// Helper function: returns product if exists else false
async function getProductOrFalse(productPath) {
  try {
    const response = await productSearch.getProduct({name: productPath});
    return response[0];
  } catch (err) {
    if (err.message.includes('Not found')) {
      return false;
    } else {
      throw err;
    }
  }
}

test.before(tools.checkCredentials);
test.before(async () => {
  // Create a test product for each test
  try {
    await productSearch.createProduct({
      parent: productSearch.locationPath(
        testProduct.projectId,
        testProduct.location
      ),
      productId: testProduct.productId,
      product: {
        displayName: testProduct.productDisplayName,
        productCategory: testProduct.productCategory,
      },
    });
    testProduct.createdProductPaths.push(testProduct.productPath);
  } catch (err) {} // ignore error
});
test.after(async () => {
  // Delete products after each test
  testProduct.createdProductPaths.forEach(async path => {
    try {
      await productSearch.deleteProduct({name: path});
    } catch (err) {} // ignore error
  });
});

test(`should create reference image`, async t => {
  var newProductId = `ProductId${uuid.v4()}`;
  var newProductPath = productSearch.productPath(
    testProduct.projectId,
    testProduct.location,
    newProductId
  );
  t.falsy(await getProductOrFalse(newProductPath));
  testProduct.createdProductPaths.push(newProductPath);

  const output = await tools.runAsync(
    `${cmd} createReferenceImage "${testProduct.projectId}" "${
        testProduct.location}" "${testProduct.productId}" "${
        testProduct.productReferenceImageId}" "${testProduct.productImageUri}"`,
    cwd
  );

  t.true(output.includes(`response.uri: gs://`));
});