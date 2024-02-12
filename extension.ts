import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class MyExtension extends Extension {
    gsettings?: Gio.Settings;

    enable() {


        //- capslock to super
        const [state, result] = this.getXKBOptions();
        state ? console.log("the key found no need to set it") : this.map(result);

        //-keybindings
        this.setKeyboardKeybindings()

        let mode = Shell.ActionMode.ALL
        let flag = Meta.KeyBindingFlags.NONE;
        this.gsettings = this.getSettings();

        let activeWorkspace = global.workspace_manager.get_active_workspace()
        Main.wm.addKeybinding("go-right", this.gsettings, flag, mode, () => {

            // global.workspace_manager.get_active_workspace().get_neighbor(Meta.MotionDirection.DOWN).activate(global.get_current_time());
            // let newWorkspace = global.workspace_manager.append_new_workspace(true, global.get_current_time())
            activeWorkspace.get_neighbor(Meta.MotionDirection.RIGHT).activate(global.get_current_time())


        });
        Main.wm.addKeybinding("go-left", this.gsettings, flag, mode, () => {
            activeWorkspace.get_neighbor(Meta.MotionDirection.LEFT).activate(global.get_current_time())
        });
    }

    disable() {
        const [state, result] = this.getXKBOptions();
        state ? this.removeMap(result) : console.log("the key not found to remove it");
        Main.notify('Lomotion extension disabled');

        this.resetKeyboardKeybindings()

        Main.wm.removeKeybinding("go-left");
        Main.wm.removeKeybinding("go-right");
        this.gsettings = undefined;
    }
    //- Get options
    getKey() {
        let result = GLib.spawn_command_line_sync('gsettings get org.gnome.desktop.input-sources xkb-options')[1].toString().trim();

        if (result == '@as []')
            return []
        //remove '[' && ']'
        result = result.substring(1, result.length - 1);
        //convert string result to array
        let lstResult = result.split(',');

        return lstResult;
    }
    //- check if the caps:super key exist or not and return options array with  caps:super state 
    getXKBOptions() {
        let result = this.getKey();
        let newList: any = [];
        let found = false;

        result.forEach(function (element, index, array) {
            element = element.trim();
            let len = element.length;
            if (element.substring(1, len - 1) == 'caps:super') {
                found = true;
                console.log("there is  caps:super key")
            } else {
                newList.push(element);

            }
        })

        return [found, newList];
    }
    //- set the key function
    setKey(arr: any) {
        let result;

        if (arr.length === 0) {
            result = GLib.spawn_command_line_sync('gsettings set org.gnome.desktop.input-sources xkb-options ' + '"' + '[]' + '"');
        } else {
            result = GLib.spawn_command_line_sync('gsettings set org.gnome.desktop.input-sources xkb-options ' + '"' + '[' + arr.toString() + ']' + '"');
        }

        return result[0];
    }
    //- map capslock key to another super key caps:super
    map(arr: any) {
        arr.push("'caps:super'");
        let result = this.setKey(arr);

        if (result) {
            // Main.notify('CapsLock mapped to super');
        }
        else {
            Main.notify('There was a problem when mapping try again later');
        }

    }
    //- remove caps:super mapping
    removeMap(arr: any) {
        let result;
        result = this.setKey(arr);
        if (result) {
            // Main.notify('mapping removed');
        }
        else {
            Main.notify('There was a problem when remove mapping try again later');
        }
    }

    //-set Keybindings 
    setKeyboardKeybindings() {
        // Main.wm.addKeybinding(
        //     'switch-to-next-workspace',
        //     new Gio.Settings({ schema: 'org.gnome.shell.extensions.gnome-motion' }),
        //     Meta.KeyBindingFlags.NONE,
        //     Shell.ActionMode.NORMAL,
        //     function () {
        //         global.workspace_manager.get_active_workspace().get_neighbor(Meta.MotionDirection.DOWN).activate(global.get_current_time());
        //     }
        // );
    }

    //-reset Keybindings 
    resetKeyboardKeybindings() {
        // Main.wm.removeKeybinding('switch-to-next-workspace');
    }

}
