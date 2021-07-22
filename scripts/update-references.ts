import { execSync } from 'child_process';
import { data } from '../src/data';

execSync(
  `sed -i 's/Boxing%20references-[[:digit:]]\\+/Boxing%20references-${data.length}/g' README.md`
);

execSync(`git add README.md && git commit --amend --no-edit`);
