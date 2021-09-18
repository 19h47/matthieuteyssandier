<?php // phpcs:ignore
/**
 * Single: Case study
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 * @since 0.0.0
 */

use Timber\{ Timber };

$template = 'pages/single-case-study.html.twig';

$data         = Timber::context();
$data['post'] = Timber::get_post();

Timber::render( $template, $data );
