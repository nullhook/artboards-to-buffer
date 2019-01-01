import Promise from 'bluebird';
import { spawn } from 'child_process';
import path from 'path';
import c from 'template-colors';
import fs from 'fs';

// const outputPath = path.resolve('./uploads');

class SketchTool {

	constructor(options = {}) {

		if(!options.file) {
			console.log(c`You cannot export artboards using an empty file value`.red);
		}

		this.bin = options.bin;
		this.file = options.file;
		this.outputPath = options.outputPath;
	}

	async exportArtboard(artboard_id) {

		return new Promise( (resolve, reject) => {
			const proc = spawn(this.bin, ['export', 'artboards', this.file, `--item=${artboard_id}`, '--use-id-for-name=yes', '--formats=jpg',
				`--output=${this.outputPath}`]);

			let data, err;

			proc.stdout.on('data', (buffer) => {
				data = buffer;
				data = this._getImageBuffer(artboard_id);
			});

			proc.stderr.on('data', (buffer) => {
				err = buffer;
			});

			//exit gracefully
			proc.on('exit', code => {

				if(code != 0) {
					throw new Error(c`non 0 error occured`.red.bold);
					reject(err);
				}

				resolve(data);
			});

		});
	}

	_getImageBuffer(artboard_id) {
		const files = fs.readdirSync(this.outputPath);
		const file = files.filter( file => file.match(new RegExp(`${artboard_id}`, 'ig')) )[0];

		return fs.readFileSync( path.join(this.outputPath, file) );
	}

	async getMetaData() {
		return new Promise( (resolve, reject) => {
				const proc = spawn(this.bin, ['list', 'artboards', this.file]);

				let data, err;

				proc.stdout.on('data', (buffer) => {
					data = buffer.toString();
				});

				proc.stderr.on('data', (buffer) => {
					err = buffer.toString();
				});

				//exit gracefully
				proc.on('exit', code => {

					if(code != 0) {
						throw new Error(c`Non 0 error occured: ${err}`.red.bold);
						reject(err);
					}

					resolve(data);
				});

		});

	}
};

export default SketchTool;
