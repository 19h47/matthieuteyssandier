<?php
/**
 * Template Name: About Page
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @link https://codex.wordpress.org/Template_Hierarchy
 * @since 0.0.0
 * @version 0.0.0
 */

use Timber\{ Timber };

$filename = 'pages/about-page.html.twig';

$data             = Timber::context();
$data['mode']     = 'dark';
$data['template'] = 'about-page';

Timber::render( $filename, $data, 600, 'CACHE_OBJECT' );
