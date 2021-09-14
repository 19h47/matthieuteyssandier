<?php // phpcs:ignore
/**
 * Contact
 *
 * @category Customizer
 * @package  ledermannfilms
 * @author   Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 */

namespace LF\Api\Customizer;

use WP_Customize_Manager;

/**
 * Contact
 */
class Contact {

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
		// Add contact section.
		$wp_customize->add_section(
			'contact',
			array(
				'title'       => __( 'Contact', 'uni' ),
				'description' => __( 'Contact Settings', 'uni' ),
			)
		);

		// Instagram.
		$wp_customize->add_setting(
			'instagram',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'youtube',
			array(
				'label'       => __( 'Instagram', 'uni' ),
				'description' => __( 'Instagram URL', 'uni' ),
				'section'     => 'contact',
				'settings'    => 'instagram',
			)
		);

		// Facebook.
		$wp_customize->add_setting(
			'facebook',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'facebook',
			array(
				'label'       => __( 'Facebook', 'uni' ),
				'description' => __( 'Facebook URL', 'uni' ),
				'section'     => 'contact',
				'settings'    => 'facebook',
			)
		);

		// Phone number.
		$wp_customize->add_setting(
			'phone_number',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'phone_number',
			array(
				'label'    => __( 'Phone number', 'uni' ),
				'section'  => 'contact',
				'settings' => 'phone_number',
			)
		);

		// Address.
		$wp_customize->add_setting(
			'address',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'address',
			array(
				'label'    => __( 'Address', 'uni' ),
				'type'     => 'textarea',
				'section'  => 'contact',
				'settings' => 'address',
			)
		);
	}
}
