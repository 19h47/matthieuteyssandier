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
		add_image_size( 'size-1', 590 );
		add_image_size( 'size-2', 1222 );
		add_image_size( 'size-3', 1852 );
		add_image_size( 'size-4', 2482 );
		add_image_size( 'size-5', 3114 );
		add_image_size( 'size-6', 3744 );
	}
}
