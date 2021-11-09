// Copyright 2021 Google LLC
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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import {describe, it} from 'mocha';
import * as imageannotatorModule from '../src';

import {protobuf, LROperation, operationsProtos} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
  const filledObject = (
    instance.constructor as typeof protobuf.Message
  ).toObject(instance as protobuf.Message<T>, {defaults: true});
  return (instance.constructor as typeof protobuf.Message).fromObject(
    filledObject
  ) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
  return error
    ? sinon.stub().rejects(error)
    : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(
  response?: ResponseType,
  error?: Error
) {
  return error
    ? sinon.stub().callsArgWith(2, error)
    : sinon.stub().callsArgWith(2, null, response);
}

function stubLongRunningCall<ResponseType>(
  response?: ResponseType,
  callError?: Error,
  lroError?: Error
) {
  const innerStub = lroError
    ? sinon.stub().rejects(lroError)
    : sinon.stub().resolves([response]);
  const mockOperation = {
    promise: innerStub,
  };
  return callError
    ? sinon.stub().rejects(callError)
    : sinon.stub().resolves([mockOperation]);
}

function stubLongRunningCallWithCallback<ResponseType>(
  response?: ResponseType,
  callError?: Error,
  lroError?: Error
) {
  const innerStub = lroError
    ? sinon.stub().rejects(lroError)
    : sinon.stub().resolves([response]);
  const mockOperation = {
    promise: innerStub,
  };
  return callError
    ? sinon.stub().callsArgWith(2, callError)
    : sinon.stub().callsArgWith(2, null, mockOperation);
}

