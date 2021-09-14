<?php // phpcs:ignore
/**
 * Class Case Study
 *
 * @package WordPress
 * @subpackage MatthieuTeyssandier
 */

namespace MatthieuTeyssandier\Post;

use WP_Post;

/**
 * Project class
 */
class CaseStudy {

	/**
	 * Runs initialization tasks.
	 *
	 * @access public
	 */
	public function run() {
		add_action( 'init', array( $this, 'register' ), 10, 0 );
		add_action( 'admin_head', array( $this, 'css' ) );
		add_action( 'manage_case_study_posts_custom_column', array( $this, 'render_custom_columns' ), 10, 2 );

		add_filter( 'post_updated_messages', array( $this, 'updated_messages' ), 10, 1 );
		add_filter( 'bulk_post_updated_messages', array( $this, 'bulk_updated_messages' ), 10, 2 );
		add_filter( 'manage_case_study_posts_columns', array( $this, 'add_custom_columns' ) );
	}


	/**
	 * CSS
	 *
	 * @return bool
	 */
	public function css() : bool {
		global $typenow;

		if ( 'case_study' !== $typenow ) {
			return false;
		}

		?>
		<style>
			.fixed .column-thumbnail {
				vertical-align: top;
				width: 80px;
			}

			.column-thumbnail a {
				display: block;
			}
			.column-thumbnail a img {
				display: inline-block;
				vertical-align: middle;
				width: 80px;
				height: 80px;
				object-fit: contain;
				object-position: center;
				border-radius: 50%;
				overflow: hidden;
			}
		</style>
		<?php

		return true;
	}


	/**
	 * Add custom columns
	 *
	 * @param array $columns Array of columns.
	 * @return array $new_columns
	 * @link https://developer.wordpress.org/reference/hooks/manage_post_type_posts_columns/
	 */
	public function add_custom_columns( array $columns ) : array {
		$new_columns = array();

		unset( $columns['date'] );

		foreach ( $columns as $key => $value ) {
			if ( 'title' === $key ) {
				$new_columns['thumbnail'] = __( 'Thumbnail', 'matthieuteyssandier' );
			}

			$new_columns[ $key ] = $value;

			if ( 'title' === $key ) {
				$new_columns['custom_date'] = __( 'Date', 'matthieuteyssandier' );
			}
		}
		return $new_columns;
	}


	/**
	 * Render custom columns
	 *
	 * @param string $column_name The column name.
	 * @param int    $post_id The ID of the post.
	 * @link https://developer.wordpress.org/reference/hooks/manage_post-post_type_posts_custom_column/
	 *
	 * @return void
	 */
	public function render_custom_columns( string $column_name, int $post_id ) : void {
		switch ( $column_name ) {
			case 'thumbnail':
				$color     = get_field( 'color', $post_id );
				$thumbnail = get_the_post_thumbnail( $post_id, 'thumbnail' );
				$html      = '—';

				if ( $thumbnail ) {
					$html  = '<a href="' . esc_attr( get_edit_post_link( $post_id ) ) . '"';
					$html .= $color ? ' style="background-color: ' . $color . ';"' : '';
					$html .= '>';
					$html .= $thumbnail;
					$html .= '</a>';
				}

				echo wp_kses_post( $html );

				break;

			case 'custom_date':
				$date = get_field( 'date', $post_id );
				$html = '—';

				if ( $date ) {
					$html = $date;
				}

				echo wp_kses_post( $html );

				break;
		}
	}


