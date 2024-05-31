<?php
namespace iFolders\Models;

defined( 'ABSPATH' ) || exit;

class ConfigModel {
    const OPTION_KEY = 'ifolders_config';
    const DEFAULT_CONFIG = [
        'roles' => [ 'administrator' ],
        'token' => NULL,
        'default_color' => NULL,
        'disable_counter' => false,
        'disable_ajax' => false,
        'infinite_scrolling' => false,
        'disable_search_bar' => false,
        'replace_media' => false,
        'uninstall_fully' => false,
        'media_hover_details' => true,
        'media_hover_details_list' => [ 'title', 'size', 'dimension' ] // 'alternative_text', 'file_url', 'filename', 'type', 'date', 'uploaded_by'
    ];

    public static function init() {
        self::set();
    }

    public static function get( $option = null ) {
        $data = get_option( self::OPTION_KEY );

        if( $data == false ) {
            $data = self::DEFAULT_CONFIG;
        } else {
            foreach ( self::DEFAULT_CONFIG as $key => $default ) {
                if ( !array_key_exists( $key, $data ) ) {
                    $data[$key] = $default;
                }
            }
        }

        if ( $data && $option != null ) {
            return $data[ $option ];
        }

        return $data ? $data : null;
    }

    public static function set( $data = null ) {
        $data = $data ? $data : self::get();
        $data = $data ? $data : [];

        foreach ( self::DEFAULT_CONFIG as $key => $option ) {
            if ( !array_key_exists( $key, $data ) ) {
                $data[$key] = $option;
            }
        }

        foreach ( $data as $key => $option ) {
            if ( !array_key_exists( $key, self::DEFAULT_CONFIG ) ) {
                unset( $data[$key] );
            }
        }

        if ( get_option( self::OPTION_KEY ) == false ) {
            $autoload = 'no';
            return add_option( self::OPTION_KEY, $data, '', $autoload );
        } else {
            $old_value = get_option( self::OPTION_KEY );
            if ( $old_value === $data ) {
                return true;
            } else {
                return update_option( self::OPTION_KEY, $data );
            }
        }
    }

    public static function getToken() {
        global $wp_version;
        $current_user = wp_get_current_user();

        $data = [
            'plugin_name' => IFOLDERS_PLUGIN_NAME,
            'plugin_version' => IFOLDERS_PLUGIN_VERSION,
            'wordpress' => $wp_version,
            'php' => PHP_VERSION,
            'email' => $current_user->user_email,
            'site' => trim( str_replace( [ 'http://', 'https://' ], '', get_site_url() ), '/' )
        ];

        return base64_encode( wp_json_encode( $data ) );
    }

    public static function getTicket() {
        $config = self::get();
        if ( $config && array_key_exists( 'token', $config) ) {
            return $config['token'];
        }
        return null;
    }

    public static function getUpgradeUrl() {
        return 'https://1.envato.market/getifolders';
    }
}