describe('v1p2beta1.ImageAnnotatorClient', () => {
  it('has servicePath', () => {
    const servicePath =
      imageannotatorModule.v1p2beta1.ImageAnnotatorClient.servicePath;
    assert(servicePath);
  });

  it('has apiEndpoint', () => {
    const apiEndpoint =
      imageannotatorModule.v1p2beta1.ImageAnnotatorClient.apiEndpoint;
    assert(apiEndpoint);
  });

  it('has port', () => {
    const port = imageannotatorModule.v1p2beta1.ImageAnnotatorClient.port;
    assert(port);
    assert(typeof port === 'number');
  });

  it('should create a client with no option', () => {
    const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient();
    assert(client);
  });

  it('should create a client with gRPC fallback', () => {
    const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
      fallback: true,
    });
    assert(client);
  });

  it('has initialize method and supports deferred initialization', async () => {
    const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.imageAnnotatorStub, undefined);
    await client.initialize();
    assert(client.imageAnnotatorStub);
  });

  it('has close method', () => {
    const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.close();
  });

  it('has getProjectId method', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
    const result = await client.getProjectId();
    assert.strictEqual(result, fakeProjectId);
    assert((client.auth.getProjectId as SinonStub).calledWithExactly());
  });

  it('has getProjectId method with callback', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon
      .stub()
      .callsArgWith(0, null, fakeProjectId);
    const promise = new Promise((resolve, reject) => {
      client.getProjectId((err?: Error | null, projectId?: string | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(projectId);
        }
      });
    });
    const result = await promise;
    assert.strictEqual(result, fakeProjectId);
  });

  describe('batchAnnotateImages', () => {
    it('invokes batchAnnotateImages without error', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.BatchAnnotateImagesRequest()
      );
      const expectedOptions = {otherArgs: {headers: {}}};
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.BatchAnnotateImagesResponse()
      );
      client.innerApiCalls.batchAnnotateImages =
        stubSimpleCall(expectedResponse);
      const [response] = await client.batchAnnotateImages(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.batchAnnotateImages as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes batchAnnotateImages without error using callback', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.BatchAnnotateImagesRequest()
      );
      const expectedOptions = {otherArgs: {headers: {}}};
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.BatchAnnotateImagesResponse()
      );
      client.innerApiCalls.batchAnnotateImages =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.batchAnnotateImages(
          request,
          (
            err?: Error | null,
            result?: protos.google.cloud.vision.v1p2beta1.IBatchAnnotateImagesResponse | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.batchAnnotateImages as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes batchAnnotateImages with error', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.BatchAnnotateImagesRequest()
      );
      const expectedOptions = {otherArgs: {headers: {}}};
      const expectedError = new Error('expected');
      client.innerApiCalls.batchAnnotateImages = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.batchAnnotateImages(request), expectedError);
      assert(
        (client.innerApiCalls.batchAnnotateImages as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });
  });

  describe('asyncBatchAnnotateFiles', () => {
    it('invokes asyncBatchAnnotateFiles without error', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.AsyncBatchAnnotateFilesRequest()
      );
      const expectedOptions = {otherArgs: {headers: {}}};
      const expectedResponse = generateSampleMessage(
        new protos.google.longrunning.Operation()
      );
      client.innerApiCalls.asyncBatchAnnotateFiles =
        stubLongRunningCall(expectedResponse);
      const [operation] = await client.asyncBatchAnnotateFiles(request);
      const [response] = await operation.promise();
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes asyncBatchAnnotateFiles without error using callback', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.AsyncBatchAnnotateFilesRequest()
      );
      const expectedOptions = {otherArgs: {headers: {}}};
      const expectedResponse = generateSampleMessage(
        new protos.google.longrunning.Operation()
      );
      client.innerApiCalls.asyncBatchAnnotateFiles =
        stubLongRunningCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.asyncBatchAnnotateFiles(
          request,
          (
            err?: Error | null,
            result?: LROperation<
              protos.google.cloud.vision.v1p2beta1.IAsyncBatchAnnotateFilesResponse,
              protos.google.cloud.vision.v1p2beta1.IOperationMetadata
            > | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const operation = (await promise) as LROperation<
        protos.google.cloud.vision.v1p2beta1.IAsyncBatchAnnotateFilesResponse,
        protos.google.cloud.vision.v1p2beta1.IOperationMetadata
      >;
      const [response] = await operation.promise();
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes asyncBatchAnnotateFiles with call error', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.AsyncBatchAnnotateFilesRequest()
      );
      const expectedOptions = {otherArgs: {headers: {}}};
      const expectedError = new Error('expected');
      client.innerApiCalls.asyncBatchAnnotateFiles = stubLongRunningCall(
        undefined,
        expectedError
      );
      await assert.rejects(
        client.asyncBatchAnnotateFiles(request),
        expectedError
      );
      assert(
        (client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes asyncBatchAnnotateFiles with LRO error', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.vision.v1p2beta1.AsyncBatchAnnotateFilesRequest()
      );
      const expectedOptions = {otherArgs: {headers: {}}};
      const expectedError = new Error('expected');
      client.innerApiCalls.asyncBatchAnnotateFiles = stubLongRunningCall(
        undefined,
        undefined,
        expectedError
      );
      const [operation] = await client.asyncBatchAnnotateFiles(request);
      await assert.rejects(operation.promise(), expectedError);
      assert(
        (client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes checkAsyncBatchAnnotateFilesProgress without error', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const expectedResponse = generateSampleMessage(
        new operationsProtos.google.longrunning.Operation()
      );
      expectedResponse.name = 'test';
      expectedResponse.response = {type_url: 'url', value: Buffer.from('')};
      expectedResponse.metadata = {type_url: 'url', value: Buffer.from('')};

      client.operationsClient.getOperation = stubSimpleCall(expectedResponse);
      const decodedOperation =
        await client.checkAsyncBatchAnnotateFilesProgress(
          expectedResponse.name
        );
      assert.deepStrictEqual(decodedOperation.name, expectedResponse.name);
      assert(decodedOperation.metadata);
      assert((client.operationsClient.getOperation as SinonStub).getCall(0));
    });

    it('invokes checkAsyncBatchAnnotateFilesProgress with error', async () => {
      const client = new imageannotatorModule.v1p2beta1.ImageAnnotatorClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const expectedError = new Error('expected');

      client.operationsClient.getOperation = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(
        client.checkAsyncBatchAnnotateFilesProgress(''),
        expectedError
      );
      assert((client.operationsClient.getOperation as SinonStub).getCall(0));
    });
  });
});
