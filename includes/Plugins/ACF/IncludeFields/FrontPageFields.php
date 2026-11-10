<?php
/**
 * Front Page Fields
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Plugins/ACF/IncludeFields
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Plugins\ACF\IncludeFields;

use MatthieuTeyssandier\Service;

/**
 * Front Page Fields
 */
class FrontPageFields implements Service {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'acf/init', array( $this, 'fields' ) );
	}

	/**
	 * Registers the field group.
	 *
	 * @return void
	 */
	public function fields(): void {

		$hide_on_screen = array( 'the_content', 'featured_image' );

		$location = array(
			array(
				array(
					'param'    => 'page_type',
					'operator' => '==',
					'value'    => 'front_page',
				),
			),
		);

		if ( function_exists( 'acf_add_local_field_group' ) ) {
			acf_add_local_field_group(
				array(
					'key'            => 'group_front_page',
					'title'          => __( 'Front Page Options', 'matthieuteyssandier' ),
					'fields'         => array(
						array(
							'key'           => 'field_case_studies',
							'label'         => __( 'Case Studies', 'matthieuteyssandier' ),
							'name'          => 'case_studies',
							'type'          => 'relationship',
							'post_type'     => array( 'case_study' ),
							'filters'       => array( 'search' ),
							'max'           => 3,
							'return_format' => 'id',
						),
					),
					'location'       => $location,
					'position'       => 'acf_after_title',
					'hide_on_screen' => $hide_on_screen,

				)
			);
		}
	}
}
