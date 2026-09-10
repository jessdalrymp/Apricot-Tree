<?php
/**
 * Apricot Tree theme functions.
 * Child theme of Storefront — inherits all WooCommerce templates
 * (cart, checkout, my account, single product, etc.) from the parent.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load the parent Storefront stylesheet first, then ours on top of it,
 * plus the Google Fonts used throughout the design.
 */
function apricot_tree_enqueue_styles() {
	wp_enqueue_style( 'storefront-style', get_template_directory_uri() . '/style.css', array(), '4.5.4' );

	wp_enqueue_style(
		'apricot-tree-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'apricot-tree-style',
		get_stylesheet_uri(),
		array( 'storefront-style' ),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'apricot_tree_enqueue_styles', 20 );

/**
 * Theme supports beyond what Storefront's parent theme already declares.
 */
function apricot_tree_setup() {
	add_theme_support( 'custom-logo', array(
		'height'      => 120,
		'width'       => 120,
		'flex-height' => true,
		'flex-width'  => true,
	) );
}
add_action( 'after_setup_theme', 'apricot_tree_setup' );

/**
 * Swap Storefront's default "Proudly powered by WordPress" footer credit
 * for our own brand line + social icons.
 */
remove_action( 'storefront_footer', 'storefront_credit', 20 );
add_action( 'storefront_footer', 'apricot_tree_footer_content', 20 );

function apricot_tree_footer_content() {
	$socials = array(
		'pinterest' => array(
			'label' => 'Pinterest',
			'url'   => get_theme_mod( 'apricot_tree_pinterest_url', 'https://pinterest.com/apricot_tree_stationery' ),
			'icon'  => '<svg viewBox="0 0 24 24"><path d="M12.017 2C6.484 2 2 6.484 2 12.017c0 4.246 2.65 7.87 6.388 9.312-.088-.79-.167-2.005.035-2.868.183-.78 1.183-4.97 1.183-4.97s-.302-.604-.302-1.496c0-1.402.813-2.448 1.824-2.448.86 0 1.276.646 1.276 1.42 0 .865-.552 2.158-.836 3.355-.238 1.002.502 1.82 1.49 1.82 1.788 0 3.164-1.887 3.164-4.607 0-2.409-1.73-4.093-4.2-4.093-2.862 0-4.542 2.146-4.542 4.365 0 .864.332 1.792.747 2.296a.3.3 0 0 1 .069.288c-.076.316-.245.988-.278 1.126-.043.183-.145.222-.334.134-1.248-.581-2.028-2.406-2.028-3.873 0-3.152 2.29-6.045 6.6-6.045 3.465 0 6.16 2.469 6.16 5.769 0 3.44-2.169 6.21-5.18 6.21-1.012 0-1.963-.526-2.289-1.148 0 0-.501 1.907-.622 2.374-.226.865-.836 1.949-1.244 2.61A10 10 0 0 0 12.017 22C17.55 22 22 17.516 22 12.017 22 6.484 17.55 2 12.017 2Z"/></svg>',
		),
		'instagram' => array(
			'label' => 'Instagram',
			'url'   => get_theme_mod( 'apricot_tree_instagram_url', 'https://instagram.com/apricot_tree_stationery' ),
			'icon'  => '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 4.96 4.96.06 1.3.07 1.6.07 4.77 0 3.2 0 3.6-.07 4.9-.15 3.25-1.66 4.8-4.96 4.96-1.3.06-1.6.07-4.9.07-3.2 0-3.6 0-4.9-.07-3.3-.15-4.8-1.71-4.96-4.96-.06-1.3-.07-1.6-.07-4.9 0-3.2 0-3.6.07-4.9.15-3.25 1.66-4.8 4.96-4.96C8.4 2.2 8.8 2.2 12 2.2ZM12 0C8.7 0 8.35 0 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C0 8.35 0 8.7 0 12s0 3.65.07 4.95c.2 4.35 2.62 6.78 6.98 6.98C8.35 24 8.7 24 12 24s3.65 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.07-1.3.07-1.65.07-4.95s0-3.65-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.65 0 15.3 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z"/></svg>',
		),
		'tiktok'    => array(
			'label' => 'TikTok',
			'url'   => get_theme_mod( 'apricot_tree_tiktok_url', 'https://tiktok.com/@apricot_tree_stationery' ),
			'icon'  => '<svg viewBox="0 0 24 24"><path d="M16.6 5.82a4.7 4.7 0 0 1-3.87-4.02h-3v13.6a2.7 2.7 0 1 1-1.9-2.58v-3.09a5.7 5.7 0 1 0 4.9 5.65V9.4a7.7 7.7 0 0 0 4.5 1.44V7.83a4.7 4.7 0 0 1-.63-2.01Z"/></svg>',
		),
		'youtube'   => array(
			'label' => 'YouTube',
			'url'   => get_theme_mod( 'apricot_tree_youtube_url', 'https://youtube.com/@apricot_tree_stationery' ),
			'icon'  => '<svg viewBox="0 0 24 24"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.4 3.6Z"/></svg>',
		),
	);
	?>
	<div class="apricot-footer">
		<div class="apricot-footer__brand">
			<p>Apricot Tree Stationery</p>
			<p>Letterpress-style notecards and paper goods, printed on demand, one order at a time.</p>
		</div>
		<div class="apricot-footer__social">
			<?php foreach ( $socials as $social ) : ?>
				<a href="<?php echo esc_url( $social['url'] ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr( $social['label'] ); ?>">
					<?php echo $social['icon']; // phpcs:ignore -- fixed inline SVG icon set, not user input ?>
				</a>
			<?php endforeach; ?>
		</div>
		<p class="apricot-footer__note">
			&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Apricot Tree Stationery. Made to order, shipped by Printify.
		</p>
	</div>
	<?php
}

/**
 * Customizer controls so the social links above can be edited from
 * Appearance → Customize → Apricot Tree Social Links, no code required.
 */
function apricot_tree_customize_register( $wp_customize ) {
	$wp_customize->add_section( 'apricot_tree_homepage', array(
		'title'    => __( 'Apricot Tree Homepage', 'apricot-tree' ),
		'priority' => 119,
	) );

	$wp_customize->add_setting( 'apricot_tree_hero_heading', array(
		'default'           => 'Stationery worth slowing down for.',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'apricot_tree_hero_heading', array(
		'label'   => __( 'Hero heading', 'apricot-tree' ),
		'section' => 'apricot_tree_homepage',
		'type'    => 'text',
	) );

	$wp_customize->add_setting( 'apricot_tree_hero_text', array(
		'default'           => "Notecards, journals, and paper goods designed one at a time and printed only when you order. No warehouse, no waste, just good paper with a little history in it.",
		'sanitize_callback' => 'sanitize_textarea_field',
	) );
	$wp_customize->add_control( 'apricot_tree_hero_text', array(
		'label'   => __( 'Hero text', 'apricot-tree' ),
		'section' => 'apricot_tree_homepage',
		'type'    => 'textarea',
	) );

	$wp_customize->add_section( 'apricot_tree_social', array(
		'title'    => __( 'Apricot Tree Social Links', 'apricot-tree' ),
		'priority' => 120,
	) );

	$socials = array(
		'apricot_tree_pinterest_url' => array( 'label' => 'Pinterest URL', 'default' => 'https://pinterest.com/apricot_tree_stationery' ),
		'apricot_tree_instagram_url' => array( 'label' => 'Instagram URL', 'default' => 'https://instagram.com/apricot_tree_stationery' ),
		'apricot_tree_tiktok_url'    => array( 'label' => 'TikTok URL', 'default' => 'https://tiktok.com/@apricot_tree_stationery' ),
		'apricot_tree_youtube_url'   => array( 'label' => 'YouTube URL', 'default' => 'https://youtube.com/@apricot_tree_stationery' ),
	);

	foreach ( $socials as $setting_id => $config ) {
		$wp_customize->add_setting( $setting_id, array(
			'default'           => $config['default'],
			'sanitize_callback' => 'esc_url_raw',
		) );

		$wp_customize->add_control( $setting_id, array(
			'label'   => __( $config['label'], 'apricot-tree' ),
			'section' => 'apricot_tree_social',
			'type'    => 'url',
		) );
	}
}
add_action( 'customize_register', 'apricot_tree_customize_register' );
