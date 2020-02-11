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


import * as fs from 'fs';
import * as is from 'is';
import {promisify} from '@google-cloud/promisify';
import * as gax from 'google-gax';

// We only need to have a Feature enum from the protos, and we want
// this enum to work for both gRPC and fallback scenarios.
// It's enough to have the contents of JSON proto for this purpose.
import * as protoTypes from '../protos/protos';

interface improvedRequest{
  image?: {source?: {filename: string}, content?: (Uint8Array|string|null)}
  features?: protoTypes.google.cloud.vision.v1.IFeature[]
}
  const _requestToObject = (request: string) => {
    let requestObject: improvedRequest = {};
    if (is.string(request)) {
      // Is this a URL or a local file?
      // Guess based on what the string looks like, and build the full
      // request object in the correct format.
      if (request.indexOf('://') === -1 || request.indexOf('file://') === 0) {
        requestObject = {image: {source: {filename: request}}} as unknown as improvedRequest;
      } else {
        requestObject = {image: {source: {imageUri: request}}} as unknown as improvedRequest;
      }
    } else if (Buffer.isBuffer(request)) {
      // Drop the buffer one level lower; it will get dealt with later
      // in the function. This allows sending <Buffer> and {image: <Buffer>} to
      // both work identically.
      requestObject = {image: request} as unknown as improvedRequest;
    }
    return requestObject ?? {};
  };

  const _coerceRequest = (request: improvedRequest, callback: Function) => {
    // At this point, request must be an object with an `image` key; if not,
    // it is an error. If there is no image, throw an exception.
    if (!is.object(request) || is.undefined(request.image)) {
      return callback(new Error('No image present.'));
    }

    // If this is a buffer, read it and send the object
    // that the Vision API expects.
    if (Buffer.isBuffer(request.image)) {
      request.image = {content: request.image.toString('base64')};
    }

    // If the file is specified as a filename and exists on disk, read it
    // and coerce it into the base64 content.
    if (request.image!.source && request.image!.source.filename) {
      fs.readFile(request.image!.source.filename, (err, blob) => {
        if (err) {
          callback(err);
          return;
        }
        request.image!.content = blob.toString('base64');
        delete request.image!.source;
        return callback(null, request);
      });
    } else {
      return callback(null, request);
    }
  };

  const _createSingleFeatureMethod = (featureValue: protoTypes.google.cloud.vision.v1.Feature.Type) => {
    return function(request: string, callOptions?: gax.CallOptions, callback?: Function | gax.CallOptions) {
      // Sanity check: If we got a string or buffer, we need this to be
      // in object form now, so we can tack on the features list.
      //
      // Do the minimum required conversion, which can also be guaranteed to
      // be synchronous (e.g. no file loading yet; that is handled by
      // annotateImage later.
      const annotateImageRequest: improvedRequest = _requestToObject(request);

      // If a callback was provided and options were skipped, normalize
      // the argument names.
      if (is.undefined(callback) && is.function(callOptions)) {
        callback = callOptions;
        callOptions = undefined;
      }

      // Add the feature to the request.
      annotateImageRequest.features = annotateImageRequest.features || [
        {
          type: featureValue,
        },
      ];

      // If the user submitted explicit features that do not line up with
      // the precise method called, throw an exception.
      for (const feature of annotateImageRequest.features) {
        if (feature.type !== featureValue) {
          throw new Error(
            'Setting explicit features is not supported on this method. ' +
              'Use the #annotateImage method instead.'
          );
        }
      }
      // Call the underlying #annotateImage method.
      // @ts-ignore
      console.warn('this: ', this)
      // return this.annotateImage(annotateImageRequest, callOptions, callback);
    };
  };

  export function call (apiVersion: string) {
    const client = require(`./${apiVersion}`).ImageAnnotatorClient;
    const methods: {[methodName: string]: Function} = {annotateImage: Function, faceDetection: Function, landmarkDetection: Function, labelDetection: Function, safeSearchDetection: Function, imageProperties: Function, cropHints: Function, webDetection: Function, productSearch: Function, objectLocalization:Function };

    methods.annotateImage = promisify(function(request: improvedRequest, callOptions: gax.CallOptions, callback: Function | gax.CallOptions) {
      // If a callback was provided and options were skipped, normalize
      // the argument names.
      if (is.undefined(callback) && is.function(callOptions)) {
        callback = callOptions;
        callOptions = undefined as unknown as  gax.CallOptions;
      }

      // If we got a filename for the image, open the file and transform
      // it to content.
      return _coerceRequest(request, (err: {}, req: string) => {
        if (err) {
          return (callback as unknown as Function)(err);
        }

        // Call the GAPIC batch annotation function.
        const requests = {requests: [req]};
        return client.batchAnnotateImages(requests, callOptions, (err: {}, r: {responses: {[index: number]: string}}) => {
          // If there is an error, handle it.
          if (err) {
            return (callback as unknown as Function)(err);
          }

          // We are guaranteed to only have one response element, since we
          // only sent one image.
          const response = r.responses[0];

          // Fire the callback if applicable.
          return (callback as unknown as Function)(undefined, response);
        });
      });
    });

    const protoFilesRoot = gax.protobuf.Root.fromJSON(require("../protos/protos.json"));
    console.warn('root: ', protoFilesRoot.lookup(
      `google.cloud.vision.${apiVersion}.ImageAnnotator.options`
    ));
    const features = protoFilesRoot.lookup(
      `google.cloud.vision.${apiVersion}.Feature`
    )?.options;
    console.warn('features: ', protoFilesRoot.lookup(
      `google.cloud.vision.${apiVersion}.Feature.Type`
    ));

    methods.faceDetection = promisify(
      _createSingleFeatureMethod(features!.FACE_DETECTION)
    );

  
    methods.landmarkDetection = promisify(
      _createSingleFeatureMethod(features!.LANDMARK_DETECTION)
    );

    methods.labelDetection = promisify(
      _createSingleFeatureMethod(features!.LABEL_DETECTION)
    );

    methods.safeSearchDetection = promisify(
      _createSingleFeatureMethod(features!.SAFE_SEARCH_DETECTION)
    );


    methods.imageProperties = promisify(
      _createSingleFeatureMethod(features!.IMAGE_PROPERTIES)
    );
    methods.cropHints = promisify(
      _createSingleFeatureMethod(features!.CROP_HINTS)
    );
    methods.webDetection = promisify(
      _createSingleFeatureMethod(features!.WEB_DETECTION)
    );
    if (features!.PRODUCT_SEARCH !== undefined) {
      methods.productSearch = promisify(
        _createSingleFeatureMethod(features!.PRODUCT_SEARCH)
      );
    }
    if (features!.OBJECT_LOCALIZATION !== undefined) {
      methods.objectLocalization = promisify(
        _createSingleFeatureMethod(features!.OBJECT_LOCALIZATION)
      );
    }

    return methods;
  };

