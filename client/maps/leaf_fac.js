
// Création de la carte

var map = L.map( 'map', {
  center: [9.0, 5.0],
  minZoom: 2,
  zoom: 2
});

// Centrer

map.setView(new L.LatLng(48.866667, 2.333333),5);

// Création des couches


// Couche de la carte
 var imageBlois = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'png'
});


// Couche de l'image satellite
var carteBlois = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(map);


// Création de calques

var calqueRepas = new L.LayerGroup();
var calqueLogement = new L.LayerGroup();
var calqueSoin = new L.LayerGroup();
var itineraireAutoroute = new L.LayerGroup();
var calqueAdmin = new L.LayerGroup();

var popup = L.popup();

	// Contrôleur de calques

	L.control.layers(
	{
	'Carte': carteBlois,
    'Image Sat': imageBlois,
	},
	{
	'Repas': calqueRepas.addTo(map),
	'Logement': calqueLogement,
	'Soin': calqueSoin.addTo(map),
	'Admin': calqueAdmin.addTo(map)
	}
	).addTo(map);

  if (Meteor.isClient) {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images/';
    var map = L.map('map');
  }

  if (Meteor.isClient) {
    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  }
  if (Meteor.isClient) {
    map.spin(true);
  }
  if (Meteor.isClient) {
    map.spin(false);
  }

var myURL = jQuery( 'script[src$="leaf_fac.js"]' ).attr( 'src' ).replace( 'leaf_fac.js', '' );

// Création des icônes

var iconResid = L.icon({
  iconUrl: myURL + 'images/icones-resid.svg',
  iconRetinaUrl: myURL + 'icones-resid.svg',
  iconSize: [30, 55],
  iconAnchor: [21, 21],
  popupAnchor: [0, -14]
});

var iconFac = L.icon({
  iconUrl: myURL + 'images/icones-fac.svg',
  iconRetinaUrl: myURL + 'icones-fac.svg',
  iconSize: [30, 55],
  iconAnchor: [21, 21],
  popupAnchor: [0, -14]
});

var iconHotel= L.icon({
  iconUrl: myURL + 'images/icones-hotel.svg',
  iconRetinaUrl: myURL + 'icones-hotel.svg',
  iconSize: [30, 55],
  iconAnchor: [21, 21],
  popupAnchor: [0, -14]
});

var iconGare = L.icon({
  iconUrl: myURL + 'images/icones-gare.svg',
  iconRetinaUrl: myURL + 'images/icones-gare.svg',
  iconSize: [100, 100],
  iconAnchor: [50, 21],
  popupAnchor: [0, -14]
});


var iconAuto = L.icon({
  iconUrl: myURL + 'images/icones-auto.svg',
  iconRetinaUrl: myURL + 'images/icones-auto.svg',
  iconSize: [100, 100],
  iconAnchor: [50, 50],
  popupAnchor: [0, -14]
});


var iconRu = L.icon({
  iconUrl: myURL + 'images/icones-ru.svg',
  iconRetinaUrl: myURL + 'images/icones-ru.svg',
  iconSize: [30, 55],
  iconAnchor: [21, 21],
  popupAnchor: [0, -14]
});




// Point admin

var markerClustersAdmin = L.markerClusterGroup();

for ( var i = 0; i < markers_admin.length; ++i )
{
  popup = '<div class="icon_align"><p>' + markers_admin[i].name + '</p>' +
              '<br/>' + markers_admin[i].adresse +
              '<br/>' + markers_admin[i].postal +
              '<br/> ' + '<img src="maps/images/phone.png">' + markers_admin[i].tel; '</div>'

  var m_admin = L.marker( [markers_admin[i].lat, markers_admin[i].lng], {icon: iconFac} )
                  .bindPopup( popup );

  markerClustersAdmin.addLayer( m_admin );
}

calqueAdmin.addLayer( markerClustersAdmin );

// Points logement

// Cluster personnalisé

var markerClustersLogement = new L.MarkerClusterGroup({
		iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-mycluster', iconSize: new L.Point(40, 40) });
    }
})

