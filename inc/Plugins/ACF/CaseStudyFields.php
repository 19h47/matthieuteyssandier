<?php // phpcs:ignore
/**
 * Case Study Fields
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier\Plugins\ACF;

/**
 * Case Study Fields
 */
class CaseStudyFields {
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

		$color = array(
			'key'   => 'field_color',
			'label' => __( 'Color', 'matthieuteyssandier' ),
			'name'  => 'color',
			'type'  => 'color_picker',
		);

		$preview = array(
			'key'           => 'field_preview',
			'label'         => __( 'Preview', 'matthieuteyssandier' ),
			'name'          => 'preview',
			'type'          => 'image',
			'return_format' => 'array',
			'preview_size'  => 'full',
			'library'       => 'all',
		);

		$credits = array(
			'key'          => 'field_credits',
			'label'        => __( 'Credits', 'matthieuteyssandier' ),
			'name'         => 'credits',
			'type'         => 'repeater',
			'layout'       => 'table',
			'button_label' => __( 'Add Credit', 'matthieuteyssandier' ),
			'sub_fields'   => array(
				array(
					'key'         => 'field_key',
					'label'       => __( 'Key', 'matthieuteyssandier' ),
					'name'        => 'key',
					'type'        => 'text',
					'wrapper'     => array( 'width' => 50 ),
					'placeholder' => __( 'Key', 'matthieuteyssandier' ),
				),
				array(
					'key'         => 'field_value',
					'label'       => __( 'Value', 'matthieuteyssandier' ),
					'name'        => 'value',
					'type'        => 'text',
					'wrapper'     => array( 'width' => 50 ),
					'placeholder' => __( 'Value', 'matthieuteyssandier' ),
				),
			),
		);

		$link = array(
			'key'         => 'field_link',
			'label'       => __( 'Link', 'matthieuteyssandier' ),
			'name'        => 'link',
			'type'        => 'url',
			'placeholder' => 'https://vandelayindustries.com',
		);

		$layout_media = array(
			'key'        => 'layout_media',
			'name'       => 'media',
			'label'      => __( 'Media', 'matthieuteyssandier' ),
			'sub_fields' => array( $this->media() ),
		);

		$layout_medias = array(
			'key'        => 'layout_medias',
			'name'       => 'medias',
			'label'      => __( 'Medias', 'matthieuteyssandier' ),
			'sub_fields' => array( $this->media( '_0', 50 ), $this->media( '_1', 50 ) ),
		);

		$layout_content = array(
			'key'        => 'layout_content',
			'name'       => 'content',
			'label'      => __( 'Content', 'matthieuteyssandier' ),
			'sub_fields' => array( $this->content( '_0' ) ),
		);

		$layouts = array(
			'key'          => 'field_layouts',
			'label'        => __( 'Layouts', 'matthieuteyssandier' ),
			'name'         => 'layouts',
			'type'         => 'flexible_content',
			'layouts'      => array(
				'layout_media'   => $layout_media,
				'layout_medias'  => $layout_medias,
				'layout_content' => $layout_content,
			),
			'button_label' => __( 'Add Layout', 'matthieuteyssandier' ),
		);

		$location = array(
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'case_study',
				),
			),
		);

		if ( function_exists( 'acf_add_local_field_group' ) ) {
			acf_add_local_field_group(
				array(
					'key'      => 'group_case_study',
					'title'    => __( 'Case Study Options', 'matthieuteyssandier' ),
					'fields'   => array(
						$color,
						$preview,
						$this->content(),
						$credits,
						$link,
						$layouts,
					),
					'location' => $location,
				)
			);
		}
	}

	/**
	 * Content
	 *
	 * @param string $key Field key.
	 *
	 * @return array
	 */
	private function content( string $key = '' ) : array {
		return array(
			'key'        => 'field_content' . $key,
			'label'      => __( 'Content', 'matthieuteyssandier' ),
			'name'       => 'content',
			'type'       => 'group',
			'sub_fields' => array(
				array(
					'key'         => 'field_french',
					'label'       => __( 'French', 'matthieuteyssandier' ),
					'name'        => 'french',
					'type'        => 'textarea',
					'wrapper'     => array( 'width' => 50 ),
					'placeholder' => __( 'French Content', 'matthieuteyssandier' ),
					'rows'        => 4,
					'new_lines'   => 'br',
				),
				array(
					'key'         => 'field_english',
					'label'       => 'English',
					'name'        => 'english',
					'type'        => 'textarea',
					'wrapper'     => array( 'width' => 50 ),
					'placeholder' => __( 'English Content', 'matthieuteyssandier' ),
					'rows'        => 4,
					'new_lines'   => 'br',
				),
			),
		);
	}

	/**
	 * Media
	 *
	 * @param string $key Field key.
	 * @param int    $width Wrapper width.
	 *
	 * @return array
	 */
	private function media( string $key = '', int $width = 100 ) : array {

		$image = array(
			'key'           => 'field_image',
			'name'          => 'image',
			'type'          => 'image',
			'return_format' => 'array',
			'preview_size'  => 'large',
			'library'       => 'all',
		);

		$video = array(
			'key'           => 'field_video',
			'type'          => 'file',
			'name'          => 'video',
			'return_format' => 'array',
		);

		$layout_image = array(
			'key'        => 'layout_image',
			'label'      => __( 'Image', 'matthieuteyssandier' ),
			'name'       => 'image',
			'sub_fields' => array(
				$image,
			),
		);

		$layout_video = array(
			'key'        => 'layout_video',
			'label'      => __( 'Video', 'matthieuteyssandier' ),
			'name'       => 'video',
			'sub_fields' => array(
				$video,
			),
		);

		return array(
			'key'          => 'field_media' . $key,
			'label'        => __( 'Media', 'matthieuteyssandier' ),
			'name'         => 'media' . $key,
			'type'         => 'flexible_content',
			'max'          => 1,
			'layouts'      => array(
				'layout_image' => $layout_image,
				'layout_video' => $layout_video,
			),
			'wrapper'      => array( 'width' => $width ),
			'button_label' => __( 'Add Layout', 'matthieuteyssandier' ),
		);
	}
}
