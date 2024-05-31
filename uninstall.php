<?php
if( !defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

define( 'IFOLDERS_PLUGIN_VERSION', '2.0' );
define( 'IFOLDERS_PLUGIN_DB_TABLE_PREFIX', 'ifolders' );

$version = get_option( 'ifolders_version' );
$config = get_option( 'ifolders_config' ) ;

if ( $config ) {
    if ( array_key_exists( 'uninstall_fully', $config ) && $config['uninstall_fully'] && version_compare( $version, IFOLDERS_PLUGIN_VERSION, '>=' ) ) {
        $options = [
            'ifolders_dismiss_first_use_notification',
            'ifolders_db_version',
            'ifolders_version',
            'ifolders_config'
        ];

        foreach($options as $option) {
            delete_option( $option );
        }

        delete_metadata( 'user', 0, 'ifolders_settings', '', true );

        global $wpdb;
        $tables = [
            $wpdb->prefix . IFOLDERS_PLUGIN_DB_TABLE_PREFIX . '_folder_types',
            $wpdb->prefix . IFOLDERS_PLUGIN_DB_TABLE_PREFIX . '_security_profiles',
            $wpdb->prefix . IFOLDERS_PLUGIN_DB_TABLE_PREFIX . '_folders',
            $wpdb->prefix . IFOLDERS_PLUGIN_DB_TABLE_PREFIX . '_attachments'
        ];

        foreach($tables as $table) {
            // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.DirectDatabaseQuery.SchemaChange
            $wpdb->query( "DROP TABLE IF EXISTS {$table}" );
        }
    }
}