(function() {
  var HammerEvents, HammerLayer, actionBar, actionBarLayer, actionsLayer, addText, addWave, bg, btnCamLayer, btnCloseShootLayer, btnLikeLayer, camBtnHeight, camBtnWidth, camInitY, camLayer, card2Layer, cardLayer, commentLabel, commentLabelWidth, commentLayer, commentText, contentLayer, deviceHeight, deviceWidth, dpToPx, effectPop, greenWaveLayer, iconHeart, iconHeartLayer, iconHeartRedLayer, inv, likeNumText, makeAttach, makeScrollable, makeScrollableList, navigationBar, navigationBarLayer, pageShooting, photoLayer, refreshBar, seperateLayer, statusBar, statusBarLayer, themeGreen, timelyLayers,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  timelyLayers = Framer.Importer.load("imported/TimelyFramer");

  deviceWidth = 1080;

  deviceHeight = 1920;

  themeGreen = '#05BF03';

  bg = new BackgroundLayer({
    backgroundColor: '#eee'
  });

  HammerEvents = {
    Tap: "tap",
    DoubleTap: "doubletap",
    Hold: "hold",
    Touch: "touch",
    Release: "release",
    Gesture: "gesture",
    Swipe: "swipe",
    SwipeUp: "swipeup",
    SwipeDown: "swipedown",
    SwipeLeft: "swipeleft",
    SwipeRight: "swiperight",
    Transform: "transform",
    TransformStart: "transformstart",
    TransformEnd: "transformend",
    Rotate: "rotate",
    Pinch: "pinch",
    PinchIn: "pinchin",
    PinchOut: "pinchout"
  };

  window.Events = _.extend(Events, HammerEvents);

  HammerLayer = (function(_super) {
    __extends(HammerLayer, _super);

    function HammerLayer() {
      return HammerLayer.__super__.constructor.apply(this, arguments);
    }

    HammerLayer.prototype.on = function(eventName, f) {
      var hammer;
      if (__indexOf.call(_.values(HammerEvents), eventName) >= 0) {
        this.ignoreEvents = false;
        return hammer = Hammer(this._element).on(eventName, f);
      } else {
        return HammerLayer.__super__.on.call(this, eventName, f);
      }
    };

    return HammerLayer;

  })(Framer.Layer);

  window.Layer = HammerLayer;

  dpToPx = function(dp, isAddPxUnit, res) {
    var px;
    if (isAddPxUnit == null) {
      isAddPxUnit = false;
    }
    if (res == null) {
      res = 2;
    }
    px = dp * res;
    if (isAddPxUnit) {
      px += 'px';
    }
    return px;
  };

  addWave = function(ele, waveColor, animateTime) {
    var size, waveAni, waveLayer;
    if (waveColor == null) {
      waveColor = 'rgba(255, 255, 255, .2)';
    }
    if (animateTime == null) {
      animateTime = 0.05;
    }
    ele.style.overflow = 'hidden';
    size = ele.width > ele.height ? ele.width : ele.height;
    waveLayer = new Layer({
      superLayer: ele,
      width: size,
      height: size,
      backgroundColor: waveColor,
      scale: 0
    });
    waveLayer.style = {
      borderRadius: '50%'
    };
    waveLayer.center();
    waveLayer.sendToBack();
    waveAni = new Animation;
    ele.on(Events.TouchStart, function() {
      waveLayer.animateStop();
      return waveAni = waveLayer.animate({
        properties: {
          scale: 1,
          opacity: 1
        },
        time: animateTime
      });
    });
    ele.on(Events.TouchEnd, function() {
      var waveEndAni;
      waveLayer.animateStop();
      return waveEndAni = waveLayer.animate({
        properties: {
          scale: 0,
          opacity: 0
        },
        time: animateTime
      });
    });
    return waveLayer;
  };

  effectPop = function(ele, scale, time, velocity, friction, tension) {
    var curveOptions, enlarge;
    if (scale == null) {
      scale = 1.5;
    }
    if (time == null) {
      time = 0.2;
    }
    if (velocity == null) {
      velocity = 5;
    }
    if (friction == null) {
      friction = 40;
    }
    if (tension == null) {
      tension = 500;
    }
    curveOptions = {
      velocity: velocity,
      friction: friction,
      tension: tension
    };
    enlarge = ele.animate({
      properties: {
        scale: scale
      },
      curve: 'spring',
      curveOptions: curveOptions,
      time: time
    });
    return enlarge.on('stop', function() {
      return ele.animate({
        properties: {
          scale: 1
        },
        curve: 'spring',
        curveOptions: curveOptions,
        time: time
      });
    });
  };

  seperateLayer = function(ele, isBringtoFront, deleteOriginalEle) {
    var holderLayer;
    if (isBringtoFront == null) {
      isBringtoFront = true;
    }
    if (deleteOriginalEle == null) {
      deleteOriginalEle = false;
    }
    holderLayer = new Layer({
      x: ele.x,
      y: ele.y,
      width: ele.width,
      height: ele.height,
      backgroundColor: 'transparent'
    });
    holderLayer.addSubLayer(ele);
    ele.x = ele.y = 0;
    if (isBringtoFront) {
      holderLayer.bringToFront();
    }
    if (deleteOriginalEle) {
      ele.destroy();
    }
    return holderLayer;
  };

  statusBarLayer = timelyLayers.statusBar;

  actionBarLayer = timelyLayers.actionBar;

  navigationBarLayer = timelyLayers.navigationBar;

  if (Utils.isMobile()) {
    statusBarLayer.visible = false;
    Framer.Device.contentScale = 0.5;
  }

  cardLayer = timelyLayers.card;

  btnCamLayer = timelyLayers.btnCamera;

  contentLayer = new Layer({
    width: deviceWidth,
    y: actionBarLayer.maxY,
    height: cardLayer.height * 2 + 100,
    backgroundColor: 'transparent'
  });

  cardLayer.superLayer = contentLayer;

  cardLayer.centerX();

  cardLayer.y = 32;

  card2Layer = cardLayer.copy();

  card2Layer.y = cardLayer.maxY + 16;

  contentLayer.addSubLayer(card2Layer);

  refreshBar = new Layer({
    width: deviceWidth,
    height: 16,
    y: actionBarLayer.maxY,
    scaleX: 0,
    backgroundColor: themeGreen
  });

  makeScrollable = function(ele) {
    ele.draggable.enabled = true;
    ele.draggable.speedX = 0;
    return ele;
  };

  makeAttach = function(ele, displayHeight, offsetTop, offsetBottom, animationTime) {
    var curveOptions, initY, tolerantBottom, tolerantTop;
    if (offsetTop == null) {
      offsetTop = 0;
    }
    if (offsetBottom == null) {
      offsetBottom = 0;
    }
    if (animationTime == null) {
      animationTime = 0.4;
    }
    initY = ele.y;
    tolerantTop = initY + offsetTop;
    tolerantBottom = ele.height + offsetBottom - displayHeight - initY;
    curveOptions = {
      velocity: 5,
      tension: 300,
      friction: 25
    };
    return ele.on(Events.DragEnd, function() {
      var animateY;
      animateY = ele.y;
      if (ele.y > tolerantTop) {
        animateY = tolerantTop;
      } else if (ele.y < -tolerantBottom) {
        animateY = -tolerantBottom;
      }
      return ele.animate({
        properties: {
          y: animateY
        },
        curve: 'spring',
        curveOptions: curveOptions,
        time: animationTime
      });
    });
  };

  makeScrollableList = function(ele, displayHeight, offsetTop, offsetBottom) {
    var initY, tolerantBottom, tolerantTop;
    if (offsetTop == null) {
      offsetTop = 100;
    }
    if (offsetBottom == null) {
      offsetBottom = 100;
    }
    ele = makeScrollable(ele);
    initY = ele.y;
    tolerantTop = initY + offsetTop;
    tolerantBottom = ele.height + offsetBottom - displayHeight - initY;
    ele.on(Events.DragMove, function() {
      if (ele.y > initY) {
        refreshBar.scaleX = Utils.modulate(ele.y, [initY, offsetTop + initY], [0, 1], true);
      }
      if (ele.y >= tolerantTop) {
        return ele.y = tolerantTop;
      } else if (ele.y <= -tolerantBottom) {
        return ele.y = -tolerantBottom;
      }
    });
    ele.on(Events.DragEnd, function() {
      return refreshBar.animate({
        properties: {
          scaleX: 0
        },
        curve: 'ease-in-out',
        time: 0.2
      });
    });
    makeAttach(ele, displayHeight);
    return ele;
  };

  makeScrollableList(contentLayer, deviceHeight - actionBarLayer.height - navigationBarLayer.height, 200, 200);

  btnLikeLayer = timelyLayers.btnLike;

  actionsLayer = timelyLayers.actions;

  iconHeartLayer = timelyLayers.iconHeart;

  iconHeartRedLayer = timelyLayers.iconHeartRed;

  iconHeart = seperateLayer(iconHeartLayer);

  iconHeart.superLayer = btnLikeLayer;

  addWave(btnLikeLayer, 'rgba(0,0,0,.04)', 0.1);

  likeNumText = new Layer({
    superLayer: btnLikeLayer,
    backgroundColor: 'transparent',
    x: 110
  });

  likeNumText.centerY();

  likeNumText.html = 431;

  likeNumText.style = {
    fontSize: '42px',
    lineHeight: likeNumText.height + 'px',
    color: '#444',
    fontWeight: '100'
  };

  addText = new Layer({
    superLayer: cardLayer,
    maxY: 1260,
    x: iconHeart.x,
    height: 62,
    backgroundColor: 'transparent'
  });

  addText.style = {
    fontSize: '62px',
    lineHeight: '62px',
    color: '#EF2525',
    textAlign: 'center'
  };

  addText.html = '1';

  addText.opacity = 0;

  inv = false;

  btnLikeLayer.on(Events.Hold, function(event) {
    iconHeartRedLayer.opacity = 0;
    iconHeartRedLayer.scale = 0.3;
    iconHeartRedLayer.visible = true;
    addText.animate({
      properties: {
        opacity: 1,
        maxY: 1240
      },
      time: 0.2
    });
    inv = Utils.interval(0.12, function() {
      if (addText.html < 32) {
        addText.html++;
        addText.scale += 0.03;
        return addText.maxY--;
      }
    });
    return iconHeartRedLayer.animate({
      properties: {
        scale: 1,
        opacity: 0.6
      },
      time: 3.84
    });
  });

  btnLikeLayer.on(Events.Release, function() {
    var currentNum, heartAni;
    currentNum = Number(addText.html);
    addText.html = currentNum;
    clearInterval(inv);
    likeNumText.html = Number(likeNumText.html) + Number(currentNum);
    effectPop(likeNumText);
    iconHeartRedLayer.animateStop();
    heartAni = iconHeartRedLayer.animate({
      properties: {
        scale: 0.3,
        opacity: 0
      },
      time: 0.5
    });
    return heartAni.on('stop', function() {
      return addText.animate({
        properties: {
          scale: 1,
          opacity: 0,
          maxY: 1260
        },
        time: 0.6
      });
    });
  });

  btnLikeLayer.on(Events.TouchStart, function() {
    iconHeartLayer.image = iconHeartRedLayer.image;
    iconHeart.animateStop();
    return iconHeart.animate({
      properties: {
        scale: 1.5
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

  btnLikeLayer.on(Events.TouchEnd, function() {
    iconHeart.animateStop();
    return iconHeart.animate({
      properties: {
        scale: 1
      },
      curve: 'spring',
      curveOptions: {
        velocity: 5,
        friction: 50,
        tension: 200
      },
      time: 0.1
    });
  });

  btnLikeLayer.on(Events.Click, function() {
    var currentNum;
    currentNum = Number(likeNumText.html);
    return likeNumText.html = currentNum + 1;
  });

  pageShooting = timelyLayers.pageShooting;

  pageShooting.y = deviceHeight;

  pageShooting.states.add('show', {
    y: 0
  });

  pageShooting.states.animationOptions = {
    curve: "spring(100, 15, 0)",
    curveOptions: {
      velocity: 5
    }
  };

  ({
    tension: 100,
    friction: 200
  });

  btnCloseShootLayer = timelyLayers.btnCloseShoot;

  camBtnWidth = camBtnHeight = 168;

  camLayer = new Layer({
    width: camBtnWidth,
    height: camBtnHeight,
    x: deviceWidth - camBtnWidth - 48,
    maxY: navigationBarLayer.minY - 48,
    backgroundColor: themeGreen
  });

  camLayer.style = {
    borderRadius: '50%',
    boxShadow: '0 16px 16px rgba(0,0,0,.24)'
  };

  btnCamLayer.superLayer = camLayer;

  btnCamLayer.center();

  camInitY = camLayer.y;

  contentLayer.on(Events.DragMove, function() {
    if (contentLayer.draggable.calculateVelocity().y < 0) {
      return camLayer.animate({
        properties: {
          y: navigationBar.y
        },
        time: 0.2
      });
    } else if (contentLayer.draggable.calculateVelocity().y > 0) {
      return camLayer.animate({
        properties: {
          y: camInitY
        },
        time: 0.2
      });
    }
  });

  addWave(camLayer);

  greenWaveLayer = new Layer({
    midX: camLayer.midX,
    midY: camLayer.midY,
    width: deviceHeight,
    height: deviceHeight,
    scale: 0,
    backgroundColor: themeGreen
  });

  greenWaveLayer.borderRadius = '50%';

  camLayer.on(Events.TouchStart, function() {
    return camLayer.style.boxShadow = 'none';
  });

  camLayer.on(Events.Click, function() {
    camLayer.bringToFront();
    return Utils.delay(0.4, function() {
      var waveAni;
      waveAni = greenWaveLayer.animate({
        properties: {
          scale: 2
        },
        time: 0.4
      });
      return waveAni.on('stop', function() {
        return Utils.delay(0.3, function() {
          pageShooting.bringToFront();
          return pageShooting.states["switch"]('show');
        });
      });
    });
  });

  actionBar = seperateLayer(actionBarLayer);

  navigationBar = seperateLayer(navigationBarLayer);

  statusBar = seperateLayer(statusBarLayer);

  navigationBar.bringToFront();

  addWave(btnCloseShootLayer);

  btnCloseShootLayer.on(Events.Click, function() {
    greenWaveLayer.scale = 0;
    camLayer.style.boxShadow = '0 16px 16px rgba(0,0,0,.24)';
    return pageShooting.states["switch"]('default');
  });

  photoLayer = timelyLayers.photo;

  commentLayer = timelyLayers.comment;

  commentLayer.superLayer = photoLayer;

  commentLayer.states.add({
    hidden: {
      visible: true
    },
    show: {
      visible: true
    }
  });

  commentLayer.states.animationOptions = {
    curve: 'spring',
    curveOptions: {
      velocity: 20,
      tension: 200,
      friction: 25
    },
    time: 0.05
  };

  commentLayer.scale = 0;

  commentLayer.states.switchInstant('hidden');

  commentLabelWidth = 394;

  commentLabel = new Layer({
    width: 0,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(0,0,0,.6)',
    x: commentLayer.midX,
    midY: commentLayer.midY,
    superLayer: photoLayer
  });

  commentLabel.style = {
    overflow: 'hidden',
    color: themeGreen,
    fontSize: '42px',
    lineHeight: commentLabel.height + 'px',
    textAlign: 'center'
  };

  commentText = new Layer({
    superLayer: commentLabel,
    width: commentLabelWidth,
    backgroundColor: 'transparent'
  });

  commentText.html = 'Am I pretty today?';

  commentLabel.placeBehind(commentLayer);

  photoLayer.on(Events.Click, function() {
    var dotAni;
    commentLayer.animateStop();
    commentLayer.states.next(['show', 'hidden']);
    if (commentLayer.states.current === 'hidden') {
      dotAni = commentLayer.animate({
        properties: {
          scale: 0
        },
        time: 0.05
      });
      return dotAni.on('stop', function() {
        var labelAni;
        return labelAni = commentLabel.animate({
          properties: {
            width: 0
          },
          time: 0.08
        });
      });
    } else if (commentLayer.states.current === 'show') {
      dotAni = commentLayer.animate({
        properties: {
          scale: 1
        },
        time: 0.05
      });
      return dotAni.on('stop', function() {
        var labelAni;
        return labelAni = commentLabel.animate({
          properties: {
            width: commentLabelWidth
          },
          time: 0.08
        });
      });
    }
  });

  contentLayer.on(Events.DragMove, function() {
    if (contentLayer.y === -200) {

    }
  });

}).call(this);
