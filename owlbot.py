# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This script is used to synthesize generated parts of this library."""

import synthtool as s
import synthtool.gcp as gcp
import synthtool.languages.node as node
import logging
import pathlib

logging.basicConfig(level=logging.DEBUG)

versions = ['v1', 'v1p1beta1', 'v1p2beta1', 'v1p3beta1', 'v1p4beta1']

# extends interface for client.ts
for version in versions:
    client_file = f"src/{version}/image_annotator_client.ts"
    if 'export interface ImageAnnotatorClient' not in pathlib.Path(client_file).read_text():
        s.replace(client_file, '\Z',
            'import {FeaturesMethod} from \'../helpers\';\n' +
            '// eslint-disable-next-line @typescript-eslint/no-empty-interface\n' +
            'export interface ImageAnnotatorClient extends FeaturesMethod {}\n'
        )

# Copy common templates
common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(source_location='build/src')
s.copy(templates)

node.postprocess_gapic_library_hermetic()
