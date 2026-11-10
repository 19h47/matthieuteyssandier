<?php
/**
 * Admin notices
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Admin
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Admin;

use MatthieuTeyssandier\Service;

/**
 * Notices
 *
 * Warns when Twig cache is on (WP_DEBUG false) and when ACF is missing.
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Admin
 */
class Notices implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'admin_notices', array( $this, 'twig_cache_notice' ) );
		add_action( 'admin_notices', array( $this, 'acf_missing_notice' ) );
	}

	/**
	 * Notice when Advanced Custom Fields is not active.
	 *
	 * @return void
	 */
	public function acf_missing_notice(): void {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		if ( function_exists( 'acf_add_options_page' ) ) {
			return;
		}

		printf(
			'<div class="notice notice-error"><p>%s</p></div>',
			esc_html__( 'This theme requires the Advanced Custom Fields plugin. Install and activate it to edit theme options and case studies.', 'matthieuteyssandier' )
		);
	}

	/**
	 * Notice when a fresh WordPress / Local install left WP_DEBUG off.
	 *
	 * Timber then caches Twig; template edits stay invisible until WP_DEBUG is
	 * true or `vendor/timber/timber/cache` is cleared.
	 *
	 * @return void
	 */
	public function twig_cache_notice(): void {
		if ( ! $this->should_warn_twig_cache() ) {
			return;
		}

		$message = sprintf(
			/* translators: 1: WP_DEBUG constant. 2: define() snippet for wp-config.php. 3: Twig cache path. */
			__( 'Twig templates are cached because %1$s is false (WordPress default on a fresh install). Set %2$s in wp-config.php while developing, or delete %3$s after editing a Twig file.', 'matthieuteyssandier' ),
			'<code>WP_DEBUG</code>',
			'<code>define( \'WP_DEBUG\', true );</code>',
			'<code>vendor/timber/timber/cache</code>'
		);

		printf(
			'<div class="notice notice-warning"><p>%s</p></div>',
			wp_kses(
				$message,
				array(
					'code' => array(),
				)
			)
		);
	}

	/**
	 * Whether to warn about Twig cache.
	 *
	 * Shown only in local/development so production is not nagged.
	 *
	 * @return bool
	 */
	private function should_warn_twig_cache(): bool {
		if ( ! current_user_can( 'manage_options' ) ) {
			return false;
		}

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			return false;
		}

		return in_array( wp_get_environment_type(), array( 'local', 'development' ), true );
	}
}
