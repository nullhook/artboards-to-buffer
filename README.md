## artboards-to-buffer

Parse artboards inside any sketch file and get buffer data

## Installation
```
npm install artboards-to-buffer
```

## Usage

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
        .getArtboardData(new Exporter({ bin: sketchToolBin }), '4535252D-1C8C-4B56-85D8-4E36D7B00D37')
        .then(data => console.log)
        .catch(console.log);
```

You can use the wrapper below to send arguments to sketchtool (you must include a binary path to your sketchtool)
```javascript
new Exporter({ bin: sketchToolBin })
    .run([args]);
```
