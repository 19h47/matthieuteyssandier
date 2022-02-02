<?php // phpcs:ignore
/**
 * Theme Settings Fields
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier\Plugins\ACF;

/**
 * Theme Settings Fields
 */
class ThemeSettingsFields {
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

		$field_email = array(
			'key'        => 'field_email',
			'label'      => __( 'Email', 'matthieuteyssandier' ),
			'name'       => 'email',
			'type'       => 'group',
			'layout'     => 'block',
			'sub_fields' => array(
				array(
					'key'         => 'field_email_title',
					'label'       => __( 'Title', 'matthieuteyssandier' ),
					'name'        => 'title',
					'type'        => 'textarea',
					'rows'        => 2,
					'new_lines'   => '',
					'placeholder' => __( 'Title', 'matthieuteyssandier' ),
				),
				array(
					'key'         => 'field_email_address',
					'label'       => __( 'Address', 'matthieuteyssandier' ),
					'name'        => 'address',
					'type'        => 'email',
					'placeholder' => __( 'example@example.com', 'matthieuteyssandier' ),
				),
			),
		);

		$field_description = array(
			'key'        => 'field_description',
			'label'      => __( 'Description', 'matthieuteyssandier' ),
			'name'       => 'description',
			'type'       => 'group',
			'layout'     => 'block',
			'sub_fields' => array(
				array(
					'key'         => 'field_description_tagline',
					'label'       => __( 'Tagline', 'matthieuteyssandier' ),
					'name'        => 'tagline',
					'type'        => 'textarea',
					'rows'        => 2,
					'new_lines'   => '',
					'placeholder' => __( 'Tagline', 'matthieuteyssandier' ),
				),
				array(
					'key'         => 'field_description_title',
					'label'       => __( 'Title', 'matthieuteyssandier' ),
					'name'        => 'title',
					'type'        => 'text',
					'placeholder' => __( 'Title', 'matthieuteyssandier' ),
				),
			),
		);

		$field_copyright = array(
			'key'         => 'field_copyright',
			'label'       => 'Copyright',
			'name'        => 'copyright',
			'type'        => 'text',
			'placeholder' => __( 'Copyright', 'matthieuteyssandier' ),
		);

		$field_socials = array(
			'key'          => 'field_socials',
			'label'        => 'Socials',
			'name'         => 'socials',
			'type'         => 'repeater',
			'layout'       => 'block',
			'button_label' => __( 'Add Social', 'matthieuteyssandier' ),
			'sub_fields'   => array(
				array(
					'key'           => 'field_socials_link',
					'label'         => __( 'Link', 'matthieuteyssandier' ),
					'name'          => 'link',
					'type'          => 'link',
					'return_format' => 'array',
				),
			),
		);

		$group = array(
			'key'        => 'field_options_theme',
			'label'      => __( 'Options Theme', 'matthieuteyssandier' ),
			'name'       => 'options_theme',
			'type'       => 'group',
			'layout'     => 'block',
			'sub_fields' => array(
				$field_socials,
				$field_description,
				$field_email,
				$field_copyright,
			),
		);

		$location = array(
			array(
				array(
					'param'    => 'options_page',
					'operator' => '==',
					'value'    => 'acf-options-theme-settings',
				),
			),
		);

		if ( function_exists( 'acf_add_local_field_group' ) ) {
			acf_add_local_field_group(
				array(
					'key'      => 'group_options_theme',
					'title'    => __( 'Theme Settings', 'matthieuteyssandier' ),
					'fields'   => array(
						$group,
					),
					'location' => $location,
				)
			);
		}
	}
}
