<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Google Cloud Vision API: Node.js Samples

[![Open in Cloud Shell][shell_img]][shell_link]

The [Cloud Vision API](https://cloud.google.com/vision/docs) allows developers to easily integrate vision detection features within applications, including image labeling, face and landmark detection, optical character recognition (OCR), and tagging of explicit content.

## Table of Contents

* [Before you begin](#before-you-begin)
* [Samples](#samples)
  * [Face Detection](#face-detection)
  * [Image Property Detection](#image-property-detection)
  * [Label Detection](#label-detection)
  * [Landmark Detection](#landmark-detection)
  * [Logo Detection](#logo-detection)
  * [Safe Search Detection](#safe-search-detection)
  * [Crop Hints Detection](#crop-hints-detection)
  * [Web Detection](#web-detection)
  * [Text Detection](#text-detection)

## Before you begin

Before running the samples, make sure you've followed the steps in the
[Before you begin section](../README.md#before-you-begin) of the client
library's README.

## Samples

### Face Detection

View the [source code][face_detection_0_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[face_detection_0_docs]: https://cloud.google.com/vision/docs
[face_detection_0_code]: detect.js

### Image Property Detection

View the [source code][image_property_detection_1_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[image_property_detection_1_docs]: https://cloud.google.com/vision/docs
[image_property_detection_1_code]: detect.js

### Label Detection

View the [source code][label_detection_2_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[label_detection_2_docs]: https://cloud.google.com/vision/docs
[label_detection_2_code]: detect.js

### Landmark Detection

View the [source code][landmark_detection_3_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[landmark_detection_3_docs]: https://cloud.google.com/vision/docs
[landmark_detection_3_code]: detect.js

### Logo Detection

View the [source code][logo_detection_4_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[logo_detection_4_docs]: https://cloud.google.com/vision/docs
[logo_detection_4_code]: detect.js

### Safe Search Detection

View the [source code][safe_search_detection_5_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[safe_search_detection_5_docs]: https://cloud.google.com/vision/docs
[safe_search_detection_5_code]: detect.js

### Crop Hints Detection

View the [source code][crop_hint_detection_6_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[crop_hint_detection_6_docs]: https://cloud.google.com/vision/docs
[crop_hint_detection_6_code]: detect.js

### Web Detection

View the [source code][web_detection_7_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[web_detection_7_docs]: https://cloud.google.com/vision/docs
[web_detection_7_code]: detect.js

### Text Detection

View the [source code][fulltext_detection_8_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/detect.js,samples/README.md)

__Usage:__ `node detect.js --help`

```
detect.js <command>

Commands:
  detect.js faces <fileName>                         Detects faces in a local image file.
  detect.js faces-gcs <bucketName> <fileName>        Detects faces in an image in Google Cloud Storage.
  detect.js labels <fileName>                        Detects labels in a local image file.
  detect.js labels-gcs <bucketName> <fileName>       Detects labels in an image in Google Cloud Storage.
  detect.js landmarks <fileName>                     Detects landmarks in a local image file.
  detect.js landmarks-gcs <bucketName> <fileName>    Detects landmarks in an image in Google Cloud Storage.
  detect.js text <fileName>                          Detects text in a local image file.
  detect.js text-gcs <bucketName> <fileName>         Detects text in an image in Google Cloud Storage.
  detect.js logos <fileName>                         Detects logos in a local image file.
  detect.js logos-gcs <bucketName> <fileName>        Detects logos in an image in Google Cloud Storage.
  detect.js properties <fileName>                    Detects image properties in a local image file.
  detect.js properties-gcs <bucketName> <fileName>   Detects image properties in an image in Google Cloud Storage.
  detect.js safe-search <fileName>                   Detects safe search properties in a local image file.
  detect.js safe-search-gcs <bucketName> <fileName>  Detects safe search properties in an image in Google Cloud Storage.
  detect.js crops <fileName>                         Detects crop hints in a local image file.
  detect.js crops-gcs <bucketName> <fileName>        Detects crop hints in an image in Google Cloud Storage.
  detect.js web <fileName>                           Finds similar photos on the web for a local image file.
  detect.js web-gcs <bucketName> <fileName>          Finds similar photos on the web for an image in Google Cloud
                                                     Storage.
  detect.js fulltext <fileName>                      Extracts full text from a local image file.
  detect.js fulltext-gcs <bucketName> <fileName>     Extracts full text from an image in Google Cloud Storage.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node detect.js faces ./resources/face_no_surprise.jpg
  node detect.js faces-gcs my-bucket your-image.jpg
  node detect.js labels ./resources/wakeupcat.jpg
  node detect.js labels-gcs my-bucket your-image.jpg
  node detect.js landmarks ./resources/landmark.jpg
  node detect.js landmarks-gcs my-bucket your-image.jpg
  node detect.js text ./resources/wakeupcat.jpg
  node detect.js text-gcs my-bucket your-image.jpg
  node detect.js logos ./resources/logos.png
  node detect.js logos-gcs my-bucket your-image.jpg.png
  node detect.js properties ./resources/landmark.jpg
  node detect.js properties-gcs my-bucket your-image.jpg
  node detect.js safe-search ./resources/wakeupcat.jpg
  node detect.js safe-search-gcs my-bucket your-image.jpg
  node detect.js crops ./resources/wakeupcat.jpg
  node detect.js crops-gcs my-bucket your-image.jpg
  node detect.js web ./resources/wakeupcat.jpg
  node detect.js web-gcs my-bucket your-image.jpg
  node detect.js fulltext ./resources/wakeupcat.jpg
  node detect.js fulltext-gcs my-bucket your-image.jpg

For more information, see https://cloud.google.com/vision/docs
```

[fulltext_detection_8_docs]: https://cloud.google.com/vision/docs
[fulltext_detection_8_code]: detect.js

[shell_img]: http://gstatic.com/cloudssh/images/open-btn.png
[shell_link]: https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-vision&page=editor&open_in_editor=samples/README.md
