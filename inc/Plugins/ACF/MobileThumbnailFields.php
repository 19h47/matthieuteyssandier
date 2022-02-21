<?php // phpcs:ignore
/**
 * Mobile Thumbnail Fields
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier\Plugins\ACF;

/**
 * Mobile Thumbnail Fields
 */
class MobileThumbnailFields {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'acf/init', array( $this, 'fields' ) );
	}

	/**
	 * Registers the field group.
	 *
	 * @return void
	 */
	public function fields() {
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

