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
			'instagram',
			__( 'Instagram', 'matthieuteyssandier' ),
			array( $this, 'text_callback_function' ),
			'general',
			'socials',
			array(
				'name'  => 'instagram',
				'label' => 'Instagram URL',
			)
		);

		add_settings_field(
			'twitter',
			__( 'Twitter', 'matthieuteyssandier' ),
			array( $this, 'text_callback_function' ),
			'general',
			'socials',
			array(
				'name'  => 'twitter',
				'label' => 'Twitter URL',
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
		echo '<p>Socials urls</p>';
	}

	public function contacts_callback_function() {
		echo '<p>Contacts links</p>';
	}


	public function text_callback_function( $args ) {
		echo '<input name="' . esc_attr( $args['name'] ) . '" type="text" value="' . esc_attr( get_option( $args['name'] ) ) . '" class="regular-text code" placeholder="' . esc_attr( $args['label'] ) . '" />';
		echo '<p class="description">' . esc_attr( $args['label'] ) . '</p>';
	}

	public function email_callback_function( $args ) {
		echo '<input name="' . esc_attr( $args['name'] ) . '" type="email" value="' . esc_attr( get_option( $args['name'] ) ) . '" class="regular-text ltr" placeholder="' . esc_attr( $args['label'] ) . '" />';
		echo '<p class="description">' . esc_attr( $args['label'] ) . '</p>';
	}

	public function textarea_callback_function( $args ) {
		echo '<textarea name="' . esc_attr( $args['name'] ) . '" value="' . esc_attr( get_option( $args['name'] ) ) . '" class="regular-text code" placeholder="' . esc_attr( $args['label'] ) . '" />';
		echo esc_attr( get_option( $args['name'] ) ) . '</textarea>';
		echo '<p class="description">' . esc_attr( $args['label'] ) . '</p>';
	}

	public function register_settings() {
		$args = array(
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => null,
			// Extra argument for WPGraphQL.
			'show_in_graphql'   => true,
			'show_in_rest'      => true,
		);

		register_setting( 'general', 'instagram', $args );
		register_setting( 'general', 'twitter', $args );
		register_setting( 'general', 'public_email', $args );
		register_setting( 'general', 'phone_number', $args );
	}
}
