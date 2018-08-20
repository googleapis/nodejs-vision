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
const storage = require(`@google-cloud/storage`)();
const test = require(`ava`);
const tools = require(`@google-cloud/nodejs-repo-tools`);
const uuid = require(`uuid`);

const bucketName = `nodejs-docs-samples-test-${uuid.v4()}`;
const cmdDataset = `node ./automl/automlVisionDataset.js`;
const cmdModel = `node ./automl/automlVisionModel.js`;
const cmdPredict = `node ./automl/automlVisionPredict.js`;

const flowerTrainData = `gs://`;
const cwd = path.join(__dirname, `..`);

const testDataSetName = `testDataSet`;
const dummyDataSet = `dummyDataSet`;
const testModelName = "dummyModel";
const sampleImage = `./automl/resources/testImage.jpg`;
const sampleImage2 = `./automl/resources/testImage2.jpg`;

// skipped because it's been taking too long to delete datasets
test.skip(`It should create a create, list, and delete a dataset`, async t => {
  // Check to see that this dataset does not yet exist
  let output = await tools.runAsync(`${cmdDataset} listDatasets`);
  t.false(output.includes(testDataSetName));

  // Create dataset 
  output = await tools.runAsync(`${cmdDataset} createDataset -n "${testDataSetName}"`);
  const dataSetId = output.split(`\n`)[1].split(`:`)[1].trim();
  t.true(output.includes(`Dataset display name:  ${testDataSetName}`));

  // delete dataset 
  output = await tools.runAsync(`${cmdDataset} deleteDataset -i "${dataSetId}"`);
  t.true(output.includes(`Dataset deleted.`));
});

// see : https://github.com/GoogleCloudPlatform/python-docs-samples/blob/master/vision/automl/model_test.py
// we make too models running this test, see hard-coded workaround below
test.skip(`It should create a dataset, import data, and start making a model`, async t => {
    // Check to see that this dataset does not yet exist
    let output = await tools.runAsync(`${cmdDataset} listDatasets`);
    t.false(output.includes(dummyDataSet));
  
    // Create dataset 
    output = await tools.runAsync(`${cmdDataset} createDataset -n "${dummyDataSet}"`);
    const dataSetId = output.split(`\n`)[1].split(`:`)[1].trim();
    t.true(output.includes(`Dataset display name:  ${dummyDataSet}`));

  // Import Data
  output = await tools.runAsync(`${cmdDataset} importData -i "${dataSetId}" -p "gs://nodejs-docs-samples-vcm/flowerTraindata20lines.csv"`);
  t.true(output.includes(`Data imported.`));

  // Check to make sure model doesn't already exist
  output = await tools.runAsync(`${cmdModel} listModels`);
  t.false(output.includes(`${testModelName}`));

  // begin training dataset, getting operation ID for next operation 
  output = await tools.runAsync(`${cmdModel} createModel -i "${dataSetId}" -m "${testModelName}" -t "2"`);
  const operationName = output.split(`\n`)[0].split(`:`)[1].trim();
  t.true(output.includes(`Training started...`));

  // poll operation status, here confirming that operation is not complete yet
  output = await tools.runAsync(`${cmdModel} getOperationStatus -i "${dataSetId}" -o "${operationName}"`);
  t.true(output.includes(`done: false`));
});

test(`It should display evaluation from prexisting model`, async t => {
  const flowersModelId = `ICN723541179344731436`;
  const flowersDatasetId = `ICN7628761482635807401`;
  const flowersname = `projects/203278707824/locations/us-central1/datasets/ICN7628761482635807401`;
  const flowersDisplayName = `flowersTest`;
  const donotdeleteModelId = `ICN723541179344731436`;
  
  //confirm dataset exists
  let output = await tools.runAsync(`${cmdDataset} listDatasets`);
    t.true(output.includes(flowersDisplayName));

  // list model evaluations, confirm model exists
  output = await tools.runAsync(`${cmdModel} listModelEvaluations -a "${flowersModelId}"`);
  const flowersEvaluationName = output.split(`/n`)[0].split(`:`)[1].trim();

  //display evaluation
  output = await tools.runAsync(`${cmdModel} displayEvaluation -a "${flowersModelId}"`);
  t.true(output.includes(`Model Precision`));  
});

test(`It should run Prediction from prexisting model`, async t => {
  const donotdeleteModelId = `ICN723541179344731436`;
  const flowersDatasetId = `ICN8816709442276843572`;
  const flowersname = `projects/203278707824/locations/us-central1/datasets/ICN7628761482635807401`;
  const flowersDisplayName = `flowers`;

    //confirm dataset exists
    let output = await tools.runAsync(`${cmdDataset} listDatasets`);
    t.true(output.includes(flowersDisplayName));

    // list model evaluations, confirm model exists
    output = await tools.runAsync(`${cmdModel} listModelEvaluations -a "${donotdeleteModelId}"`);
    const flowersEvaluationName = output.split(`/n`)[0].split(`:`)[1].trim();
    //console.log(`Evaluation name: ${flowersEvaluationName}`);

    // run prediction on 'testImage.jpg' in resources folder
    output = await tools.runAsync(`${cmdPredict} predict -i "${donotdeleteModelId}" -f "${sampleImage2}" -s "0.5"`);
    t.true(output.includes(`dandelion`));
})

// list datasets
test(`should list datasets`, async t => {
  const output = await tools.runAsync(`${cmdDataset} listDatasets`);
  t.true(output.includes(`List of datasets:`));
});