for ( var i = 0; i < markers_logement.length; ++i )
{
  popup =  '<div class="icon_align"><p>' + markers_logement[i].name + '</p>' +
             '<br/>' + markers_logement[i].adresse +
              '<br/>' + markers_logement[i].postal +
              '<br/>' +  '<img src="maps/images/phone.png"/>'  + markers_logement[i].tel +
			  '<br/>' + '<img src="mail.png"/>' + markers_logement[i].mail; '</div>'

  var m_logement = L.marker( [markers_logement[i].lat, markers_logement[i].lng], {icon: iconHotel} )
                  .bindPopup( popup );

  markerClustersLogement.addLayer( m_logement);
}

calqueLogement.addLayer( markerClustersLogement);

// Points soin

var markerClustersSoin = L.markerClusterGroup();

for ( var i = 0; i < markers_soin.length; ++i )
{
  popup =  '<div class="icon_align"> <p>' + markers_soin[i].name + '</p>' +
              '<br/>' + markers_soin[i].adresse +
              '<br/>' + markers_soin[i].postal; '</div>'

  var m_soin = L.marker( [markers_soin[i].lat, markers_soin[i].lng], {icon: iconGare} )
                  .bindPopup( popup );

  markerClustersSoin.addLayer( m_soin);
}

calqueSoin.addLayer( markerClustersSoin );

// Création des points pour l'itinéraire

var point1 = new L.LatLng(47.58545, 1.32389);
var point2 = new L.LatLng(47.5856, 1.3247);
var point3 = new L.LatLng(47.5858, 1.3257);
var point4 = new L.LatLng(47.5859, 1.3262);
var point5 = new L.LatLng(47.5862, 1.3295);
var point6 = new L.LatLng(47.58625, 1.3296);
var point7 = new L.LatLng(47.5865, 1.3296);
var point8 = new L.LatLng(47.587, 1.3302);
var point9 = new L.LatLng(47.5876, 1.33);
var point10 = new L.LatLng(47.5881, 1.3303);
var point11 = new L.LatLng(47.5885, 1.3308);
var point12 = new L.LatLng(47.5891, 1.3336);
var point13 = new L.LatLng(47.5899, 1.336);
var point14 = new L.LatLng(47.5897, 1.3365);


var tableauPoints = [point1, point2, point3, point4, point5, point6,point7, point8, point9, point10, point11, point12, point13, point14 ];


var polyline = L.polyline(tableauPoints, {
                color: '#8BB4CE',
                weight: 10,
                opacity: .7
            }, {weight: 1000000000}).bindPopup('Itinéraire pour aller de la gare à la fac.').addTo(calqueSoin);


// Point Autoroute


/*var markerClustersAuto = L.markerClusterGroup();

for ( var i = 0; i < markers_autoroute.length; ++i )
{
   popup = '<p>' + markers_autoroute[i].name + '</p>';

  var m_auto = L.marker( [markers_autoroute[i].lat, markers_autoroute[i].lng], {icon: iconAuto} )
                  .bindPopup( popup );

  markerClustersAuto.addLayer( m_auto);
}

itineraireAutoroute.addLayer( markerClustersAuto );

*/
// Points pour l'itinéraire

