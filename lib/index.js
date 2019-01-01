import Promise from 'bluebird';
import { spawn } from 'child_process';
import path from 'path';
import c from 'template-colors';
import fs from 'fs';

class Sketch {

	constructor(options = {}) {

		if(!options.file) {
			throw new Error(c`Please add sketch file to the file argument`.red.bold);
		}

		this.file = options.file;
	}

	asExport({ outputPath }) {
		return new _SketchExport({ sketchFile: this.file, outputFile: outputPath});
	}

}

class _SketchExport {

	constructor(options = {}) {
		this.sketchFile = options.sketchFile;
		this.outputFile = options.outputFile;
	}

	getImageBuffer(artboard_id) {
		const files = fs.readdirSync(this.outputFile);
		const file = files.filter( file => file.match(new RegExp(`${artboard_id}`, 'ig')) )[0];

		return fs.readFileSync( path.join(this.outputFile, file) );
	}

	async getArtboardData(exporter, artboard_id) {

		if(!artboard_id) {
			throw new Error(c`Cannot export without an artboard id`.red.bold);
		}

		if( !(exporter instanceof Exporter) ) {
			throw new Error(c`Please provide proper instance of Exporter`.red.bold);
		}

		await exporter.run(['export', 'artboards',
			this.sketchFile,
			`--item=${artboard_id}`,
			'--use-id-for-name=yes',
			'--formats=jpg',
			`--output=${this.outputFile}`]);

		let data = this.getImageBuffer(artboard_id);

		return data;
	}

	async getMetaData(exporter) {

		if( !(exporter instanceof Exporter) ) {
			throw new Error(c`Please provide proper instance of Exporter`.red.bold);
		}

		let data = await exporter.run(['list', 'artboards', this.sketchFile]);

		return data;
	}
}

class Exporter {
	constructor(options = {}) {

		if( !options.bin ) {
			throw new Error(c`Please provide sketchtool's binary location path`.red.bold);
		}

		this.bin = options.bin;
	}

	async run(args) {

		if(!args instanceof Array) {
			return;
		}

		return new Promise( (resolve, reject) => {
			const proc = spawn(this.bin, args);

			let result, err;

			proc.stdout.on('data', (buffer) => {
				result = buffer.toString();
			});

			proc.stderr.on('data', (buffer) => {
				err = buffer.toString();
			});

			//exit gracefully
			proc.on('exit', code => {

				if(code != 0) {
					reject(err);
				}

				resolve(result);
			});

		});
	}
}

module.exports = {
	Sketch,
	Exporter
};
