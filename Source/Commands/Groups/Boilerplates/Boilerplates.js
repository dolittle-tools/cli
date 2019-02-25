/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from '../CommandGroup';
import { Command } from '../../Command';
import dolittleCommand from './Dolittle';
import onlineCommand from './Online';

export const group = 'boilerplates';
/**
 * The Boilerplates {CommandGroup}
 *
 * @export
 * @class Boilerplates
 * @extends {CommandGroup}
 */
class Boilerplates extends CommandGroup {
    /**
     * Creates an instance of {Boilerlates}.
     * @param {Command[]} commands
     * @memberof Boilerplates
     */
    constructor(commands) {
        super(commands, group, 
            'Group of the commands related to boilerplates.',
            'dolittle boilerplates <sub-command>'
        );
    }
}

export default new Boilerplates([dolittleCommand, onlineCommand]);