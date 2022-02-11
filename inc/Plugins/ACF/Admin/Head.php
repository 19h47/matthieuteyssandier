<?php // phpcs:ignore
/**
 * Head
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier/Plugins/ACF/Admin
 */

namespace MatthieuTeyssandier\Plugins\ACF\Admin;

/**
 * Head
 *
 *
 */
class Head {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'acf/input/admin_head', array( $this, 'admin_head' ) );
	}

	/**
	 * Admin head
	 */
	public function admin_head() {}
}
