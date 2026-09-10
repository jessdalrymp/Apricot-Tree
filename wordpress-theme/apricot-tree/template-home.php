<?php
/**
 * Template Name: Apricot Tree Home
 *
 * Assign this to your homepage under Pages → (your home page) → Page Attributes → Template,
 * then set it as the static front page under Settings → Reading.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">

		<section class="apricot-hero">
			<div>
				<h1><?php echo esc_html( get_theme_mod( 'apricot_tree_hero_heading', 'Stationery worth slowing down for.' ) ); ?></h1>
				<p><?php echo esc_html( get_theme_mod( 'apricot_tree_hero_text', "Notecards, journals, and paper goods designed one at a time and printed only when you order. No warehouse, no waste, just good paper with a little history in it." ) ); ?></p>
				<a class="button" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>">
					Shop the collection
				</a>
			</div>
			<div class="apricot-hero__image">
				<img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/offline-essentials-bag-flatlay.png' ); ?>" alt="Apricot Tree Stationery Offline Essentials Bag" />
			</div>
		</section>

		<?php if ( class_exists( 'WooCommerce' ) ) : ?>
			<section class="apricot-section">
				<div class="apricot-section__heading">
					<h2>Fresh off the press</h2>
					<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>">View all</a>
				</div>
				<?php echo do_shortcode( '[products limit="3" columns="3" orderby="date" order="DESC"]' ); ?>
			</section>
		<?php else : ?>
			<section class="apricot-section">
				<p>
					<?php esc_html_e( 'Install and activate WooCommerce to show products here.', 'apricot-tree' ); ?>
				</p>
			</section>
		<?php endif; ?>

	</main>
</div>

<?php
get_footer();
