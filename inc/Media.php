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
		add_image_size( 'size-1', 295 );
		add_image_size( 'size-2', 611 );
		add_image_size( 'size-3', 926 );
		add_image_size( 'size-4', 1241 );
		add_image_size( 'size-5', 1557 );
		add_image_size( 'size-6', 1872 );
	}
}
