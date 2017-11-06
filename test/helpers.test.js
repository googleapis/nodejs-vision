/*!
 * Copyright 2017 Google Inc. All Rights Reserved.
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

var assert = require('assert');
var Buffer = require('safe-buffer').Buffer;
var fs = require('fs');
var is = require('is');
var sinon = require('sinon');

var Vision = require('../');

describe('Vision helper methods', () => {
  var sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('annotateImage', () => {
    it('calls batchAnnotateImages correctly', () => {
      var vision = Vision.v1();
      var batchAnnotate = sandbox.stub(vision, 'batchAnnotateImages');
      batchAnnotate.callsArgWith(2, undefined, {
        responses: [
          {
            logoAnnotations: [{description: 'Google'}],
          },
        ],
      });

      // Ensure that the annotateImage method arrifies the request and
      // passes it through to the batch annotation method.
      var request = {
        image: {content: Buffer.from('bogus==')},
        features: {type: ['LOGO_DETECTION']},
      };
      return vision.annotateImage(request).then(r => {
        var response = r[0];

        // Ensure that we got the slice of the response that we expected.
        assert.deepEqual(response, {
          logoAnnotations: [{description: 'Google'}],
        });

        // Inspect the calls to batchAnnotateImages and ensure they matched
        // the expected signature.
        assert(batchAnnotate.callCount === 1);
        assert(batchAnnotate.calledWith([request]));
      });
    });

    it('understands buffers', () => {
      var vision = Vision.v1();

      // Stub out the batch annotation method.
      var batchAnnotate = sandbox.stub(vision, 'batchAnnotateImages');
      batchAnnotate.callsArgWith(2, undefined, {
        responses: [
          {
            logoAnnotations: [{description: 'Google'}],
          },
        ],
      });

      // Ensure that the annotateImage method arrifies the request and
      // passes it through to the batch annotation method.
      var request = {
        image: Buffer.from('fakeImage'),
        features: {type: ['LOGO_DETECTION']},
      };
      return vision.annotateImage(request).then(r => {
        var response = r[0];

        // Ensure that we got the slice of the response that we expected.
        assert.deepEqual(response, {
          logoAnnotations: [{description: 'Google'}],
        });

        // Inspect the calls to batchAnnotateImages and ensure they matched
        // the expected signature.
        assert(batchAnnotate.callCount === 1);
        assert.deepEqual(request, {
          image: {content: 'ZmFrZUltYWdl'},
          features: {type: ['LOGO_DETECTION']},
        });
        assert(batchAnnotate.calledWith([request]));
      });
    });

    it('understands filenames', () => {
      var vision = Vision.v1();

      // Stub out `fs.readFile` and return a bogus image object.
      // This allows us to test filename detection.
      var readFile = sandbox.stub(fs, 'readFile');
      readFile
        .withArgs('image.jpg')
        .callsArgWith(2, null, Buffer.from('fakeImage'));
      readFile.callThrough();

      // Stub out the batch annotation method as before.
      var batchAnnotate = sandbox.stub(vision, 'batchAnnotateImages');
      batchAnnotate.callsArgWith(2, undefined, {
        responses: [
          {
            logoAnnotations: [{description: 'Google'}],
          },
        ],
      });

      // Ensure that the annotateImage method arrifies the request and
      // passes it through to the batch annotation method.
      var request = {
        image: {source: {filename: 'image.jpg'}},
        features: {type: ['LOGO_DETECTION']},
      };
      return vision.annotateImage(request).then(r => {
        var response = r[0];

        // Ensure that we got the slice of the response that we expected.
        assert.deepEqual(response, {
          logoAnnotations: [{description: 'Google'}],
        });

        // Inspect the calls to `readFile` to ensure that they matched
        // the expected signature.
        assert(readFile.callCount === 1);
        assert(readFile.calledWith('image.jpg'));

        // Inspect the calls to batchAnnotateImages and ensure they matched
        // the expected signature.
        assert(batchAnnotate.callCount === 1);
        assert.deepEqual(request, {
          image: {content: 'ZmFrZUltYWdl'},
          features: {type: ['LOGO_DETECTION']},
        });
        assert(batchAnnotate.calledWith([request]));
      });
    });

    it('propagates the error if a file is not found', () => {
      var vision = Vision.v1();

      // Stub out `fs.readFile` and return a bogus image object.
      // This allows us to test filename detection.
      var readFile = sandbox.stub(fs, 'readFile');
      readFile.withArgs('image.jpg').callsArgWith(2, {error: 404});
      readFile.callThrough();

      // Ensure that the annotateImage method arrifies the request and
      // passes it through to the batch annotation method.
      var request = {
        image: {source: {filename: 'image.jpg'}},
        features: {type: ['LOGO_DETECTION']},
      };
      return vision
        .annotateImage(request)
        .then(assert.fail)
        .catch(err => {
          assert.deepEqual(err, {error: 404});
        });
    });

    it('retains call options sent', () => {
      var vision = Vision.v1();
      var batchAnnotate = sandbox.stub(vision, 'batchAnnotateImages');
      batchAnnotate.callsArgWith(2, undefined, {
        responses: [
          {
            logoAnnotations: [{description: 'Google'}],
          },
        ],
      });

      // Ensure that the annotateImage method arrifies the request and
      // passes it through to the batch annotation method.
      var request = {
        image: {content: Buffer.from('bogus==')},
        features: {type: ['LOGO_DETECTION']},
      };
      return vision.annotateImage(request, {foo: 'bar'}).then(r => {
        var response = r[0];

        // Ensure that we got the slice of the response that we expected.
        assert.deepEqual(response, {
          logoAnnotations: [{description: 'Google'}],
        });

        // Inspect the calls to batchAnnotateImages and ensure they matched
        // the expected signature.
        assert(batchAnnotate.callCount === 1);
        assert(batchAnnotate.calledWith([request], {foo: 'bar'}));
      });
    });

    it('fires a callback if provided', done => {
      var vision = Vision.v1();
      var batchAnnotate = sandbox.stub(vision, 'batchAnnotateImages');
      batchAnnotate.callsArgWith(2, undefined, {
        responses: [
          {
            logoAnnotations: [{description: 'Google'}],
          },
        ],
      });

      // Ensure that the annotateImage method does *not* pass the callback
      // on to batchAnnotateImages, but rather handles it itself.
      var request = {
        image: {content: Buffer.from('bogus==')},
        features: {type: ['LOGO_DETECTION']},
      };
      vision.annotateImage(request, function(err, response) {
        // Establish that we got the expected response.
        assert(is.undefined(err));
        assert.deepEqual(response, {
          logoAnnotations: [{description: 'Google'}],
        });

        // Inspect the calls to batchAnnotate and ensure that they match
        // what we expected.
        assert(batchAnnotate.callCount === 1);
        assert(batchAnnotate.calledWith([request], undefined));
        done();
      });
    });

    it('fires the callback on error', () => {
      var vision = Vision.v1();
      var batchAnnotate = sandbox.stub(vision, 'batchAnnotateImages');
      batchAnnotate.callsArgWith(2, {message: 'Bad things!'});

      // Ensure that the annotateImage method does *not* pass the callback
      // on to batchAnnotateImages, but rather handles it itself.
      var request = {
        image: {content: Buffer.from('bogus==')},
        features: {type: ['LOGO_DETECTION']},
      };
      return vision.annotateImage(request).catch(err => {
        // Establish that we got the expected response.
        assert.deepEqual(err, {message: 'Bad things!'});

        // Inspect the calls to batchAnnotate and ensure that they match
        // what we expected.
        assert(batchAnnotate.callCount === 1);
        assert(batchAnnotate.calledWith([request], undefined));
      });
    });

    it('requires an image and throws without one', () => {
      var vision = Vision.v1();
      var request = {};
      return vision
        .annotateImage(request)
        .then(assert.fail)
        .catch(err => {
          var expected = 'Attempted to call `annotateImage` with no image.';
          assert(err.message === expected);
        });
    });
  });

  describe('single-feature methods', () => {
    it('calls annotateImage with the correct feature', () => {
      var vision = Vision.v1();
      var annotate = sandbox.spy(vision, 'annotateImage');
      var batchAnnotate = sandbox.stub(vision, 'batchAnnotateImages');
      batchAnnotate.callsArgWith(2, undefined, {
        responses: [
          {
            logoAnnotations: [{description: 'Google'}],
          },
        ],
      });

      // Ensure that the annotateImage method does *not* pass the callback
      // on to batchAnnotateImages, but rather handles it itself.
      var imageRequest = {image: {content: Buffer.from('bogus==')}};
      return vision.logoDetection(Object.assign({}, imageRequest)).then(r => {
        var response = r[0];

        // Ensure that we got the slice of the response that we expected.
        assert.deepEqual(response, {
          logoAnnotations: [{description: 'Google'}],
        });

        // Inspect the calls to annotateImage and batchAnnotateImages and
        // ensure they matched the expected signature.
        assert(annotate.callCount === 1);
        assert(
          annotate.calledWith({
            features: [{type: 3}],
            image: imageRequest.image,
          })
        );
        assert(batchAnnotate.callCount === 1);
        assert(
          batchAnnotate.calledWith([
            {image: imageRequest.image, features: [{type: 3}]},
          ])
        );
      });
    });

    it('throws an exception if conflicting features are given', () => {
      var vision = Vision.v1();
      var imageRequest = {
        image: {content: Buffer.from('bogus==')},
        features: [{type: 0}],
      };
      vision
        .logoDetection(imageRequest)
        .then(assert.fail)
        .catch(ex => {
          assert(ex.message.indexOf('Setting explicit') > -1);
        });
    });
  });
});
