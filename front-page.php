<?php
/**
 * Front page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package MatthieuTeyssandier
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

use Timber\Timber;

$templates = array( 'pages/front-page.html.twig' );
$data      = Timber::context();

Timber::render( $templates, $data );
