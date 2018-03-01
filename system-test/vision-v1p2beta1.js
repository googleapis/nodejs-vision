// Copyright 2018 Google LLC
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

'use strict';

describe('ImageAnnotatorSmokeTest', () => {
  it('successfully makes a call to the service', done => {
    const vision = require('../src');

    var client = new vision.v1p2beta1.ImageAnnotatorClient({
      // optional auth parameters.
    });

    var gcsImageUri = 'gs://gapic-toolkit/President_Barack_Obama.jpg';
    var source = {
      gcsImageUri: gcsImageUri,
    };
    var image = {
      source: source,
    };
    var type = 'FACE_DETECTION';
    var featuresElement = {
      type: type,
    };
    var features = [featuresElement];
    var requestsElement = {
      image: image,
      features: features,
    };
    var requests = [requestsElement];
    client
      .batchAnnotateImages({requests: requests})
      .then(responses => {
        var response = responses[0];
        console.log(response);
      })
      .then(done)
      .catch(done);
  });
});
