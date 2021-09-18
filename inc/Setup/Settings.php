<?php // phpcs:ignore
/**
 * Settings
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier\Setup;

/**
 * Supports
 */
class Settings {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'admin_init', array( $this, 'settings_api_init' ) );
		add_action( 'init', array( $this, 'register_settings' ) );
	}


	/**
	 * Register settings
	 *
	 * @return void
	 */
	public function settings_api_init() : void {
		add_settings_section(
			'socials',
			'Socials',
			array( $this, 'socials_callback_function' ),
			'general'
		);

		add_settings_section(
			'contacts',
			'Contacts',
			array( $this, 'contacts_callback_function' ),
			'general'
		);

		add_settings_field(
			'twitter',
			__( 'Twitter', 'matthieuteyssandier' ),
			array( $this, 'text_callback_function' ),
			'general',
			'socials',
			array(
				'name'  => 'twitter',
				'label' => __( 'Twitter URL', 'matthieuteyssandier' ),
			)
		);

		add_settings_field(
			'instagram',
			__( 'Instagram', 'matthieuteyssandier' ),
			array( $this, 'text_callback_function' ),
			'general',
			'socials',
			array(
				'name'  => 'instagram',
				'label' => __( 'Instagram URL', 'matthieuteyssandier' ),
			)
		);

		add_settings_field(
			'instagram',
			__( 'Instagram', 'matthieuteyssandier' ),
			array( $this, 'text_callback_function' ),
			'general',
			'socials',
			array(
				'name'  => 'instagram',
				'label' => __( 'Instagram URL', 'matthieuteyssandier' ),
			)
		);

		add_settings_field(
			'linkedin',
			__( 'LinkedIn', 'matthieuteyssandier' ),
			array( $this, 'text_callback_function' ),
			'general',
			'socials',
			array(
				'name'  => 'linkedin',
				'label' => __( 'LinkedIn URL', 'matthieuteyssandier' ),
			)
		);

		add_settings_field(
			'public_email',
			__( 'Email', 'matthieuteyssandier' ),
			array( $this, 'email_callback_function' ),
			'general',
			'contacts',
			array(
				'name'  => 'public_email',
				'label' => 'Email',
			)
		);
	}

	public function socials_callback_function() {
		echo '<p>' . __( 'Socials urls', 'matthieuteyssandier' ) . '</p>';
	}

	public function contacts_callback_function() {
		echo '<p>' . __( 'Contacts links', 'matthieuteyssandier' ) . '</p>';
	}


	public function text_callback_function( $args ) {
		wp_form_controls_input(
			array(
				'name'        => $args['name'],
				'value'       => get_option( $args['name'] ),
				'placeholder' => $args['label'],
				'description' => $args['label'],
			),
		);
	}

	public function email_callback_function( $args ) {
		wp_form_controls_input(
			array(
				'type'        => 'email',
				'name'        => $args['name'],
				'value'       => get_option( $args['name'] ),
				'placeholder' => $args['label'],
				'description' => $args['label'],
				'attributes'  => array(
					'pattern'      => '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
					'autocomplete' => 'email',
					'aria-label'   => $args['label'],
				),
			)
		);
	}

	public function register_settings() {
		$args = array(
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => null,
		);

		foreach ( array( 'instagram', 'twitter', 'linkedin', 'public_email' ) as $setting ) {
			register_setting( 'general', $setting, $args );
		}
	}
}
