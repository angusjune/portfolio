# This imports all the layers for "TimelyFramer" into timelyframerLayers
timelyLayers = Framer.Importer.load "imported/TimelyFramer"

# ====== @INIT SETTINGS ====== #	

deviceWidth = 1080
deviceHeight = 1920
themeGreen = '#05BF03'

bg = new BackgroundLayer
	backgroundColor: '#eee'

# ====== END OF INIT SETTINGS ====== #	


# ====== @EXTENED EVENTS ====== #	

HammerEvents =
	
	Tap: "tap"
	DoubleTap: "doubletap"
	Hold: "hold"
	Touch: "touch"
	Release: "release"
	Gesture: "gesture"

	Swipe: "swipe"
	SwipeUp: "swipeup"
	SwipeDown: "swipedown"
	SwipeLeft: "swipeleft"
	SwipeRight: "swiperight"
	
	Transform: "transform"
	TransformStart: "transformstart"
	TransformEnd: "transformend"

	Rotate: "rotate"

	Pinch: "pinch"
	PinchIn: "pinchin"
	PinchOut: "pinchout"
	
# Add the Hammer events to the base Framer events
window.Events = _.extend Events, HammerEvents

# Patch the on method on layers to listen to Hammer events
class HammerLayer extends Framer.Layer
	on: (eventName, f) ->		
		if eventName in _.values(HammerEvents)
			@ignoreEvents = false			
			hammer = Hammer(@_element).on eventName, f
		else
			super eventName, f

# Replace the default Layer with the HammerLayer
window.Layer = HammerLayer

# ====== END OF EXTENED EVENTS ====== #	



# ====== @HELPER FUNCTIONS ====== #	

dpToPx = (dp, isAddPxUnit = false, res = 2) ->
	px = dp * res
	if isAddPxUnit
		px += 'px'
	return px
	
# Add wave effect to an element
addWave = (ele, waveColor = 'rgba(255, 255, 255, .2)', animateTime = 0.05) ->
	
	ele.style.overflow = 'hidden'
	
	# Select the larger side as the wave size
	size = if ele.width > ele.height then ele.width else ele.height
	
	waveLayer = new Layer
		superLayer: ele
		width: size
		height: size
		backgroundColor: waveColor
		scale: 0
		
	waveLayer.style = 
		borderRadius: '50%'
	waveLayer.center()
	waveLayer.sendToBack()
	
	waveAni = new Animation
		
	ele.on Events.TouchStart, ->
		waveLayer.animateStop()
		waveAni = waveLayer.animate
			properties:
				scale: 1
				opacity: 1
			time: animateTime
	
	ele.on Events.TouchEnd, ->
		waveLayer.animateStop()
		waveEndAni = waveLayer.animate
			properties:
				scale: 0
				opacity: 0
			time: animateTime
	
	return waveLayer

effectPop = (ele, scale = 1.5, time = 0.2, velocity = 5, friction = 40, tension = 500) ->
	curveOptions = 
		velocity: velocity
		friction: friction
		tension: tension
			
	enlarge = ele.animate
		properties:
			scale: scale
		curve: 'spring'
		curveOptions: curveOptions
		time: time
	
	enlarge.on('stop', ->
		ele.animate
			properties: {scale: 1}
			curve: 'spring'
			curveOptions: curveOptions
			time: time)

# Seperate an element from the page
seperateLayer = (ele, isBringtoFront = true, deleteOriginalEle = false) ->
	holderLayer = new Layer
		x: ele.x
		y: ele.y
		width: ele.width
		height: ele.height
		backgroundColor: 'transparent'
	holderLayer.addSubLayer(ele)
	ele.x = ele.y = 0
	
	if isBringtoFront
		holderLayer.bringToFront()
	
	if deleteOriginalEle
		ele.destroy()
	
	return holderLayer

# ====== END OF HELPER FUNCTIONS ====== #	



# ====== @UNIVERSAL LAYERS ====== #	

statusBarLayer     = timelyLayers.statusBar
actionBarLayer     = timelyLayers.actionBar
navigationBarLayer = timelyLayers.navigationBar

if Utils.isMobile()
	statusBarLayer.visible = false
	Framer.Device.contentScale = 0.5

# ====== END OF UNIVERSAL LAYERS ====== #	



# ====== @CARDS ====== #	

cardLayer   = timelyLayers.card
btnCamLayer = timelyLayers.btnCamera

# Content layer to wrap cards	
contentLayer = new Layer
	width: deviceWidth
	y: actionBarLayer.maxY
	height: cardLayer.height * 2 + 100
	backgroundColor: 'transparent'
	
cardLayer.superLayer = contentLayer

cardLayer.centerX()
cardLayer.y = 32	

# Duplicate cards
card2Layer   = cardLayer.copy()
card2Layer.y = cardLayer.maxY + 16

contentLayer.addSubLayer(card2Layer)

# Pull to refresh bar
refreshBar = new Layer
	width: deviceWidth
	height: 16
	y: actionBarLayer.maxY
	scaleX: 0
	backgroundColor: themeGreen

