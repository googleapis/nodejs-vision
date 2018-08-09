/**
 * Copyright 2018, Google, Inc.
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

/**
 * This application demonstrates how to perform basic operations on dataset
 * with the Google AutoML Vision API.
 *
 * For more information, see the documentation at
 * https://cloud.google.com/vision/automl/docs/
 */

`use strict`;

function createModel(
  projectId,
  computeRegion,
  datasetId,
  modelName,
  trainBudget
) {
  // [START automl_vision_createModel]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `numeric Id of the project from PROJECT_ID env variable, e.g. 123456`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const datasetId = `Id of the dataset, e.g. "ICN3874392874098"`;
  // const modelName = `Name of the model, e.g. "myModel"`;
  // const trainBudget = `Budget for training model, e.g. 50`;
  // A resource that represents Google Cloud Platform location.

  const projectLocation = client.locationPath(projectId, computeRegion);

  // Check train budget condition.
  if (trainBudget === 0) {
    trainBudget = {};
  } else {
    trainBudget = {trainBudget: trainBudget};
  }

  // Set model name and model metadata for the dataset.
  const myModel = {
    displayName: modelName,
    datasetId: datasetId,
    imageClassificationModelMetadata: trainBudget,
  };

  // Create a model with the model metadata in the region.
  client
    .createModel({parent: projectLocation, model: myModel})
    .then(responses => {
      const operation = responses[0];
      const initialApiResponse = responses[1];

      console.log(`Training operation name: `, initialApiResponse.name);
      console.log(`Training started...`);
      return operation.promise();
    })
    .then(responses => {
      // The final result of the operation.
      const model = responses[0];

      // Retrieve deployment state.
      var deploymentState = ``;
      if (model.deploymentState === 1) {
        deploymentState = `deployed`;
      } else if (model.deploymentState === 2) {
        deploymentState = `undeployed`;
      }

      // Display the model information.
      console.log(`Model name: `, model.name);
      console.log(`Model id: `, model.name.split(`/`).pop(-1));
      console.log(`Model display name: `, model.displayName);
      console.log(`Model create time:`);
      console.log(`\tseconds: `, model.createTime.seconds);
      console.log(`\tnanos: `, model.createTime.nanos);
      console.log(`Model deployment state: `, deploymentState);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_vision_createModel]
}

function getOperationStatus(operationFullId) {
  // [START automl_vision_getOperationStatus]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const operationFullId = `Full name of an operation, eg. “Projects/<projectId>/locations/us-central1/operations/<operationId>
  // Get the latest state of a long-running operation.

  client.operationsClient.getOperation(operationFullId).then(responses => {
    const response = responses[0];
    console.log(`Operation status: `, response);
  });
  // [END automl_vision_getOperationStatus]
}

function listModels(projectId, computeRegion, filter_) {
  // [START automl_vision_listModels]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `numeric Id of the project from PROJECT_ID env variable, e.g. 123456`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const filter_ = `filter expressions, must specify field, e.g. “imageClassificationModelMetadata:*”`;

  // A resource that represents Google Cloud Platform location.
  const projectLocation = client.locationPath(projectId, computeRegion);

  // List all the models available in the region by applying filter.
  client
    .listModels({parent: projectLocation, filter: filter_})
    .then(responses => {
      const model = responses[0];

      // Display the model information.
      console.log(`List of models:`);
      for (let i = 0; i < model.length; i += 1) {
        console.log(`Model name: `, model[i].name);
        console.log(`Model id: `, model[i].name.split(`/`).pop(-1));
        console.log(`Model display name: `, model[i].displayName);
        console.log(`Model dataset id: `, model[i].datasetId);
        if (model[i].modelMetadata === `translationModelMetadata`) {
          console.log(`Translation model metadata:`);
          console.log(
            `\tBase model: `,
            model[i].translationModelMetadata.baseModel
          );
          console.log(
            `\tSource language code: `,
            model[i].translationModelMetadata.sourceLanguageCode
          );
          console.log(
            `\tTarget language code: `,
            model[i].translationModelMetadata.targetLanguageCode
          );
        } else if (
          model[i].modelMetadata === `textClassificationModelMetadata`
        ) {
          console.log(
            `Text classification model metadata: `,
            model[i].textClassificationModelMetadata
          );
        } else if (
          model[i].modelMetadata === `imageClassificationModelMetadata`
        ) {
          console.log(`Image classification model metadata:`);
          console.log(
            `\tBase model id: `,
            model[i].imageClassificationModelMetadata.baseModelId
          );
          console.log(
            `\tTrain budget: `,
            model[i].imageClassificationModelMetadata.trainBudget
          );
          console.log(
            `\tTrain cost: `,
            model[i].imageClassificationModelMetadata.trainCost
          );
          console.log(
            `\tStop reason: `,
            model[i].imageClassificationModelMetadata.stopReason
          );
        }
        console.log(`Model create time:`);
        console.log(`\tseconds: `, model[i].createTime.seconds);
        console.log(`\tnanos: `, model[i].createTime.nanos);
        console.log(`Model update time:`);
        console.log(`\tseconds: `, model[i].updateTime.seconds);
        console.log(`\tnanos: `, model[i].updateTime.nanos);
        console.log(`Model deployment state: `, model[i].deploymentState);
        console.log(`\n`);
      }
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_vision_listModels]
}

function getModel(projectId, computeRegion, modelId) {
  // [START automl_vision_getModel]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `numeric Id of the project from PROJECT_ID env variable, e.g. 123456`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Get complete detail of the model.
  client
    .getModel({name: modelFullId})
    .then(responses => {
      const model = responses[0];

      // Display the model information.
      console.log(`Model name: `, model.name);
      console.log(`Model id: `, model.name.split(`/`).pop(-1));
      console.log(`Model display name: `, model.displayName);
      console.log(`Model dataset id: `, model.datasetId);
      if (model.modelMetadata === `translationModelMetadata`) {
        console.log(`Translation model metadata:`);
        console.log(`\tBase model: `, model.translationModelMetadata.baseModel);
        console.log(
          `\tSource language code: `,
          model.translationModelMetadata.sourceLanguageCode
        );
        console.log(
          `\tTarget language code: `,
          model.translationModelMetadata.targetLanguageCode
        );
      } else if (model.modelMetadata === `textClassificationModelMetadata`) {
        console.log(
          `Text classification model metadata: `,
          model.textClassificationModelMetadata
        );
      } else if (model.modelMetadata === `imageClassificationModelMetadata`) {
        console.log(`Image classification model metadata:`);
        console.log(
          `\tBase model id: `,
          model.imageClassificationModelMetadata.baseModelId
        );
        console.log(
          `\tTrain budget: `,
          model.imageClassificationModelMetadata.trainBudget
        );
        console.log(
          `\tTrain cost: `,
          model.imageClassificationModelMetadata.trainCost
        );
        console.log(
          `\tStop reason: `,
          model.imageClassificationModelMetadata.stopReason
        );
      }
      console.log(`Model create time:`);
      console.log(`\tseconds: `, model.createTime.seconds);
      console.log(`\tnanos: `, model.createTime.nanos);
      console.log(`Model update time:`);
      console.log(`\tseconds: `, model.updateTime.seconds);
      console.log(`\tnanos: `, model.updateTime.nanos);
      console.log(`Model deployment state: `, model.deploymentState);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_vision_getModel]
}

function listModelEvaluations(projectId, computeRegion, modelId, filter_) {
  // [START automl_vision_listModelEvaluations]
  const automl = require(`@google-cloud/automl`);
  const util = require(`util`);

  const client = new automl.v1beta1.AutoMlClient();
  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `numeric Id of the project from PROJECT_ID env variable, e.g. 123456`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;
  // const filter_ = `filter expressions, must specify field, e.g. “imageClassificationModelMetadata:*”`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // List all the model evaluations in the model by applying filter.
  client
    .listModelEvaluations({parent: modelFullId, filter: filter_})
    .then(responses => {
      const element = responses[0];
      for (let i = 0; i < element.length; i += 1) {
        console.log(util.inspect(element[i], false, null));
      }
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_vision_listModelEvaluations]
}

function getModelEvaluation(
  projectId,
  computeRegion,
  modelId,
  modelEvaluationId
) {
  // [START automl_vision_getModelEvaluation]
  const automl = require(`@google-cloud/automl`);
  const util = require(`util`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `numeric Id of the project from PROJECT_ID env variable, e.g. 123456`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;
  // const modelEvaluationId = `Id of your model evaluation, e.g “ICN12345”

  // Get the full path of the model evaluation.
  const modelEvaluationFullId = client.modelEvaluationPath(
    projectId,
    computeRegion,
    modelId,
    modelEvaluationId
  );

  // Get complete detail of the model evaluation.
  client
    .getModelEvaluation({name: modelEvaluationFullId})
    .then(responses => {
      const response = responses[0];
      console.log(util.inspect(response, false, null));
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_vision_getModelEvaluation]
}

function displayEvaluation(projectId, computeRegion, modelId, filter_) {
  // [START automl_vision_displayEvaluation]
  const automl = require(`@google-cloud/automl`);
  const math = require(`mathjs`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `numeric Id of the project from PROJECT_ID env variable, e.g. 123456`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;
  // const filter_ = `filter expressions, must specify field, e.g. “imageClassificationModelMetadata:*”`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // List all the model evaluations in the model by applying filter.
  client
    .listModelEvaluations({parent: modelFullId, filter: filter_})
    .then(respond => {
      const response = respond[0];
      for (let element of response) {
        // There is evaluation for each class in a model and for overall model.
        // Get only the evaluation of overall model.
        if (!element.annotationSpecId) {
          const modelEvaluationId = element.name.split(`/`).pop(-1);

          // Resource name for the model evaluation.
          const modelEvaluationFullId = client.modelEvaluationPath(
            projectId,
            computeRegion,
            modelId,
            modelEvaluationId
          );

          // Get a model evaluation.
          client
            .getModelEvaluation({name: modelEvaluationFullId})
            .then(responses => {
              const modelEvaluation = responses[0];

              const classMetrics =
                modelEvaluation.classificationEvaluationMetrics;

              const confidenceMetricsEntries =
                classMetrics.confidenceMetricsEntry;

              // Showing model score based on threshold of 0.5
              for (let confidenceMetricsEntry of confidenceMetricsEntries) {
                if (confidenceMetricsEntry.confidenceThreshold === 0.5) {
                  console.log(
                    `Precision and recall are based on a score threshold of 0.5`
                  );
                  console.log(
                    `Model Precision: %`,
                    math.round(confidenceMetricsEntry.precision * 100, 2)
                  );
                  console.log(
                    `Model Recall: %`,
                    math.round(confidenceMetricsEntry.recall * 100, 2)
                  );
                  console.log(
                    `Model F1 score: %`,
                    math.round(confidenceMetricsEntry.f1Score * 100, 2)
                  );
                  console.log(
                    `Model Precision@1: %`,
                    math.round(confidenceMetricsEntry.precisionAt1 * 100, 2)
                  );
                  console.log(
                    `Model Recall@1: %`,
                    math.round(confidenceMetricsEntry.recallAt1 * 100, 2)
                  );
                  console.log(
                    `Model F1 score@1: %`,
                    math.round(confidenceMetricsEntry.f1ScoreAt1 * 100, 2)
                  );
                }
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_vision_displayEvaluation]
}

function deleteModel(projectId, computeRegion, modelId) {
  // [START automl_vision_deleteModel]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `numeric Id of the project from PROJECT_ID env variable, e.g. 123456`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Delete a model.
  client
    .deleteModel({name: modelFullId})
    .then(responses => {
      const operation = responses[0];
      return operation.promise();
    })
    .then(responses => {
      // The final result of the operation.
      console.log(`Model deleted.`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_vision_deleteModel]
}

require(`yargs`)
  .demand(1)
  .options({
    computeRegion: {
      alias: `c`,
      type: `string`,
      default: process.env.REGION_NAME,
      requiresArg: true,
      description: `region name e.g. "us-central1"`,
    },
    datasetId: {
      alias: `i`,
      type: `string`,
      requiresArg: true,
      description: `Id of the dataset`,
    },
    filter_: {
      alias: `f`,
      //default: `imageClassificationModelMetadata:*`,
      type: `string`,
      requiresArg: true,
      description: `Name of the Dataset to search for`,
    },
    modelName: {
      alias: `m`,
      type: `string`,
      default: false,
      requiresArg: true,
      description: `Name of the model`,
    },
    modelId: {
      alias: `a`,
      type: `string`,
      default: ``,
      requiresArg: true,
      description: `Id of the model`,
    },
    modelEvaluationId: {
      alias: `e`,
      type: `string`,
      default: ``,
      requiresArg: true,
      description: `Id of the model evaluation`,
    },
    operationFullId: {
      alias: `o`,
      type: `string`,
      default: ``,
      requiresArg: true,
      description: `Full name of an operation`,
    },
    projectId: {
      alias: `z`,
      type: `number`,
      default: process.env.PROJECT_ID,
      requiresArg: true,
      description: `The Project ID to use. Defaults to the value of the GCLOUD_PROJECTID`,
    },
    trainBudget: {
      alias: `t`,
      type: `string`,
      default: ``,
      requiresArg: true,
      description: `Budget for training the model`,
    },
  })
  .command(`createModel`, `creates a new Model`, {}, opts =>
    createModel(
      opts.projectId,
      opts.computeRegion,
      opts.datasetId,
      opts.modelName,
      opts.trainBudget
    )
  )
  .command(`getOperationStatus`, `Gets status of current operation`, {}, opts =>
    getOperationStatus(opts.operationFullId)
  )
  .command(`listModels`, `list all Models`, {}, opts =>
    listModels(opts.projectId, opts.computeRegion, opts.filter_)
  )
  .command(`getModel`, `Get a Model`, {}, opts =>
    getModel(opts.projectId, opts.computeRegion, opts.modelId)
  )
  .command(`listModelEvaluations`, `List model evaluations`, {}, opts =>
    listModelEvaluations(
      opts.projectId,
      opts.computeRegion,
      opts.modelId,
      opts.filter_
    )
  )
  .command(`getModelEvaluation`, `Get model evaluation`, {}, opts =>
    getModelEvaluation(
      opts.projectId,
      opts.computeRegion,
      opts.modelId,
      opts.modelEvaluationId
    )
  )
  .command(`displayEvaluation`, `Display evaluation`, {}, opts =>
    displayEvaluation(
      opts.projectId,
      opts.computeRegion,
      opts.modelId,
      opts.filter_
    )
  )
  .command(`deleteModel`, `Delete a Model`, {}, opts =>
    deleteModel(opts.projectId, opts.computeRegion, opts.modelId)
  )
  .example(`node $0 createModel -i "DatasetID" -m "myModelName" -t "2"`)
  .example(`node $0 getOperationStatus -i "datasetId" -o "OperationFullID"`)
  .example(`node $0 listModels -f`)
  .example(`node $0 getModel -a "ModelID"`)
  .example(`node $0 listModelEvaluations -a "ModelID"`)
  .example(`node $0 getModelEvaluation -a "ModelId" -e "ModelEvaluationID"`)
  .example(`node $0 displayEvaluation -a "ModelId"`)
  .example(`node $0 deleteModel -a "ModelID"`)
  .wrap(120)
  .recommendCommands()
  .help()
  .strict().argv;
