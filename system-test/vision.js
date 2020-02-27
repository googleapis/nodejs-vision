/*!
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const assert = require('assert');
const {describe, it, before, after} = require('mocha');
const fs = require('fs');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const uuid = require('uuid');

const vision = require('../');

describe('Vision', function() {
  const IMAGES = Object.freeze({
    document: path.join(__dirname, 'data/document.jpg'),
    logo: path.join(__dirname, 'data/logo.jpg'),
    rushmore: path.join(__dirname, 'data/rushmore.jpg'),
    text: path.join(__dirname, 'data/text.png'),
    malformed: __filename,
  });

  const TESTS_PREFIX = 'gcloud-vision-test';

  const storage = new Storage();
  const client = new vision.v1.ImageAnnotatorClient();

  const bucket = storage.bucket(generateName());

  before(function(done) {
    bucket.create(function(err) {
      if (err) {
        done(err);
        return;
      }

      bucket.upload(IMAGES.logo, done);
    });
  });

  after(async () => {
    const [buckets] = await storage.getBuckets({prefix: TESTS_PREFIX});
    await Promise.all(
      buckets.map(async bucket => {
        await bucket.deleteFiles();
        await bucket.delete();
      })
    );
  });

  it('should detect from a URL', () => {
    const url =
      'https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png';
    return client.logoDetection(url).then(responses => {
      const response = responses[0];
      assert.strictEqual(
        response.logoAnnotations[0].description.toLowerCase(),
        'google'
      );
    });
  });

  it('should detect from a filename', () => {
    return client.logoDetection(IMAGES.logo).then(responses => {
      const response = responses[0];
      assert.ok(
        /google/.test(response.logoAnnotations[0].description.toLowerCase())
      );
    });
  });

  it('should detect from a Buffer', () => {
    const buffer = fs.readFileSync(IMAGES.logo);
    return client.logoDetection(buffer).then(responses => {
      const response = responses[0];
      assert.ok(
        /google/.test(response.logoAnnotations[0].description.toLowerCase())
      );
    });
  });

  describe('single image', () => {
    const TYPES = [{type: 'LABEL_DETECTION'}, {type: 'SAFE_SEARCH_DETECTION'}];
    it('should perform multiple detections', () => {
      return client
        .annotateImage({
          features: TYPES,
          image: {source: {filename: IMAGES.rushmore}},
        })
        .then(responses => {
          const response = responses[0];
          assert(response.labelAnnotations.length >= 1);
          assert(response.safeSearchAnnotation !== null);
        });
    });
  });

  function generateName() {
    return TESTS_PREFIX + uuid.v1();
  }
});
