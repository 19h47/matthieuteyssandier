<?php // phpcs:ignore
/**
 * Enqueue
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier\Setup;

/**
 * Enqueue
 */
class Enqueue {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_style' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_filter( 'style_loader_tag', array( $this, 'style_loader_tag' ), 10, 4 );
	}

	/**
	 * Enqueue scripts
	 *
	 * @access public
	 * @return void
	 * @since  1.0.0
	 */
	public function enqueue_scripts() : void {
		wp_deregister_script( 'wp-embed' );

		wp_enqueue_script(
			'imagesloaded',
			'//unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js',
			array(),
			null,
			true
		);

		wp_register_script( // phpcs:ignore
			get_theme_text_domain() . '-main',
			get_template_directory_uri() . '/' . get_theme_manifest()['main.js'],
			array( 'feature', 'imagesloaded' ),
			null,
			true
		);

		$args = array(
			'template_directory_uri' => get_template_directory_uri(),
			'base_url'               => site_url(),
			'home_url'               => home_url( '/' ),
			'ajax_url'               => admin_url( 'admin-ajax.php' ),
			'api_url'                => home_url( 'wp-json' ),
			'current_url'            => get_permalink(),
			'nonce'                  => wp_create_nonce( 'security' ),
		);

		wp_localize_script(
			get_theme_text_domain() . '-main',
			get_theme_text_domain(),
			$args,
		);

		wp_enqueue_script( // phpcs:ignore
			'feature',
			'//cdnjs.cloudflare.com/ajax/libs/feature.js/1.1.0/feature.min.js',
			array(),
			null,
			false
		);

		wp_add_inline_script(
			'feature',
			'document.documentElement.className=document.documentElement.className.replace("no-js","js"),feature.touch&&!navigator.userAgent.match(/Trident\/(6|7)\./)&&(document.documentElement.className=document.documentElement.className.replace("no-touch","touch"));'
		);

		wp_enqueue_script( get_theme_text_domain() . '-main' );
	}


	/**
	 * Enqueue styles.
	 *
	 * @access public
	 * @return void
	 * @since  1.0.0
	 */
	public function enqueue_style() : void {

		// Add custom fonts, used in the main stylesheet.
		$webfonts = array();
		foreach ( get_webfonts() as $name => $url ) {
			wp_register_style( 'font-' . $name, $url, array(), '1.0.0' );
			$webfonts[] = "font-$name";
		}

		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'dashicons' );
		wp_dequeue_style( 'searchwp-live-search' );

		// Theme stylesheet.
		wp_register_style( // phpcs:ignore
			get_theme_text_domain() . '-main',
			get_template_directory_uri() . '/' . get_theme_manifest()['main.css'],
			$webfonts,
			null
		);

		wp_enqueue_style( get_theme_text_domain() . '-main' );
	}


	/**
	 * Style Loader Tag
	 *
	 * @param string $html The link tag for the enqueued style.
	 * @param string $handle The style's registered handle.
	 * @param string $href The stylesheet's source URL.
	 * @param string $media The stylesheet's media attribute.
	 *
	 * @return string
	 */
	public function style_loader_tag( string $html, string $handle, string $href, string $media ) : string {
		if ( get_theme_text_domain() . '-main' === $handle ) {
			$html = str_replace( '/>', ' onload="this.media=\'all\'; this.onload=null; this.isLoaded=true" />', $html );
		}

		return $html;
	}
}
