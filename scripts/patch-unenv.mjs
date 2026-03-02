import fs from 'node:fs';
import path from 'node:path';

function patchFile(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('#stdout') || content.includes('#t')) {
            console.log(`Patching ${filePath}...`);
            // Replace #stdout, #stderr, #stdin, #cwd with public versions
            content = content.replace(/#stdin/g, '_stdin');
            content = content.replace(/#stdout/g, '_stdout');
            content = content.replace(/#stderr/g, '_stderr');
            content = content.replace(/#cwd/g, '_cwd');
            // In older unenv, it might be #t, #e, #x
            content = content.replace(/this\.#t/g, 'this._t');
            content = content.replace(/this\.#e/g, 'this._e');
            content = content.replace(/this\.#x/g, 'this._x');
            content = content.replace(/#t;/g, '_t;');
            content = content.replace(/#e;/g, '_e;');
            content = content.replace(/#x;/g, '_x;');

            fs.writeFileSync(filePath, content);
            console.log(`Successfully patched ${filePath}`);
        } else {
            console.log(`${filePath} already patched or no private members found.`);
        }
    } else {
        console.log(`${filePath} not found, skipping.`);
    }
}

// Check common unenv paths
const paths = [
    'node_modules/unenv/dist/runtime/node/internal/process/process.mjs',
    'node_modules/unenv/runtime/node/process/index.mjs'
];

console.log('Starting unenv patch script...');
paths.forEach(p => patchFile(path.resolve(process.cwd(), p)));
