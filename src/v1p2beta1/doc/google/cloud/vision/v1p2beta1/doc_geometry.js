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

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * A vertex represents a 2D point in the image.
 * NOTE: the vertex coordinates are in the same scale as the original image.
 *
 * @property {number} x
 *   X coordinate.
 *
 * @property {number} y
 *   Y coordinate.
 *
 * @typedef Vertex
 * @memberof google.cloud.vision.v1p2beta1
 * @see [google.cloud.vision.v1p2beta1.Vertex definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/vision/v1p2beta1/geometry.proto}
 */
var Vertex = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * A bounding polygon for the detected image annotation.
 *
 * @property {Object[]} vertices
 *   The bounding polygon vertices.
 *
 *   This object should have the same structure as [Vertex]{@link google.cloud.vision.v1p2beta1.Vertex}
 *
 * @typedef BoundingPoly
 * @memberof google.cloud.vision.v1p2beta1
 * @see [google.cloud.vision.v1p2beta1.BoundingPoly definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/vision/v1p2beta1/geometry.proto}
 */
var BoundingPoly = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * A 3D position in the image, used primarily for Face detection landmarks.
 * A valid Position must have both x and y coordinates.
 * The position coordinates are in the same scale as the original image.
 *
 * @property {number} x
 *   X coordinate.
 *
 * @property {number} y
 *   Y coordinate.
 *
 * @property {number} z
 *   Z coordinate (or depth).
 *
 * @typedef Position
 * @memberof google.cloud.vision.v1p2beta1
 * @see [google.cloud.vision.v1p2beta1.Position definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/vision/v1p2beta1/geometry.proto}
 */
var Position = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};