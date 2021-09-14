<?php // phpcs:ignore
/**
 * WPGraphQL
 *
 * @package WordPress
 * @subpackage MT
 */

namespace MT\Plugins;

/**
 * Class WPGraphQL
 */
class WPGraphQL {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'graphql_register_types', array( $this, 'register_case_studies_colors_type' ) );
		add_action( 'graphql_register_types', array( $this, 'register_case_studies_colors_field' ) );
	}


	/**
	 * Add Case Studies colors
	 *
	 * @access public
	 */
	public function register_case_studies_colors_type() {
		register_graphql_object_type(
			'CaseStudiesColors',
			array(
				'description' => __( 'Displays the colors Case Studies.', 'matthieuteyssandier' ),
				'fields'      => array(
					'color'  => array(
						'type'        => 'String',
						'description' => __( 'The main color', 'matthieuteyssandier' ),
					),
					'colors' => array(
						'type'        => array( 'list_of' => 'String' ),
						'description' => __( 'The colors', 'matthieuteyssandier' ),
					),
				),
			)
		);
	}


	/**
	 *
	 */
	public function register_case_studies_colors_field() {
		register_graphql_field(
			'RootQuery',
			'CaseStudiesColors',
			array(
				'description' => __( 'Get Case Studies colors.', 'matthieuteyssandier' ),
				'type'        => 'CaseStudiesColors',
				'resolve'     => function() {
					$case_studies = get_posts(
						array(
							'numberposts' => -1,
							'post_type'   => 'case_study',
							'orderby'     => 'rand',
							'fields'      => '',
						)
					);

					$colors = array_filter(
						array_map(
							function( $case_study ) {
								return get_field( 'color', $case_study->ID );
							},
							$case_studies
						)
					);

					return array(
						'color'  => $colors[ array_rand( $colors, 1 ) ],
						'colors' => $colors,
					);
				},
			)
		);
	}
}
