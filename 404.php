<?php
/**
 * 404
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @link https://codex.wordpress.org/Template_Hierarchy
 * @since 0.0.0
 * @version 0.0.0
 */

use Timber\{ Timber };

$filenames = array( 'pages/404.html.twig' );

$data         = Timber::context();
$data['post'] = Timber::get_post();

Timber::render( $filenames, $data, 600, 'CACHE_OBJECT' );
