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
import { describe, it } from 'mocha';
import * as imageannotatorModule from '../src';

import {protobuf, LROperation, operationsProtos} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
    const filledObject = (instance.constructor as typeof protobuf.Message)
        .toObject(instance as protobuf.Message<T>, {defaults: true});
    return (instance.constructor as typeof protobuf.Message).fromObject(filledObject) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().rejects(error) : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().callsArgWith(2, error) : sinon.stub().callsArgWith(2, null, response);
}

function stubLongRunningCall<ResponseType>(response?: ResponseType, callError?: Error, lroError?: Error) {
    const innerStub = lroError ? sinon.stub().rejects(lroError) : sinon.stub().resolves([response]);
    const mockOperation = {
        promise: innerStub,
    };
    return callError ? sinon.stub().rejects(callError) : sinon.stub().resolves([mockOperation]);
}

function stubLongRunningCallWithCallback<ResponseType>(response?: ResponseType, callError?: Error, lroError?: Error) {
    const innerStub = lroError ? sinon.stub().rejects(lroError) : sinon.stub().resolves([response]);
    const mockOperation = {
        promise: innerStub,
    };
    return callError ? sinon.stub().callsArgWith(2, callError) : sinon.stub().callsArgWith(2, null, mockOperation);
}

describe('v1p4beta1.ImageAnnotatorClient', () => {
    it('has servicePath', () => {
        const servicePath = imageannotatorModule.v1p4beta1.ImageAnnotatorClient.servicePath;
        assert(servicePath);
    });

    it('has apiEndpoint', () => {
        const apiEndpoint = imageannotatorModule.v1p4beta1.ImageAnnotatorClient.apiEndpoint;
        assert(apiEndpoint);
    });

    it('has port', () => {
        const port = imageannotatorModule.v1p4beta1.ImageAnnotatorClient.port;
        assert(port);
        assert(typeof port === 'number');
    });

    it('should create a client with no option', () => {
        const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient();
        assert(client);
    });

    it('should create a client with gRPC fallback', () => {
        const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
            fallback: true,
        });
        assert(client);
    });

    it('has initialize method and supports deferred initialization', async () => {
        const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        assert.strictEqual(client.imageAnnotatorStub, undefined);
        await client.initialize();
        assert(client.imageAnnotatorStub);
    });

    it('has close method', () => {
        const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.close();
    });

    it('has getProjectId method', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
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
        const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().callsArgWith(0, null, fakeProjectId);
        const promise = new Promise((resolve, reject) => {
            client.getProjectId((err?: Error|null, projectId?: string|null) => {
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
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateImagesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateImagesResponse());
            client.innerApiCalls.batchAnnotateImages = stubSimpleCall(expectedResponse);
            const [response] = await client.batchAnnotateImages(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchAnnotateImages as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes batchAnnotateImages without error using callback', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateImagesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateImagesResponse());
            client.innerApiCalls.batchAnnotateImages = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.batchAnnotateImages(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.vision.v1p4beta1.IBatchAnnotateImagesResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchAnnotateImages as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes batchAnnotateImages with error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateImagesRequest());
            const expectedOptions = {};
            const expectedError = new Error('expected');
            client.innerApiCalls.batchAnnotateImages = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.batchAnnotateImages(request), expectedError);
            assert((client.innerApiCalls.batchAnnotateImages as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('batchAnnotateFiles', () => {
        it('invokes batchAnnotateFiles without error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateFilesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateFilesResponse());
            client.innerApiCalls.batchAnnotateFiles = stubSimpleCall(expectedResponse);
            const [response] = await client.batchAnnotateFiles(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchAnnotateFiles as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes batchAnnotateFiles without error using callback', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateFilesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateFilesResponse());
            client.innerApiCalls.batchAnnotateFiles = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.batchAnnotateFiles(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.vision.v1p4beta1.IBatchAnnotateFilesResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchAnnotateFiles as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes batchAnnotateFiles with error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.BatchAnnotateFilesRequest());
            const expectedOptions = {};
            const expectedError = new Error('expected');
            client.innerApiCalls.batchAnnotateFiles = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.batchAnnotateFiles(request), expectedError);
            assert((client.innerApiCalls.batchAnnotateFiles as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('asyncBatchAnnotateImages', () => {
        it('invokes asyncBatchAnnotateImages without error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateImagesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.asyncBatchAnnotateImages = stubLongRunningCall(expectedResponse);
            const [operation] = await client.asyncBatchAnnotateImages(request);
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.asyncBatchAnnotateImages as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes asyncBatchAnnotateImages without error using callback', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateImagesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.asyncBatchAnnotateImages = stubLongRunningCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.asyncBatchAnnotateImages(
                    request,
                    (err?: Error|null,
                     result?: LROperation<protos.google.cloud.vision.v1p4beta1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1p4beta1.IOperationMetadata>|null
                    ) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const operation = await promise as LROperation<protos.google.cloud.vision.v1p4beta1.IAsyncBatchAnnotateImagesResponse, protos.google.cloud.vision.v1p4beta1.IOperationMetadata>;
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.asyncBatchAnnotateImages as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes asyncBatchAnnotateImages with call error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateImagesRequest());
            const expectedOptions = {};
            const expectedError = new Error('expected');
            client.innerApiCalls.asyncBatchAnnotateImages = stubLongRunningCall(undefined, expectedError);
            await assert.rejects(client.asyncBatchAnnotateImages(request), expectedError);
            assert((client.innerApiCalls.asyncBatchAnnotateImages as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes asyncBatchAnnotateImages with LRO error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateImagesRequest());
            const expectedOptions = {};
            const expectedError = new Error('expected');
            client.innerApiCalls.asyncBatchAnnotateImages = stubLongRunningCall(undefined, undefined, expectedError);
            const [operation] = await client.asyncBatchAnnotateImages(request);
            await assert.rejects(operation.promise(), expectedError);
            assert((client.innerApiCalls.asyncBatchAnnotateImages as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes checkAsyncBatchAnnotateImagesProgress without error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedResponse = generateSampleMessage(new operationsProtos.google.longrunning.Operation());
            expectedResponse.name = 'test';
            expectedResponse.response = {type_url: 'url', value: Buffer.from('')};
            expectedResponse.metadata = {type_url: 'url', value: Buffer.from('')}

            client.operationsClient.getOperation = stubSimpleCall(expectedResponse);
            const decodedOperation = await client.checkAsyncBatchAnnotateImagesProgress(expectedResponse.name);
            assert.deepStrictEqual(decodedOperation.name, expectedResponse.name);
            assert(decodedOperation.metadata);
            assert((client.operationsClient.getOperation as SinonStub).getCall(0));
        });

        it('invokes checkAsyncBatchAnnotateImagesProgress with error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedError = new Error('expected');

            client.operationsClient.getOperation = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.checkAsyncBatchAnnotateImagesProgress(''), expectedError);
            assert((client.operationsClient.getOperation as SinonStub)
                .getCall(0));
        });
    });

    describe('asyncBatchAnnotateFiles', () => {
        it('invokes asyncBatchAnnotateFiles without error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateFilesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.asyncBatchAnnotateFiles = stubLongRunningCall(expectedResponse);
            const [operation] = await client.asyncBatchAnnotateFiles(request);
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes asyncBatchAnnotateFiles without error using callback', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateFilesRequest());
            const expectedOptions = {};
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.asyncBatchAnnotateFiles = stubLongRunningCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.asyncBatchAnnotateFiles(
                    request,
                    (err?: Error|null,
                     result?: LROperation<protos.google.cloud.vision.v1p4beta1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1p4beta1.IOperationMetadata>|null
                    ) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const operation = await promise as LROperation<protos.google.cloud.vision.v1p4beta1.IAsyncBatchAnnotateFilesResponse, protos.google.cloud.vision.v1p4beta1.IOperationMetadata>;
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes asyncBatchAnnotateFiles with call error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateFilesRequest());
            const expectedOptions = {};
            const expectedError = new Error('expected');
            client.innerApiCalls.asyncBatchAnnotateFiles = stubLongRunningCall(undefined, expectedError);
            await assert.rejects(client.asyncBatchAnnotateFiles(request), expectedError);
            assert((client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes asyncBatchAnnotateFiles with LRO error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateFilesRequest());
            const expectedOptions = {};
            const expectedError = new Error('expected');
            client.innerApiCalls.asyncBatchAnnotateFiles = stubLongRunningCall(undefined, undefined, expectedError);
            const [operation] = await client.asyncBatchAnnotateFiles(request);
            await assert.rejects(operation.promise(), expectedError);
            assert((client.innerApiCalls.asyncBatchAnnotateFiles as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes checkAsyncBatchAnnotateFilesProgress without error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedResponse = generateSampleMessage(new operationsProtos.google.longrunning.Operation());
            expectedResponse.name = 'test';
            expectedResponse.response = {type_url: 'url', value: Buffer.from('')};
            expectedResponse.metadata = {type_url: 'url', value: Buffer.from('')}

            client.operationsClient.getOperation = stubSimpleCall(expectedResponse);
            const decodedOperation = await client.checkAsyncBatchAnnotateFilesProgress(expectedResponse.name);
            assert.deepStrictEqual(decodedOperation.name, expectedResponse.name);
            assert(decodedOperation.metadata);
            assert((client.operationsClient.getOperation as SinonStub).getCall(0));
        });

        it('invokes checkAsyncBatchAnnotateFilesProgress with error', async () => {
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedError = new Error('expected');

            client.operationsClient.getOperation = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.checkAsyncBatchAnnotateFilesProgress(''), expectedError);
            assert((client.operationsClient.getOperation as SinonStub)
                .getCall(0));
        });
    });

    describe('Path templates', () => {

        describe('product', () => {
            const fakePath = "/rendered/path/product";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                product: "productValue",
            };
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.productPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.productPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('productPath', () => {
                const result = client.productPath("projectValue", "locationValue", "productValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.productPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromProductName', () => {
                const result = client.matchProjectFromProductName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromProductName', () => {
                const result = client.matchLocationFromProductName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchProductFromProductName', () => {
                const result = client.matchProductFromProductName(fakePath);
                assert.strictEqual(result, "productValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('productSet', () => {
            const fakePath = "/rendered/path/productSet";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                product_set: "productSetValue",
            };
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.productSetPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.productSetPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('productSetPath', () => {
                const result = client.productSetPath("projectValue", "locationValue", "productSetValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.productSetPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromProductSetName', () => {
                const result = client.matchProjectFromProductSetName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.productSetPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromProductSetName', () => {
                const result = client.matchLocationFromProductSetName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.productSetPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchProductSetFromProductSetName', () => {
                const result = client.matchProductSetFromProductSetName(fakePath);
                assert.strictEqual(result, "productSetValue");
                assert((client.pathTemplates.productSetPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('referenceImage', () => {
            const fakePath = "/rendered/path/referenceImage";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                product: "productValue",
                reference_image: "referenceImageValue",
            };
            const client = new imageannotatorModule.v1p4beta1.ImageAnnotatorClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.referenceImagePathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.referenceImagePathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('referenceImagePath', () => {
                const result = client.referenceImagePath("projectValue", "locationValue", "productValue", "referenceImageValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.referenceImagePathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromReferenceImageName', () => {
                const result = client.matchProjectFromReferenceImageName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.referenceImagePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromReferenceImageName', () => {
                const result = client.matchLocationFromReferenceImageName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.referenceImagePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchProductFromReferenceImageName', () => {
                const result = client.matchProductFromReferenceImageName(fakePath);
                assert.strictEqual(result, "productValue");
                assert((client.pathTemplates.referenceImagePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchReferenceImageFromReferenceImageName', () => {
                const result = client.matchReferenceImageFromReferenceImageName(fakePath);
                assert.strictEqual(result, "referenceImageValue");
                assert((client.pathTemplates.referenceImagePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });
    });
});
