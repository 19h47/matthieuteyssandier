<?php // phpcs:ignore
/**
 * Bootstraps WordPress theme related functions, most importantly enqueuing javascript and styles.
 *
 * @package ledermannfilms
 * @subpackage LF/Setup/Theme
 */

namespace LF\Setup;

use LF\Core\{ SendMessage };

/**
 * Theme
 */
class Theme {

	/**
	 * The manifest of this theme
	 *
	 * @access private
	 * @var    array
	 */
	private $theme_manifest;


	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function run() : void {}
}
