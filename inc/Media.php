<?php // phpcs:ignore
/**
 * Media
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier;

/**
 * Media
 */
class Media {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_image_size( 'size-4', 600 );
		add_image_size( 'size-6', 915 );
		add_image_size( 'size-8', 1230 );
		add_image_size( 'size-9', 1420 );
		add_image_size( 'size-10', 1545 );
		add_image_size( 'size-12', 1860 );
	}
}
