import {loadJsonFile} from 'load-json-file';
import {writeJsonFile} from 'write-json-file';
import { execSync } from 'child_process';

const version = process.env.VERSION;
if(version == null) {
  throw 'VERSION env not defined';
}  

console.log(`Publishing`);
const path = `package.json`;

// Update version
const pkg = await loadJsonFile(path);
const orgVersion = pkg.version;
pkg.version = version;
await writeJsonFile(path, pkg);

// Publish
execSync(`npm publish`);

