<?php
/**
 * Vite
 *
 * @package MatthieuTeyssandier
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier;

use Exception;

/**
 * Vite
 *
 * @package MatthieuTeyssandier
 */
class Vite implements Service {

	/**
	 * Flag to determine whether hot server is active.
	 *
	 * Set when boot() is called.
	 *
	 * @var bool
	 */
	private static bool $is_hot = false;

	/**
	 * The URI to the hot server.
	 *
	 * Set when boot() is called.
	 *
	 * @var string
	 */
	private static string $server;

	/**
	 * The path where compiled assets will go.
	 *
	 * @var string
	 */
	private static string $build_path = 'dist';

	/**
	 * Manifest file contents.
	 *
	 * Set when boot() is called.
	 *
	 * @var array
	 */
	private static array $manifest = array();


	/**
	 * Bootstrap Vite (satisfies Service contract). Delegates to static boot().
	 *
	 * @return void
	 */
	public function run(): void {
		self::boot();
	}


	/**
	 * Boot Vite (static entry point). Initializes hot server state or loads the manifest.
	 *
	 * @param string|null $build_path Optional build path override.
	 * @return string|null Vite client URL when running hot, null otherwise.
	 * @throws Exception When the manifest is missing in production.
	 */
	public static function boot( ?string $build_path = null ): ?string {
		if ( is_admin() || wp_doing_ajax() || wp_is_json_request() ) {
			return null;
		}

		static::$is_hot = file_exists( static::hot_file_path() );

		if ( $build_path ) {
			static::$build_path = $build_path;
		}

		if ( static::$is_hot ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Safe usage.
			static::$server = file_get_contents( static::hot_file_path() );

			return static::$server . '/@vite/client';
		}

		$manifest_path = static::build_path() . '/.vite/manifest.json';

		if ( ! file_exists( $manifest_path ) ) {
			throw new Exception( esc_html( __( 'No Vite Manifest exists. Should hot server be running?', 'matthieuteyssandier' ) ) );
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Safe usage.
		static::$manifest = json_decode( file_get_contents( $manifest_path ), true );

		return null;
	}

	/**
	 * Enqueue the script module
	 *
	 * @param string|null $build_path Build path.
	 *
	 * @return void
	 * @throws Exception Exception.
	 */
	public static function enqueue_script_module( ?string $build_path = null ): void {
		$client = self::boot( $build_path );

		if ( ! $client ) {
			return;
		}

		wp_enqueue_script_module( 'vite-client', $client, array(), null );
	}

	/**
	 * Return URI path to an asset.
	 *
	 * @param string $asset Asset path.
	 *
	 * @return string
	 * @throws Exception Exception.
	 */
	public static function asset( $asset ): string {
		if ( static::$is_hot ) {
			return static::$server . '/' . ltrim( $asset, '/' );
		}

		if ( ! array_key_exists( $asset, static::$manifest ) ) {
			/* translators: %s: asset path */
			throw new Exception( esc_html( sprintf( __( 'Unknown Vite build asset: %s', 'matthieuteyssandier' ), $asset ) ) );
		}

		return implode( '/', array( get_stylesheet_directory_uri(), static::$build_path, static::$manifest[ $asset ]['file'] ) );
	}

	/**
	 * Internal method to determine hot_file_path.
	 *
	 * @return string
	 */
	private static function hot_file_path(): string {
		return implode( '/', array( static::build_path(), 'hot' ) );
	}

	/**
	 * Internal method to determine build_path.
	 *
	 * @return string
	 */
	private static function build_path(): string {
		return implode( '/', array( get_stylesheet_directory(), static::$build_path ) );
	}
}
