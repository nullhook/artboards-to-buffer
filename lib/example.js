const { Sketch, Exporter } = require('./index');
const path = require('path');

const sketchToolBin = '/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool';
const sketchFile = path.resolve('./stylebee-holiday-card.sketch');
const outputPath = path.resolve('./uploads');


// get metadata
	new Sketch({file: sketchFile})
		.asExport({ outputPath })
		.getMetaData( new Exporter({ bin: sketchToolBin }) )
		.then(console.log)
		.catch(console.log);

// // //get buffer
// 	new Sketch({file: sketchFile})
// 		.asExport({ outputPath })
// 		.getArtboardData(new Exporter({ bin: sketchToolBin }), '4535252D-1C8C-4B56-85D8-4E36D7B00D37')
// 		.then(data => console.log(data instanceof Uint8Array))
// 		.catch(console.log);
