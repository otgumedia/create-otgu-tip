#!/usr/bin/env node
import { execSync } from 'child_process';

const runCommand = (command) => {
  try {
    execSync(`${command}`, {stdio: 'inherit'});
  } catch (e) {
    console.error(`Failed to execute command: ${command}`, e);
    return false;
  }
  return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/otgumedia/create-otgu-tip.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && yarn`;

console.log(`Cloning the repository with the name ${repoName}`);
const checkOut = runCommand(gitCheckoutCommand);
if(!checkOut) {
  console.error('Failed to clone the repository');
  process.exit(1);
}

console.log('Installing dependencies');
const installDeps = runCommand(installDepsCommand);
if(!installDeps) {
  console.error('Failed to install dependencies');
  process.exit(1);
}

console.log('Done!');
console.log(`cd ${repoName} && yarn start`);