# This imports all the layers for "Timely iOS" into timelyIosLayers
timelyIosLayers = Framer.Importer.load "imported/Timely iOS"

DEVICE_HEIGHT = 1334
DEVICE_WIDTH = 750

cardContainer = timelyIosLayers.cardContainer
btnCam = timelyIosLayers.btnCam
iconCam = timelyIosLayers.iconCam
pageCamera = timelyIosLayers.pageCamera
redCircle = timelyIosLayers.redCircle
btnCloseCamera = timelyIosLayers.btnCloseCamera

btnCam.visible = false
pageCamera.y = DEVICE_HEIGHT
redCircle.visible = false



bg = new BackgroundLayer	backgroundColor: '#fafafa'

btn = new Layer
	backgroundColor: '#FC4C51'
	borderRadius: 4
btn.frame = btnCam.frame
btn.height += 4

iconCam.superLayer = btn
iconCam.center()
iconCamOriginalY = iconCam.y


showCamera = ->
	iconCam.animate
		properties:
			y: btnCam.height * 2
		curve: 'ease-in-out'
		time: 0.2
		
	btn.animate
		properties: 
			midY: DEVICE_HEIGHT / 2
			height: btnCam.width
			borderRadius: btnCam.width / 2
		curve: 'spring(200, 12, 10)'
	
	btnScaleAnimation = 	
	btn.animate
		properties:
			scale: 12
		curve: 'ease-in-out'
		time: 0.2
		delay: 0.4
	
	btnScaleAnimation.on 'stop', ->	
		pageCamera.y = 0
		
		Utils.delay 0.15, ->
			
			btn.animate
				properties: 
					scale: 1			
					width: redCircle.width
					height: redCircle.height
				curve: 'ease-in-out'
				time: 0.22
	
							
			btn.animate
				properties:
					y: redCircle.y
					x: redCircle.x
				curve: 'spring(200, 14, 0)'
				delay: 0.15
				
			btn.pixelAlign()
			
			
closeCamera = ->
	pageCamera.animate
		properties:
			y: DEVICE_HEIGHT
		curve: 'ease-in-out'
		time: 0.25
		
	btn.animate
		properties:
			width: btnCam.width
			height: btnCam.height + 4
			y: btnCam.y
			x: btnCam.x
			borderRadius: 4
		curve: 'ease-in-out'
		time: 0.15
		delay: 0.1
		
	iconCam.animate
		properties:
			y: iconCamOriginalY
		curve: 'ease-in-out'
		time: 0.2
		delay: 0.2
	

btn.on Events.Click, ->
	showCamera()
	
btnCloseCamera.on Events.Click, ->
	closeCamera()