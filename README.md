## artboards-to-buffer

Parse artboards inside any sketch file and get buffer data

## Installation
```
npm install artboards-to-buffer
```

## Usage

How to import
```javascript
import { Sketch, Exporter } from 'artboards-to-buffer';
```

To get metadata of a sketch file
```javascript
new Sketch({file: sketchFile})
        .asExport({ outputPath })
        .getMetaData( new Exporter({ bin: sketchToolBin }) )
        .then(console.log)
        .catch(console.log);
```

To export an artboard and get buffer data
```javascript
new Sketch({file: sketchFile})
        .asExport({ outputPath })
        .getArtboardData( new Exporter({ bin: sketchToolBin }), artboard_id )
        .then(console.log)
        .catch(console.log);
```

You can use the wrapper below to send arguments to sketchtool (you must include a binary path to your sketchtool)
```javascript
new Exporter({ bin: sketchToolBin })
    .run([args]);
```