	/**
	 * Updated messages
	 *
	 * @param array $messages Post updated messages. For defaults see $messages declarations above.
	 * @return array $message
	 * @link https://developer.wordpress.org/reference/hooks/post_updated_messages/
	 * @access public
	 */
	public function updated_messages( array $messages ) : array {
		global $post;

		$post_ID     = isset( $post_ID ) ? (int) $post_ID : 0;
		$preview_url = get_preview_post_link( $post );

		/* translators: Publish box date format, see https://secure.php.net/date */
		$scheduled_date = date_i18n( __( 'M j, Y @ H:i' ), strtotime( $post->post_date ) );

		$view_link_html = sprintf(
			' <a href="%1$s">%2$s</a>',
			esc_url( get_permalink( $post_ID ) ),
			__( 'View Case Study', 'matthieuteyssandier' )
		);

		$scheduled_link_html = sprintf(
			' <a target="_blank" href="%1$s">%2$s</a>',
			esc_url( get_permalink( $post_ID ) ),
			__( 'Preview Case Study', 'matthieuteyssandier' )
		);

		$preview_link_html = sprintf(
			' <a target="_blank" href="%1$s">%2$s</a>',
			esc_url( $preview_url ),
			__( 'Preview Case Study', 'matthieuteyssandier' )
		);

		$messages['case_study'] = array(
			0  => '', // Unused. Messages start at index 1.
			1  => __( 'Case Study updated.', 'matthieuteyssandier' ) . $view_link_html,
			2  => __( 'Custom field updated.', 'matthieuteyssandier' ),
			3  => __( 'Custom field deleted.', 'matthieuteyssandier' ),
			4  => __( 'Case Study updated.', 'matthieuteyssandier' ),
			/* translators: %s: date and time of the revision */
			5  => isset( $_GET['revision'] ) ? sprintf( __( 'Case Study restored to revision from %s.', 'matthieuteyssandier' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore
			6  => __( 'Case Study published.', 'matthieuteyssandier' ) . $view_link_html,
			7  => __( 'Case Study saved.', 'matthieuteyssandier' ),
			8  => __( 'Case Study submitted.', 'matthieuteyssandier' ) . $preview_link_html,
			9  => sprintf( __( 'Case Study scheduled for: %s.', 'matthieuteyssandier' ), '<strong>' . $scheduled_date . '</strong>' ) . $scheduled_link_html, // phpcs:ignore
			10 => __( 'Case Study draft updated.', 'matthieuteyssandier' ) . $preview_link_html,
		);

		return $messages;
	}


	/**
	 * Bulk updated messages
	 *
	 * @param array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
	 * @param array $bulk_counts Array of item counts for each message, used to build internationalized strings.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/bulk_post_updated_messages/
	 *
	 * @return array $bulk_counts
	 */
	public function bulk_updated_messages( array $bulk_messages, array $bulk_counts ) : array {
		$bulk_messages['case_study'] = array(
			/* translators: %s: Number of case studies. */
			'updated'   => _n( '%s case study updated.', '%s case studies updated.', $bulk_counts['updated'], 'matthieuteyssandier' ),
			'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 case study not updated, somebody is editing it.', 'matthieuteyssandier' ) :
				/* translators: %s: Number of case studies. */
				_n( '%s case study not updated, somebody is editing it.', '%s case studies not updated, somebody is editing them.', $bulk_counts['locked'], 'matthieuteyssandier' ),
			/* translators: %s: Number of case studies. */
			'deleted'   => _n( '%s case study permanently deleted.', '%s case study permanently deleted.', $bulk_counts['deleted'], 'matthieuteyssandier' ),
			/* translators: %s: Number of case studies.. */
			'trashed'   => _n( '%s case study moved to the Trash.', '%s case study moved to the Trash.', $bulk_counts['trashed'], 'matthieuteyssandier' ),
			/* translators: %s: Number of case studies. */
			'untrashed' => _n( '%s case study restored from the Trash.', '%s case study restored from the Trash.', $bulk_counts['untrashed'], 'matthieuteyssandier' ),
		);

		return $bulk_messages;
	}


	/**
	 * Register Custom Post Type
	 *
	 * @return void
	 * @access public
	 */
	public function register() : void {
		$labels = array(
			'name'                     => _x( 'Case Studies', 'case study type generale name', 'matthieuteyssandier' ),
			'singular_name'            => _x( 'Case Study', 'case study type singular name', 'matthieuteyssandier' ),
			'add_new'                  => _x( 'Add New', 'case study type', 'matthieuteyssandier' ),
			'add_new_item'             => __( 'Add New Case Study', 'matthieuteyssandier' ),
			'edit_item'                => __( 'Edit Case Study', 'matthieuteyssandier' ),
			'new_item'                 => __( 'New Case Study', 'matthieuteyssandier' ),
			'view_items'               => __( 'View Case Studies', 'matthieuteyssandier' ),
			'view_item'                => __( 'View Case Study', 'matthieuteyssandier' ),
			'search_items'             => __( 'Search Case Studies', 'matthieuteyssandier' ),
			'not_found'                => __( 'No case studies found.', 'matthieuteyssandier' ),
			'not_found_in_trash'       => __( 'No case studies found in Trash.', 'matthieuteyssandier' ),
			'parent_item_colon'        => __( 'Parent Case Study:', 'matthieuteyssandier' ),
			'all_items'                => __( 'All Case Studies', 'matthieuteyssandier' ),
			'archives'                 => __( 'Case Study Archives', 'matthieuteyssandier' ),
			'attributes'               => __( 'Case Study Attributes', 'matthieuteyssandier' ),
			'insert_into_item'         => __( 'Insert into case study', 'matthieuteyssandier' ),
			'uploaded_to_this_item'    => __( 'Uploaded to this case study', 'matthieuteyssandier' ),
			'featured_image'           => _x( 'Featured Image', 'case study', 'matthieuteyssandier' ),
			'set_featured_image'       => _x( 'Set featured image', 'case study', 'matthieuteyssandier' ),
			'remove_featured_image'    => _x( 'Remove featured image', 'case study', 'matthieuteyssandier' ),
			'use_featured_image'       => _x( 'Use as featured image', 'case study', 'matthieuteyssandier' ),
			'items_list_navigation'    => __( 'Case studies list navigation', 'matthieuteyssandier' ),
			'items_list'               => __( 'Case studies list', 'matthieuteyssandier' ),
			'item_published'           => __( 'Case study published.', 'matthieuteyssandier' ),
			'item_published_privately' => __( 'Case study published privately.', 'matthieuteyssandier' ),
			'item_reverted_to_draft'   => __( 'Case study reverted to draft.', 'matthieuteyssandier' ),
			'item_scheduled'           => __( 'Case study scheduled.', 'matthieuteyssandier' ),
			'item_updated'             => __( 'Case study updated.', 'matthieuteyssandier' ),
		);

		$rewrite = array(
			'slug'       => 'case-studies',
			'with_front' => true,
		);

		$args = array(
			'label'               => __( 'Case Study', 'matthieuteyssandier' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'thumbnail' ),
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-portfolio',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,
			'exclude_from_search' => true,
			'publicly_queryable'  => true,
			'rewrite'             => $rewrite,
			'show_in_rest'        => true,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'caseStudy',
			'graphql_plural_name' => 'caseStudies',
			'taxonomies'          => array( 'case_study_cat' ),
		);

		register_post_type( 'case_study', $args );
	}
}
