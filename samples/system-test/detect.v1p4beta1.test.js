/**
 * Copyright 2019, Google, LLC.
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

const path = require('path');
const {Storage} = require('@google-cloud/storage');
const execa = require('execa');
const {assert} = require('chai');
const uuid = require('uuid');

const exec = async cmd => (await execa.shell(cmd)).stdout;
const storage = new Storage();
const bucketName = `nodejs-docs-samples-test-${uuid.v4()}`;
const cmd = `node detect.v1p4beta1.js`;

const files = [`pdf-ocr.pdf`].map(
  name => {
    return {
      name,
      localPath: path.resolve(path.join(__dirname, `../resources/${name}`)),
    };
  }
);

describe(`detect v1 p4 beta1`, () => {
  before(async () => {
    const [bucket] = await storage.createBucket(bucketName);
    await Promise.all(files.map(file => bucket.upload(file.localPath)));
  });

  after(async () => {
    const bucket = storage.bucket(bucketName);
    await bucket.deleteFiles({force: true});
    await bucket.deleteFiles({force: true}); // Try a second time...
    await bucket.delete();
  });

  it(`should annotate the local pdf-ocr.pdf sample`, async () => {
    const output = await exec(`${cmd} detectBatchAnnotateFiles ${files[0].localPath}`);
    assert.match(output, /Word text: Boring/);
    assert.match(output, /Symbol: p/);
  });

  it(`should annotate the remote pdf-ocr.pdf in GCS bucket`, async () => {
    const output = await exec(
      `${cmd} detectBatchAnnotateFilesGCS gs://${bucketName}/${files[0].name}`
    );
    assert.match(output, /Word text: Boring/);
    assert.match(output, /Symbol: p/);
  });
});
