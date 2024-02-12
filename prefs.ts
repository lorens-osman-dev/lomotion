import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GnomeRectanglePreferences extends ExtensionPreferences {
    _settings?: Gio.Settings

    fillPreferencesWindow(window: Adw.PreferencesWindow) {
        this._settings = this.getSettings();
        const extensionFolderPath = this.path;

        const page = new Adw.PreferencesPage({
            title: _('General'),
        });

        const elementsGroup = new Adw.PreferencesGroup({
            margin_top: 0,
            margin_end: 0,

        });

        // Create an image
        const icon = new Gtk.Image({
            file: `${extensionFolderPath}/gm.svg`,
            margin_top: -1,
            margin_end: 0,
            height_request: 600,
            width_request: 600
        });

        //con
        const con = new Adw.Bin()
        con.child = icon


        elementsGroup.add(con);

        page.add(elementsGroup);
        window.add(page)


    }
}