require "Object"
class Application extends BaseObject

	constructor: () ->

		root = window
		root.echo = ( require "Object" ).echo
		document.title = "GeneGenerator Project"

		do ->
			meta = document.createElement "meta"
			meta.setAttribute "name", "viewport"
			meta.setAttribute "content", "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
			document.head.appendChild meta

		root.DepMan = new ( require "helpers/DependenciesManager" )

		#jQuery
		DepMan.lib "jquery"
		DepMan.lib "jquery.mousewheel"

		# FontAwesome
		DepMan.stylesheet "font-awesome"

		# Fonts
		DepMan.googleFont "Satisfy", [400]
		DepMan.googleFont "Open Sans", [400, 300], ["latin", "latin-ext"]

		_resize = ->
			html = document.querySelector "html"
			if window.innerWidth <= 1024
				if html.className.indexOf("smallscreen") is -1 then html.className += " smallscreen"
			else html.className = html.className.replace /\ ?smallscreen/, ""
		window.addEventListener "resize", _resize
		do _resize

		# Routing Manager
		root.LinkManager = new ( DepMan.helper "LinkManager" )
		
		# Setting up route scenarios
		_scenarios =
			root: => $("section").html DepMan.render "_index"; do LinkManager.linkAllAnchors
			document: (doc) =>
				if $("article").length is 0 then $("section").html DepMan.render "_document"
				$("article").html DepMan.doc doc.substr 0, doc.length - 1
				$("article").mousewheel (e, delta) ->
					document.body.scrollLeft -= delta * 30
					do e.preventDefault
			gallery: => $("section").html DepMan.render "_gallery"

		# Setting up routes
		routes =
			"/": => do _scenarios.root
			"/index": => do _scenarios.root
			"/pages/*": (loc) => _scenarios.document loc[0]
			"/gallery/*": => do _scenarios.gallery
		LinkManager.setRoutes routes

		# Bootstrap it all
		document.title = "Sabin Marcu"
		$("body").html DepMan.render "index", title: document.title

		# Generating menu
		_menu =
			"dashboard":
				"_text": "Acasă"
				"_link": "/"
			"circle-blank":
				"_text": "Submeniu"
				"Istoric": "/pages/istoric"
				"Galerie Foto": "/gallery"
		$("aside").html DepMan.render "_menu", data: _menu
		$("aside").find("li").hover ((e) => $("body").addClass("aside-open")) , ( (e) => $("body").removeClass("aside-open") )

		do LinkManager.checkRoute

		# Solution for Apple's iOS bullshit hover crap
		els = document.querySelectorAll("*")
		console.log els
		el.addEventListener("click", (e) -> console.log "Clicked", e) for el in els


module.exports = Application

