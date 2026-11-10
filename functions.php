<?php
/**
 * Matthieu Teyssandier functions and definitions
 *
 * @package MatthieuTeyssandier
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

// Autoloader.
require_once get_template_directory() . '/vendor/autoload.php';

use Timber\{ Timber };

Timber::init();
// Set Timber template locations.
Timber::$locations = array( 'views', 'public' );

// Run the setup.
MatthieuTeyssandier\Init::run_services();
