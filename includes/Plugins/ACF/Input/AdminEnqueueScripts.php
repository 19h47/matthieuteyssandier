<?php
/**
 * ACF Input admin enqueue scripts
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Plugins/ACF/Input
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Plugins\ACF\Input;

use MatthieuTeyssandier\Service;

/**
 * AdminEnqueueScripts
 *
 * @see https://www.advancedcustomfields.com/resources/acf-input-admin_enqueue_scripts/
 */
class AdminEnqueueScripts implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'acf/input/admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
	}

	/**
	 * Enqueues ACF admin styles: image previews rounded like on the front.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts(): void {
		wp_enqueue_style(
			get_theme_text_domain() . '-acf',
			get_template_directory_uri() . '/includes/Plugins/ACF/Input/style.css',
			array(),
			get_theme_version()
		);
	}
}
