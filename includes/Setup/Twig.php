<?php
/**
 * Twig
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Setup
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Setup;

use Twig\Extra\Html\{ HtmlExtension };
use Twig\{ TwigFunction };
use MatthieuTeyssandier\{ Service, Vite };

/**
 * Twig
 */
class Twig implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_filter( 'timber/twig', array( $this, 'add_functions' ) );
		add_filter( 'timber/twig', array( $this, 'add_extensions' ) );
		add_filter( 'timber/twig/environment/options', array( $this, 'set_environment_options' ), 10, 1 );
	}

	/**
	 * Set options
	 *
	 * @param array $options Array of options.
	 *
	 * @return array $options
	 */
	public function set_environment_options( array $options ): array {
		$options['cache']       = WP_DEBUG ? false : true;
		$options['auto_reload'] = WP_DEBUG;

		return $options;
	}

	/**
	 * Add extensions
	 *
	 * @param object $twig Twig environment.
	 *
	 * @return object $twig
	 */
	public function add_extensions( object $twig ): object {
		$twig->addExtension( new HtmlExtension() );

		return $twig;
	}

	/**
	 * Add functions
	 *
	 * @param object $twig Twig environment.
	 *
	 * @return object $twig
	 */
	public function add_functions( object $twig ): object {
		$twig->addFunction(
			new TwigFunction(
				'asset',
				function ( $asset ) {
					return Vite::asset( $asset );
				}
			)
		);

		return $twig;
	}
}
