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
			meta = document.createElement "script"
			meta.onload = =>	
					root.DepMan = new ( require "helpers/DependenciesManager" )

					#jQuery
					DepMan.lib "jquery"
					DepMan.lib "jquery.mousewheel"

					# FontAwesome
					DepMan.stylesheet "font-awesome"
					DepMan.stylesheet "bootstrap"
					DepMan.stylesheet "bootstrap-responsive"

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
						"/galerie": => 
							_activate "galerie" 
							source = ""
							source += "<a href='/images/#{image}'><img src='/images/#{image}' /></a>" for image in FILES
							console.log source
							$("article#galerie").html source
						"/*": (loc) => _scenarios.document loc[0]
					LinkManager.setRoutes routes

					# Bootstrap it all
					document.title = "Bullet for my Valentine"
					_menu = 
						"home": "Acasa"
						"despre": "Despre Trupa"
						"albume": "Albume"
						"video": "Video"
						"galerie": "Galerie Foto"
					$("body").html DepMan.render "index", title: document.title, menu: _menu
					do LinkManager.linkAllAnchors

					do LinkManager.checkRoute

					# Solution for Apple's iOS bullshit hover crap
					els = document.querySelectorAll("*")
					console.log els
					el.addEventListener("click", (e) -> console.log "Clicked", e) for el in els



			meta.src = "/imglist"
			document.head.appendChild meta

	

module.exports = Application

