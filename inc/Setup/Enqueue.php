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
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'dequeue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_head', array( $this, 'preload' ), 0 );
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
		$deps = array();

		wp_deregister_script( 'wp-embed' );

		wp_enqueue_script( // phpcs:ignore
			get_theme_text_domain() . '-vendors',
			get_template_directory_uri() . '/' . get_theme_manifest()['vendors.js'],
			array(),
			null,
			true
		);
		array_push( $deps, get_theme_text_domain() . '-vendors' );

		wp_register_script( // phpcs:ignore
			get_theme_text_domain() . '-main',
			get_template_directory_uri() . '/' . get_theme_manifest()['main.js'],
			$deps,
			null,
			true
		);

		$case_studies = get_posts(
			array(
				'post_type'      => 'case_study',
				'posts_per_page' => -1,
			)
		);

		$data = array(
			'template_directory_uri' => get_template_directory_uri(),
			'base_url'               => site_url(),
			'home_url'               => home_url( '/' ),
			'ajax_url'               => admin_url( 'admin-ajax.php' ),
			'api_url'                => home_url( 'wp-json' ),
			'current_url'            => get_permalink(),
			'nonce'                  => wp_create_nonce( 'security' ),
			'text_domain'            => get_theme_text_domain(),
			'colors'                 => array_map(
				fn( $case_study ) => get_field( 'color', $case_study->ID ),
				$case_studies,
			),
		);

		wp_add_inline_script(
			get_theme_text_domain() . '-main',
			'var matthieuteyssandier = ' . json_encode(
				$data
			),
			'before',
		);

		wp_register_script( get_theme_text_domain() . '-feature', false ); // phpcs:ignore
		wp_add_inline_script( get_theme_text_domain() . '-feature', '!function(e,n,o){("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch||o.MaxTouchPoints>0||o.msMaxTouchPoints>0)&&(n.documentElement.className=n.documentElement.className.replace(/\bno-touch\b/,"touch")),n.documentElement.className=n.documentElement.className.replace(/\bno-js\b/,"js")}(window,document,navigator);' );

		wp_enqueue_script( get_theme_text_domain() . '-feature' );
		wp_enqueue_script( get_theme_text_domain() . '-main' );
	}


	/**
	 * Enqueue styles.
	 *
	 * @access public
	 * @return void
	 * @since  1.0.0
	 */
	public function enqueue_styles() : void {
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
		wp_dequeue_style( 'wc-block-style' );
		wp_dequeue_style( 'global-styles' );

		// Add custom fonts, used in the main stylesheet.
		$webfonts = array();
		foreach ( get_webfonts() as $name => $url ) {
			wp_register_style( 'font-' . $name, $url, array(), '1.0.0' );
			$webfonts[] = "font-$name";
		}

		// Theme stylesheet.
		wp_register_style( // phpcs:ignore
			get_theme_text_domain() . '-main',
			get_template_directory_uri() . '/' . get_theme_manifest()['main.css'],
			$webfonts,
			null
		);

		wp_enqueue_style( get_theme_text_domain() . '-main' );
	}



	public function dequeue_styles() {
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
		wp_dequeue_style( 'wc-block-style' );
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


	/**
	 * Preload
	 */
	function preload() {
		global $wp_scripts, $wp_styles;

		// Scripts
		foreach ( $wp_scripts->queue as $handle ) {
			$script = $wp_scripts->registered[ $handle ];

			if ( substr( $script->handle, 0, strlen( get_theme_text_domain() ) ) !== get_theme_text_domain() ) {
				continue;
			}

			if ( isset( $script->extra['group'] ) && 1 === $script->extra['group'] ) {
				$href = $script->src . ( $script->ver ? "?ver={$script->ver}" : '' );
				echo '<link rel="preload" as="script" href="' . $href . '">';
			}
		}

		// Styles
		foreach ( $wp_styles->queue as $handle ) {
			$style = $wp_styles->registered[ $handle ];

			if ( substr( $style->handle, 0, strlen( get_theme_text_domain() ) ) !== get_theme_text_domain() ) {
				continue;
			}

			$href = $style->src . ( $style->ver ? "?ver={$style->ver}" : '' );
			echo '<link rel="preload" as="style" href="' . $href . '">';

		}

		// Fonts
		foreach ( get_theme_manifest() as $key => $value ) {
			if ( substr( $key, 0, 6 ) === 'fonts/' ) {
				$extension = pathinfo( $key, PATHINFO_EXTENSION );
				$href      = get_template_directory_uri() . '/' . $value;

				echo '<link rel="preload" as="font" href="' . $href . '" type="font/' . $extension . '" crossorigin>';
			}
		}
	}
}
