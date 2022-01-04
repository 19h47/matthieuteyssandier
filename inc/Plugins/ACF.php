<?php // phpcs:ignore
/**
 * ACF
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Plugins/ACF
 */

namespace MatthieuTeyssandier\Plugins;

/**
 * WordPress
 */
class ACF {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'acf/init', array( $this, 'add_options_theme' ) );
		add_action( 'init', array( $this, 'add_options_theme_fields' ) );
	}

		/**
	 * Add options pages
	 */
	public function add_options_theme() {
		$parent = acf_add_options_page(
			array(
				'page_title' => __( 'Theme Settings', 'cns' ),
				'capability' => 'edit_posts',
			)
		);
	}


	public function add_options_theme_fields() {

		$field_email = array(
			'key'        => 'field_email',
			'label'      => __( 'Email', 'matthieu-teyssandier' ),
			'name'       => 'email',
			'type'       => 'group',
			'layout'     => 'block',
			'sub_fields' => array(
				array(
					'key'         => 'field_email_title',
					'label'       => __( 'Title', 'matthieu-teyssandier' ),
					'name'        => 'title',
					'type'        => 'textarea',
					'rows'        => 2,
					'new_lines'   => '',
					'placeholder' => __( 'Title', 'matthieu-teyssandier' ),
				),
				array(
					'key'         => 'field_email_address',
					'label'       => __( 'Address', 'matthieu-teyssandier' ),
					'name'        => 'address',
					'type'        => 'email',
					'placeholder' => __( 'example@example.com', 'matthieu-teyssandier' ),
				),
			),
		);

		$field_description = array(
			'key'        => 'field_description',
			'label'      => __( 'Description', 'matthieu-teyssandier' ),
			'name'       => 'description',
			'type'       => 'group',
			'layout'     => 'block',
			'sub_fields' => array(
				array(
					'key'         => 'field_description_tagline',
					'label'       => __( 'Tagline', 'matthieu-teyssandier' ),
					'name'        => 'tagline',
					'type'        => 'textarea',
					'rows'        => 2,
					'new_lines'   => '',
					'placeholder' => __( 'Tagline', 'matthieu-teyssandier' ),
				),
				array(
					'key'         => 'field_description_title',
					'label'       => __( 'Title', 'matthieu-teyssandier' ),
					'name'        => 'title',
					'type'        => 'text',
					'placeholder' => __( 'Title', 'matthieu-teyssandier' ),
				),
			),
		);

		$field_copyright = array(
			'key'         => 'field_copyright',
			'label'       => 'Copyright',
			'name'        => 'copyright',
			'type'        => 'text',
			'placeholder' => __( 'Copyright', 'matthieu-teyssandier' ),
		);

		$field_socials = array(
			'key'          => 'field_socials',
			'label'        => 'Socials',
			'name'         => 'socials',
			'type'         => 'repeater',
			'layout'       => 'block',
			'button_label' => __( 'Add Social', 'matthieu-teyssandier' ),
			'sub_fields'   => array(
				array(
					'key'           => 'field_socials_link',
					'label'         => __( 'Link', 'matthieu-teyssandier' ),
					'name'          => 'link',
					'type'          => 'link',
					'return_format' => 'array',
				),
			),
		);

		$group = array(
			'key'        => 'field_options_theme',
			'label'      => __( 'Options Theme', 'matthieu-teyssandier' ),
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
					'title'    => __( 'Options Theme', 'matthieuteyssandier' ),
					'fields'   => array(
						$group,
					),
					'location' => $location,
				)
			);
		}
	}
}

