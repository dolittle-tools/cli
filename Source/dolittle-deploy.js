#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { spawn, exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import globals from './globals';

let root = 'k8s';
if( !fs.existsSync(root)) {
    globals.logger.error('Artifacts for deployment is missing');
} else {
    globals.logger.info('Deploying Bounded Context');
    fs.readdir(root, (err, files) => {
        files.forEach(file => {
            file = file.toLowerCase();
            if( file.endsWith('.yml')) {
                
                let ps = spawn('kubectl', [
                    'apply',
                    '-f',
                    file
                ], {
                    cwd: root
                });
                ps.stdout.on('data', (data) => process.stdout.write(data.toString()));
                ps.stderr.on('data', (data) => process.stderr.write(data.toString()));
            }
        });
    
    });
}