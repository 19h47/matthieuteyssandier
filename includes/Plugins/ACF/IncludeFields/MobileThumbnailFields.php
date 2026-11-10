<?php
/**
 * Mobile Thumbnail Fields
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Plugins/ACF/IncludeFields
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Plugins\ACF\IncludeFields;

use MatthieuTeyssandier\Service;

/**
 * Mobile Thumbnail Fields
 */
class MobileThumbnailFields implements Service {
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
		$location = array(
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'case_study',
				),
			),
		);

		$image = array(
			'key'           => 'field_mobile_thumbnail_image',
			'label'         => __( 'Mobile Thumbnail', 'matthieuteyssandier' ),
			'name'          => 'mobile_thumbnail',
			'type'          => 'image',
			'return_format' => 'id',
			'preview_size'  => 'medium',
			'library'       => 'all',
		);

		if ( function_exists( 'acf_add_local_field_group' ) ) {
			acf_add_local_field_group(
				array(
					'key'      => 'group_mobile_thumbnail',
					'title'    => __( 'Mobile Thumbnail', 'matthieuteyssandier' ),
					'fields'   => array(
						$image,
					),
					'location' => $location,
					'position' => 'side',
				)
			);
		}
	}
}
