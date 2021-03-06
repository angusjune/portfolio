// This is autogenerated by Framer Studio


// Generated by CoffeeScript 1.8.0
(function() {
  var lookupLine, properties, _RESULT,
    __slice = [].slice;

  if (window.FramerStudio == null) {
    window.FramerStudio = {};
  }

  window.onerror = null;

  window.midiCommand = window.midiCommand || function() {};

  if (Framer.Device) {
    properties = ["deviceScale", "contentScale", "deviceType", "keyboard", "orientation", "fullScreen"];
    properties.map(function(propertyName) {
      return Framer.Device.on("change:" + propertyName, function() {
        return window._bridge("device:change");
      });
    });
  }

  _RESULT = null;

  lookupLine = function(lineNumber) {
    var char, charIndex, errorColNumber, errorLine, errorLineIndex, errorLineNumber, loc, sourceLines, _i, _len;
    sourceLines = _RESULT.js.split("\n");
    errorLineIndex = lineNumber - 1;
    errorLine = sourceLines[errorLineIndex];
    if (!errorLine) {
      return lineNumber;
    }
    errorLineNumber = 1;
    errorColNumber = 0;
    for (charIndex = _i = 0, _len = errorLine.length; _i < _len; charIndex = ++_i) {
      char = errorLine[charIndex];
      loc = _RESULT.sourceMap.sourceLocation([errorLineIndex, charIndex]);
      if (loc && loc[0] > errorLineNumber) {
        errorLineNumber = loc[0] + 1;
        errorColNumber = loc[1];
      }
    }
    console.log("lineNumber", lineNumber);
    console.log("errorLineNumber", errorLineNumber);
    return errorLineNumber;
  };

  FramerStudio.compile = function(code) {
    var e, err, errorMessage;
    console.log("FramerStudio.compile");
    window.onerror = null;
    window.onresize = null;
    try {
      _RESULT = CoffeeScript.compile(code, {
        sourceMap: true,
        filename: "generated.js"
      });
    } catch (_error) {
      e = _error;
      console.log("Compile error:", e);
      if (e instanceof SyntaxError) {
        errorMessage = e.stack;
        err = new SyntaxError(e.message);
        err.line = e.location.first_line;
        err.lineNumber = e.location.first_line;
        err.lookup = true;
        window._bridge("StudioError", {
          message: e.message,
          line: e.location.first_line,
          lineNumber: e.location.first_line,
          errorType: "compile"
        });
        throw err;
      } else {
        throw e;
      }
    }
    window.onerror = function(errorMsg, url, lineNumber) {
      var error;
      console.log.apply(console, ["Eval error:"].concat(__slice.call(arguments)));
      error = new Error(errorMsg);
      error.line = lookupLine(lineNumber);
      window._bridge("StudioError", {
        message: errorMsg,
        line: error.line,
        lineNumber: error.line,
        errorType: "eval"
      });
      throw error;
    };
    return _RESULT.js;
  };

  if (typeof window._bridge === "function") {
    window._bridge("StudioScriptLoaded");
  }

}).call(this);

