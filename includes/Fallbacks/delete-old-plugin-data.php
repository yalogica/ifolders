<?php

defined( 'ABSPATH' ) || exit;

$options = [
    'ifolders_dismiss_first_use_notification',
    'ifolders_plugins_store',
    'ifolders_settings',
    'ifolders_state'
];

foreach( $options as $option ) {
    delete_option( $option );
}

delete_metadata( 'user', 0, 'ifolders_states', '', true );

global $wpdb;
$tables = [
    $wpdb->prefix . 'ifolders_folders',
    $wpdb->prefix . 'ifolders_attachments',
    $wpdb->prefix . 'ifolders_folder_types',
    $wpdb->prefix . 'ifolders_access',
    $wpdb->prefix . 'ifolders_groups',
    $wpdb->prefix . 'ifolders_rights'
];

foreach($tables as $table) {
    // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.DirectDatabaseQuery.SchemaChange
    $wpdb->query( "DROP TABLE IF EXISTS {$table}" );
}