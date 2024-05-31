<?php
namespace iFolders;

defined( 'ABSPATH' ) || exit;

class Plugin {
    public static function run() {
        add_action( 'plugins_loaded', [ 'iFolders\\Plugin', 'pluginsLoaded' ] );
    }

    public static function activate() {
        new System\Installer();
    }

    public static function deactivate() {
    }

    public static function pluginsLoaded() {
        load_plugin_textdomain( 'ifolders', false, dirname(IFOLDERS_PLUGIN_BASE_NAME) . '/languages/' );

        new Rest\Routes();
        new System\Notice();
        new System\Folders();
        new System\Feedback();
        new System\Settings();
    }
}