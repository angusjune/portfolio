(function() {
  var DEVICE_HEIGHT, DEVICE_WIDTH, bg, btn, btnCam, btnCloseCamera, cardContainer, closeCamera, iconCam, iconCamOriginalY, pageCamera, redCircle, showCamera, timelyIosLayers;

  timelyIosLayers = Framer.Importer.load("imported/Timely iOS");

  DEVICE_HEIGHT = 1334;

  DEVICE_WIDTH = 750;

  cardContainer = timelyIosLayers.cardContainer;

  btnCam = timelyIosLayers.btnCam;

  iconCam = timelyIosLayers.iconCam;

  pageCamera = timelyIosLayers.pageCamera;

  redCircle = timelyIosLayers.redCircle;

  btnCloseCamera = timelyIosLayers.btnCloseCamera;

  btnCam.visible = false;

  pageCamera.y = DEVICE_HEIGHT;

  redCircle.visible = false;

  bg = new BackgroundLayer({
    backgroundColor: '#fafafa'
  });

  btn = new Layer({
    backgroundColor: '#FC4C51',
    borderRadius: 4
  });

  btn.frame = btnCam.frame;

  btn.height += 4;

  iconCam.superLayer = btn;

  iconCam.center();

  iconCamOriginalY = iconCam.y;

  showCamera = function() {
    var btnScaleAnimation;
    iconCam.animate({
      properties: {
        y: btnCam.height * 2
      },
      curve: 'ease-in-out',
      time: 0.2
    });
    btn.animate({
      properties: {
        midY: DEVICE_HEIGHT / 2,
        height: btnCam.width,
        borderRadius: btnCam.width / 2
      },
      curve: 'spring(200, 12, 10)'
    });
    btnScaleAnimation = btn.animate({
      properties: {
        scale: 12
      },
      curve: 'ease-in-out',
      time: 0.2,
      delay: 0.4
    });
    return btnScaleAnimation.on('stop', function() {
      pageCamera.y = 0;
      return Utils.delay(0.15, function() {
        btn.animate({
          properties: {
            scale: 1,
            width: redCircle.width,
            height: redCircle.height
          },
          curve: 'ease-in-out',
          time: 0.22
        });
        btn.animate({
          properties: {
            y: redCircle.y,
            x: redCircle.x
          },
          curve: 'spring(200, 14, 0)',
          delay: 0.15
        });
        return btn.pixelAlign();
      });
    });
  };

  closeCamera = function() {
    pageCamera.animate({
      properties: {
        y: DEVICE_HEIGHT
      },
      curve: 'ease-in-out',
      time: 0.25
    });
    btn.animate({
      properties: {
        width: btnCam.width,
        height: btnCam.height + 4,
        y: btnCam.y,
        x: btnCam.x,
        borderRadius: 4
      },
      curve: 'ease-in-out',
      time: 0.15,
      delay: 0.1
    });
    return iconCam.animate({
      properties: {
        y: iconCamOriginalY
      },
      curve: 'ease-in-out',
      time: 0.2,
      delay: 0.2
    });
  };

  btn.on(Events.Click, function() {
    return showCamera();
  });

  btnCloseCamera.on(Events.Click, function() {
    return closeCamera();
  });

}).call(this);
