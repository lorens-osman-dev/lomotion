import Gio from "gi://Gio";
import GLib from "gi://GLib";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

export default class lomotion extends Extension {
	private _idleId: number | null = null;

	enable() {
		// Defer execution until GNOME Shell is fully loaded
		this._idleId = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
			this.mapCapslock();
			this.disableKeybindings();
			this.setKeyboardKeybindings();
			this._idleId = null;
			return GLib.SOURCE_REMOVE;
		});
	}

	disable() {
		// Cancel the idle callback if the extension is disabled during startup
		if (this._idleId !== null) {
			GLib.Source.remove(this._idleId);
			this._idleId = null;
		}

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
		const cleanXkb = xkb.filter((item) => item.trim() !== "");

		if (!cleanXkb.includes("caps:super")) {
			cleanXkb.push("caps:super");
			inputs.set_strv("xkb-options", cleanXkb);
		}
	}

	//- removeCapslock function
	removeCapslock() {
		const inputs = new Gio.Settings({
			schema: "org.gnome.desktop.input-sources",
		});
		
		const xkb = inputs.get_strv("xkb-options");
		const updatedXkb = xkb.filter(
			(item) => item.trim() !== "caps:super" && item.trim() !== ""
		);

		inputs.set_strv("xkb-options", updatedXkb);
	}

	//-set Keybindings
	setKeyboardKeybindings() {
		const inputs = new Gio.Settings({
			schema: "org.gnome.desktop.wm.keybindings",
		});
		inputs.set_strv("switch-to-workspace-left", []);
		inputs.set_strv("switch-to-workspace-left", ["<Super>a"]);
		inputs.set_strv("switch-to-workspace-right", []);
		inputs.set_strv("switch-to-workspace-right", ["<Super>s"]);
		inputs.set_strv("move-to-workspace-left", []);
		inputs.set_strv("move-to-workspace-left", ["<Super>d"]);
		inputs.set_strv("move-to-workspace-right", []);
		inputs.set_strv("move-to-workspace-right", ["<Super>f"]);
		inputs.set_strv("switch-windows", []);
		inputs.set_strv("switch-windows", ["<Super>e"]);
		inputs.set_strv("toggle-fullscreen", []);
		inputs.set_strv("toggle-fullscreen", ["<Super>z"]);
		inputs.set_strv("close", []);
		inputs.set_strv("close", ["<Super>q"]);
	}

	//-reset Keybindings
	resetKeyboardKeybindings() {
		const inputs = new Gio.Settings({
			schema: "org.gnome.desktop.wm.keybindings",
		});
		inputs.set_strv("switch-to-workspace-left", []);
		inputs.set_strv("switch-to-workspace-left", [
			"<Super>Page_Up",
			"<Super><Alt>Left",
			"<Control><Alt>Left",
		]);
		inputs.set_strv("switch-to-workspace-right", []);
		inputs.set_strv("switch-to-workspace-right", [
			"<Super>Page_Down",
			"<Super><Alt>Right",
			"<Control><Alt>Right",
		]);
		inputs.set_strv("move-to-workspace-left", []);
		inputs.set_strv("move-to-workspace-left", [
			"<Super><Shift>Page_Up",
			"<Super><Shift><Alt>Left",
			"<Control><Shift><Alt>Left",
		]);
		inputs.set_strv("move-to-workspace-right", []);
		inputs.set_strv("move-to-workspace-right", [
			"<Super><Shift>Page_Down",
			"<Super><Shift><Alt>Right",
			"<Control><Shift><Alt>Right",
		]);
		inputs.set_strv("switch-windows", []);
		inputs.set_strv("switch-windows", ["<Alt>Tab"]);
		inputs.set_strv("toggle-fullscreen", []);
		inputs.set_strv("close", []);
		inputs.set_strv("close", ["<Alt>F4"]);
	}

	disableKeybindings() {
		const inputs = new Gio.Settings({ schema: "org.gnome.shell.keybindings" });
		inputs.set_strv("toggle-quick-settings", []);
		inputs.set_strv("toggle-application-view", []);
	}

	resetKeybindings() {
		const inputs = new Gio.Settings({ schema: "org.gnome.shell.keybindings" });
		inputs.set_strv("toggle-quick-settings", ["<Super>s"]);
		inputs.set_strv("toggle-application-view", ["<Super>a"]);
	}
}