// Copyright 2020 Google LLC
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
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions, LROperation} from 'google-gax';
import * as path from 'path';

import * as protos from '../../protos/protos';
import * as gapicConfig from './image_annotator_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Service that performs Google Cloud Vision API detection tasks over client
 *  images, such as face, landmark, logo, label, and text detection. The
 *  ImageAnnotator service returns detected entities from the images.
 * @class
 * @memberof v1
 */
export class ImageAnnotatorClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}, batching: {}};
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  operationsClient: gax.OperationsClient;
  imageAnnotatorStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ImageAnnotatorClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof ImageAnnotatorClient;
    const servicePath = opts && opts.servicePath ?
        opts.servicePath :
        ((opts && opts.apiEndpoint) ? opts.apiEndpoint :
                                      staticMembers.servicePath);
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = (typeof window !== 'undefined');
    if (isBrowser){
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof ImageAnnotatorClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(__dirname, '..', '..', 'protos', 'protos.json');
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ?
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../protos/protos.json") :
        nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      productPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/products/{product}'
      ),
      productSetPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/productSets/{product_set}'
      ),
      referenceImagePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/products/{product}/referenceImages/{reference_image}'
      ),
    };

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback ?
      this._gaxModule.protobuf.Root.fromJSON(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../protos/protos.json")) :
      this._gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = this._gaxModule.lro({
      auth: this.auth,
      grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined
    }).operationsClient(opts);
    const asyncBatchAnnotateImagesResponse = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.AsyncBatchAnnotateImagesResponse') as gax.protobuf.Type;
    const asyncBatchAnnotateImagesMetadata = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.OperationMetadata') as gax.protobuf.Type;
    const asyncBatchAnnotateFilesResponse = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.AsyncBatchAnnotateFilesResponse') as gax.protobuf.Type;
    const asyncBatchAnnotateFilesMetadata = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.OperationMetadata') as gax.protobuf.Type;

    this.descriptors.longrunning = {
      asyncBatchAnnotateImages: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        asyncBatchAnnotateImagesResponse.decode.bind(asyncBatchAnnotateImagesResponse),
        asyncBatchAnnotateImagesMetadata.decode.bind(asyncBatchAnnotateImagesMetadata)),
      asyncBatchAnnotateFiles: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        asyncBatchAnnotateFilesResponse.decode.bind(asyncBatchAnnotateFilesResponse),
        asyncBatchAnnotateFilesMetadata.decode.bind(asyncBatchAnnotateFilesMetadata))
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.cloud.vision.v1.ImageAnnotator', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.imageAnnotatorStub) {
      return this.imageAnnotatorStub;
    }

    // Put together the "service stub" for
    // google.cloud.vision.v1.ImageAnnotator.
    this.imageAnnotatorStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.cloud.vision.v1.ImageAnnotator') :
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.vision.v1.ImageAnnotator,
        this._opts) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const imageAnnotatorStubMethods =
        ['batchAnnotateImages', 'batchAnnotateFiles', 'asyncBatchAnnotateImages', 'asyncBatchAnnotateFiles'];
    for (const methodName of imageAnnotatorStubMethods) {
      const callPromise = this.imageAnnotatorStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        this.descriptors.page[methodName] ||
            this.descriptors.stream[methodName] ||
            this.descriptors.longrunning[methodName]
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.imageAnnotatorStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'vision.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'vision.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-vision'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  batchAnnotateImages(
      request: protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest,
      options?: gax.CallOptions):
      Promise<[
        protos.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
        protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest|undefined, {}|undefined
      ]>;
  batchAnnotateImages(
      request: protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest,
      options: gax.CallOptions,
      callback: Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest|null|undefined,
          {}|null|undefined>): void;
  batchAnnotateImages(
      request: protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest,
      callback: Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Run image detection and annotation for a batch of images.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. Individual image annotation requests for this batch.
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [BatchAnnotateImagesResponse]{@link google.cloud.vision.v1.BatchAnnotateImagesResponse}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  batchAnnotateImages(
      request: protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
        protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.batchAnnotateImages(request, options, callback);
  }
  batchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest,
      options?: gax.CallOptions):
      Promise<[
        protos.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
        protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest|undefined, {}|undefined
      ]>;
  batchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest,
      options: gax.CallOptions,
      callback: Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest|null|undefined,
          {}|null|undefined>): void;
  batchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest,
      callback: Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Service that performs image detection and annotation for a batch of files.
 * Now only "application/pdf", "image/tiff" and "image/gif" are supported.
 *
 * This service will extract at most 5 (customers can specify which 5 in
 * AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each
 * file provided and perform detection and annotation for each image
 * extracted.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. The list of file annotation requests. Right now we support only one
 *   AnnotateFileRequest in BatchAnnotateFilesRequest.
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [BatchAnnotateFilesResponse]{@link google.cloud.vision.v1.BatchAnnotateFilesResponse}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  batchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
          protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
        protos.google.cloud.vision.v1.IBatchAnnotateFilesRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.batchAnnotateFiles(request, options, callback);
  }

  asyncBatchAnnotateImages(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesRequest,
      options?: gax.CallOptions):
      Promise<[
        LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
        protos.google.longrunning.IOperation|undefined, {}|undefined
      ]>;
  asyncBatchAnnotateImages(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesRequest,
      options: gax.CallOptions,
      callback: Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>): void;
  asyncBatchAnnotateImages(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesRequest,
      callback: Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>): void;
