## artboards-to-buffer

Parse artboards inside any sketch files and get the buffer of the artboards

## Usage

To get a Sketch file's meta data
```
new Sketch({file: sketchFile})
        .asExport({ outputPath })
        .getMetaData( new Exporter({ bin: sketchToolBin }) )
        .then(console.log)
        .catch(console.log);
```

To export an artboard and get the contents
```
new Sketch({file: sketchFile})
        .asExport({ outputPath })
        .getArtboardData(new Exporter({ bin: sketchToolBin }), '4535252D-1C8C-4B56-85D8-4E36D7B00D37')
        .then(data => console.log)
        .catch(console.log);
```

Sketch ships with a sketchtool binary and you can use the wrapper below
```
new Exporter({ bin: sketchToolBin })
    .run([args]);
```