# Make an element scrollable
makeScrollable = (ele) ->
	ele.draggable.enabled = true
	ele.draggable.speedX = 0
	
	return ele

# Make an element attach to a list
makeAttach = (ele, displayHeight, offsetTop = 0, offsetBottom = 0, animationTime = 0.4) ->
	initY = ele.y
	
	tolerantTop    = initY + offsetTop
	tolerantBottom = ele.height + offsetBottom - displayHeight - initY
	
	curveOptions =
		velocity: 5
		tension: 300
		friction: 25
	
	ele.on Events.DragEnd, ->
		animateY = ele.y
		
		if ele.y > tolerantTop 
			animateY = tolerantTop
		else if ele.y < -tolerantBottom
			animateY = -tolerantBottom

		ele.animate
			properties: { y: animateY }
			curve: 'spring'
			curveOptions: curveOptions
			time: animationTime	

# Make a list scrollable
makeScrollableList = (ele, displayHeight, offsetTop = 100, offsetBottom = 100) ->
	ele = makeScrollable(ele)
	initY = ele.y
	
	tolerantTop    = initY + offsetTop
	tolerantBottom = ele.height + offsetBottom - displayHeight - initY
	
	ele.on Events.DragMove, ->		
		if ele.y > initY
			refreshBar.scaleX = Utils.modulate(ele.y,[initY,offsetTop + initY],[0,1], true)
		
		if ele.y >= tolerantTop
			ele.y = tolerantTop
					
		else if ele.y <= -tolerantBottom
			ele.y = -tolerantBottom
			
	ele.on Events.DragEnd, ->
		refreshBar.animate
			properties: {scaleX: 0}
			curve: 'ease-in-out'
			time: 0.2
	
	makeAttach(ele, displayHeight)
			
	return ele


makeScrollableList(contentLayer, deviceHeight - actionBarLayer.height - navigationBarLayer.height, 200, 200)

# ====== END OF CARDS ====== #	



# ====== @LIKE BUTTON ====== #	

btnLikeLayer = timelyLayers.btnLike
actionsLayer = timelyLayers.actions
iconHeartLayer = timelyLayers.iconHeart
iconHeartRedLayer = timelyLayers.iconHeartRed
iconHeart = seperateLayer(iconHeartLayer)
iconHeart.superLayer = btnLikeLayer

addWave(btnLikeLayer, 'rgba(0,0,0,.04)', 0.1)

likeNumText = new Layer
	superLayer: btnLikeLayer
	backgroundColor: 'transparent'
	x: 110
	
likeNumText.centerY()
likeNumText.html = 431
likeNumText.style =
	fontSize: '42px'
	lineHeight: likeNumText.height + 'px'
	color: '#444'
	fontWeight: '100'
	
addText = new Layer
	superLayer: cardLayer
	maxY: 1260
	x: iconHeart.x
	height: 62
	backgroundColor: 'transparent'
	
addText.style = 
	fontSize: '62px'
	lineHeight: '62px'
	color: '#EF2525'
	textAlign: 'center'

addText.html = '1'
addText.opacity = 0

inv = false

btnLikeLayer.on Events.Hold,(event) ->
	
	iconHeartRedLayer.opacity = 0
	iconHeartRedLayer.scale = 0.3
	iconHeartRedLayer.visible = true
	
# 	addText.opacity = 1
	
	addText.animate
		properties:
			opacity: 1
			maxY: 1240
		time: 0.2
	
	inv = Utils.interval 0.12, ->
		if addText.html < 32
			addText.html++
			addText.scale += 0.03
			addText.maxY--	
	
	iconHeartRedLayer.animate
		properties:
			scale: 1
			opacity: 0.6
		time: 3.84

btnLikeLayer.on Events.Release, ->
	currentNum = Number(addText.html)
	addText.html = currentNum
	
	clearInterval(inv)
	
	likeNumText.html = Number(likeNumText.html) + Number(currentNum)
	effectPop(likeNumText)
	
	iconHeartRedLayer.animateStop()
	heartAni = iconHeartRedLayer.animate
		properties:
			scale: 0.3
			opacity: 0
		time: 0.5
		
	heartAni.on 'stop', ->
		addText.animate
			properties:
				scale: 1
				opacity: 0
				maxY: 1260
			time: 0.6

btnLikeLayer.on Events.TouchStart, ->
	
	iconHeartLayer.image = iconHeartRedLayer.image
	iconHeart.animateStop()
	iconHeart.animate
		properties: {scale: 1.5}
		curve: 'spring'
		curveOptions:
			velocity: 5
			friction: 50
			tension: 500
		time: 0.1
		
btnLikeLayer.on Events.TouchEnd, ->
	iconHeart.animateStop()
	iconHeart.animate
			properties: {scale: 1}
			curve: 'spring'
			curveOptions:
				velocity: 5
				friction: 50
				tension: 200
			time: 0.1

btnLikeLayer.on Events.Click, ->
	currentNum = Number(likeNumText.html)
	likeNumText.html = currentNum + 1
