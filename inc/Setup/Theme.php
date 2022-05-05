<?php // phpcs:ignore
/**
 * Themes
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier/Setup/Theme
 */

namespace MatthieuTeyssandier\Setup;

use Timber\{ Timber, Site };
use Twig\Extra\Html\{ HtmlExtension };
use Twig\{ TwigFunction };

$timber = new Timber();

Timber::$dirname = array( 'views', 'templates', 'dist' );

/**
 * Theme
 */
class Theme extends Site {

	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function run() : void {
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_filter( 'timber/context', array( $this, 'add_socials_to_context' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/context', array( $this, 'add_to_theme' ) );
		add_filter( 'timber/post/classmap', array( $this, 'add_post_classmap' ) );
	}


	/**
	 * Add to theme
	 *
	 * @param array $context Timber context.
	 */
	public function add_to_theme( array $context ) : array {
		$manifest = get_theme_manifest();

		$context['theme']->manifest = array();

		foreach ( $manifest as $label => $path ) {
			$context['theme']->manifest[ $label ] = get_template_directory_uri() . '/' . $path;
		}

		return $context;
	}


	/**
	 * Add to Twig
	 *
	 * @param object $twig Twig environment.
	 * @return object $twig
	 * @access public
	 */
	public function add_to_twig( object $twig ) : object {
		$twig->addFunction(
			new TwigFunction(
				'html_class',
				function ( $args = '' ) {
					return html_class( $args );
				}
			)
		);

		$twig->addFunction(
			new TwigFunction(
				'body_class',
				function ( $args = '' ) {
					return body_class( $args );
				}
			)
		);

		$twig->addFunction(
			new TwigFunction(
				'set_product_global',
				function( $post ) {
					return set_product_global( $post );
				}
			)
		);

		if ( function_exists( 'sanitize_title' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'sanitize_title',
					function ( string $title, string $fallback_title = '', string $context = 'save' ) : string {
						return sanitize_title( $title, $fallback_title, $context );
					}
				)
			);
		}

		if ( function_exists( 'get_extended' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'get_extended',
					function( $content ) {
						return get_extended( $content );
					}
				)
			);
		}

		if ( function_exists( 'wp_get_document_title' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'wp_get_document_title',
					function() {
						return wp_get_document_title();
					}
				)
			);
		}

		$twig->addFunction(
			new TwigFunction(
				'get_post_meta',
				function( int $post_id, string $key = '', bool $single = false ) {
					return get_post_meta( $post_id, $key, $single );
				}
			)
		);

		$twig->addFunction( new TwigFunction( 'uniqid', 'uniqid' ) );

		$twig->addFunction(
			new TwigFunction(
				'icon',
				function( $icon, $args = array() ) {
					return get_theme_icon( $icon, $args );
				}
			)
		);

		$twig->addExtension(new HtmlExtension());

		return $twig;
	}


	/**
	 * Add socials to context
	 *
	 * @param array $context Timber context.
	 * @return array
	 */
	public function add_socials_to_context( array $context ) : array {
		// Share and Socials links.
		$socials = array(
			array(
				'title' => 'Instagram',
				'slug'  => 'instagram',
				'url'   => get_option( 'instagram' ),
			),
			array(
				'title' => 'Twitter',
				'slug'  => 'twitter',
				'name'  => __( 'Share on Twitter', 'mccormackfarms' ),
				'link'  => 'https://twitter.com/intent/tweet?url=',
				'url'   => get_option( 'twitter' ),
				'color' => '#1da1f2',
			),
			array(
				'title' => 'Facebook',
				'slug'  => 'facebook',
				'name'  => __( 'Share on Facebook', 'mccormackfarms' ),
				'link'  => 'https://www.facebook.com/sharer.php?u=',
				'url'   => get_option( 'facebook' ),
				'color' => '#3b5998',
			),
			array(
				'title' => 'YouTube',
				'slug'  => 'youtube',
				'url'   => get_option( 'youtube' ),
				'color' => '#ff0000',
			),
			array(
				'title' => 'Pinterest',
				'slug'  => 'pinterest',
				'name'  => __( 'Share on Pinterest', 'mccormackfarms' ),
				'link'  => 'https://pinterest.com/pin/create/link/?url=',
				'color' => '#e60023',
			),
			array(
				'title' => 'LinkedIn',
				'slug'  => 'linkedin',
				'name'  => __( 'Share on LinkedIn', 'mccormackfarms' ),
				'link'  => 'https://www.linkedin.com/sharing/share-offsite/?url=',
				'url'   => get_option( 'linkedin' ),
				'color' => '#0077b5',
			),
		);

		foreach ( $socials as $social ) {
			if ( ! empty( $social['url'] ) ) {
				$context['socials'][ $social['slug'] ] = $social;
			}

			if ( ! empty( $social['link'] ) ) {
				$context['shares'][ $social['slug'] ] = $social;
			}
		}

		return $context;
	}


	/**
	 * Add to context
	 *
	 * @param array $context Timber context.
	 *
	 * @return array
	 * @since  1.0.0
	 */
	public function add_to_context( array $context ) : array {
		global $wp;

		$case_studies_on_front = get_field( 'case_studies', get_option( 'page_on_front' ) );

		$context['current_url'] = home_url( add_query_arg( array(), $wp->request ) );

		$context['case_studies'] = Timber::get_posts(
			array(
				'post_type'      => 'case_study',
				'posts_per_page' => -1,
			)
		);

		$context['case_studies_header'] = Timber::get_posts(
			array(
				'post_type'      => 'case_study',
				'posts_per_page' => -1,
				'post__not_in'   => $case_studies_on_front,
			)
		);

		$context['public_email']  = get_option( 'public_email' );
		$context['options_theme'] = get_field( 'options_theme', 'options' );

		return $context;
	}

	/**
	 * Add post classmap
	 *
	 * @return array
	 */
	public function add_post_classmap( $classmap ) : array {
		$custom_classmap = array();

		return array_merge( $classmap, $custom_classmap );
	}
}
