<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package sunflower
 */

get_header();

$show_sidebar = @get_post_meta( $post->ID, '_sunflower_show_sidebar')[0] ? true : false;
?>
	<div id="content" class="container">
		<div class="row">
			<div class="col-12 <?php if ( $show_sidebar ) echo 'col-md-8'; ?>">
				<main id="primary" class="site-main">

					<?php
					while ( have_posts() ) :
						the_post();

						get_template_part( 'template-parts/content', 'page' );

						// If comments are open or we have at least one comment, load up the comment template.
						if ( comments_open() || get_comments_number() ) :
							comments_template();
						endif;

					endwhile; // End of the loop.
					?>

				</main><!-- #main -->
			</div>
		<?php
			if ( $show_sidebar ) {
				get_sidebar();
			}
		?>
	</div>
</div>
<?php
get_footer();
