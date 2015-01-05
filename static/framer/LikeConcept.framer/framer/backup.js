(function() {
  var bg, dragLayer, heartLayer, heartLayerFixed, initHeartScaleRatio, initTextSize, initTextY, startY, textLayer;

  bg = new BackgroundLayer({
    backgroundColor: 'white'
  });

  initHeartScaleRatio = 0.1;

  initTextY = 80;

  initTextSize = 60;

  heartLayerFixed = new Layer({
    width: 640,
    height: 640,
    image: "images/heart.png",
    scale: initHeartScaleRatio
  });

  heartLayerFixed.center();

  heartLayer = heartLayerFixed.copy();

  heartLayer.opacity = 0.15;

  textLayer = new Layer({
    width: 640,
    y: initTextY,
    opacity: 0,
    backgroundColor: 'transparent'
  });

  textLayer.centerX();

  textLayer.style = {
    textAlign: 'center',
    color: '#F15A5C',
    fontSize: initTextSize + 'px',
    overflow: 'visible'
  };

  textLayer.html = '+0';

  dragLayer = new Layer({
    backgroundColor: 'transparent'
  });

  dragLayer.center();

  startY = dragLayer.y;

  dragLayer.draggable.enabled = true;

  dragLayer.draggable.speedX = 0;

  dragLayer.on(Events.TouchStart, function() {
    heartLayerFixed.animateStop();
    return heartLayerFixed.animate({
      properties: {
        scale: 0.13
      },
      curve: 'spring',
      curveOptions: {
        velocity: 5,
        friction: 50,
        tension: 500
      },
      time: 0.1
    });
  });

  dragLayer.on(Events.TouchEnd, function() {
    heartLayerFixed.animateStop();
    return heartLayerFixed.animate({
      properties: {
        scale: 0.1
      },
      curve: 'spring',
      curveOptions: {
        velocity: 5,
        friction: 50,
        tension: 500
      },
      time: 0.1
    });
  });

  dragLayer.on(Events.DragStart, function() {
    textLayer.html = '+0';
    return textLayer.animate({
      properties: {
        y: initTextY - 20,
        opacity: 1
      },
      time: 0.2
    });
  });

  dragLayer.on(Events.DragMove, function() {
    var ratio;
    ratio = (startY - dragLayer.y) / 100;
    if (ratio >= initHeartScaleRatio) {
      heartLayer.scale = ratio;
    }
    if (ratio >= 1) {
      heartLayer.scale = 1;
    }
    textLayer.html = '+' + Math.ceil(Utils.modulate(heartLayer.scale, [initHeartScaleRatio, 1], [0, 32]));
    return textLayer.style = {
      fontSize: Math.floor(Utils.modulate(heartLayer.scale, [initHeartScaleRatio, 1], [1, 2]) * initTextSize) + 'px'
    };
  });

  dragLayer.on(Events.DragEnd, function() {
    this.animate({
      properties: {
        y: startY
      },
      curve: 'spring',
      curveOptions: {
        tension: 500,
        velocity: 10,
        friction: 20
      },
      time: 2
    });
    heartLayer.animate({
      properties: {
        scale: initHeartScaleRatio
      },
      curve: 'spring',
      curveOptions: {
        tension: 500,
        velocity: 10,
        friction: 50
      },
      time: 2
    });
    return textLayer.animate({
      properties: {
        y: initTextY,
        opacity: 0
      },
      time: 0.8
    });
  });

}).call(this);