var pointa1 = new L.LatLng(47.6206, 1.3465);
var pointa2 = new L.LatLng(47.6184, 1.3467);
var pointa3 = new L.LatLng(47.61775, 1.34684);
var pointa4 = new L.LatLng(47.61766, 1.34672);
var pointa5 = new L.LatLng(47.61749, 1.34667);
var pointa6 = new L.LatLng(47.61725, 1.34675);
var pointa7 = new L.LatLng(47.61685, 1.34655);
var pointa8 = new L.LatLng(47.61584, 1.34552);
var pointa9 = new L.LatLng(47.6126, 1.3407);
var pointa10 = new L.LatLng(47.6121, 1.3401);
var pointa11 = new L.LatLng(47.6113, 1.3394);
var pointa12 = new L.LatLng(47.6109, 1.3389);
var pointa13 = new L.LatLng(47.61092, 1.33868);
var pointa14 = new L.LatLng(47.61082, 1.33833);
var pointa15 = new L.LatLng(47.61052, 1.33804);
var pointa16 = new L.LatLng(47.6101, 1.3382);
var pointa17 = new L.LatLng(47.6098, 1.3395);
var pointa18 = new L.LatLng(47.6084, 1.3411);
var pointa19 = new L.LatLng(47.6044, 1.3463);
var pointa20 = new L.LatLng(47.6038, 1.3468);
var pointa21 = new L.LatLng(47.60366, 1.34697);
var pointa22 = new L.LatLng(47.60340, 1.34698);
var pointa23 = new L.LatLng(47.60282, 1.34663);
var pointa24 = new L.LatLng(47.60160, 1.34629);
var pointa25 = new L.LatLng(47.60018, 1.34593);
var pointa26 = new L.LatLng(47.60006, 1.34604);
var pointa27 = new L.LatLng(47.59146, 1.33627);
var pointa28 = new L.LatLng(47.59044, 1.33794);
var pointa29 = new L.LatLng(47.5898, 1.3368);

var tableauPoints_auto = [pointa1, pointa2, pointa3, pointa4, pointa5, pointa6,pointa7, pointa8, pointa9, pointa10, pointa11, pointa12, pointa13, pointa14, pointa15, pointa16, pointa17, pointa18, pointa19, pointa20, pointa21, pointa22, pointa23, pointa24, pointa25, pointa26, pointa27, pointa28,pointa29 ];


var polyline2 = L.polyline(tableauPoints_auto, {
                color: '#8BB4CE',
                weight: 10,
                opacity: .7
            }, {weight: 1000000000}).bindPopup('Itinéraire pour aller de l\'autoroute à la fac.').addTo(itineraireAutoroute);


// Point repas

var markerClustersRu = L.markerClusterGroup({
		iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-mycluster2', iconSize: new L.Point(40, 40) });
    }
});

for ( var i = 0; i < markers_repas.length; ++i )
{
  popup =  '<div class="icon_align"><p>' + markers_repas[i].name + '</p>' +
			'<br/>' + markers_repas[i].adresse +
            '<br/>' + markers_repas[i].postal +
            '<br/> ' + '<img src="maps/images/phone.png">' +  markers_repas[i].tel +
			'<br/>' + '<img src="maps/images/mail.png">' + markers_repas[i].mail  +
			'<br>' + markers_repas[i].lien; '</div>'

  var m_repas = L.marker( [markers_repas[i].lat, markers_repas[i].lng], {icon: iconRu} )
                  .bindPopup( popup );

  markerClustersRu.addLayer(m_repas);
}

calqueRepas.addLayer( markerClustersRu );

	function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}

// ____________________________



var regions_osef = [{
    "type": "Feature",
        "properties": {
        "LOL": 9,
        "Nom": "Bloublou"
    },
        "geometry": {
        "type": "Polygon",
            "coordinates": [
            [
                [-104.05, 48.99],
                [-97.22, 48.98],
                [-96.58, 45.94],
                [-104.03, 45.94],
                [-104.05, 48.99]
            ]
        ]
    }
}, {
    "type": "Feature",
        "properties": {
        "LOL": 2,
        "Nom": "Plapla"
    },
        "geometry": {
        "type": "Polygon",
            "coordinates": [
            [
                [-109.05, 41.00],
                [-102.06, 40.99],
                [-102.03, 36.99],
                [-109.04, 36.99],
                [-109.05, 41.00]
            ]
        ]
    }
}];

var geojson;

function style_region(feature) {
    return {
        fillColor: 'white',
        weight: 2,
        opacity: 1,
        color: 'blue',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight

    });
}

geojson = L.geoJson(regions_osef, {
    style: style_region,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this.info = L.DomUtil.get("infobox"); // get that DIV
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this.info.innerHTML = '<h4>Informations sur les ateliers</h4>' + (props ?
                                                                 '<b>BALEK ' + props.Nom + '</b><br />Lien: ' +props.LOL  : 'Glissez sur un polygone');

};






info.addTo(map);
