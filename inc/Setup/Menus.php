<?php // phpcs:ignore
/**
 * Menus
 *
 * @package ledermannfilms
 */

namespace LF\Setup;

/**
 * Menus
 */
class Menus {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'after_setup_theme', array( $this, 'register_menus' ) );

	}

	/**
	 * Register nav menus
	 *
	 * @return void
	 */
	public function register_menus() : void {
		register_nav_menus(
			array(
				'main'   => __( 'Main', 'ledermannfilms' ),
				'footer' => __( 'Footer', 'ledermannfilms' ),
			)
		);
	}
}
