// const { exec } = require('child_process');
import {exec} from 'child_process';
// const {data} = require('../src/data');
import {data} from '../src/data';

console.log(data);

exec("sed -i 's/Boxing%20References-#/Boxing%20References-5/g' README.md", (err, stdout, stderr) => {
    if (err) {
        console.log(err)
        return;
    }
});