window.__imported__ = window.__imported__ || {};
window.__imported__["index/layers.json.js"] = [
	{
		"id": 438,
		"name": "bg",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1800
		},
		"maskFrame": null,
		"image": {
			"path": "images/bg.png",
			"frame": {
				"x": 0,
				"y": 0,
				"width": 640,
				"height": 1800
			}
		},
		"imageType": "png",
		"children": [
			
		],
		"modification": "2013957459"
	},
	{
		"id": 473,
		"name": "content",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1800
		},
		"maskFrame": null,
		"image": null,
		"imageType": null,
		"children": [
			{
				"id": 440,
				"name": "text",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1800
				},
				"maskFrame": null,
				"image": {
					"path": "images/text.png",
					"frame": {
						"x": 117,
						"y": 189,
						"width": 406,
						"height": 118
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "887045443"
			},
			{
				"id": 157,
				"name": "cards",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1800
				},
				"maskFrame": null,
				"image": null,
				"imageType": null,
				"children": [
					{
						"id": 146,
						"name": "card9",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card9.png",
							"frame": {
								"x": 30,
								"y": 1408,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "747710893"
					},
					{
						"id": 139,
						"name": "card8",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card8.png",
							"frame": {
								"x": 30,
								"y": 1278,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "796624065"
					},
					{
						"id": 134,
						"name": "card7",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card7.png",
							"frame": {
								"x": 30,
								"y": 1148,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "113986889"
					},
					{
						"id": 129,
						"name": "card6",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card6.png",
							"frame": {
								"x": 30,
								"y": 1018,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "550660739"
					},
					{
						"id": 124,
						"name": "card5",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card5.png",
							"frame": {
								"x": 30,
								"y": 888,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "324448263"
					},
					{
						"id": 119,
						"name": "card4",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card4.png",
							"frame": {
								"x": 30,
								"y": 758,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "138994842"
					},
					{
						"id": 114,
						"name": "card3",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card3.png",
							"frame": {
								"x": 30,
								"y": 628,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "904735872"
					},
					{
						"id": 109,
						"name": "card2",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card2.png",
							"frame": {
								"x": 30,
								"y": 498,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "1875598245"
					},
					{
						"id": 104,
						"name": "card1",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/card1.png",
							"frame": {
								"x": 30,
								"y": 368,
								"width": 580,
								"height": 110
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "889887747"
					}
				],
				"modification": "1108759953"
			},
			{
				"id": 164,
				"name": "button",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1800
				},
				"maskFrame": null,
				"image": {
					"path": "images/button.png",
					"frame": {
						"x": 30,
						"y": 1578,
						"width": 580,
						"height": 110
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "1568735278"
			}
		],
		"modification": "481590097"
	},
	{
		"id": 436,
		"name": "topBar",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1800
		},
		"maskFrame": null,
		"image": {
			"path": "images/topBar.png",
			"frame": {
				"x": 0,
				"y": 0,
				"width": 640,
				"height": 128
			}
		},
		"imageType": "png",
		"children": [
			
		],
		"modification": "2016579104"
	}
]
window.__imported__ = window.__imported__ || {};
window.__imported__["street/layers.json.js"] = [
	{
		"id": 136,
		"name": "bg",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1276
		},
		"maskFrame": null,
		"image": {
			"path": "images/bg.png",
			"frame": {
				"x": 0,
				"y": 0,
				"width": 640,
				"height": 1276
			}
		},
		"imageType": "png",
		"children": [
			
		],
		"modification": "154230433"
	},
	{
		"id": 134,
		"name": "content",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1276
		},
		"maskFrame": null,
		"image": null,
		"imageType": null,
		"children": [
			{
				"id": 98,
				"name": "search",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1276
				},
				"maskFrame": null,
				"image": {
					"path": "images/search.png",
					"frame": {
						"x": 11,
						"y": 137,
						"width": 618,
						"height": 66
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "2010685449"
			},
			{
				"id": 138,
				"name": "banner",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1276
				},
				"maskFrame": null,
				"image": {
					"path": "images/banner.png",
					"frame": {
						"x": 0,
						"y": 128,
						"width": 640,
						"height": 360
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "2040042284"
			},
			{
				"id": 30,
				"name": "cell",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1276
				},
				"maskFrame": null,
				"image": {
					"path": "images/cell.png",
					"frame": {
						"x": 0,
						"y": 488,
						"width": 640,
						"height": 160
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "1636541369"
			},
			{
				"id": 35,
				"name": "goods1",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1276
				},
				"maskFrame": null,
				"image": {
					"path": "images/goods1.png",
					"frame": {
						"x": 20,
						"y": 668,
						"width": 290,
						"height": 450
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "1255398517"
			},
			{
				"id": 90,
				"name": "goods2",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1276
				},
				"maskFrame": null,
				"image": {
					"path": "images/goods2.png",
					"frame": {
						"x": 330,
						"y": 668,
						"width": 290,
						"height": 450
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "1617433822"
			}
		],
		"modification": "1113813060"
	},
	{
		"id": 130,
		"name": "nav",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1276
		},
		"maskFrame": null,
		"image": {
			"path": "images/nav.png",
			"frame": {
				"x": 0,
				"y": 1016,
				"width": 640,
				"height": 120
			}
		},
		"imageType": "png",
		"children": [
			{
				"id": 142,
				"name": "Text",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1276
				},
				"maskFrame": null,
				"image": {
					"path": "images/Text.png",
					"frame": {
						"x": 165,
						"y": 1063,
						"width": 475,
						"height": 27
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "385022901"
			},
			{
				"id": 116,
				"name": "elevator",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1276
				},
				"maskFrame": null,
				"image": {
					"path": "images/elevator.png",
					"frame": {
						"x": 0,
						"y": 1016,
						"width": 138,
						"height": 120
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "650639653"
			}
		],
		"modification": "2104677753"
	},
	{
		"id": 132,
		"name": "topBar",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1276
		},
		"maskFrame": null,
		"image": {
			"path": "images/topBar.png",
			"frame": {
				"x": 0,
				"y": 0,
				"width": 640,
				"height": 128
			}
		},
		"imageType": "png",
		"children": [
			
		],
		"modification": "132065926"
	}
]
window.__imported__ = window.__imported__ || {};
window.__imported__["timeline/layers.json.js"] = [
	{
		"id": 628,
		"name": "bg",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1800
		},
		"maskFrame": null,
		"image": {
			"path": "images/bg.png",
			"frame": {
				"x": 0,
				"y": 0,
				"width": 640,
				"height": 1800
			}
		},
		"imageType": "png",
		"children": [
			
		],
		"modification": "1583183339"
	},
	{
		"id": 626,
		"name": "content",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1800
		},
		"maskFrame": null,
		"image": null,
		"imageType": null,
		"children": [
			{
				"id": 644,
				"name": "goodsAll",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1800
				},
				"maskFrame": null,
				"image": null,
				"imageType": null,
				"children": [
					{
						"id": 643,
						"name": "ad2",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/ad2.png",
							"frame": {
								"x": 330,
								"y": 708,
								"width": 290,
								"height": 450
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "37688469"
					},
					{
						"id": 446,
						"name": "ad1",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/ad1.png",
							"frame": {
								"x": 330,
								"y": 708,
								"width": 290,
								"height": 450
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "1210881414"
					},
					{
						"id": 485,
						"name": "goods3",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/goods3.png",
							"frame": {
								"x": 330,
								"y": 1178,
								"width": 290,
								"height": 450
							}
						},
						"imageType": "png",
						"children": [
							{
								"id": 484,
								"name": "like-2",
								"layerFrame": {
									"x": 0,
									"y": 0,
									"width": 640,
									"height": 1800
								},
								"maskFrame": null,
								"image": {
									"path": "images/like-2.png",
									"frame": {
										"x": 344,
										"y": 1412,
										"width": 270,
										"height": 52
									}
								},
								"imageType": "png",
								"children": [
									
								],
								"modification": "869359951"
							}
						],
						"modification": "1639471029"
					},
					{
						"id": 458,
						"name": "goods2",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/goods2.png",
							"frame": {
								"x": 20,
								"y": 1178,
								"width": 290,
								"height": 450
							}
						},
						"imageType": "png",
						"children": [
							{
								"id": 471,
								"name": "like",
								"layerFrame": {
									"x": 0,
									"y": 0,
									"width": 640,
									"height": 1800
								},
								"maskFrame": null,
								"image": {
									"path": "images/like.png",
									"frame": {
										"x": 34,
										"y": 1412,
										"width": 110,
										"height": 52
									}
								},
								"imageType": "png",
								"children": [
									
								],
								"modification": "1003155080"
							}
						],
						"modification": "85209477"
					},
					{
						"id": 440,
						"name": "goods1",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/goods1.png",
							"frame": {
								"x": 20,
								"y": 708,
								"width": 290,
								"height": 450
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "1276706366"
					}
				],
				"modification": "2083702682"
			},
			{
				"id": 339,
				"name": "cell",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1800
				},
				"maskFrame": null,
				"image": null,
				"imageType": null,
				"children": [
					{
						"id": 646,
						"name": "streetEnter",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/streetEnter.png",
							"frame": {
								"x": 0,
								"y": 368,
								"width": 640,
								"height": 320
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "1016782789"
					},
					{
						"id": 631,
						"name": "compare",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/compare.png",
							"frame": {
								"x": 0,
								"y": 368,
								"width": 321,
								"height": 160
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "957189214"
					},
					{
						"id": 383,
						"name": "wishlist",
						"layerFrame": {
							"x": 0,
							"y": 0,
							"width": 640,
							"height": 1800
						},
						"maskFrame": null,
						"image": {
							"path": "images/wishlist.png",
							"frame": {
								"x": 0,
								"y": 368,
								"width": 640,
								"height": 160
							}
						},
						"imageType": "png",
						"children": [
							
						],
						"modification": "1251988795"
					}
				],
				"modification": "1611054991"
			},
			{
				"id": 337,
				"name": "cover",
				"layerFrame": {
					"x": 0,
					"y": 0,
					"width": 640,
					"height": 1800
				},
				"maskFrame": null,
				"image": {
					"path": "images/cover.png",
					"frame": {
						"x": 0,
						"y": 128,
						"width": 640,
						"height": 240
					}
				},
				"imageType": "png",
				"children": [
					
				],
				"modification": "1961520367"
			}
		],
		"modification": "518770077"
	},
	{
		"id": 624,
		"name": "topBar",
		"layerFrame": {
			"x": 0,
			"y": 0,
			"width": 640,
			"height": 1800
		},
		"maskFrame": null,
		"image": {
			"path": "images/topBar.png",
			"frame": {
				"x": 0,
				"y": 0,
				"width": 640,
				"height": 128
			}
		},
		"imageType": "png",
		"children": [
			
		],
		"modification": "1500989972"
	}
]
window.Framer.Defaults.DeviceView = {
  "deviceScale" : -1,
  "orientation" : 0,
  "contentScale" : 1,
  "deviceType" : "iphone-5s-silver"
};

window.FramerStudioInfo = {
  "deviceImagesUrl" : "file:\/\/\/Applications\/Framer%20Studio.app\/Contents\/Resources\/DeviceImages\/"
};

Framer.Device = new Framer.DeviceView();
Framer.Device.setupContext();