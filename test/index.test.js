const path = require('path');
const { Sketch, Exporter } = require('../index');

const sketchToolBin = '/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool';
const sketchFile = path.resolve('./stylebee-holiday-card.sketch');
const outputPath = path.resolve('./uploads');

test('when there is no bin file', () => {
	expect( () => new Exporter() ).toThrow();
});

test('when there is no sketch file', () => {
	expect( () => new Sketch() ).toThrow();
});

test('when there is no output path', () => {
	expect( () => new Sketch({file: sketchFile}).asExport() ).toThrow();
});

it('gets metadata of a sketch file', async () => {

	new Sketch({file: sketchFile})
		.asExport({ outputPath })
		.getMetaData(new Exporter({ bin: sketchToolBin }))
		.then(data => JSON.parse(data))
		.then(data => expect(data).toHaveProperty('pages'));
});

it('gets artboard in a buffer', async () => {

	new Sketch({file: sketchFile})
		.asExport({ outputPath })
		.getArtboardData(new Exporter({ bin: sketchToolBin }), '4535252D-1C8C-4B56-85D8-4E36D7B00D37')
		.then(data => expect(data).toBeInstanceOf(Uint8Array));
});
