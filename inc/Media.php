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
		add_image_size( 'size-2', 590 );
		add_image_size( 'size-4', 1222 );
		add_image_size( 'size-6', 1852 );
		add_image_size( 'size-8', 2482 );
		add_image_size( 'size-12', 3744 );
	}
}