# 	effectPop(iconHeart)
	
# ====== END OF LIKE BUTTON ====== #	



# ====== @CAMERA ====== #

pageShooting = timelyLayers.pageShooting
pageShooting.y = deviceHeight

pageShooting.states.add('show', {y:0})
	
pageShooting.states.animationOptions =
    curve: "spring(100, 15, 0)"
    curveOptions:
    	velocity: 5
		tension: 100
		friction: 200	

btnCloseShootLayer = timelyLayers.btnCloseShoot

# Camera Button
camBtnWidth = camBtnHeight = 168

camLayer = new Layer
	width: camBtnWidth
	height: camBtnHeight
	x: deviceWidth - camBtnWidth - 48
	maxY: navigationBarLayer.minY - 48
	backgroundColor: themeGreen
	
camLayer.style = 
	borderRadius: '50%'
	boxShadow: '0 16px 16px rgba(0,0,0,.24)'

btnCamLayer.superLayer = camLayer	
btnCamLayer.center()

# Hide camera button on scroll
camInitY = camLayer.y

contentLayer.on Events.DragMove, ->
	
	if contentLayer.draggable.calculateVelocity().y < 0
		camLayer.animate
			properties: { y: navigationBar.y}
			time: 0.2
# 		actionBar.animate
# 			properties: {y: -actionBar.height + statusBar.height}
# 			time: 0.2
	else if contentLayer.draggable.calculateVelocity().y > 0
		camLayer.animate
			properties: { y: camInitY}
			time: 0.2
# 		actionBar.animate
# 			properties: {y: 0}
# 			time: 0.2

addWave(camLayer)

# Simulate the expansion of camLayer
greenWaveLayer = new Layer
	midX: camLayer.midX
	midY: camLayer.midY
	width: deviceHeight
	height: deviceHeight
	scale: 0
	backgroundColor: themeGreen
	
greenWaveLayer.borderRadius = '50%'

camLayer.on Events.TouchStart, ->
	camLayer.style.boxShadow = 'none'

camLayer.on Events.Click, ->
	camLayer.bringToFront()
	
	Utils.delay 0.4, ->
		waveAni = greenWaveLayer.animate
			properties:
				scale: 2
			time: 0.4
			
		waveAni.on 'stop', ->
			Utils.delay 0.3, ->
				pageShooting.bringToFront()
				pageShooting.states.switch('show')

actionBar     = seperateLayer(actionBarLayer)
navigationBar = seperateLayer(navigationBarLayer)
statusBar     = seperateLayer(statusBarLayer)

navigationBar.bringToFront()

addWave(btnCloseShootLayer)
btnCloseShootLayer.on Events.Click, ->
	greenWaveLayer.scale = 0
	camLayer.style.boxShadow = '0 16px 16px rgba(0,0,0,.24)'
	pageShooting.states.switch('default')


# ====== END OF CAMERA ====== #



# ====== @COMMENT ====== #

photoLayer = timelyLayers.photo
commentLayer = timelyLayers.comment
commentLayer.superLayer = photoLayer
commentLayer.states.add
	hidden: {visible: true}
	show: {visible: true}
	
commentLayer.states.animationOptions =
	curve: 'spring'
	curveOptions:
		velocity: 20
		tension: 200
		friction: 25
	time: 0.05
	
commentLayer.scale = 0
commentLayer.states.switchInstant('hidden')

commentLabelWidth = 394

commentLabel = new Layer
	width: 0
	height: 76
	borderRadius: 38
	backgroundColor: 'rgba(0,0,0,.6)'
	x: commentLayer.midX
	midY: commentLayer.midY
	superLayer: photoLayer
	
commentLabel.style = 
	overflow: 'hidden'
	color: themeGreen
	fontSize: '42px'
	lineHeight: commentLabel.height + 'px'
	textAlign: 'center'
	
commentText = new Layer
	superLayer: commentLabel
	width: commentLabelWidth
	backgroundColor: 'transparent'

commentText.html = 'Am I pretty today?'

commentLabel.placeBehind(commentLayer)

photoLayer.on Events.Click, ->
	commentLayer.animateStop()
	commentLayer.states.next(['show','hidden'])
	if commentLayer.states.current == 'hidden'
	
		dotAni = commentLayer.animate
			properties: {scale: 0}
# 			curve: 'linear'
# 			curveOptions: dotAniCurveOptions
			time: 0.05
			
		dotAni.on 'stop', ->
			labelAni = commentLabel.animate
					properties: {width: 0}
					time: 0.08
		
	else if commentLayer.states.current == 'show'
	
		dotAni = commentLayer.animate
			properties: {scale: 1}
# 			curve: 'linear'
# 			curveOptions: dotAniCurveOptions
			time: 0.05
		
		dotAni.on 'stop', ->
			labelAni = commentLabel.animate
				properties: {width: commentLabelWidth}
				time: 0.08

contentLayer.on Events.DragMove, ->
	if contentLayer.y == -200
		return
		
# ====== END OF COMMENT ====== #