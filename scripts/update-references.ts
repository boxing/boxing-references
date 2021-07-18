import { exec, execSync } from 'child_process';
import { data } from '../src/data';

// we could just hardcode this value in, but Max Kellerman's rap career may not be over?!
const numberOfMaxKellermanReferences = data.reduce(
  (accumulator, currentValue) => {
    if (currentValue.singer === 'Max Kellerman') {
      return accumulator + 1;
    }
    return accumulator;
  },
  0
);

execSync(
  `sed -i 's/Boxing%20references-[[:digit:]]\\+/Boxing%20references-${data.length}/g' README.md`
);
execSync(
  `sed -i 's/Max%20Kellerman%20boxing%20references-[[:digit:]]\\+/Max%20Kellerman%20boxing%20references-${numberOfMaxKellermanReferences}/g' README.md`
);

execSync(
  `git add README.md && git commit -m "Update boxing reference numbers in README.md"`
);
