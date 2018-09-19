#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

var inquirer = require('inquirer');
const USAGE = 'dolittle add readmodel';
args
    .example(USAGE, "Creates a read model in the current folder");

inquirer.prompt(global.languageQuestion).then(answers => {
    global.artifactsManager.createReadModel(answers.language);
  });