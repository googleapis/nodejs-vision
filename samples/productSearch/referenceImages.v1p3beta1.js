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

function createReferenceImage(
    projectId,
    location,
    productId,
    referenceImageId,
    gcsUri
  ) {
    // [START vision_product_search_create_reference_image]

  const vision = require('@google-cloud/vision').v1p3beta1;

  var client = new vision.ProductSearchClient({
    // optional auth parameters.
  });

  var formattedParent = client.productPath(projectId, location, productId);

  var referenceImage = {
      uri: gcsUri
  };

  var referenceImageId = '';
  
  var request = {
    parent: formattedParent,
    referenceImage: referenceImage,
    referenceImageId: referenceImageId,
  };
  
  client.createReferenceImage(request)
    .then(responses => {
      var response = responses[0];
      console.log(`response.boundingPolys: ${response.boundingPolys}`);
      console.log(`response.name: ${response.name}`);
      console.log(`response.uri: ${response.uri}`);
    })
    .catch(err => {
      console.err(err);
    });

    // [END vision_product_search_create_reference_image]
  }

require(`yargs`) // eslint-disable-line
.demand(1)
.command(
  `createReferenceImage <projectId> <location> <productId> <referenceImageId> <gcsUri>`,
  `Create Reference Image`,
  {},
  opts =>
    createReferenceImage(
      opts.projectId,
      opts.location,
      opts.productId,
      opts.referenceImageId,
      opts.gcsUri
    )
)
.example(`node $0 COMMAND ARG`)
.wrap(120)
.recommendCommands()
.epilogue(`For more information, see https://cloud.google.com/vision/docs`)
.help()
.strict().argv;
