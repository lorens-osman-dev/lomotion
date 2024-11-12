import Gio from "gi://Gio";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
export default class lomotion extends Extension {
    enable() {
        this.mapCapslock();
        this.disableKeybindings();
        this.setKeyboardKeybindings();
    }
    disable() {
        this.removeCapslock();
        this.resetKeyboardKeybindings();
        this.resetKeybindings();
    }
    //- mapCapslock function
    mapCapslock() {
        const inputs = new Gio.Settings({
            schema: "org.gnome.desktop.input-sources",
        });
        const xkb = inputs.get_strv("xkb-options");
        if (xkb.length === 0) {
            inputs.set_strv("xkb-options", ["caps:super"]);
            inputs.apply();
        }
        else {
            const xkbArray = xkb[0].trim().split(",");
            const isCapsToSuper = xkbArray.find((item) => item.trim() == "caps:super");
            if (!isCapsToSuper) {
                inputs.set_strv("xkb-options", ["caps:super"]);
                inputs.apply();
            }
        }
    }
    //- removeCapslock function
    removeCapslock() {
        const inputs = new Gio.Settings({
            schema: "org.gnome.desktop.input-sources",
        });
        const xkb = inputs.get_strv("xkb-options");
        if (xkb.length === 0) {
            return;
        }
        else {
            // convert xkb to array
            const xkbArray = xkb[0].trim().split(",");
            const isCapsToSuper = xkbArray.find((item) => item.trim() == "caps:super");
            const isCapsToSuperIndex = xkbArray.findIndex((item) => item.trim() == "caps:super");
            if (isCapsToSuper) {
                xkbArray.splice(isCapsToSuperIndex, 1);
                inputs.set_strv("xkb-options", [`${xkbArray.toString()}`]);
                inputs.apply();
            }
        }
    }
    //-set Keybindings
    setKeyboardKeybindings() {
        const inputs = new Gio.Settings({
            schema: "org.gnome.desktop.wm.keybindings",
        });
        // set super + a
        inputs.set_strv("switch-to-workspace-left", []);
        inputs.set_strv("switch-to-workspace-left", ["<Super>a"]);
        // set super + s
        inputs.set_strv("switch-to-workspace-right", []);
        inputs.set_strv("switch-to-workspace-right", ["<Super>s"]);
        // set super + d
        inputs.set_strv("move-to-workspace-left", []);
        inputs.set_strv("move-to-workspace-left", ["<Super>d"]);
        // set super + f
        inputs.set_strv("move-to-workspace-right", []);
        inputs.set_strv("move-to-workspace-right", ["<Super>f"]);
        // set super + e
        inputs.set_strv("switch-windows", []);
        inputs.set_strv("switch-windows", ["<Super>e"]);
        // set super + z
        inputs.set_strv("toggle-fullscreen", []);
        inputs.set_strv("toggle-fullscreen", ["<Super>z"]);
        // set super + q
        inputs.set_strv("close", []);
        inputs.set_strv("close", ["<Super>q"]);
        //apply the changes
        inputs.apply();
    }
    //-reset Keybindings
    resetKeyboardKeybindings() {
        const inputs = new Gio.Settings({
            schema: "org.gnome.desktop.wm.keybindings",
        });
        // reset super + a
        inputs.set_strv("switch-to-workspace-left", []);
        inputs.set_strv("switch-to-workspace-left", [
            "<Super>Page_Up",
            "<Super><Alt>Left",
            "<Control><Alt>Left",
        ]);
        // reset super + s
        inputs.set_strv("switch-to-workspace-right", []);
        inputs.set_strv("switch-to-workspace-right", [
            "<Super>Page_Down",
            "<Super><Alt>Right",
            "<Control><Alt>Right",
        ]);
        // reset super + d
        inputs.set_strv("move-to-workspace-left", []);
        inputs.set_strv("move-to-workspace-left", [
            "<Super><Shift>Page_Up",
            "<Super><Shift><Alt>Left",
            "<Control><Shift><Alt>Left",
        ]);
        // reset super + f
        inputs.set_strv("move-to-workspace-right", []);
        inputs.set_strv("move-to-workspace-right", [
            "<Super><Shift>Page_Down",
            "<Super><Shift><Alt>Right",
            "<Control><Shift><Alt>Right",
        ]);
        // reset super + e
        inputs.set_strv("switch-windows", []);
        inputs.set_strv("switch-windows", ["<Alt>Tab"]);
        // reset super + z
        inputs.set_strv("toggle-fullscreen", []);
        // reset super + q
        inputs.set_strv("close", []);
        inputs.set_strv("close", ["<Alt>F4"]);
        //apply the changes
        inputs.apply();
    }
    /* //^	Disable  Keybindings
    _ toggle-quick-settings ["<Super>s"]
    _ toggle-overview (show all apps ) ["<Super>A"]
    */
    disableKeybindings() {
        const inputs = new Gio.Settings({ schema: "org.gnome.shell.keybindings" });
        inputs.set_strv("toggle-quick-settings", []);
        inputs.set_strv("toggle-application-view", []);
        inputs.apply();
    }
    //^ Reset Keybindings
    resetKeybindings() {
        const inputs = new Gio.Settings({ schema: "org.gnome.shell.keybindings" });
        inputs.set_strv("toggle-quick-settings", ["<Super>s"]);
        inputs.set_strv("toggle-application-view", ["<Super>a"]);
        inputs.apply();
    }
}
