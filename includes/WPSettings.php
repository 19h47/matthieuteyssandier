<?php
/**
 * WPSettings
 *
 * @package MatthieuTeyssandier
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier;

/**
 * WP Settings
 */
class WPSettings implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'after_setup_theme', array( $this, 'add_theme_supports' ) );
		add_action( 'after_setup_theme', array( $this, 'disable_block_editor_supports' ), 100 );
		add_action( 'after_setup_theme', array( $this, 'load_textdomain' ), 0 );
		add_action( 'init', array( $this, 'add_post_type_supports' ) );
		add_filter( 'use_widgets_block_editor', '__return_false' );
	}

	/**
	 * Load theme text domain for translations.
	 *
	 * @see https://developer.wordpress.org/reference/functions/load_theme_textdomain/
	 *
	 * @return void
	 */
	public function load_textdomain(): void {
		load_theme_textdomain( 'matthieuteyssandier', get_template_directory() . '/languages' );
	}

	/**
	 * Add theme supports
	 *
	 * @return void
	 */
	public function add_theme_supports(): void {
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @see https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		add_image_size( 'size-1', 590 );
		add_image_size( 'size-2', 1222 );
		add_image_size( 'size-3', 1852 );
		add_image_size( 'size-4', 2482 );
		add_image_size( 'size-5', 3114 );
		add_image_size( 'size-6', 3744 );

		/*
		 * Switch default core markup for gallery and caption to output valid HTML5.
		 */
		add_theme_support( 'html5', array( 'gallery', 'caption' ) );
	}

	/**
	 * Adds extra supports on native post types.
	 *
	 * @see https://developer.wordpress.org/reference/functions/add_post_type_support/
	 *
	 * @return void
	 */
	public function add_post_type_supports(): void {
		add_post_type_support( 'page', 'excerpt' );
	}

	/**
	 * Removes block editor theme supports (patterns, FSE templates).
	 *
	 * Not handled by Classic Editor.
	 *
	 * @return void
	 */
	public function disable_block_editor_supports(): void {
		remove_theme_support( 'core-block-patterns' );
		remove_theme_support( 'block-templates' );
	}
}
