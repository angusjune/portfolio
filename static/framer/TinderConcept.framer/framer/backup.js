(function() {
  var CARD_HEIGHT, CARD_HEIGHT_EXPANDED, CARD_WIDTH, DEVICE_HEIGHT, DEVICE_WIDTH, PHOTO_NUM, THEME, bg, card, cards, comments, commentsCopy, commentsOriginalMaxY, i, initCard, layers, like, likeCopy, nextCard, nope, nopeCopy, nums, numsCopy, numsHolder, originalMidX, originalX, originalY, photo1, photo2, photo3, photo4, photos, repositionCards, restart, restartOriginalX, restartOriginalY, springCurve, topBar, topBarHolder, _i, _ref;

  layers = Framer.Importer.load("imported/TinderConcept");

  DEVICE_WIDTH = 750;

  DEVICE_HEIGHT = 1334;

  CARD_WIDTH = 686;

  CARD_HEIGHT = 784;

  CARD_HEIGHT_EXPANDED = 1349;

  THEME = '#EDDBB5';

  springCurve = "spring(200,20,10)";

  photo1 = layers.photo1;

  photo2 = layers.photo2;

  photo3 = layers.photo3;

  photo4 = layers.photo4;

  comments = layers.comments;

  like = layers.like;

  nope = layers.nope;

  nums = layers.nums;

  topBar = layers.topBar;

  photos = [photo1, photo2, photo3, photo4];

  cards = [];

  bg = new BackgroundLayer({
    backgroundColor: "#323232"
  });

  restart = new Layer({
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'transparent',
    borderRadius: 8,
    y: DEVICE_HEIGHT
  });

  restart.style = {
    border: '6px solid ' + THEME,
    color: THEME,
    fontSize: '68px',
    lineHeight: '88px',
    textAlign: 'center',
    paddingTop: '300px'
  };

  restart.html = 'SWIPE TO VIEW MORE';

  restart.center();

  restartOriginalX = restart.x;

  restartOriginalY = restart.y;

  restart.y = DEVICE_HEIGHT;

  topBarHolder = new Layer({
    backgroundColor: '#333333',
    shadowColor: 'rgba(0, 0, 0 ,.1)'
  });

  topBarHolder.frame = topBar.frame;

  topBar.superLayer = topBarHolder;

  topBarHolder.states.add({
    shadowed: {
      shadowBlur: 8,
      shadowSpread: 4,
      shadowY: 2
    }
  });

  topBarHolder.states.animationOptions = {
    curve: springCurve
  };

  PHOTO_NUM = photos.length;

  commentsOriginalMaxY = comments.maxY;

  for (i = _i = 0, _ref = PHOTO_NUM - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    card = new Layer({
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      z: 100,
      borderRadius: 8,
      backgroundColor: '#424242',
      shadowColor: 'rgba(0,0,0,0.1)',
      shadowBlur: 20,
      shadowX: 0,
      shadowY: 0,
      shadowSpread: 4
    });
    numsHolder = new Layer({
      y: photo1.maxY,
      width: CARD_WIDTH,
      height: CARD_HEIGHT - photo1.height,
      backgroundColor: '#424242',
      superLayer: card
    });
    numsHolder.style.borderRadius = '0 0 8px 8px';
    likeCopy = like.copy();
    nopeCopy = nope.copy();
    commentsCopy = comments.copy();
    numsCopy = nums.copy();
    numsCopy.x = 32;
    numsCopy.y = 36;
    likeCopy.name = 'like';
    nopeCopy.name = 'nope';
    commentsCopy.name = 'comments';
    numsCopy.name = 'nums';
    photos[i].superLayer = card;
    likeCopy.superLayer = card;
    nopeCopy.superLayer = card;
    commentsCopy.superLayer = card;
    numsCopy.superLayer = numsHolder;
    numsHolder.bringToFront();
    commentsCopy.placeBehind(photos[i]);
    likeCopy.opacity = 0;
    nopeCopy.opacity = 0;
    card.draggable.enabled = true;
    card.center();
    originalX = card.x;
    originalY = card.y;
    originalMidX = card.midX;
    cards[i] = card;
    card.on(Events.DragStart, function() {
      this.dragStartY = this.y;
      return this.dragStartX = this.x;
    });
    card.on(Events.DragMove, function() {
      var cardHeight, cardRotationX, cardRotationY, cardRotationZ, commentsMaxY, likeOpacity, nopeOpacity, velocity;
      velocity = this.draggable.calculateVelocity();
      cardRotationY = Utils.modulate(velocity.x, [-5, 5], [-15, 15], true);
      cardRotationX = Utils.modulate(velocity.y, [-5, 5], [-15, 15], true);
      this.shadowX = (this.x - this.dragStartX) * -0.125;
      this.shadowY = (this.y - this.dragStartY) * -0.125;
      if (this.y <= topBar.maxY) {
        topBarHolder.states["switch"]('shadowed');
      } else {
        topBarHolder.states["switch"]('default');
      }
      if (this.midX < originalMidX) {
        cardRotationZ = Utils.modulate(this.midX, [originalMidX, 0], [0, -10], true);
        this.rotationZ = cardRotationZ;
        nopeOpacity = Utils.modulate(this.midX, [originalMidX, 20], [0, 1], true);
        this.subLayersByName('nope')[0].opacity = nopeOpacity;
        if (nopeOpacity === 1) {
          this.subLayersByName('nope')[0].animate({
            properties: {
              scale: 1.2
            },
            curve: 'spring(200, 8, 10)'
          });
        } else {
          this.subLayersByName('nope')[0].animate({
            properties: {
              scale: 1
            },
            curve: springCurve
          });
        }
      } else if (this.midX > originalMidX) {
        cardRotationZ = Utils.modulate(this.midX, [originalMidX, DEVICE_WIDTH], [0, 10], true);
        this.rotationZ = cardRotationZ;
        likeOpacity = Utils.modulate(this.midX, [originalMidX, DEVICE_WIDTH - 20], [0, 1], true);
        this.subLayersByName('like')[0].opacity = likeOpacity;
        if (likeOpacity === 1) {
          this.subLayersByName('like')[0].animate({
            properties: {
              scale: 1.2
            },
            curve: 'spring(200, 8, 10)'
          });
        } else {
          this.subLayersByName('like')[0].animate({
            properties: {
              scale: 1
            },
            curve: springCurve
          });
        }
      }
      if (this.y < originalY) {
        cardHeight = Utils.modulate(this.y, [originalY - 50, 0], [CARD_HEIGHT, CARD_HEIGHT_EXPANDED], true);
        commentsMaxY = Utils.modulate(this.y, [originalY - 50, 0], [commentsOriginalMaxY, CARD_HEIGHT_EXPANDED - 16], true);
        this.height = cardHeight;
        return this.subLayersByName('comments')[0].animate({
          properties: {
            maxY: commentsMaxY
          },
          curve: springCurve,
          time: 0.2
        });
      }
    });
    cards[i].on(Events.DragEnd, function() {
      var index;
      if (this.height >= CARD_HEIGHT + 150) {
        this.animate({
          properties: {
            height: CARD_HEIGHT_EXPANDED,
            maxY: DEVICE_HEIGHT - 16,
            rotation: 0,
            shadowX: 0,
            shadowY: 0,
            x: originalX
          },
          curve: springCurve
        });
        this.subLayersByName('nope')[0].animate({
          properties: {
            opacity: 0,
            scale: 1
          },
          curve: springCurve
        });
        this.subLayersByName('like')[0].animate({
          properties: {
            opacity: 0,
            scale: 1
          },
          curve: springCurve
        });
        this.subLayersByName('comments')[0].animate({
          properties: {
            maxY: CARD_HEIGHT_EXPANDED - 16
          },
          curve: springCurve
        });
      }
      if (this.midX >= DEVICE_WIDTH - 20) {
        this.animate({
          properties: {
            x: DEVICE_WIDTH + 100,
            y: this.y + 100,
            rotationZ: 15
          },
          curve: 'spring(300,30,0)'
        });
      } else if (this.midX <= 20) {
        this.animate({
          properties: {
            maxX: -100,
            y: this.y + 100,
            rotationZ: -15
          },
          curve: 'spring(300,30,0)'
        });
      } else if (this.midX > 20 && this.midX < DEVICE_WIDTH - 20 && this.height < CARD_HEIGHT + 150) {
        initCard(this, originalY);
      }
      if (this.midX <= 20 || this.midX >= DEVICE_WIDTH - 20) {
        index = cards.indexOf(this);
        return nextCard(index, originalY);
      }
    });
    if (i > 0) {
      cards[i].y = DEVICE_HEIGHT + 50;
    }
  }

  like.visible = nope.visible = comments.visible = nums.visible = false;

  nextCard = function(i, y) {
    cards[i].animate({
      properties: {
        height: CARD_HEIGHT
      },
      curve: springCurve
    });
    if (i < PHOTO_NUM - 1) {
      cards[i + 1].centerX();
      cards[i + 1].rotation = 0;
      return cards[i + 1].animate({
        properties: {
          y: y
        },
        curve: springCurve
      });
    } else {
      restart.centerX();
      return restart.animate({
        properties: {
          y: y
        },
        curve: springCurve
      });
    }
  };

  initCard = function(card, y) {
    var animation;
    animation = card.animate({
      properties: {
        x: originalX,
        y: y,
        height: CARD_HEIGHT,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        shadowX: 0,
        shadowY: 0
      },
      curve: springCurve
    });
    card.subLayersByName('comments')[0].animate({
      properties: {
        maxY: commentsOriginalMaxY
      },
      curve: springCurve
    });
    card.subLayersByName('nope')[0].animate({
      properties: {
        opacity: 0,
        scale: 1
      },
      curve: springCurve
    });
    return card.subLayersByName('like')[0].animate({
      properties: {
        opacity: 0,
        scale: 1
      },
      curve: springCurve
    });
  };

  repositionCards = function() {
    var _j, _ref1;
    cards[0].center();
    originalY = cards[0].y;
    cards[0].y = DEVICE_HEIGHT + 50;
    initCard(cards[0], originalY);
    for (i = _j = 1, _ref1 = PHOTO_NUM - 1; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
      cards[i].rotation = 0;
      cards[i].shadowX = 0;
      cards[i].shadowY = 0;
      cards[i].y = DEVICE_HEIGHT + 50;
      cards[i].centerX();
      cards[i].subLayersByName('like')[0].opacity = cards[i].subLayersByName('nope')[0].opacity = 0;
      card.subLayersByName('comments')[0].maxY = commentsOriginalMaxY;
    }
    restart.centerX();
    restart.y = DEVICE_HEIGHT;
    return restart.rotation = 0;
  };

  restart.draggable.enabled = true;

  restart.on(Events.DragMove, function() {
    var cardRotationZ;
    if (this.midX < DEVICE_WIDTH / 2) {
      cardRotationZ = Utils.modulate(this.midX, [originalMidX, 0], [0, -10], true);
      return this.rotationZ = cardRotationZ;
    } else if (this.midX > DEVICE_WIDTH / 2) {
      cardRotationZ = Utils.modulate(this.midX, [originalMidX, DEVICE_WIDTH], [0, 10], true);
      return this.rotationZ = cardRotationZ;
    }
  });

  restart.on(Events.DragEnd, function() {
    if (this.midX < DEVICE_WIDTH / 2 || this.midX > DEVICE_WIDTH / 2) {
      return repositionCards();
    } else {
      return this.animate({
        properties: {
          x: restartOriginalX,
          y: restartOriginalY,
          rotationZ: 0
        },
        curve: springCurve
      });
    }
  });

  topBarHolder.bringToFront();

}).call(this);
