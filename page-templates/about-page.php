<?php
/**
 * Template Name: About Page
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package MatthieuTeyssandier
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

use Timber\Timber;

$templates = array( 'pages/about-page.html.twig' );
$data      = Timber::context();

Timber::render( $templates, $data );
