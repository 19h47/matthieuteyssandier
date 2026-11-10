<?php
/**
 * Service contract for theme bootstrap.
 *
 * @package MatthieuTeyssandier
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier;

/**
 * Service
 *
 * Theme classes registered in Init must implement this interface.
 */
interface Service {

	/**
	 * Register hooks and run initialization. Called once by Init::run_services().
	 *
	 * @return void
	 */
	public function run(): void;
}
