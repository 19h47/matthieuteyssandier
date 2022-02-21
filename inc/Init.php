<?php // phpcs:ignore
/**
 * Bootstraps WordPress theme related functions, most importantly enqueuing javascript and styles.
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier;

/**
 * Init
 */
class Init {

	/**
	 * Store all the classes inside an array
	 *
	 * @return array Full list of classes
	 */
	public static function get_services() : array {
		return array(
			Setup\Enqueue::class,
			Setup\Settings::class,
			Setup\Theme::class,
			Setup\NavMenu::class,
			Setup\Supports::class,
			Setup\WordPress::class,
			Setup\WordPress::class,
			Template\PostStates::class,
			Post\CaseStudy::class,
			Taxonomy\CaseStudyCat::class,
			PostTemplate\BodyClass::class,
			WPImageEditor::class,
			Media::class,
			Plugins\ACF\Admin\Head::class,
			Plugins\ACF\Admin\EnqueueScripts::class,
			Plugins\ACF\OptionsPage::class,
			Plugins\ACF\ThemeSettingsFields::class,
			Plugins\ACF\CaseStudyFields::class,
			Plugins\ACF\FrontPageFields::class,
			Plugins\ACF\MobileThumbnailFields::class,
		);
	}


	/**
	 * Loop through the classes, initialize them, and call the run() method if it exists
	 *
	 * @return void
	 */
	public static function run_services() : void {
		foreach ( self::get_services() as $class ) {
			$service = self::instantiate( $class );
			if ( method_exists( $service, 'run' ) ) {
				$service->run();
			}
		}
	}


	/**
	 * Initialize the class
	 *
	 * @param  string $class class name from the services array.
	 * @return object
	 */
	private static function instantiate( string $class ) : object {
		return new $class();
	}
}
