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
		

		_activate = (doc) -> $("article").removeClass("active"); $("article##{doc}").addClass("active")
		# Setting up route scenarios
		_scenarios =
			root: => _activate "home"
			document: (doc) => 
				doc = doc.substr 0, doc.length - 1
				if $("article##{doc}")[0] then _activate doc
				else _activate "404"

		# Setting up routes
		routes =
			"/": => do _scenarios.root
			"/index": => do _scenarios.root
			"/pages/*": (loc) => _scenarios.document loc[0]
		LinkManager.setRoutes routes

		# Bootstrap it all
		document.title = "Castelul Peleș"
		_menu = 
			"home": "Acasa"
			"istoric": "Istoric"
			"locatie": "Locatie"
			"personalitati": "Personalitati"
			"imagini": "Imagini"
			"contact": "Contact"
		$("body").html DepMan.render "index", title: document.title, menu: _menu
		do LinkManager.linkAllAnchors

		do LinkManager.checkRoute

		# Solution for Apple's iOS bullshit hover crap
		els = document.querySelectorAll("*")
		console.log els
		el.addEventListener("click", (e) -> console.log "Clicked", e) for el in els


module.exports = Application

