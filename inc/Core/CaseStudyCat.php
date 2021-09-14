<?php // phpcs:ignore
/**
 * Class Case Study Cat
 *
 * PHP version 7.3.8
 *
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package MT
 */

namespace MT\Core;

/**
 * Case Study Cat class
 */
class CaseStudyCat {


	/**
	 * Runs initialization tasks.
	 *
	 * @access public
	 */
	public function run() {
		add_action( 'init', array( $this, 'register_taxonomy' ) );
	}


	/**
	 * Register taxonomy
	 *
	 * @return void
	 */
	public function register_taxonomy() {
		$labels = array(
			'name'                       => _x( 'Categories', 'case study category general name', 'matthieuteyssandier' ),
			'singular_name'              => _x( 'Category', 'case study category singular name', 'matthieuteyssandier' ),
			'search_items'               => __( 'Search Categories', 'matthieuteyssandier' ),
			'all_items'                  => __( 'All Categories', 'matthieuteyssandier' ),
			'popular_items'              => __( 'Popular Categories', 'matthieuteyssandier' ),
			'parent_item'                => __( 'Parent Category', 'matthieuteyssandier' ),
			'parent_item_colon'          => __( 'Parent Category:', 'matthieuteyssandier' ),
			'edit_item'                  => __( 'Edit Category', 'matthieuteyssandier' ),
			'view_item'                  => __( 'View Category', 'matthieuteyssandier' ),
			'update_item'                => __( 'Update Category', 'matthieuteyssandier' ),
			'add_new_item'               => __( 'Add New Category', 'matthieuteyssandier' ),
			'new_item_name'              => __( 'New Category Name', 'matthieuteyssandier' ),
			'separate_items_with_commas' => __( 'Separate categories with commas', 'matthieuteyssandier' ),
			'add_or_remove_items'        => __( 'Add or remove categories', 'matthieuteyssandier' ),
			'choose_from_most_used'      => __( 'Choose from the most used categories', 'matthieuteyssandier' ),
			'not_found'                  => __( 'No categories found.', 'matthieuteyssandier' ),
			'no_terms'                   => __( 'No Categories', 'matthieuteyssandier' ),
			'items_list_navigation'      => __( 'Categories list navigation', 'matthieuteyssandier' ),
			'items_list'                 => __( 'Categories list', 'matthieuteyssandier' ),
			/* translators: Category heading when selecting from the most used terms. */
			'most_used'                  => _x( 'Most Used', 'project category', 'matthieuteyssandier' ),
			'back_to_items'              => __( '&larr; Back to Categories', 'matthieuteyssandier' ),
		);

		$rewrite = array(
			'slug'       => 'case-studies-categories',
			'with_front' => true,
		);

		$args = array(
			'labels'              => $labels,
			'rewrite'             => $rewrite,
			'hierarchical'        => false,
			'public'              => true,
			'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_nav_menus'   => true,
			'show_in_quick_edit'  => false,
			'show_admin_column'   => true,
			'show_in_rest'        => true,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'caseStudyCategory',
			'graphql_plural_name' => 'caseStudyCategories',
		);
		register_taxonomy( 'case_study_cat', array( 'case_study' ), $args );
	}
}
