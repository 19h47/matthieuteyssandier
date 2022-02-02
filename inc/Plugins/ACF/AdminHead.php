<?php // phpcs:ignore
/**
 * Admin Head
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier/Plugins/ACF
 */

namespace MatthieuTeyssandier\Plugins\ACF;

/**
 * Admin Head
 */
class AdminHead {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action('acf/input/admin_head', array( $this, 'admin_head') );
	}

		/**
		 * Admin head
		 */
	public function admin_head() {

    ?>
    <style type="text/css">

		.acf-field-image .image-wrap {
			width: 100%;
			margin: 0 auto;
			float: none;
		}

    </style>
    <?php

	}
}
