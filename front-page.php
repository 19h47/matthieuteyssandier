<?php
/**
 * Front Page
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @link https://codex.wordpress.org/Template_Hierarchy
 * @since 0.0.0
 * @version 0.0.0
 */

use Timber\{ Timber };

$filenames = array( 'pages/front-page.html.twig' );

$data         = Timber::context();
$data['post'] = Timber::get_post();
$data['template'] = 'front-page';

Timber::render( $filenames, $data );
