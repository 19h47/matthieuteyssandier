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
		add_image_size( 'size-6', 1852 );
		add_image_size( 'size-12', 3744 );
	}
}
