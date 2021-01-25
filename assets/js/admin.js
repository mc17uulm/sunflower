/* eslint-disable no-undef */
jQuery( document ).on( 'click', '.sunflower-plugins .notice-dismiss', function() {
	jQuery.ajax( {
		url: ajaxurl,
		data: {
			action: 'sunflower_plugins_dismiss',
		},
	} );
} );

jQuery( document ).ready( function() {
	jQuery( '#createHomepage' ).click( sunflowerCreateHomepage );
	jQuery( '#sunflowerDeleteMap' ).click( () => sunflowerDeleteLeaflet( ) );
} );

function sunflowerCreateHomepage() {
	jQuery.ajax( {
		type: 'POST',
		url: sunflower.ajaxurl,
		data: {
			action: 'sunflowerCreateHomepage',
			title: sunflower.title,
		},
		success( json, textStatus, XMLHttpRequest ) {
			const data = JSON.parse( json );

			jQuery( '#createHomepage' ).hide();
			jQuery( '#createHomepageResponseLink' ).attr( 'href', `post.php?post=${ data.id }&action=edit` );
			jQuery( '#createHomepageResponse' ).show();
		},
		error( XMLHttpRequest, textStatus, errorThrown ) {
			//console.error( errorThrown );
		},
	} );
}

function sunflowerDeleteLeaflet() {
	jQuery( '#_sunflower_event_lat' ).val( '' );
	jQuery( '#_sunflower_event_lon' ).val( '' );
	jQuery( '#_sunflower_event_zoom' ).val( '' );
}

function sunflowerShowLeaflet( lat, lon, zoom ) {
	const leaflet = L.map( 'leaflet' ).setView( [ lat, lon ], zoom );
	L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
	} ).addTo( leaflet );

	const marker = L.marker( [ lat, lon ] ).addTo( leaflet );
	sunflowerSetMarker( lat, lon, leaflet.getZoom(), marker );

	leaflet.addEventListener( 'click', function( ev ) {
		sunflowerSetMarker( ev.latlng.lat, ev.latlng.lng, leaflet.getZoom(), marker );
	} );

	jQuery( '#sunflowerShowMap' ).hide();
}

function sunflowerSetMarker( lat, lon, zoom, marker ) {
	jQuery( '#_sunflower_event_lat' ).val( lat );
	jQuery( '#_sunflower_event_lon' ).val( lon );
	jQuery( '#_sunflower_event_zoom' ).val( zoom );

	marker.setLatLng( new L.LatLng( lat, lon ) );
}
