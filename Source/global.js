/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import fs from 'fs-extra';
import winston from 'winston';
import simpleGit from 'simple-git';
import { Git } from 'simple-git';
import { ConfigManager } from './configuration/ConfigManager';
import { ConfigParser } from './configuration/ConfigParser';
import { ApplicationManager } from './applications/ApplicationManager';
import { BoundedContextManager } from './boundedContexts/BoundedContextManager';
import { BoilerPlatesManager } from './boilerPlates/BoilerPlatesManager';
import { HttpWrapper } from './HttpWrapper';
import { Folders } from './Folders';
import { ArtifactsManager } from './artifacts/ArtifactsManager';
import { InquirerManager } from './artifacts/InquirerManager';
import path from 'path'

const _configManager = new WeakMap();
const _configParser = new WeakMap();
const _applicationManager = new WeakMap();
const _artifactsManager = new WeakMap();
const _boundedContextManager = new WeakMap();
const _boilerPlatesManager = new WeakMap();
const _inquirerManager = new WeakMap();

const _folders = new WeakMap();
const _git = new WeakMap();
const _logger = new WeakMap();
const _httpWrapper = new WeakMap();

/**
 * Common global object
 */
class global {
    /**
     * Perform initialization
     */
    constructor() {
        _logger.set(this, winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            transports: [
                new winston.transports.Console()
            ]
        }));

        _httpWrapper.set(this, new HttpWrapper());
        
        _configParser.set(this, new ConfigParser());
        _configManager.set(this, new ConfigManager(fs, this.configParser, this.logger));

        let git = simpleGit(this.configManager.centralFolderLocation);
        git.forFolder = (folder) => {
            return simpleGit(folder);
        };
        
        _git.set(this, git);
        _folders.set(this, new Folders(fs));
        _boilerPlatesManager.set(this, new BoilerPlatesManager(this.configManager, this.httpWrapper, this.git, this.folders, fs, this.logger));
        _applicationManager.set(this, new ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders,  fs, this.logger));
        _boundedContextManager.set(this, new BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, fs, this.logger));
        _inquirerManager.set(this, new InquirerManager(this.folders, fs, this.logger));
        _artifactsManager.set(this, new ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, fs, this.logger));
        
    }

    /**
     * Gets the {ConfigManager}
     * @returns {ConfigManager}
     */
    get configManager() {
        return _configManager.get(this);
    }

    /**
     * Gets the {ConfigParser}
     * @returns {ConfigParser}
     */
    get configParser() {
        return _configParser.get(this);
    }

    /**
     * Gets the {Folders}
     * @returns {Folders}
     */
    get folders() {
        return _folders.get(this);
    }

    /**
     * Gets the {ApplicationManager}
     * @returns {ApplicationManager}
     */
    get applicationManager() {
        return _applicationManager.get(this);
    }

    /** 
     * Gets the {ArtifactsManager}
     * @returns {ArtifactsManager}
     */
    get artifactsManager() {
        return _artifactsManager.get(this);
    }

    /**
     * Gets the {BoundedContextManager}
     * @returns {BoundedContextManager}
     */
    get boundedContextManager() {
        return _boundedContextManager.get(this);
    }

    /**
     * Gets the {BoilerPlatesManager}
     * @returns {BoilerPlatesManager}
     */
    get boilerPlatesManager() {
        return _boilerPlatesManager.get(this);
    }
    /**
     * Gets the {InquirerManager
     * @returns {InquirerManager}}
     */
    get inquirerManager() {
        return _inquirerManager.get(this);
    }

    /**
     * Gets the {Git} system
     * @returns {Git}
     */
    get git() {
        return _git.get(this);
    }

    /**
     * Gets the {Logger}
     * @returns {Logger}
     */
    get logger() { 
        return _logger.get(this);
    }

    /**
     * Gets the {HttpWrapper}
     * @returns {HttpWrapper}
     */
    get httpWrapper() {
        return _httpWrapper.get(this);
    }

    get usagePrefix() {
        return '\n\t ';
    }
    
    /**
     * Gets the full directory path
     * @param {string} filePath
     * @returns {string} directory path
     */
    getFileDirPath(filePath) {
        return path.parse(filePath).dir;
    }
    /**
     * Gets the filename without extension
     * @param {string} filePath
     * @returns {string} filename
     */
    getFileName(filePath) {
        return path.parse(filePath).name;
    }
    /**
     * Gets the filename with extension
     * @param {string} filePath
     * @returns {string} filename
     */
    getFileNameAndExtension(filePath) {
        return path.parse(filePath).base;
    }
    /**
     * Gets the directory name
     * @param {string} filePath
     * @returns {string} file dirname
     */
    getFileDir(filePath) {
        return path.dirname(filePath);
    }

    /**
     * Validate the name argument
     * @param {string} name 
     */
    validateArgsNameInput(name) {
        if (name.includes(' ')) {
            _logger.get(this).error('Name argument cannot contain spaces');
            process.exit(1);
        }
        if (name.includes('-')) {
            _logger.get(this).error('Name argument cannot contain "-"');
            process.exit(1);
        }
        if (name !== path.basename(name)) {
            _logger.get(this).error("Name argument cannot isn't a valid filename");
            process.exit(1);
        }
        if (/^\.\.?$/.test(name)) {
            _logger.get(this).error('Name argument cannot be "." or ".."');
            process.exit(1);
        }
    }

}

export default new global();