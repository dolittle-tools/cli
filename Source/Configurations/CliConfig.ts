/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { UserCacheConfig } from '@dolittle/tooling.common.configurations';

export type CliConfigObject = {
    /**
     * Whether to ignore that there are no boilerplates installed 
     *
     * @type {boolean}
     */
    ignoreBoilerplatePrompt: boolean
}

export class CliConfig extends UserCacheConfig<CliConfigObject> {
    
    constructor() {
        super('cli', {ignoreBoilerplatePrompt: false});
    }
}