<?php // phpcs:ignore
/**
 * Options Page
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier/Plugins/ACF
 */

namespace MatthieuTeyssandier\Plugins\ACF;

/**
 * Options Page
 */
class OptionsPage {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'acf/init', array( $this, 'add_options_theme' ) );
	}

		/**
		 * Add options pages
		 */
	public function add_options_theme() {
		$parent = acf_add_options_page(
			array(
				'page_title' => __( 'Theme Settings', 'matthieuteyssandier' ),
				'capability' => 'edit_posts',
				'icon_url'   => 'dashicons-admin-settings',
			)
		);
	}
}
