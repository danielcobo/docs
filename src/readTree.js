import * as fs from '@danielcobo/fs';
import * as process from 'process';
import micromatch from 'micromatch';

// 1. Read tree
const absoluteCurrentPath = process.cwd();
//const currentPath = path.basename(absoluteCurrentPath);
const tree = await fs.read(absoluteCurrentPath);

// 2. Filter by glob
const globs = ['**/*.js', '!**/node_modules/**'];
const filepaths = micromatch(tree.files, globs);

export { filepaths };