/**
 * Run asynchronous image detection and annotation for a list of images.
 *
 * Progress and results can be retrieved through the
 * `google.longrunning.Operations` interface.
 * `Operation.metadata` contains `OperationMetadata` (metadata).
 * `Operation.response` contains `AsyncBatchAnnotateImagesResponse` (results).
 *
 * This service will write image annotation outputs to json files in customer
 * GCS bucket, each json file containing BatchAnnotateImagesResponse proto.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. Individual image annotation requests for this batch.
 * @param {google.cloud.vision.v1.OutputConfig} request.outputConfig
 *   Required. The desired output location and metadata (e.g. format).
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  asyncBatchAnnotateImages(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>):
      Promise<[
        LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
        protos.google.longrunning.IOperation|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.asyncBatchAnnotateImages(request, options, callback);
  }
  asyncBatchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesRequest,
      options?: gax.CallOptions):
      Promise<[
        LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
        protos.google.longrunning.IOperation|undefined, {}|undefined
      ]>;
  asyncBatchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesRequest,
      options: gax.CallOptions,
      callback: Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>): void;
  asyncBatchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesRequest,
      callback: Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>): void;
/**
 * Run asynchronous image detection and annotation for a list of generic
 * files, such as PDF files, which may contain multiple pages and multiple
 * images per page. Progress and results can be retrieved through the
 * `google.longrunning.Operations` interface.
 * `Operation.metadata` contains `OperationMetadata` (metadata).
 * `Operation.response` contains `AsyncBatchAnnotateFilesResponse` (results).
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. Individual async file annotation requests for this batch.
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  asyncBatchAnnotateFiles(
      request: protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>):
      Promise<[
        LROperation<protos.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1.IOperationMetadata>,
        protos.google.longrunning.IOperation|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.asyncBatchAnnotateFiles(request, options, callback);
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified product resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} product
   * @returns {string} Resource name string.
   */
  productPath(project:string,location:string,product:string) {
    return this.pathTemplates.productPathTemplate.render({
      project,
      location,
      product,
    });
  }

  /**
   * Parse the project from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).project;
  }

  /**
   * Parse the location from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).location;
  }

  /**
   * Parse the product from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the product.
   */
  matchProductFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).product;
  }

  /**
   * Return a fully-qualified productSet resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} product_set
   * @returns {string} Resource name string.
   */
  productSetPath(project:string,location:string,productSet:string) {
    return this.pathTemplates.productSetPathTemplate.render({
      project,
      location,
      product_set: productSet,
    });
  }

  /**
   * Parse the project from ProductSet resource.
   *
   * @param {string} productSetName
   *   A fully-qualified path representing ProductSet resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProductSetName(productSetName: string) {
    return this.pathTemplates.productSetPathTemplate.match(productSetName).project;
  }

  /**
   * Parse the location from ProductSet resource.
   *
   * @param {string} productSetName
   *   A fully-qualified path representing ProductSet resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProductSetName(productSetName: string) {
    return this.pathTemplates.productSetPathTemplate.match(productSetName).location;
  }

  /**
   * Parse the product_set from ProductSet resource.
   *
   * @param {string} productSetName
   *   A fully-qualified path representing ProductSet resource.
   * @returns {string} A string representing the product_set.
   */
  matchProductSetFromProductSetName(productSetName: string) {
    return this.pathTemplates.productSetPathTemplate.match(productSetName).product_set;
  }

  /**
   * Return a fully-qualified referenceImage resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} product
   * @param {string} reference_image
   * @returns {string} Resource name string.
   */
  referenceImagePath(project:string,location:string,product:string,referenceImage:string) {
    return this.pathTemplates.referenceImagePathTemplate.render({
      project,
      location,
      product,
      reference_image: referenceImage,
    });
  }

  /**
   * Parse the project from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromReferenceImageName(referenceImageName: string) {
    return this.pathTemplates.referenceImagePathTemplate.match(referenceImageName).project;
  }

  /**
   * Parse the location from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromReferenceImageName(referenceImageName: string) {
    return this.pathTemplates.referenceImagePathTemplate.match(referenceImageName).location;
  }

  /**
   * Parse the product from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the product.
   */
  matchProductFromReferenceImageName(referenceImageName: string) {
    return this.pathTemplates.referenceImagePathTemplate.match(referenceImageName).product;
  }

  /**
   * Parse the reference_image from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the reference_image.
   */
  matchReferenceImageFromReferenceImageName(referenceImageName: string) {
    return this.pathTemplates.referenceImagePathTemplate.match(referenceImageName).reference_image;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.imageAnnotatorStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
import {FeaturesMethod} from '../helpers'; 
 export interface ImageAnnotatorClient extends FeaturesMethod {}