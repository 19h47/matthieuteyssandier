<?php // phpcs:ignore
/**
 * Mailchimp
 *
 * @category Customizer
 * @package  ledermannfilms
 * @author   Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 */

namespace LF\Api\Customizer;

use WP_Customize_Manager;

/**
 * Mailchimp
 */
class Mailchimp {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'customize_register', array( $this, 'register' ), 10, 1 );
	}


	/**
	 * Register
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer object.
	 */
	public function register( WP_Customize_Manager $wp_customize ) {
		// Add Mailchimp section.
		$wp_customize->add_section(
			'mailchimp',
			array(
				'title'       => __( 'Mailchimp', 'uni' ),
				'description' => __( 'Mailchimp Settings', 'uni' ),
			)
		);

		// Mailchimp url.
		$wp_customize->add_setting(
			'mailchimp_url',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'mailchimp_url',
			array(
				'label'    => __( 'Mailchimp URL', 'uni' ),
				'section'  => 'mailchimp',
				'settings' => 'mailchimp_url',
			)
		);

		// Mailchimp user.
		$wp_customize->add_setting(
			'mailchimp_user',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'mailchimp_user',
			array(
				'label'    => __( 'Mailchimp user', 'uni' ),
				'section'  => 'mailchimp',
				'settings' => 'mailchimp_user',
			)
		);

		// Mailchimp id.
		$wp_customize->add_setting(
			'mailchimp_id',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'mailchimp_id',
			array(
				'label'    => __( 'Mailchimp id', 'uni' ),
				'section'  => 'mailchimp',
				'settings' => 'mailchimp_id',
			)
		);
	}
}
