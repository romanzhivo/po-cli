#!/usr/bin/env node

const pjson = require('../package.json');
const { exec } = require('child_process');
const readline = require('readline');



const rawArgs = process.argv.slice(2)

const argumentsMap = {
    doc: 'analyze > analysis.json',
    s: 'serve',
    b: 'build',
    in: 'init',
    inst: 'install',
    t: 'test',
    l: 'lint'
};

const utilityArgs = [
    '-v',
    '--verbose',
    '-h',
    '--help',
    '--version',
    '--desc'
];

const semanticArgument = rawArgs[0];
const polymerCommand = argumentsMap[semanticArgument];
const polymerArguments = rawArgs.splice(1);
let targetCommands = [];

if (semanticArgument === '--version') {
    console.log(pjson.version)
    return;
}
if (semanticArgument === '--desc') {
    console.log(pjson.description)
    return;
}

if (utilityArgs.indexOf(semanticArgument) !== -1) {
    showHelpInfo();
    return;
}

if (!polymerCommand || !polymerArguments) {
    console.log('Ошибка команды...');
    showHelpInfo();
    return;
} else {
    targetCommands = 'polymer ' + [polymerCommand, ...polymerArguments].join(' ');
}

const child = exec(targetCommands, (error, stdout, stderr) => {
    if (error && polymerCommand !== 'lint') {
        console.log(error)
        throw error;
    }

    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
});

child.stdin.setEncoding('utf-8');



process.stdin.pipe(child.stdin);
child.stdout.pipe(process.stdout);

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


process.stdin.on('keypress', (a, key) => {
    if (key.ctrl && key.name === 'c') {
        child.kill();
        process.exit();
    }
});

child.stdout.on('end', () => {
    setTimeout(() => {
        process.exit();
    }, 100);
});



function showHelpInfo() {
    let spaceNumber = 0;

    console.log('Available commands: \n');
    console.log('-------------');
    console.log(`${pjson.description}\nверс. ${pjson.version}\n`);

    utilityArgs.forEach((el) => { console.log(el) })
    console.log('\n-------------\n');
    console.log('Polymer 2.0\n');

    for (let prop in argumentsMap) {
        if (spaceNumber < prop.length) spaceNumber = prop.length;
    }

    for (let prop in argumentsMap) {
        currentSpaceNumder = spaceNumber - prop.length;
        console.log(`${prop}${createSpaceString(currentSpaceNumder)} - polymer ${argumentsMap[prop]}`);
    }

    function createSpaceString(spaceNumber) {
        let str = '';
        for (let i = 0; i < spaceNumber; i++) {
            str += ' ';
        }

        return str;
    }
}


