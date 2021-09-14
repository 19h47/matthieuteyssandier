<?php // phpcs:ignore
/**
 * Bootstraps WordPress theme related functions, most importantly enqueuing javascript and styles.
 *
 * @package WordPress
 * @subpackage MT
 */

namespace MT;

use MT\{ Setup, Core, Plugins, Api };

/**
 * Init
 */
class Init {

	/**
	 * Store all the classes inside an array
	 *
	 * @return array Full list of classes
	 */
	public static function get_services() : array {
		return array(
			// Setup\Theme::class,
			// Setup\Enqueue::class,
			// Setup\WordPress::class,
			// Setup\Menus::class,
			Setup\Supports::class,
			// Setup\Textdomain::class,
			Setup\Settings::class,
			// Setup\PostStates::class,
			Core\CaseStudy::class,
			Core\CaseStudyCat::class,
			// Api\Customizer\Mailchimp::class,
			// Api\Customizer\Contact::class,
			// Plugins\ACF::class,
			Plugins\WPGraphQL::class,
		);
	}


	/**
	 * Loop through the classes, initialize them, and call the run() method if it exists
	 *
	 * @return void
	 */
	public static function run_services() : void {
		foreach ( self::get_services() as $class ) {
			$service = self::instantiate( $class );
			if ( method_exists( $service, 'run' ) ) {
				$service->run();
			}
		}
	}


	/**
	 * Initialize the class
	 *
	 * @param  string $class class name from the services array.
	 * @return object
	 */
	private static function instantiate( string $class ) : object {
		return new $class();
	}
}
