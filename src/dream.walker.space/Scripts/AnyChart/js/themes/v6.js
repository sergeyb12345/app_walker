(function() {
    function q() {
        for (var a = this.chart, b = g.call(this), d = a.getSeriesCount(), c = {}, e = 0; e < d; e++) {
            var f = a.getSeriesAt(e).getType();
            c[f] = c.hasOwnProperty(f) ? c[f] + 1 : 1
        }
        var b = b + ", with ",
            h;
        for (h in c) b += c[h] + " " + h + " series, ";
        b += ". ";
        c = a.yScale();
        a = a.xScale();
        d = a.getType();
        e = c.getType();
        if ("ordinal" == e) {
            c = c.values();
            b += "Y-scale with " + c.length + " categories: ";
            for (e = 0; e < c.length; e++) b += c[e] + ", ";
            b += ". "
        } else b = "dateTime" == e ? b + ("Y-scale minimum value is " + window.anychart.format.dateTime(c.minimum()) +
            " , maximum value is " + window.anychart.format.dateTime(c.maximum()) + ". ") : b + ("Y-scale minimum value is " + c.minimum() + " , maximum value is " + c.maximum() + ". ");
        if ("ordinal" == d) {
            a = a.values();
            b += "X-scale with " + a.length + " categories: ";
            for (d = 0; d < a.length; d++) b += a[d] + ", ";
            b += ". "
        } else b = "dateTime" == d ? b + ("X-scale minimum value is " + window.anychart.format.dateTime(a.minimum()) + " , maximum value is " + window.anychart.format.dateTime(a.maximum()) + ". ") : b + ("X-scale minimum value is " + a.minimum() + " , maximum value is " +
            a.maximum() + ". ");
        return b
    }

    function g() {
        var a = this.chart,
            b = a.title(),
            b = b && b.enabled() && b.text() ? b.text() : "";
        return (a.getType() || "Anychart ") + " chart " + (b ? " entitled " + b : "")
    }

    function u() {
        return this.creator ? this.index : this.isStart ? "S" : "F"
    }

    function r() {
        return this.name
    }

    function n() {
        return this.value
    }

    function t() {
        return window.anychart.color.setThickness(this.sourceColor, 1.5)
    }

    function v() {
        return {
            color: this.sourceColor,
            dash: "6 4"
        }
    }

    function k() {
        return window.anychart.color.setOpacity(this.sourceColor,
            .85, !0)
    }

    function l() {
        return window.anychart.color.lighten(this.sourceColor)
    }

    function m() {
        return window.anychart.color.darken(this.sourceColor)
    }

    function p() {
        return this.sourceColor
    }
    window.anychart = window.anychart || {};
    window.anychart.themes = window.anychart.themes || {};
    window.anychart.themes.v6 = {
        defaultFontSettings: {
            fontSize: 10,
            fontFamily: "Verdana, Helvetica, Arial, sans-serif",
            fontColor: "#222",
            textDirection: "ltr",
            fontOpacity: 1,
            fontDecoration: "none",
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "normal",
            letterSpacing: "normal",
            lineHeight: "normal",
            textIndent: 0,
            vAlign: "top",
            hAlign: "start",
            textWrap: "byLetter",
            textOverflow: "",
            selectable: !1,
            disablePointerEvents: !1,
            useHtml: !1
        },
        palette: {
            type: "distinct",
            items: "#1D8BD1 #F1683C #2AD62A #DBDC25 #8FBC8B #D2B48C #FAF0E6 #20B2AA #B0C4DE #DDA0DD #9C9AFF #9C3063 #FFFFCE #CEFFFF #630063 #FF8284 #0065CE #CECFFF #000084 #FF00FF #FFFF00 #00FFFF #840084 #840000 #008284 #0000FF #00CFFF #CEFFFF #CEFFCE #FFFF9C #9CCFFF #FF9ACE #CE9AFF #FFCF9C #3165FF #31CFCE #9CCF00 #FFCF00 #FF9A00 #FF6500".split(" ")
        },
        hatchFillPalette: {
            items: "backwardDiagonal forwardDiagonal horizontal vertical dashedBackwardDiagonal grid dashedForwardDiagonal dashedHorizontal dashedVertical diagonalCross diagonalBrick divot horizontalBrick verticalBrick checkerBoard confetti plaid solidDiamond zigZag weave percent05 percent10 percent20 percent25 percent30 percent40 percent50 percent60 percent70 percent75 percent80 percent90".split(" ")
        },
        markerPalette: {
            items: "circle square triangleUp diamond triangleDown cross diagonalCross star4 star5 star6 star7 star10 pentagon trapezium vline".split(" ")
        },
        defaultOrdinalColorScale: {
            autoColors: function(a) {
                return window.anychart.color.blendedHueProgression("#ffd54f", "#ef6c00", a)
            }
        },
        defaultLinearColorScale: {
            colors: ["#fff", "#ffd54f", "#ef6c00"]
        },
        defaultBackground: {
            enabled: !0,
            fill: "#000 0.5",
            stroke: "#000",
            cornerType: "round",
            corners: 0
        },
        defaultTitle: {
            enabled: !0,
            fontSize: 11,
            fontFamily: "Tahoma, Geneva, sans-serif",
            fontColor: "#222",
            fontWeight: "bold",
            text: "Title text",
            background: {
                enabled: !1
            },
            width: null,
            height: null,
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            padding: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            align: "center"
        },
        defaultLabelFactory: {
            enabled: !0,
            offsetX: 0,
            offsetY: 0,
            anchor: "center",
            padding: {
                top: 2,
                right: 4,
                bottom: 2,
                left: 4
            },
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 11,
            fontColor: "#000",
            rotation: 0,
            minFontSize: 8,
            maxFontSize: 72,
            adjustFontSize: {
                width: !1,
                height: !1
            },
            background: {
                enabled: !1,
                stroke: {
                    keys: ["0 #DDDDDD 1", "1 #D0D0D0 1"],
                    angle: "90"
                },
                fill: {
                    keys: ["0 #FFFFFF 1", "0.5 #F3F3F3 1", "1 #FFFFFF 1"],
                    angle: "90"
                }
            },
            textFormatter: n,
            positionFormatter: function() {
                return this.value
            }
        },
        defaultMarkerFactory: {
            size: 10,
            position: "center",
            anchor: "center",
            offsetX: 0,
            offsetY: 0,
            rotation: 0,
            positionFormatter: function() {
                return this.value
            }
        },
        defaultTooltip: {
            enabled: !0,
            title: {
                enabled: !1,
                fontSize: 10,
                fontFamily: "Verdana, Helvetica, Arial, sans-serif",
                fontColor: "#232323",
                fontWeight: "bold",
                vAlign: "top",
                hAlign: "center",
                text: "",
                background: {
                    enabled: !1
                },
                rotation: 0,
                width: "100%",
                height: null,
                margin: 0,
                padding: {
                    top: 5,
                    right: 10,
                    bottom: 5,
                    left: 10
                },
                align: "center",
                orientation: "top",
                zIndex: 1
            },
            separator: {
                enabled: !1,
                width: "100%",
                height: 1,
                margin: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 5
                },
                orientation: "top",
                fill: ["0 #333333 0", "0.5 #333333 1", "1 #333333 0"],
                stroke: "none",
                zIndex: 1
            },
            content: {
                enabled: !0,
                fontSize: 10,
                fontFamily: "Verdana, Helvetica, Arial, sans-serif",
                fontColor: "#232323",
                fontWeight: "bold",
                vAlign: "top",
                hAlign: "left",
                textWrap: "byLetter",
                text: "Tooltip Text",
                background: {
                    enabled: !1
                },
                padding: {
                    top: 5,
                    right: 10,
                    bottom: 5,
                    left: 10
                },
                width: "100%",
                height: null,
                anchor: "leftTop",
                offsetX: 0,
                offsetY: 0,
                position: "leftTop",
                minFontSize: 8,
                maxFontSize: 72,
                adjustFontSize: {
                    width: !1,
                    height: !1
                },
                rotation: 0,
                zIndex: 1
            },
            fontSize: 10,
            fontFamily: "Verdana, Helvetica, Arial, sans-serif",
            fontColor: "#232323",
            fontWeight: "bold",
            vAlign: "top",
            hAlign: "left",
            textWrap: "byLetter",
            text: "Tooltip Text",
            width: "100%",
            height: null,
            minFontSize: 8,
            maxFontSize: 72,
            adjustFontSize: {
                width: !1,
                height: !1
            },
            rotation: 0,
            background: {
                enabled: !0,
                fill: ["0 #fff 1", "0.5 #f3f3f3 1", "1 #fff 1"],
                stroke: ["0 #ddd 1", "1 #d0d0d0 1"],
                cornerType: "none",
                corners: 10,
                zIndex: 0
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            offsetX: 5,
            offsetY: 5,
            valuePrefix: "",
            valuePostfix: "",
            position: "leftTop",
            anchor: "centerBottom",
            hideDelay: 0,
            titleFormatter: function() {
                return this.value
            },
            textFormatter: function() {
                return this.valuePrefix + this.value + this.valuePostfix
            }
        },
        defaultAxis: {
            enabled: !0,
            startAngle: 0,
            drawLastLabel: !0,
            drawFirstLabel: !0,
            staggerMaxLines: 2,
            staggerMode: !1,
            staggerLines: null,
            width: null,
            overlapMode: "noOverlap",
            stroke: {
                color: "#474747",
                lineJoin: "round",
                lineCap: "square"
            },
            title: {
                text: "Axis title",
                margin: {
                    top: 10,
                    right: 5,
                    bottom: 10,
                    left: 5
                },
                background: {
                    enabled: !1,
                    stroke: {
                        keys: ["#ddd", "#d0d0d0"],
                        angle: "90"
                    },
                    fill: {
                        keys: ["#fff", "#f3f3f3", "#fff"],
                        angle: "90"
                    }
                },
                zIndex: 35
            },
            labels: {
                enabled: !0,
                rotation: 0,
                offsetX: 0,
                offsetY: 0,
                minFontSize: 8,
                maxFontSize: 72,
                anchor: "center",
                padding: {
                    top: 1,
                    right: 2,
                    bottom: 1,
                    left: 2
                },
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontSize: 11,
                textWrap: "noWrap",
                background: {
                    enabled: !1,
                    stroke: {
                        keys: ["#ddd", "#d0d0d0"],
                        angle: "90"
                    },
                    fill: {
                        keys: ["#fff", "#f3f3f3", "#fff"],
                        angle: "90"
                    }
                },
                textFormatter: n,
                positionFormatter: function() {
                    return this.value
                },
                zIndex: 35
            },
            minorLabels: {
                minFontSize: 8,
                maxFontSize: 72,
                enabled: !1,
                rotation: 0,
                offsetX: 0,
                offsetY: 0,
                anchor: "center",
                padding: {
                    top: 1,
                    right: 1,
                    bottom: 0,
                    left: 1
                },
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontSize: 11,
                textWrap: "noWrap",
                background: {
                    enabled: !1,
                    stroke: {
                        keys: ["#ddd", "#d0d0d0"],
                        angle: "90"
                    },
                    fill: {
                        keys: ["#fff", "#f3f3f3", "#fff"],
                        angle: "90"
                    }
                },
                textFormatter: function() {
                    return this.value
                },
                positionFormatter: function() {
                    return this.value
                },
                zIndex: 35
            },
            ticks: {
                enabled: !0,
                length: 5,
                position: "outside",
                stroke: {
                    color: "#313131",
                    lineJoin: "round",
                    lineCap: "butt"
                },
                zIndex: 35
            },
            minorTicks: {
                enabled: !1,
                length: 2,
                position: "outside",
                stroke: {
                    color: "#313131",
                    lineJoin: "round",
                    lineCap: "butt"
                },
                zIndex: 35
            },
            zIndex: 35
        },
        defaultLegend: {
            paginator: {
                buttonsSettings: {
                    normal: {
                        stroke: "2 blue",
                        fill: {
                            keys: ["0 #ffffff", "0.5 #e7e7e7", "1 #d0d0d0"],
                            angle: "-90"
                        },
                        text: {
                            fontColor: "#000"
                        }
                    },
                    hover: {
                        stroke: "1 #aaa 1",
                        fill: {
                            keys: ["0 #ffffff", "0.5 #e7e7e7", "1 #d0d0d0"],
                            angle: "-90"
                        },
                        text: {
                            fontColor: "#000"
                        }
                    },
                    pushed: {
                        stroke: "1 #888 1",
                        fill: {
                            keys: ["0 #ffffff", "0.5 #e7e7e7",
                                "1 #d0d0d0"
                            ],
                            angle: "90"
                        },
                        text: {
                            fontColor: "#333"
                        }
                    },
                    checked: {
                        stroke: "1 #666 1",
                        fill: {
                            keys: ["0 #ffffff", "0.5 #e7e7e7", "1 #d0d0d0"],
                            angle: "90"
                        },
                        text: {
                            fontColor: "#000"
                        }
                    },
                    disabled: {
                        stroke: "1 #666 1",
                        fill: "#aaa",
                        text: {
                            fontColor: "#777"
                        }
                    }
                }
            }
        },
        defaultGroupingSettings: {
            enabled: !0,
            forced: !1,
            levels: [{
                unit: "millisecond",
                count: 1
            }, {
                unit: "millisecond",
                count: 5
            }, {
                unit: "millisecond",
                count: 10
            }, {
                unit: "millisecond",
                count: 25
            }, {
                unit: "millisecond",
                count: 50
            }, {
                unit: "millisecond",
                count: 100
            }, {
                unit: "millisecond",
                count: 250
            }, {
                unit: "millisecond",
                count: 500
            }, {
                unit: "second",
                count: 1
            }, {
                unit: "second",
                count: 5
            }, {
                unit: "second",
                count: 10
            }, {
                unit: "second",
                count: 20
            }, {
                unit: "second",
                count: 30
            }, {
                unit: "minute",
                count: 1
            }, {
                unit: "minute",
                count: 5
            }, {
                unit: "minute",
                count: 15
            }, {
                unit: "minute",
                count: 30
            }, {
                unit: "hour",
                count: 1
            }, {
                unit: "hour",
                count: 2
            }, {
                unit: "hour",
                count: 6
            }, {
                unit: "hour",
                count: 12
            }, {
                unit: "day",
                count: 1
            }, {
                unit: "week",
                count: 1
            }, {
                unit: "month",
                count: 1
            }, {
                unit: "month",
                count: 3
            }, {
                unit: "month",
                count: 6
            }, {
                unit: "year",
                count: 1
            }],
            maxVisiblePoints: 500,
            minPixPerPoint: NaN
        },
        stageCredits: {
            enabled: !0,
            text: "AnyChart",
            url: "http://anychart.com",
            alt: "AnyChart.com",
            logoSrc: "https://static.anychart.com/logo.png"
        },
        chart: {
            enabled: !0,
            contextMenu: {
                fromTheme: !0,
                enabled: !0
            },
            title: {
                text: "Chart Title",
                margin: {
                    bottom: 15
                },
                zIndex: 80
            },
            background: {
                enabled: !0,
                fill: ["#fff", "#f3f3f3", "#fff"],
                stroke: "none",
                zIndex: 1
            },
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            padding: {
                top: 10,
                right: 20,
                bottom: 15,
                left: 20
            },
            legend: {
                enabled: !1,
                fontSize: "11",
                fontFamily: "Tahoma, Geneva, sans-serif",
                itemsLayout: "horizontal",
                itemsSpacing: 15,
                iconSize: 13,
                items: null,
                itemsFormatter: null,
                itemsTextFormatter: null,
                itemsSourceMode: "default",
                inverted: !1,
                hoverCursor: "pointer",
                iconTextSpacing: 5,
                width: null,
                height: null,
                position: "bottom",
                align: "center",
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 10
                },
                padding: {
                    top: 7,
                    right: 7,
                    bottom: 7,
                    left: 7
                },
                background: {
                    enabled: !0,
                    fill: ["#fff", "#f3f3f3", "#fff"],
                    stroke: "#ddd",
                    corners: 5
                },
                title: {
                    enabled: !1,
                    fontSize: "10",
                    fontFamily: "Verdana, Helvetica, Arial, sans-serif",
                    text: "Legend title",
                    background: {
                        enabled: !1,
                        fill: {
                            keys: ["#fff", "#f3f3f3",
                                "#fff"
                            ],
                            angle: "90"
                        },
                        stroke: {
                            keys: ["#ddd", "#d0d0d0"],
                            angle: "90"
                        }
                    },
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 3,
                        left: 0
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    orientation: "top"
                },
                titleSeparator: {
                    enabled: !1,
                    width: "100%",
                    height: 1,
                    margin: {
                        top: 3,
                        right: 0,
                        bottom: 3,
                        left: 0
                    },
                    orientation: "top",
                    fill: ["#000 0", "#000", "#000 0"],
                    stroke: "none"
                },
                paginator: {
                    enabled: !0,
                    background: {
                        enabled: !1,
                        fill: {
                            keys: ["#fff", "#f3f3f3", "#fff"],
                            angle: "90"
                        },
                        stroke: {
                            keys: ["#ddd", "#d0d0d0"],
                            angle: "90"
                        }
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    orientation: "right",
                    layout: "horizontal",
                    zIndex: 30
                },
                tooltip: {
                    title: {
                        enabled: !1,
                        margin: {
                            top: 3,
                            right: 3,
                            bottom: 0,
                            left: 3
                        },
                        padding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                zIndex: 20
            },
            credits: {},
            defaultLabelSettings: {
                enabled: !0,
                fontSize: 11,
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontWeight: "bold",
                textWrap: "byLetter",
                text: "Chart label",
                background: {
                    enabled: !1
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                width: null,
                height: null,
                anchor: "leftTop",
                position: "leftTop",
                offsetX: 0,
                offsetY: 0,
                minFontSize: 8,
                maxFontSize: 72,
                adjustFontSize: {
                    width: !1,
                    height: !1
                },
                rotation: 0,
                zIndex: 50
            },
            chartLabels: [],
            animation: {
                enabled: !1,
                duration: 1E3
            },
            bounds: {
                top: null,
                right: null,
                bottom: null,
                left: null,
                width: null,
                height: null,
                minWidth: null,
                minHeight: null,
                maxWidth: null,
                maxHeight: null
            },
            interactivity: {
                hoverMode: "single",
                selectionMode: "multiSelect",
                spotRadius: 2,
                allowMultiSeriesSelection: !0
            },
            tooltip: {
                allowLeaveScreen: !1,
                allowLeaveChart: !0,
                displayMode: "single",
                positionMode: "float",
                title: {
                    enabled: !0
                },
                separator: {
                    enabled: !0
                },
                titleFormatter: function() {
                    return "Union Tooltip"
                },
                textFormatter: function() {
                    return this.formattedValues.join("\n")
                }
            },
            a11y: {
                enabled: !0,
                titleFormatter: g,
                mode: "chartElements"
            },
            defaultAnnotationSettings: {
                base: {
                    enabled: !0,
                    fill: l,
                    stroke: p,
                    hoverFill: m,
                    hoverStroke: m,
                    selectFill: m,
                    selectStroke: m,
                    markers: {
                        enabled: !1,
                        size: 5,
                        type: "square",
                        fill: "#ffff66",
                        stroke: "#333333"
                    },
                    hoverMarkers: {
                        enabled: null
                    },
                    selectMarkers: {
                        enabled: !0
                    },
                    labels: {
                        enabled: !0,
                        position: "centerTop",
                        anchor: "centerTop",
                        textFormatter: function() {
                            return this.level
                        }
                    },
                    hoverLabels: {
                        enabled: null
                    },
                    selectLabels: {
                        enabled: null
                    },
                    color: "#e06666",
                    allowEdit: !0,
                    hoverGap: 5
                },
                ray: {},
                line: {},
                infiniteLine: {},
                verticalLine: {},
                horizontalLine: {},
                rectangle: {},
                ellipse: {},
                triangle: {},
                trendChannel: {},
                andrewsPitchfork: {},
                fibonacciFan: {
                    levels: [0, .382, .5, .618, 1],
                    timeLevels: [0, .382, .5, .618, 1]
                },
                fibonacciArc: {
                    levels: [.236, .382, .5, .618, .764, 1]
                },
                fibonacciRetracement: {
                    levels: [0, .236, .382, .5, .618, .764, 1, 1.236, 1.382, 1.5, 1.618, 1.764, 2.618, 4.236],
                    labels: {
                        position: "leftCenter",
                        anchor: "rightCenter"
                    }
                },
                fibonacciTimezones: {
                    levels: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55,
                        89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169
                    ]
                },
                marker: {
                    type: "arrowUp",
                    size: 20,
                    anchor: "top",
                    offsetX: 0,
                    offsetY: 0
                },
                label: {}
            }
        },
        cartesianBase: {
            defaultSeriesSettings: {
                base: {
                    fill: function() {
                        return this.sourceColor
                    },
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectFill: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    stroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    selectStroke: function() {
                        return window.anychart.color.darken("red")
                    },
                    hatchFill: !1,
                    labels: {
                        enabled: !1,
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: 11,
                        background: {
                            enabled: !1
                        },
                        padding: {
                            top: 2,
                            right: 4,
                            bottom: 2,
                            left: 4
                        },
                        position: "centerTop",
                        anchor: "center",
                        offsetX: 0,
                        offsetY: 0,
                        rotation: 0,
                        width: null,
                        height: null,
                        textFormatter: "{%Value}{decimalsCount:2}",
                        positionFormatter: function() {
                            return this.value
                        }
                    },
                    hoverLabels: {
                        enabled: null
                    },
                    markers: {
                        enabled: !1,
                        disablePointerEvents: !1,
                        position: "centerTop",
                        rotation: 0,
                        anchor: "center",
                        offsetX: 0,
                        offsetY: 0,
                        size: 4,
                        positionFormatter: function() {
                            return this.value
                        }
                    },
                    hoverMarkers: {
                        enabled: null,
                        size: 6
                    },
                    clip: !0,
                    color: null,
                    tooltip: {
                        titleFormatter: function() {
                            return this.name
                        },
                        textFormatter: function() {
                            return this.x + ": " + this.valuePrefix + this.value + this.valuePostfix
                        }
                    },
                    xScale: null,
                    yScale: null,
                    error: {
                        mode: "both",
                        xError: null,
                        xUpperError: null,
                        xLowerError: null,
                        valueError: null,
                        valueUpperError: null,
                        valueLowerError: null,
                        xErrorWidth: 10,
                        valueErrorWidth: 10,
                        xErrorStroke: "#1D8BD1",
                        valueErrorStroke: "#1D8BD1"
                    },
                    connectMissingPoints: !1,
                    a11y: {
                        enabled: !0,
                        titleFormatter: "Series named {%SeriesName} with {%SeriesPointsCount} points. Min value is {%SeriesYMin}, max value is {%SeriesYMax}"
                    }
                },
                area: {
                    labels: {
                        anchor: "bottom"
                    }
                },
                bar: {
                    markers: {
                        position: "rightCenter"
                    },
                    labels: {
                        position: "rightCenter"
                    }
                },
                box: {
                    markers: {
                        position: "centerTop"
                    },
                    labels: {
                        position: "centerTop",
                        textFormatter: function() {
                            return "Highest: " + parseFloat(this.highest).toFixed(2) +
                                "\nMedian: " + parseFloat(this.median).toFixed(2) + "\nLowest: " + parseFloat(this.lowest).toFixed(2)
                        }
                    },
                    fill: function() {
                        return window.anychart.color.lighten(window.anychart.color.lighten(this.sourceColor))
                    },
                    medianStroke: function() {
                        return this.sourceColor
                    },
                    hoverMedianStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    stemStroke: function() {
                        return this.sourceColor
                    },
                    hoverStemStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    whiskerStroke: function() {
                        return this.sourceColor
                    },
                    hoverWhiskerStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    whiskerWidth: "20%",
                    hoverWhiskerWidth: "20%",
                    outlierMarkers: {
                        enabled: !0,
                        disablePointerEvents: !1,
                        position: "center",
                        rotation: 0,
                        anchor: "center",
                        offsetX: 0,
                        offsetY: 0,
                        size: 4,
                        positionFormatter: function() {
                            return this.value
                        }
                    },
                    hoverOutlierMarkers: {
                        enabled: null,
                        size: 6
                    },
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "lowest: " + this.valuePrefix + parseFloat(this.lowest).toFixed(2) + this.valuePostfix + "\nq1: " + this.valuePrefix +
                                parseFloat(this.q1).toFixed(2) + this.valuePostfix + "\nmedian: " + this.valuePrefix + parseFloat(this.median).toFixed(2) + this.valuePostfix + "\nq3: " + this.valuePrefix + parseFloat(this.q3).toFixed(2) + this.valuePostfix + "\nhighest: " + this.valuePrefix + parseFloat(this.highest).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                bubble: {
                    markers: {
                        position: "center"
                    },
                    labels: {
                        position: "center",
                        anchor: "center"
                    },
                    displayNegative: !1,
                    negativeFill: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor)))
                    },
                    hoverNegativeFill: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor))))
                    },
                    negativeStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor))))
                    },
                    hoverNegativeStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor)))))
                    },
                    negativeHatchFill: null,
                    hoverNegativeHatchFill: null,
                    tooltip: {
                        textFormatter: function() {
                            return this.valuePrefix + parseFloat(this.value).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                candlestick: {
                    markers: {
                        position: "centerTop"
                    },
                    risingFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    hoverRisingFill: function() {
                        return window.anychart.color.lighten(window.anychart.color.lighten(this.sourceColor))
                    },
                    selectRisingFill: function() {
                        return window.anychart.color.lighten(window.anychart.color.lighten("red"))
                    },
                    fallingFill: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverFallingFill: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(this.sourceColor))
                    },
                    selectFallingFill: function() {
                        return window.anychart.color.darken(window.anychart.color.darken("blue"))
                    },
                    risingHatchFill: null,
                    hoverRisingHatchFill: null,
                    fallingHatchFill: null,
                    hoverFallingHatchFill: null,
                    risingStroke: function() {
                        return this.sourceColor
                    },
                    hoverRisingStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectRisingStroke: function() {
                        return window.anychart.color.lighten("red")
                    },
                    fallingStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(this.sourceColor))
                    },
                    hoverFallingStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor)))
                    },
                    selectFallingStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken("blue")))
                    },
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "O: " +
                                this.valuePrefix + parseFloat(this.open).toFixed(4) + this.valuePostfix + "\nH: " + this.valuePrefix + parseFloat(this.high).toFixed(4) + this.valuePostfix + "\nL: " + this.valuePrefix + parseFloat(this.low).toFixed(4) + this.valuePostfix + "\nC: " + this.valuePrefix + parseFloat(this.close).toFixed(4) + this.valuePostfix
                        }
                    },
                    labels: {
                        position: "centerTop",
                        textFormatter: function() {
                            return this.x
                        },
                        offsetY: -10
                    }
                },
                column: {
                    markers: {
                        position: "centerTop"
                    },
                    labels: {
                        position: "centerTop"
                    }
                },
                line: {
                    markers: {
                        enabled: !0
                    },
                    labels: {
                        anchor: "bottom"
                    },
                    stroke: function() {
                        return this.sourceColor
                    },
                    hoverStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    }
                },
                marker: {
                    size: 10,
                    hoverSize: 12,
                    selectSize: 12,
                    hatchFill: !1,
                    tooltip: {
                        textFormatter: function() {
                            return this.valuePrefix + parseFloat(this.value).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                ohlc: {
                    risingStroke: function() {
                        return this.sourceColor
                    },
                    hoverRisingStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectRisingStroke: function() {
                        return window.anychart.color.darken("red")
                    },
                    fallingStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(this.sourceColor))
                    },
                    hoverFallingStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor)))
                    },
                    selectFallingStroke: function() {
                        return window.anychart.color.darken("blue")
                    },
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "O: " + this.valuePrefix + parseFloat(this.open).toFixed(4) + this.valuePostfix + "\nH: " + this.valuePrefix + parseFloat(this.high).toFixed(4) +
                                this.valuePostfix + "\nL: " + this.valuePrefix + parseFloat(this.low).toFixed(4) + this.valuePostfix + "\nC: " + this.valuePrefix + parseFloat(this.close).toFixed(4) + this.valuePostfix
                        }
                    },
                    labels: {
                        textFormatter: function() {
                            return this.x
                        },
                        offsetY: -10
                    }
                },
                rangeArea: {
                    labels: {
                        anchor: "bottom"
                    },
                    highStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverHighStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    lowStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverLowStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "High: " + this.valuePrefix + parseFloat(this.high).toFixed(2) + this.valuePostfix + "\nLow: " + this.valuePrefix + parseFloat(this.low).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                rangeBar: {
                    markers: {
                        position: "rightCenter"
                    },
                    labels: {
                        position: "rightCenter"
                    },
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "High: " + this.valuePrefix + parseFloat(this.high).toFixed(2) + this.valuePostfix +
                                "\nLow: " + this.valuePrefix + parseFloat(this.low).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                rangeColumn: {
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "High: " + this.valuePrefix + parseFloat(this.high).toFixed(2) + this.valuePostfix + "\nLow: " + this.valuePrefix + parseFloat(this.low).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                rangeSplineArea: {
                    labels: {
                        anchor: "bottom"
                    },
                    highStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverHighStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    lowStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverLowStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "High: " + this.valuePrefix + parseFloat(this.high).toFixed(2) + this.valuePostfix + "\nLow: " + this.valuePrefix + parseFloat(this.low).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                rangeStepArea: {
                    labels: {
                        anchor: "bottom"
                    },
                    highStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverHighStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    lowStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverLowStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    tooltip: {
                        content: {
                            hAlign: "left"
                        },
                        textFormatter: function() {
                            return "High: " + this.valuePrefix + parseFloat(this.high).toFixed(2) + this.valuePostfix + "\nLow: " + this.valuePrefix + parseFloat(this.low).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                spline: {
                    legendItem: {
                        iconType: "spline"
                    },
                    markers: {
                        enabled: !0
                    },
                    labels: {
                        anchor: "bottom"
                    },
                    stroke: function() {
                        return this.sourceColor
                    },
                    hoverStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    }
                },
                splineArea: {
                    labels: {
                        anchor: "bottom"
                    }
                },
                stepLine: {
                    legendItem: {
                        iconType: "stepline"
                    },
                    markers: {
                        enabled: !0
                    },
                    labels: {
                        anchor: "bottom"
                    },
                    stroke: function() {
                        return this.sourceColor
                    },
                    hoverStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    }
                },
                stepArea: {
                    labels: {
                        anchor: "bottom"
                    }
                }
            },
            defaultGridSettings: {
                enabled: !0,
                isMinor: !1,
                drawFirstLine: !0,
                drawLastLine: !0,
                oddFill: "#fff",
                evenFill: "#f5f5f5",
                stroke: "#c1c1c1",
                scale: 1,
                zIndex: 10
            },
            defaultMinorGridSettings: {
                enabled: !0,
                isMinor: !0,
                drawFirstLine: !0,
                drawLastLine: !0,
                oddFill: "#fff",
                evenFill: "#f5f5f5",
                stroke: "#c1c1c1",
                scale: 1,
                zIndex: 10
            },
            defaultXAxisSettings: {
                enabled: !0,
                orientation: "bottom",
                title: {
                    enabled: !0,
                    text: "X-Axis"
                },
                width: null,
                labels: {
                    textFormatter: "{%Value}{decimalsCount:10}"
                },
                scale: 0
            },
            defaultYAxisSettings: {
                enabled: !0,
                orientation: "left",
                title: {
                    enabled: !0,
                    text: "Y-Axis"
                },
                minorTicks: {
                    enabled: !0
                },
                width: null,
                labels: {
                    textFormatter: "{%Value}{decimalsCount:10}"
                },
                scale: 1
            },
            defaultLineMarkerSettings: {
                enabled: !0,
                value: 0,
                layout: null,
                stroke: {
                    color: "#DC0A0A",
                    thickness: 1,
                    opacity: 1,
                    dash: "",
                    lineJoin: "miter",
                    lineCap: "square"
                },
                zIndex: 25.2,
                scale: 1
            },
            defaultTextMarkerSettings: {
                enabled: !0,
                fontSize: 11,
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontColor: "#222222",
                fontWeight: "bold",
                value: 0,
                anchor: "center",
                align: "center",
                layout: null,
                offsetX: 0,
                offsetY: 0,
                text: "Text marker",
                width: null,
                height: null,
                zIndex: 25.3,
                scale: 1
            },
            defaultRangeMarkerSettings: {
                enabled: !0,
                from: 0,
                to: 0,
                layout: null,
                fill: "#000 0.3",
                zIndex: 25.1,
                scale: 1
            },
            title: {
                enabled: !1
            },
            background: {
                enabled: !1
            },
            legend: {
                enabled: !1
            },
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            series: [],
            grids: [],
            minorGrids: [],
            xAxes: [],
            yAxes: [],
            lineAxesMarkers: [],
            rangeAxesMarkers: [],
            textAxesMarkers: [],
            scales: [{
                type: "ordinal",
                inverted: !1,
                names: [],
                ticks: {
                    interval: 1
                }
            }, {
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            xScale: 0,
            yScale: 1,
            barsPadding: .1,
            barGroupsPadding: .5,
            maxBubbleSize: "20%",
            minBubbleSize: "5%",
            barChartMode: !1,
            crosshair: {
                enabled: !1,
                displayMode: "float",
                xStroke: "#000",
                yStroke: "#000",
                xLabel: {
                    x: 0,
                    y: 0,
                    axisIndex: 0,
                    textFormatter: function() {
                        return this.value
                    },
                    enabled: !0,
                    fontSize: 11,
                    fontFamily: "Tahoma, Geneva, sans-serif",
                    fontColor: "#fff",
                    fontWeight: 400,
                    textWrap: "byLetter",
                    disablePointerEvents: !0,
                    text: "Label text",
                    background: {
                        enabled: !0,
                        fill: "#000 .85",
                        stroke: "none"
                    },
                    padding: {
                        top: 6,
                        right: 10,
                        bottom: 6,
                        left: 10
                    },
                    width: null,
                    height: null,
                    anchor: null,
                    offsetX: 0,
                    offsetY: 0,
                    position: null,
                    minFontSize: 8,
                    maxFontSize: 72,
                    adjustFontSize: {
                        width: !1,
                        height: !1
                    },
                    rotation: 0
                },
                yLabel: {
                    x: 0,
                    y: 0,
                    axisIndex: 0,
                    textFormatter: function() {
                        return this.value
                    },
                    enabled: !0,
                    fontSize: 11,
                    fontFamily: "Tahoma, Geneva, sans-serif",
                    fontColor: "#fff",
                    fontWeight: 400,
                    textWrap: "byLetter",
                    disablePointerEvents: !0,
                    text: "Label text",
                    background: {
                        enabled: !0,
                        fill: "#000 .85",
                        stroke: "none"
                    },
                    padding: {
                        top: 6,
                        right: 10,
                        bottom: 6,
                        left: 10
                    },
                    width: null,
                    height: null,
                    anchor: null,
                    offsetX: 0,
                    offsetY: 0,
                    position: null,
                    minFontSize: 8,
                    maxFontSize: 72,
                    adjustFontSize: {
                        width: !1,
                        height: !1
                    },
                    rotation: 0
                },
                zIndex: 41
            },
            xZoom: {
                continuous: !0,
                startRatio: 0,
                endRatio: 1
            },
            xScroller: {
                enabled: !1,
                fill: "#fff",
                selectedFill: "#1976d2 0.2",
                outlineStroke: "none",
                height: 10,
                minHeight: null,
                maxHeight: null,
                autoHide: !1,
                orientation: "bottom",
                position: "afterAxes",
                allowRangeChange: !0,
                thumbs: {
                    enabled: !0,
                    autoHide: !1,
                    fill: "#f7f7f7",
                    stroke: "#7c868e",
                    hoverFill: "#ffffff",
                    hoverStroke: "#545f69"
                },
                zIndex: 35
            },
            a11y: {
                titleFormatter: function() {
                    for (var a = this.chart, b = g.call(this), d = a.getSeriesCount(), c = {}, e = 0; e < d; e++) {
                        var f = a.getSeriesAt(e).seriesType();
                        c[f] = c.hasOwnProperty(f) ? c[f] + 1 : 1
                    }
                    var b = b + ", with ",
                        h;
                    for (h in c) b += c[h] + " " + h + " series, ";
                    b += ". ";
                    c = a.yScale();
                    a = a.xScale();
                    d = a.getType();
                    e = c.getType();
                    if ("ordinal" == e) {
                        c = c.values();
                        b += "Y-scale with " + c.length + " categories: ";
                        for (e = 0; e < c.length; e++) b += c[e] + ", ";
                        b += ". "
                    } else b = "dateTime" == e ? b + ("Y-scale minimum value is " +
                        window.anychart.format.dateTime(c.minimum()) + " , maximum value is " + window.anychart.format.dateTime(c.maximum()) + ". ") : b + ("Y-scale minimum value is " + c.minimum() + " , maximum value is " + c.maximum() + ". ");
                    if ("ordinal" == d) {
                        a = a.values();
                        b += "X-scale with " + a.length + " categories: ";
                        for (d = 0; d < a.length; d++) b += a[d] + ", ";
                        b += ". "
                    } else b = "dateTime" == d ? b + ("X-scale minimum value is " + window.anychart.format.dateTime(a.minimum()) + " , maximum value is " + window.anychart.format.dateTime(a.maximum()) + ". ") : b + ("X-scale minimum value is " +
                        a.minimum() + " , maximum value is " + a.maximum() + ". ");
                    return b
                }
            }
        },
        area: {
            title: {
                enabled: !0
            },
            background: {
                enabled: !0
            },
            xAxes: [{
                scale: 0
            }],
            yAxes: [{
                scale: 1
            }],
            grids: [{}, {
                evenFill: "none",
                oddFill: "none",
                scale: 0
            }],
            minorGrids: [{
                evenFill: "none",
                oddFill: "none",
                stroke: "#000 0.075"
            }],
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            },
            interactivity: {
                hoverMode: "byX"
            }
        },
        bar: {
            title: {
                enabled: !0
            },
            background: {
                enabled: !0
            },
            barChartMode: !0,
            defaultXAxisSettings: {
                orientation: "left"
            },
            defaultYAxisSettings: {
                orientation: "bottom"
            },
            xAxes: [{}],
            yAxes: [{}],
            grids: [{}, {
                evenFill: "none",
                oddFill: "none",
                scale: 0
            }],
            minorGrids: [{
                evenFill: "none",
                oddFill: "none",
                stroke: "#000 0.075",
                layout: "vertical"
            }],
            scales: [{
                type: "ordinal",
                inverted: !0,
                names: [],
                ticks: {
                    interval: 1
                }
            }, {
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            },
            xScroller: {
                orientation: "left"
            }
        },
        box: {
            title: {
                enabled: !0
            },
            background: {
                enabled: !0
            },
            xAxes: [{}],
            yAxes: [{}],
            grids: [{
                evenFill: "#fff",
                oddFill: "#fff"
            }],
            minorGrids: [{
                evenFill: "none",
                oddFill: "none",
                stroke: "#000 0.075"
            }],
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            }
        },
        column: {
            title: {
                enabled: !0
            },
            background: {
                enabled: !0
            },
            xAxes: [{}],
            yAxes: [{}],
            grids: [{}, {
                evenFill: "none",
                oddFill: "none",
                scale: 0
            }],
            minorGrids: [{
                evenFill: "none",
                oddFill: "none",
                stroke: "#000 0.075"
            }],
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            }
        },
        financial: {
            title: {
                enabled: !0
            },
            background: {
                enabled: !0
            },
            defaultXAxisSettings: {
                minorTicks: {
                    enabled: !0
                }
            },
            xAxes: [{
                labels: {
                    textFormatter: function() {
                        var a = new Date(this.tickValue),
                            b = [" ", a.getUTCDate(), ", ", a.getUTCFullYear()].join("");
                        switch (a.getUTCMonth()) {
                            case 0:
                                return "Jan" + b;
                            case 1:
                                return "Feb" + b;
                            case 2:
                                return "Mar" + b;
                            case 3:
                                return "Apr" + b;
                            case 4:
                                return "May" + b;
                            case 5:
                                return "Jun" + b;
                            case 6:
                                return "Jul" + b;
                            case 7:
                                return "Aug" + b;
                            case 8:
                                return "Sep" + b;
                            case 9:
                                return "Oct" + b;
                            case 10:
                                return "Nov" + b;
                            case 11:
                                return "Dec" + b
                        }
                        return "Invalid date"
                    }
                }
            }],
            yAxes: [{}],
            grids: [{}, {
                evenFill: "none",
                oddFill: "none",
                scale: 0
            }],
            minorGrids: [{
                evenFill: "none",
                oddFill: "none",
                stroke: "#000 0.075"
            }],
            scales: [{
                type: "dateTime",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    count: 4
                },
                minorTicks: {
                    count: 4
                }
            }, {
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            }
        },
        line: {
            title: {
                enabled: !0
            },
            background: {
                enabled: !0
            },
            xAxes: [{}],
            yAxes: [{}],
            grids: [{}, {
                evenFill: "none",
                oddFill: "none",
                scale: 0
            }],
            minorGrids: [{
                evenFill: "none",
                oddFill: "none",
                stroke: "#000 0.075"
            }],
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            },
            interactivity: {
                hoverMode: "byX"
            }
        },
        heatMap: {
            defaultGridSettings: {
                enabled: !0,
                isMinor: !1,
                drawFirstLine: !0,
                drawLastLine: !0,
                oddFill: "#fff",
                evenFill: "#f5f5f5",
                stroke: "#c1c1c1",
                scale: 1,
                zIndex: 10
            },
            defaultMinorGridSettings: {
                enabled: !0,
                isMinor: !0,
                drawFirstLine: !0,
                drawLastLine: !0,
                oddFill: "#fff",
                evenFill: "#f5f5f5",
                stroke: "#c1c1c1",
                scale: 1,
                zIndex: 10
            },
            scales: [{
                type: "ordinal",
                inverted: !1,
                names: [],
                ticks: {
                    interval: 1
                }
            }, {
                type: "ordinal",
                inverted: !0,
                names: [],
                ticks: {
                    interval: 1
                }
            }, {
                type: "ordinalColor"
            }],
            xScale: 0,
            yScale: 1,
            colorScale: 2,
            background: {
                enabled: !0
            },
            xAxes: [{}],
            yAxes: [{}],
            grids: [{}, {
                evenFill: "none",
                oddFill: "none",
                scale: 0
            }],
            minorGrids: [{
                evenFill: "none",
                oddFill: "none",
                stroke: "#000 0.075"
            }],
            padding: {
                top: 30,
                right: 20,
                bottom: 20,
                left: 20
            },
            tooltip: {
                enabled: !0,
                title: {
                    enabled: !0,
                    fontSize: 13,
                    fontWeight: "normal"
                },
                content: {
                    fontSize: 11
                },
                separator: {
                    enabled: !0
                },
                titleFormatter: function() {
                    return this.name || this.x
                },
                textFormatter: function() {
                    if (void 0 !== this.heat) {
                        var a = "Value: " + this.valuePrefix + this.heat + this.valuePostfix;
                        isNaN(+this.heat) || (a += "\nPercent Value: " + (100 * this.heat / this.getStat("sum")).toFixed(1) + "%");
                        return a
                    }
                    return "x: " + this.x + " y: " + this.y
                }
            },
            legendItem: {
                iconStroke: null
            },
            legend: {
                itemsSourceMode: "categories"
            },
            defaultXAxisSettings: {
                enabled: !0,
                orientation: "bottom",
                title: {
                    text: "X-Axis"
                }
            },
            defaultYAxisSettings: {
                enabled: !0,
                orientation: "left",
                title: {
                    text: "Y-Axis"
                }
            },
            fill: function() {
                var a;
                this.colorScale ? (a = this.iterator.get("heat"), a = this.colorScale.valueToColor(a)) : a = window.anychart.color.setOpacity(this.sourceColor, .85, !0);
                return a
            },
            hoverFill: "#3085be",
            selectFill: "#333333",
            stroke: function() {
                var a;
                this.colorScale ? (a = this.iterator.get("heat"), a = this.colorScale.valueToColor(a)) : a = this.sourceColor;
                return window.anychart.color.setThickness(a, 1, .85)
            },
            hoverStroke: function() {
                return window.anychart.color.setThickness(this.sourceColor,
                    1, .85)
            },
            selectStroke: null,
            labels: {
                enabled: !1,
                fontSize: 11,
                adjustFontSize: {
                    width: !0,
                    height: !0
                },
                minFontSize: 7,
                maxFontSize: 15,
                hAlign: "center",
                vAlign: "center",
                textWrap: "noWrap",
                fontWeight: "normal",
                fontColor: "#333",
                selectable: !1,
                background: {
                    enabled: !1
                },
                padding: {
                    top: 2,
                    right: 4,
                    bottom: 2,
                    left: 4
                },
                position: "center",
                anchor: "center",
                offsetX: 0,
                offsetY: 0,
                rotation: 0,
                width: null,
                height: null,
                textFormatter: function() {
                    return this.heat
                },
                positionFormatter: function() {
                    return this.value
                }
            },
            hoverLabels: {
                enabled: null
            },
            selectLabels: {
                fontColor: "#f5f500",
                enabled: null
            },
            markers: {
                enabled: !1,
                disablePointerEvents: !1,
                position: "center",
                rotation: 0,
                anchor: "center",
                offsetX: 0,
                offsetY: 0,
                size: 4,
                positionFormatter: function() {
                    return this.value
                }
            },
            hoverMarkers: {
                enabled: null,
                size: 6
            },
            selectMarkers: {
                enabled: null,
                fill: "#f5f500"
            },
            labelsDisplayMode: "drop",
            hatchFill: !1,
            clip: !0,
            xZoom: {
                continuous: !0,
                startRatio: 0,
                endRatio: 1
            },
            xScroller: {
                enabled: !1,
                fill: "#fff",
                selectedFill: "#1976d2 0.2",
                outlineStroke: "none",
                height: 10,
                minHeight: null,
                maxHeight: null,
                autoHide: !1,
                orientation: "bottom",
                position: "afterAxes",
                allowRangeChange: !0,
                thumbs: {
                    enabled: !0,
                    autoHide: !1,
                    fill: "#f7f7f7",
                    stroke: "#7c868e",
                    hoverFill: "#ffffff",
                    hoverStroke: "#545f69"
                },
                zIndex: 35
            },
            yZoom: {
                continuous: !0,
                startRatio: 0,
                endRatio: 1
            },
            yScroller: {
                enabled: !1,
                fill: "#fff",
                selectedFill: "#1976d2 0.2",
                outlineStroke: "none",
                height: 10,
                minHeight: null,
                maxHeight: null,
                autoHide: !1,
                orientation: "left",
                position: "afterAxes",
                allowRangeChange: !0,
                thumbs: {
                    enabled: !0,
                    autoHide: !1,
                    fill: "#f7f7f7",
                    stroke: "#7c868e",
                    hoverFill: "#ffffff",
                    hoverStroke: "#545f69"
                },
                zIndex: 35
            },
            a11y: {
                titleFormatter: g
            }
        },
        treeMap: {
            colorRange: {
                enabled: !0,
                stroke: null,
                orientation: "bottom",
                title: {
                    enabled: !1
                },
                colorLineSize: 20,
                padding: {
                    top: 10,
                    right: 0,
                    bottom: 20,
                    left: 0
                },
                align: "center",
                length: "70%",
                marker: {
                    padding: {
                        top: 3,
                        right: 3,
                        bottom: 3,
                        left: 3
                    },
                    fill: "#545f69",
                    hoverFill: "#545f69",
                    stroke: "#545f69",
                    hoverStroke: "#545f69",
                    positionFormatter: n,
                    legendItem: {
                        iconStroke: null
                    },
                    enabled: !0,
                    disablePointerEvents: !1,
                    position: "center",
                    rotation: 0,
                    anchor: "center",
                    offsetX: 0,
                    offsetY: 0,
                    type: "triangleDown",
                    size: 10
                },
                labels: {
                    textFormatter: n,
                    offsetX: 0
                },
                ticks: {
                    stroke: {
                        thickness: 3,
                        color: "#fff",
                        position: "center",
                        length: 20
                    }
                }
            },
            labelsDisplayMode: "clip",
            headersDisplayMode: "alwaysShow",
            scales: [{
                type: "ordinalColor"
            }],
            tooltip: {
                titleFormatter: r,
                textFormatter: n
            },
            colorScale: 0,
            legend: {
                itemsSourceMode: "categories"
            },
            maxDepth: 1,
            hintDepth: 0,
            hintOpacity: .4,
            maxHeadersHeight: "25",
            headers: {
                enabled: !0,
                fontSize: 11,
                hAlign: "center",
                vAlign: "center",
                position: "leftTop",
                anchor: "leftTop",
                rotation: 0,
                fontColor: "black",
                background: {
                    enabled: !0,
                    fill: "lightgreen",
                    stroke: "darkgreen"
                },
                textFormatter: r
            },
            hoverHeaders: {
                fontColor: "cyan"
            },
            labels: {
                enabled: !0,
                hAlign: "center",
                vAlign: "center",
                position: "leftTop",
                anchor: "leftTop",
                rotation: 0,
                fontColor: "blue",
                background: {
                    enabled: !1,
                    fill: "none",
                    stroke: "none"
                },
                textFormatter: r
            },
            markers: {
                enabled: !1,
                position: "center",
                type: "star5",
                size: 6
            },
            hoverMarkers: {
                enabled: !0,
                position: "center",
                type: "star5",
                size: 10,
                offsetY: 15,
                fill: "yellow",
                stroke: "black"
            },
            fill: function() {
                return this.colorScale ? this.colorScale.valueToColor(this.value) : window.anychart.color.setOpacity(this.sourceColor,
                    .85, !0)
            },
            hoverFill: "#545f69",
            selectFill: "#333",
            hatchFill: !1,
            hoverHatchFill: !0,
            selectHatchFill: !1
        },
        scatter: {
            defaultSeriesSettings: {
                base: {
                    fill: function() {
                        return this.sourceColor
                    },
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    stroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverStroke: null,
                    hatchFill: function() {
                        return this.sourceHatchFill
                    },
                    labels: {
                        enabled: !1,
                        background: {
                            enabled: !1
                        },
                        padding: {
                            top: 2,
                            right: 4,
                            bottom: 2,
                            left: 4
                        },
                        position: "center",
                        anchor: "center",
                        offsetX: 0,
                        offsetY: 0,
                        rotation: 0,
                        width: null,
                        height: null,
                        textFormatter: function() {
                            return this.value
                        },
                        positionFormatter: function() {
                            return this.value
                        }
                    },
                    hoverLabels: {
                        enabled: null
                    },
                    markers: {
                        enabled: !0,
                        position: "center",
                        rotation: 0,
                        anchor: "center",
                        offsetX: 0,
                        offsetY: 0,
                        size: 4,
                        positionFormatter: function() {
                            return this.value
                        }
                    },
                    hoverMarkers: {
                        size: 6
                    },
                    clip: !0,
                    color: null,
                    tooltip: {
                        titleFormatter: function() {
                            return this.name
                        },
                        textFormatter: function() {
                            return this.x + ": " + this.valuePrefix + this.value + this.valuePostfix
                        }
                    },
                    xScale: null,
                    yScale: null,
                    error: {
                        mode: "both",
                        xError: null,
                        valueError: null,
                        xErrorWidth: 10,
                        valueErrorWidth: 10,
                        xErrorStroke: "#1d8bd1",
                        valueErrorStroke: "#1d8bd1"
                    },
                    legendItem: {}
                },
                bubble: {
                    displayNegative: !1,
                    negativeFill: function() {
                        var a = window.anychart.color.darken;
                        return a(a(a(this.sourceColor)))
                    },
                    hoverNegativeFill: function() {
                        var a = window.anychart.color.darken;
                        return a(a(a(a(this.sourceColor))))
                    },
                    negativeStroke: function() {
                        var a = window.anychart.color.darken;
                        return a(a(a(a(this.sourceColor))))
                    },
                    hoverNegativeStroke: function() {
                        var a =
                            window.anychart.color.darken;
                        return a(a(a(a(a(this.sourceColor)))))
                    },
                    negativeHatchFill: null,
                    hatchFill: !1,
                    markers: {
                        enabled: !1,
                        position: "center"
                    },
                    tooltip: {
                        textFormatter: function() {
                            return this.valuePrefix + parseFloat(this.value).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                line: {
                    connectMissingPoints: !1,
                    stroke: function() {
                        return this.sourceColor
                    },
                    hoverStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    labels: {
                        anchor: "bottom"
                    }
                },
                marker: {
                    size: 10,
                    hoverSize: 12,
                    selectSize: 12,
                    hatchFill: !1,
                    tooltip: {
                        textFormatter: function() {
                            return this.valuePrefix +
                                parseFloat(this.value).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                a11y: {
                    enabled: !0,
                    titleFormatter: "Series named {%SeriesName} with {%SeriesPointsCount} points. Min value is {%SeriesYMin}, max value is {%SeriesYMax}"
                }
            },
            defaultGridSettings: {
                enabled: !0,
                isMinor: !1,
                drawFirstLine: !0,
                drawLastLine: !0,
                oddFill: "#ffffff",
                evenFill: "#f5f5f5",
                stroke: "#c1c1c1",
                zIndex: 10,
                scale: 1
            },
            defaultMinorGridSettings: {
                enabled: !0,
                isMinor: !0,
                drawFirstLine: !0,
                drawLastLine: !0,
                oddFill: "#ffffff",
                evenFill: "#f5f5f5",
                stroke: "#c1c1c1",
                zIndex: 10,
                scale: 1
            },
            defaultXAxisSettings: {
                enabled: !0,
                orientation: "bottom",
                title: {
                    enabled: !0,
                    text: "X-Axis"
                },
                minorTicks: {
                    enabled: !0
                },
                scale: 0
            },
            defaultYAxisSettings: {
                enabled: !0,
                orientation: "left",
                title: {
                    enabled: !0,
                    text: "Y-Axis"
                },
                minorTicks: {
                    enabled: !0
                },
                scale: 1
            },
            defaultLineMarkerSettings: {
                enabled: !0,
                value: 0,
                layout: null,
                stroke: {
                    color: "#DC0A0A",
                    thickness: 1,
                    opacity: 1,
                    dash: "",
                    lineJoin: "miter",
                    lineCap: "square"
                },
                zIndex: 25.2,
                scale: 1
            },
            defaultTextMarkerSettings: {
                enabled: !0,
                fontSize: 11,
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontColor: "#222222",
                fontWeight: "bold",
                value: 0,
                layout: null,
                anchor: "center",
                align: "center",
                offsetX: 0,
                offsetY: 0,
                text: "Text marker",
                width: null,
                height: null,
                zIndex: 25.3,
                scale: 1
            },
            defaultRangeMarkerSettings: {
                enabled: !0,
                from: 0,
                to: 0,
                layout: null,
                fill: "#000 0.3",
                zIndex: 25.1,
                scale: 1
            },
            series: [],
            grids: [{
                oddFill: "#f9f9f9",
                evenFill: "#ffffff"
            }, {
                oddFill: "none",
                evenFill: "none",
                scale: 0
            }],
            minorGrids: [{
                oddFill: "none",
                evenFill: "none",
                stroke: "#000 0.1"
            }, {
                oddFill: "none",
                evenFill: "none",
                stroke: "#000 0.1",
                scale: 0
            }],
            xAxes: [{}],
            yAxes: [{}],
            lineAxesMarkers: [],
            rangeAxesMarkers: [],
            textAxesMarkers: [],
            scales: [{
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }, {
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            xScale: 0,
            yScale: 1,
            maxBubbleSize: "20%",
            minBubbleSize: "5%",
            crosshair: {
                enabled: !1,
                displayMode: "float",
                xStroke: "#000",
                yStroke: "#000",
                xLabel: {
                    axisIndex: 0,
                    textFormatter: function() {
                        return this.value
                    },
                    enabled: !0,
                    fontSize: 11,
                    fontFamily: "Tahoma, Geneva, sans-serif",
                    fontColor: "#fff",
                    fontWeight: 400,
                    textWrap: "byLetter",
                    disablePointerEvents: !0,
                    text: "Label text",
                    background: {
                        enabled: !0,
                        fill: "#000 .85",
                        stroke: "none"
                    },
                    padding: {
                        top: 6,
                        right: 10,
                        bottom: 6,
                        left: 10
                    },
                    width: null,
                    height: null,
                    anchor: "leftTop",
                    offsetX: 0,
                    offsetY: 0,
                    position: "leftTop",
                    minFontSize: 8,
                    maxFontSize: 72,
                    adjustFontSize: {
                        width: !1,
                        height: !1
                    },
                    rotation: 0
                },
                yLabel: {
                    axisIndex: 0,
                    textFormatter: function() {
                        return this.value
                    },
                    enabled: !0,
                    fontSize: 11,
                    fontFamily: "Tahoma, Geneva, sans-serif",
                    fontColor: "#fff",
                    fontWeight: 400,
                    textWrap: "byLetter",
                    disablePointerEvents: !0,
                    text: "Label text",
                    background: {
                        enabled: !0,
                        fill: "#000 .85",
                        stroke: "none"
                    },
                    padding: {
                        top: 6,
                        right: 10,
                        bottom: 6,
                        left: 10
                    },
                    width: null,
                    height: null,
                    anchor: "leftTop",
                    offsetX: 0,
                    offsetY: 0,
                    position: "leftTop",
                    minFontSize: 8,
                    maxFontSize: 72,
                    adjustFontSize: {
                        width: !1,
                        height: !1
                    },
                    rotation: 0
                }
            },
            a11y: {
                titleFormatter: q
            }
        },
        marker: {},
        bubble: {},
        bullet: {
            background: {
                enabled: !1
            },
            defaultRangeMarkerSettings: {
                enabled: !0,
                from: 0,
                to: 0,
                zIndex: 2
            },
            defaultMarkerSettings: {
                fill: "#000",
                stroke: "none",
                zIndex: 2
            },
            layout: "horizontal",
            rangePalette: {
                type: "distinct",
                items: ["#828282", "#a8a8a8", "#c2c2c2", "#d4d4d4", "#e1e1e1"]
            },
            markerPalette: {
                items: ["bar", "line", "x", "ellipse"]
            },
            scale: {
                type: "linear",
                ticks: {
                    mode: "linear",
                    base: 0,
                    explicit: null,
                    minCount: 3,
                    maxCount: 5,
                    interval: NaN
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    explicit: null,
                    count: 5,
                    interval: NaN
                },
                stackMode: "none",
                stickToZero: !0,
                minimumGap: 0,
                maximumGap: 0,
                softMinimum: null,
                softMaximum: null,
                minimum: null,
                maximum: null,
                inverted: !1
            },
            axis: {
                stroke: "none",
                title: {
                    enabled: !1,
                    zIndex: 3
                },
                labels: {
                    zIndex: 3
                },
                minorLabels: {
                    fontSize: 11,
                    padding: {
                        top: 1,
                        right: 1,
                        bottom: 0,
                        left: 1
                    },
                    zIndex: 3
                },
                ticks: {
                    zIndex: 3
                },
                minorTicks: {
                    enabled: !0,
                    zIndex: 3
                },
                zIndex: 3
            },
            ranges: [],
            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            },
            title: {
                enabled: !0,
                text: "Chart title",
                rotation: 0
            },
            a11y: {
                titleFormatter: function() {
                    return g.apply(this) + ". "
                }
            }
        },
        pie: {
            title: {
                text: "Pie Chart",
                margin: {
                    bottom: 0
                }
            },
            group: !1,
            sort: "none",
            radius: "45%",
            innerRadius: 0,
            startAngle: 0,
            explode: 15,
            outsideLabelsSpace: 30,
            insideLabelsOffset: "50%",
            overlapMode: "noOverlap",
            connectorLength: 20,
            outsideLabelsCriticalAngle: 60,
            connectorStroke: "#000 0.3",
            fill: function() {
                return this.sourceColor
            },
            hoverFill: function() {
                return window.anychart.color.lighten(this.sourceColor)
            },
            stroke: function() {
                return window.anychart.color.darken(this.sourceColor, .2)
            },
            hoverStroke: function() {
                return window.anychart.color.darken(this.sourceColor)
            },
            hatchFill: null,
            forceHoverLabels: !1,
            labels: {
                enabled: !0,
                fontSize: 13,
                fontColor: null,
                fontFamily: "Arial, Helvetica, sans-serif",
                background: {
                    enabled: !1
                },
                padding: {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1
                },
                anchor: "center",
                rotation: 0,
                width: null,
                height: null,
                autoRotate: !1,
                textFormatter: "{%YPercentOfTotal}{decimalsCount:1,zeroFillDecimals:true}%",
                positionFormatter: function() {
                    return this.value
                },
                zIndex: 32
            },
            outsideLabels: {
                autoColor: "#000"
            },
            insideLabels: {
                autoColor: "#fff"
            },
            hoverLabels: {
                enabled: null
            },
            tooltip: {
                titleFormatter: function() {
                    return this.name || this.x
                },
                textFormatter: function() {
                    return (this.name || this.x) + "\n" + this.valuePrefix + this.value + this.valuePostfix
                }
            },
            legend: {
                enabled: !0,
                position: "bottom",
                align: "center",
                itemsLayout: "horizontal",
                title: {
                    enabled: !1
                },
                titleSeparator: {
                    enabled: !1,
                    margin: {
                        top: 3,
                        right: 0,
                        bottom: 3,
                        left: 0
                    }
                },
                tooltip: {
                    textFormatter: function() {
                        return this.value + "\n" + this.valuePrefix +
                            this.meta.pointValue + this.valuePostfix
                    }
                }
            },
            a11y: {
                titleFormatter: function() {
                    var a = this.chart,
                        b = g.apply(this),
                        b = b + (", with " + a.getStat("count") + " points. ");
                    return b += "Min value is " + a.getStat("min") + ", max value is " + a.getStat("max") + "."
                }
            }
        },
        cartesian3d: {
            defaultSeriesType: "column",
            zAngle: 45,
            zAspect: "50%",
            zDistribution: !0,
            zPadding: 10,
            defaultSeriesSettings: {
                base: {
                    stroke: "none",
                    hoverStroke: p,
                    selectStroke: p,
                    fill: p,
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor, .2)
                    },
                    selectFill: function() {
                        return window.anychart.color.lighten(this.sourceColor,
                            .3)
                    }
                }
            }
        },
        bar3d: {
            defaultSeriesType: "bar",
            zAngle: 45,
            zAspect: "50%",
            zDistribution: !1,
            zPadding: 10,
            grids: [{}, {
                enabled: !0,
                layout: "horizontal",
                scale: 0
            }]
        },
        column3d: {
            defaultSeriesType: "column",
            zAngle: 45,
            zAspect: "50%",
            zDistribution: !1,
            zPadding: 10,
            grids: [{}, {
                enabled: !0,
                layout: "vertical",
                scale: 0
            }]
        },
        area3d: {
            defaultSeriesType: "area",
            zAngle: 45,
            zAspect: "50%",
            zDistribution: !0,
            zPadding: 5,
            grids: [{}, {
                enabled: !0,
                layout: "vertical",
                scale: 0
            }],
            hatchFillPalette: {
                items: "backwardDiagonal forwardDiagonal dashedBackwardDiagonal grid dashedForwardDiagonal dashedHorizontal dashedVertical diagonalCross diagonalBrick divot horizontalBrick verticalBrick checkerBoard confetti plaid solidDiamond zigZag weave percent05 percent10 percent20 percent25 percent30 percent40 percent50 percent60 percent70 percent75 percent80 percent90 horizontal vertical".split(" ")
            }
        },
        pie3d: {
            explode: "5%",
            connectorLength: "15%"
        },
        pieFunnelPyramidBase: {
            baseWidth: "90%",
            connectorLength: 20,
            connectorStroke: "#000",
            overlapMode: "noOverlap",
            pointsPadding: 5,
            fill: function() {
                return this.sourceColor
            },
            hoverFill: function() {
                return window.anychart.color.lighten(this.sourceColor)
            },
            stroke: function() {
                return window.anychart.color.darken(this.sourceColor, .2)
            },
            hoverStroke: function() {
                return window.anychart.color.darken(this.sourceColor)
            },
            hatchFill: null,
            labels: {
                enabled: !0,
                fontSize: 13,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontColor: null,
                disablePointerEvents: !1,
                background: {
                    enabled: !1
                },
                padding: {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1
                },
                position: "outsideLeftInColumn",
                anchor: "center",
                rotation: 0,
                width: null,
                height: null,
                textFormatter: function() {
                    return this.name ? this.name : this.x
                },
                positionFormatter: function() {
                    return this.value
                },
                zIndex: 34
            },
            outsideLabels: {
                autoColor: "#000"
            },
            insideLabels: {
                autoColor: "#fff"
            },
            hoverLabels: {
                enabled: null,
                padding: {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1
                }
            },
            markers: {
                enabled: !1,
                rotation: 0,
                anchor: "center",
                position: null,
                offsetX: 0,
                offsetY: 0,
                size: 8,
                positionFormatter: function() {
                    return this.value
                },
                zIndex: 33
            },
            hoverMarkers: {
                enabled: null,
                size: 12
            },
            tooltip: {
                content: {
                    hAlign: "center"
                },
                hAlign: "center",
                titleFormatter: function() {
                    return this.name || this.x
                },
                textFormatter: function() {
                    return (this.name || this.x) + "\n" + this.valuePrefix + this.value + this.valuePostfix
                }
            },
            legend: {
                margin: {
                    top: 10,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                tooltip: {
                    textFormatter: function() {
                        return this.value + "\n" + this.valuePrefix + this.meta.pointValue + this.valuePostfix
                    }
                },
                zIndex: 35
            }
        },
        funnel: {
            title: {
                text: "Funnel Chart"
            },
            neckWidth: "30%",
            neckHeight: "25%"
        },
        pyramid: {
            title: {
                text: "Pyramid Chart"
            },
            reversed: !1,
            legend: {
                inverted: !0
            }
        },
        radar: {
            defaultSeriesSettings: {
                base: {
                    enabled: !0,
                    hatchFill: null,
                    fill: function() {
                        return this.sourceColor
                    },
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectFill: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    stroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    selectStroke: function() {
                        return window.anychart.color.darken("red")
                    },
                    labels: {
                        enabled: !1,
                        position: "center",
                        anchor: "bottom"
                    },
                    hoverLabels: {
                        enabled: null
                    },
                    markers: {
                        enabled: !1,
                        disablePointerEvents: !1,
                        position: "center",
                        rotation: 0,
                        anchor: "center",
                        offsetX: 0,
                        offsetY: 0,
                        size: 4,
                        positionFormatter: function() {
                            return this.value
                        }
                    },
                    hoverMarkers: {
                        size: 6
                    },
                    tooltip: {
                        titleFormatter: function() {
                            return this.name
                        },
                        textFormatter: function() {
                            return this.x + ": " + this.valuePrefix + this.value + this.valuePostfix
                        }
                    }
                },
                area: {
                    markers: {
                        enabled: !1,
                        position: "center"
                    }
                },
                line: {
                    markers: {
                        enabled: !0,
                        position: "center"
                    },
                    stroke: function() {
                        return this.sourceColor
                    },
                    hoverStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    }
                },
                marker: {
                    fill: function() {
                        return this.sourceColor
                    },
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectFill: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    stroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    selectStroke: function() {
                        return window.anychart.color.darken("red")
                    },
                    size: 10,
                    hoverSize: 12,
                    selectSize: 12,
                    hatchFill: !1,
                    labels: {
                        anchor: "center"
                    },
                    tooltip: {
                        textFormatter: function() {
                            return this.valuePrefix + parseFloat(this.value).toFixed(2) + this.valuePostfix
                        }
                    }
                },
                a11y: {
                    enabled: !0,
                    titleFormatter: "Series named {%SeriesName} with {%SeriesPointsCount} points. Min value is {%SeriesYMin}, max value is {%SeriesYMax}"
                }
            },
            defaultGridSettings: {
                enabled: !0,
                isMinor: !1,
                layout: "radial",
                drawFirstLine: !1,
                drawLastLine: !1,
                oddFill: "none",
                evenFill: "none",
                stroke: "#DDDDDD",
                zIndex: 10,
                xScale: 0,
                yScale: 1
            },
            defaultMinorGridSettings: {
                enabled: !1,
                isMinor: !0,
                layout: "circuit",
                drawFirstLine: !1,
                drawLastLine: !1,
                oddFill: "none",
                evenFill: "none",
                stroke: "#333333",
                zIndex: 10,
                xScale: 0,
                yScale: 1
            },
            xAxis: {
                stroke: "#C0C0C0",
                ticks: {
                    stroke: "#333333"
                },
                scale: 0,
                zIndex: 25
            },
            yAxis: {
                stroke: "#333333",
                minorLabels: {
                    padding: {
                        top: 1,
                        right: 1,
                        bottom: 0,
                        left: 1
                    }
                },
                minorTicks: {
                    enabled: !0
                },
                scale: 1
            },
            startAngle: 0,
            grids: [{
                enabled: !0,
                stroke: "#C0C0C0",
                layout: "circuit",
                oddFill: "white",
                evenFill: "#fafafa"
            }, {
                enabled: !0
            }],
            minorGrids: [],
            scales: [{
                type: "ordinal",
                inverted: !1,
                names: [],
                ticks: {
                    interval: 1
                }
            }, {
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            xScale: 0,
            yScale: 1,
            background: {
                enabled: !0,
                fill: {
                    keys: ["#fff", "#f3f3f3", "#fff"],
                    angle: 90
                },
                stroke: null
            },
            a11y: {
                titleFormatter: q
            }
        },
        polar: {
            defaultSeriesSettings: {
                base: {
                    enabled: !0,
                    hatchFill: null,
                    labels: {
                        enabled: !1,
                        position: "center",
                        anchor: "bottom"
                    },
                    hoverLabels: {
                        enabled: null,
                        position: "center"
                    },
                    fill: function() {
                        return this.sourceColor
                    },
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectFill: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    stroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    selectStroke: function() {
                        return window.anychart.color.darken("red")
                    },
                    markers: {
                        enabled: !1,
                        disablePointerEvents: !1,
                        position: "center",
                        rotation: 0,
                        anchor: "center",
                        offsetX: 0,
                        offsetY: 0,
                        size: 4,
                        positionFormatter: function() {
                            return this.value
                        }
                    },
                    hoverMarkers: {
                        size: 6
                    },
                    tooltip: {
                        titleFormatter: function() {
                            return this.name
                        },
                        textFormatter: function() {
                            return this.x + ": " + this.valuePrefix + this.value + this.valuePostfix
                        }
                    }
                },
                area: {},
                line: {
                    markers: {
                        enabled: !0
                    },
                    stroke: function() {
                        return this.sourceColor
                    },
                    hoverStroke: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    }
                },
                marker: {
                    fill: function() {
                        return this.sourceColor
                    },
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectFill: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    stroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    hoverStroke: function() {
                        return window.anychart.color.darken(this.sourceColor)
                    },
                    selectStroke: function() {
                        return window.anychart.color.darken("red")
                    },
                    size: 10,
                    hoverSize: 12,
                    selectSize: 12,
                    labels: {
                        anchor: "bottom"
                    },
                    hatchFill: !1,
                    tooltip: {
                        textFormatter: function() {
                            return this.valuePrefix + parseFloat(this.value).toFixed(2) + this.valuePostfix
                        }
                    }
                }
            },
            defaultGridSettings: {
                enabled: !0,
                isMinor: !1,
                layout: "radial",
                drawFirstLine: !1,
                drawLastLine: !1,
                oddFill: "none",
                evenFill: "none",
                stroke: "#DDDDDD",
                zIndex: 10,
                xScale: 0,
                yScale: 1
            },
            defaultMinorGridSettings: {
                enabled: !1,
                isMinor: !0,
                layout: "circuit",
                drawFirstLine: !1,
                drawLastLine: !1,
                oddFill: "none",
                evenFill: "none",
                stroke: "#333333",
                zIndex: 10,
                xScale: 0,
                yScale: 1
            },
            xAxis: {
                stroke: "#C0C0C0",
                ticks: {
                    stroke: "#333333"
                },
                scale: 0,
                zIndex: 25
            },
            yAxis: {
                stroke: "#333333",
                minorLabels: {
                    padding: {
                        top: 1,
                        right: 1,
                        bottom: 0,
                        left: 1
                    }
                },
                minorTicks: {
                    enabled: !0
                },
                scale: 1
            },
            startAngle: 0,
            grids: [{
                enabled: !0,
                stroke: "#C0C0C0",
                layout: "circuit",
                oddFill: "white",
                evenFill: "#fafafa"
            }, {
                enabled: !0
            }],
            minorGrids: [],
            scales: [{
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }, {
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            xScale: 0,
            yScale: 1,
            background: {
                enabled: !0,
                fill: {
                    keys: ["#fff", "#f3f3f3", "#fff"],
                    angle: 90
                },
                stroke: null
            },
            a11y: {
                titleFormatter: q
            }
        },
        sparkline: {
            title: {
                enabled: !1,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                orientation: "right",
                rotation: 0
            },
            background: {
                enabled: !1
            },
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            defaultSeriesSettings: {
                base: {
                    markers: {
                        enabled: !1,
                        type: "circle",
                        size: 1.5,
                        position: "center"
                    },
                    labels: {
                        enabled: !1,
                        background: {
                            enabled: !1
                        },
                        position: "center",
                        anchor: "centerBottom"
                    },
                    color: "#4682B4"
                },
                area: {
                    stroke: "#1e90ff",
                    fill: "#d2e9ff"
                },
                column: {
                    markers: {
                        position: "centerTop"
                    },
                    labels: {
                        position: "centerTop",
                        anchor: "centerBottom"
                    },
                    negativeMarkers: {
                        position: "centerBottom"
                    },
                    negativeLabels: {
                        position: "centerBottom",
                        anchor: "centerTop"
                    },
                    fill: "#87ceeb",
                    negativeFill: "#ffc0cb"
                },
                line: {
                    stroke: "#4682b4"
                },
                winLoss: {
                    markers: {
                        position: "centerTop",
                        anchor: "centerTop"
                    },
                    labels: {
                        position: "centerTop",
                        anchor: "centerTop"
                    },
                    negativeMarkers: {
                        position: "centerBottom",
                        anchor: "centerBottom"
                    },
                    negativeLabels: {
                        position: "centerBottom",
                        anchor: "centerBottom"
                    },
                    fill: "#305374",
                    negativeFill: "#cb6762"
                }
            },
            defaultLineMarkerSettings: {
                enabled: !0,
                value: 0,
                layout: null,
                stroke: {
                    color: "#DC0A0A",
                    thickness: 1,
                    opacity: 1,
                    dash: "",
                    lineJoin: "miter",
                    lineCap: "square"
                },
                zIndex: 25.2,
                scale: 1
            },
            defaultTextMarkerSettings: {
                enabled: !0,
                fontSize: 11,
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontColor: "#222222",
                fontWeight: "bold",
                value: 0,
                anchor: "center",
                align: "center",
                layout: null,
                offsetX: 0,
                offsetY: 0,
                text: "Text marker",
                width: null,
                height: null,
                zIndex: 25.3,
                scale: 1
            },
            defaultRangeMarkerSettings: {
                enabled: !0,
                from: 0,
                to: 0,
                layout: null,
                fill: "#000 0.3",
                zIndex: 25.1,
                scale: 1
            },
            hatchFill: null,
            markers: {},
            firstMarkers: {},
            lastMarkers: {},
            negativeMarkers: {},
            minMarkers: {
                fill: "#00f",
                stroke: "#000 0.5"
            },
            maxMarkers: {
                fill: "#f00",
                stroke: "#000 0.5"
            },
            labels: {},
            firstLabels: {},
            lastLabels: {},
            negativeLabels: {},
            minLabels: {},
            maxLabels: {},
            lineAxesMarkers: [],
            rangeAxesMarkers: [],
            textAxesMarkers: [],
            scales: [{
                type: "ordinal",
                inverted: !1,
                names: [],
                ticks: {
                    interval: 1
                }
            }, {
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            xScale: 0,
            yScale: 1,
            clip: !0,
            seriesType: "line",
            connectMissingPoints: !1,
            pointWidth: "95%",
            tooltip: {
                title: !1,
                separator: !1,
                titleFormatter: function() {
                    return this.x
                },
                textFormatter: function() {
                    return "x: " + this.x + "\ny: " + this.value
                }
            }
        },
        linearGauge: {
            padding: 10,
            markerPalette: {
                items: "circle diamond square triangleDown triangleUp triangleLeft triangleRight diagonalCross pentagon cross vline star5 star4 trapezium star7 star6 star10".split(" ")
            },
            globalOffset: "0%",
            layout: "vertical",
            tooltip: {
                titleFormatter: function() {
                    return this.name
                },
                textFormatter: function() {
                    return this.high ? "High: " + parseFloat(this.high).toFixed(2) + "\nLow: " + parseFloat(this.low).toFixed(2) : "Value: " + this.value
                }
            },
            scales: [{
                type: "linear",
                inverted: !1,
                maximum: null,
                minimum: null,
                minimumGap: .1,
                maximumGap: .1,
                softMinimum: null,
                softMaximum: null,
                ticks: {
                    mode: "linear",
                    base: 0,
                    minCount: 4,
                    maxCount: 6
                },
                minorTicks: {
                    mode: "linear",
                    base: 0,
                    count: 5
                },
                stackMode: "none",
                stickToZero: !0
            }],
            defaultAxisSettings: {
                enabled: !0,
                width: "10%",
                offset: "0%"
            },
            defaultScaleBarSettings: {
                enabled: !0,
                width: "10%",
                offset: "0%",
                from: "min",
                to: "max",
                colorScale: {
                    type: "ordinalColor",
                    inverted: !1,
                    ticks: {
                        interval: 1
                    }
                },
                points: [{
                    height: 0,
                    left: 0,
                    right: 0
                }, {
                    height: 1,
                    left: 0,
                    right: 0
                }]
            },
            defaultPointerSettings: {
                base: {
                    enabled: !0,
                    selectionMode: "single",
                    width: "10%",
                    offset: "0%",
                    legendItem: {
                        enabled: !0
                    },
                    label: {
                        enabled: !1,
                        zIndex: 0,
                        position: "top",
                        anchor: "center"
                    },
                    hoverLabel: {
                        enabled: !1,
                        fontColor: "yellow"
                    },
                    selectLabel: {
                        enabled: !1,
                        fontColor: "pink"
                    },
                    stroke: function() {
                        return window.anychart.color.setThickness(this.sourceColor,
                            1.5)
                    },
                    hoverStroke: function() {
                        return window.anychart.color.setThickness(window.anychart.color.lighten(this.sourceColor), 1.5)
                    },
                    selectStroke: m,
                    fill: p,
                    hoverFill: l,
                    selectFill: m
                },
                bar: {},
                rangeBar: {
                    label: {
                        textFormatter: function() {
                            return this.high
                        }
                    }
                },
                marker: {
                    width: "3%"
                },
                tank: {},
                thermometer: {
                    fill: function() {
                        var a = this.sourceColor,
                            b = window.anychart.color.darken(a);
                        return {
                            angle: this.isVertical ? 0 : 90,
                            keys: [{
                                color: b
                            }, {
                                color: a
                            }, {
                                color: b
                            }]
                        }
                    },
                    width: "3%",
                    bulbRadius: "120%",
                    bulbPadding: "3%"
                },
                led: {
                    dimmer: function(a) {
                        return window.anychart.color.darken(a)
                    },
                    gap: "1%",
                    size: "2%",
                    count: null,
                    colorScale: {
                        type: "ordinalColor",
                        inverted: !1,
                        ticks: {
                            interval: 1
                        }
                    }
                }
            }
        },
        thermometerGauge: {},
        tankGauge: {},
        ledGauge: {},
        bulletGauge: {},
        circularGauge: {
            title: {
                enabled: !1,
                margin: {
                    bottom: 5
                }
            },
            background: {
                enabled: !1
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            defaultAxisSettings: {
                startAngle: null,
                labels: {
                    position: "inside",
                    adjustFontSize: !0
                },
                minorLabels: {
                    position: "inside",
                    adjustFontSize: !0
                },
                fill: "black .3",
                ticks: {
                    hatchFill: !1,
                    type: "line",
                    position: "center",
                    length: null,
                    fill: "red",
                    stroke: "none"
                },
                minorTicks: {
                    hatchFill: !1,
                    type: "line",
                    position: "center",
                    length: null,
                    fill: "red",
                    stroke: "none"
                },
                zIndex: 10,
                cornersRounding: "0%"
            },
            defaultPointerSettings: {
                base: {
                    enabled: !0,
                    fill: "#f22922",
                    stroke: "#f22922",
                    hatchFill: !1,
                    axisIndex: 0
                },
                bar: {
                    position: "center"
                },
                marker: {
                    position: "inside",
                    type: "triangleUp"
                },
                needle: {},
                knob: {
                    fill: {
                        keys: ["rgb(255, 255, 255)", "rgb(220, 220, 220)"],
                        angle: 135
                    },
                    stroke: "2 #ccc",
                    verticesCount: 6,
                    verticesCurvature: .5,
                    topRatio: .5,
                    bottomRatio: .5
                }
            },
            defaultRangeSettings: {
                enabled: !0,
                axisIndex: 0,
                fill: "#008000 .5",
                position: "center",
                startSize: 0,
                endSize: "10%",
                cornersRounding: "0%"
            },
            fill: {
                keys: ["#fff", "#dcdcdc"],
                angle: 315
            },
            startAngle: 0,
            sweepAngle: 360,
            cap: {
                enabled: !1,
                fill: {
                    keys: ["#D3D3D3", "#6F6F6F"],
                    angle: -45
                },
                stroke: "none",
                hatchFill: !1,
                radius: "15%",
                zIndex: 50
            },
            circularPadding: "10%",
            encloseWithStraightLine: !1,
            axes: [],
            bars: [],
            markers: [],
            needles: [],
            knobs: [],
            ranges: [],
            interactivity: {
                hoverMode: "single"
            },
            tooltip: {
                enabled: !1,
                title: {
                    enabled: !1
                },
                titleFormatter: function() {
                    return this.value
                },
                textFormatter: function() {
                    return this.valuePrefix +
                        this.value + this.valuePostfix
                }
            }
        },
        map: {
            defaultSeriesSettings: {
                base: {
                    fill: function() {
                        var a;
                        this.colorScale ? (a = this.iterator.get(this.referenceValueNames[1]), a = this.colorScale.valueToColor(a)) : a = this.sourceColor;
                        return a
                    },
                    hoverFill: function() {
                        return window.anychart.color.lighten(this.sourceColor)
                    },
                    selectFill: {
                        color: "#64b5f6"
                    },
                    stroke: {
                        thickness: .5,
                        color: "#545f69"
                    },
                    hoverStroke: {
                        thickness: .5,
                        color: "#545f69"
                    },
                    selectStroke: {
                        thickness: .5,
                        color: "#545f69"
                    },
                    hatchFill: !1,
                    labels: {
                        enabled: !0,
                        fontSize: 12,
                        adjustFontSize: {
                            width: !0,
                            height: !0
                        },
                        textFormatter: function() {
                            return this.name
                        }
                    },
                    hoverLabels: {
                        enabled: null
                    },
                    selectLabels: {
                        enabled: null
                    },
                    markers: {
                        enabled: !1,
                        disablePointerEvents: !1,
                        size: 4
                    },
                    hoverMarkers: {
                        enabled: null,
                        size: 6
                    },
                    selectMarkers: {
                        enabled: null,
                        size: 6
                    },
                    color: null,
                    allowPointsSelect: null,
                    tooltip: {
                        enabled: !0,
                        titleFormatter: function() {
                            return this.name
                        },
                        textFormatter: function() {
                            return this.id + ": " + this.valuePrefix + this.value + this.valuePostfix
                        }
                    },
                    xScale: null,
                    yScale: null,
                    geoIdField: null
                },
                choropleth: {},
                bubble: {
                    a11y: {
                        titleFormatter: g
                    },
                    displayNegative: !1,
                    fill: function() {
                        return window.anychart.color.setOpacity(this.sourceColor, .7, !0)
                    },
                    hoverFill: function() {
                        return window.anychart.color.setOpacity(this.sourceColor, .7, !0)
                    },
                    stroke: function() {
                        return window.anychart.color.setThickness(this.sourceColor, 1.5)
                    },
                    hoverStroke: function() {
                        return window.anychart.color.setThickness(this.sourceColor, 1.5)
                    },
                    legendItem: {
                        iconStroke: null
                    },
                    negativeFill: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor)))
                    },
                    hoverNegativeFill: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor))))
                    },
                    negativeStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor))))
                    },
                    hoverNegativeStroke: function() {
                        return window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(window.anychart.color.darken(this.sourceColor)))))
                    },
                    negativeHatchFill: null,
                    hoverNegativeHatchFill: null,
                    tooltip: {
                        titleFormatter: function() {
                            return this.name || this.getDataValue("name")
                        },
                        textFormatter: function() {
                            return "Value: " + this.valuePrefix + this.size + this.valuePostfix
                        }
                    }
                },
                marker: {
                    hoverFill: "#545f69",
                    selectFill: "#333",
                    tooltip: {
                        textFormatter: function() {
                            if (this.id) return "Id: " + this.id + "\nValue: " + this.valuePrefix + this.value + this.valuePostfix;
                            var a = "lat: " + this.lat + "\nlong: " + this["long"];
                            this.value && (a += "\nValue: " + this.valuePrefix + this.value + this.valuePostfix);
                            return a
                        }
                    }
                },
                connector: {
                    startSize: 1,
                    endSize: 1,
                    curvature: .3,
                    markers: {
                        position: "middle"
                    },
                    labels: {
                        enabled: !1,
                        position: "middle",
                        anchor: null,
                        textFormatter: function() {
                            return "from: " + this.startPoint.lat + "," + this.startPoint["long"] + "\nto: " + this.endPoint.lat + "," + this.endPoint["long"]
                        }
                    },
                    tooltip: {
                        textFormatter: function() {
                            return "from: " + this.startPoint.lat + "," + this.startPoint["long"] + "\nto: " + this.endPoint.lat + "," + this.endPoint["long"]
                        }
                    }
                }
            },
            colorRange: {
                enabled: !1,
                stroke: null,
                orientation: "bottom",
                title: {
                    enabled: !1
                },
                colorLineSize: 20,
                padding: {
                    top: 10,
                    right: 0,
                    bottom: 20,
                    left: 0
                },
                align: "center",
                length: "70%",
                marker: {
                    fill: "#545f69",
                    hoverFill: "#545f69",
                    stroke: "#545f69",
                    hoverStroke: "#545f69",
                    positionFormatter: function() {
                        return this.value
                    },
                    legendItem: {
                        iconStroke: null
                    },
                    enabled: !0,
                    disablePointerEvents: !1,
                    position: "center",
                    rotation: 0,
                    anchor: "center",
                    offsetX: 0,
                    offsetY: 0,
                    type: "triangleDown",
                    size: 15
                },
                labels: {
                    offsetX: 0
                },
                ticks: {
                    stroke: {
                        thickness: 3,
                        color: "#fff",
                        position: "center",
                        length: 20
                    }
                },
                minorTicks: {
                    enabled: !1
                }
            },
            unboundRegions: {
                enabled: !0,
                fill: "#F7F7F7",
                stroke: "#B9B9B9"
            },
            maxBubbleSize: "20%",
            minBubbleSize: "5%",
            geoIdField: "id",
            interactivity: {
                copyFormatter: function(a) {
                    a = a.seriesStatus;
                    for (var b = "", d = 0, c = a.length; d < c; d++) {
                        var e = a[d];
                        if (0 != e.points.length) {
                            for (var b = b + ("Series " + e.series.index() + ":\n"), f = 0, h = e.points.length; f < h; f++) {
                                var g = e.points[f],
                                    b = b + ("id: " + g.id + " index: " + g.index);
                                f != h - 1 && (b += "\n")
                            }
                            d != c - 1 && (b += "\n")
                        }
                    }
                    return b || "no selected points"
                },
                drag: !0,
                mouseWheel: !1
            }
        },
        defaultDataGrid: {
            isStandalone: !1,
            titleHeight: 25,
            backgroundFill: "none",
            columnStroke: "#ccd7e1",
            rowStroke: "#ccd7e1",
            rowOddFill: "#fff",
            rowEvenFill: "#fafafa",
            rowFill: "#fff",
            hoverFill: "#edf8ff",
            rowSelectedFill: "#d2eafa",
            zIndex: 5,
            titleFill: {
                keys: ["#f8f8f8", "#fff"],
                angle: 90
            },
            editStructurePreviewFill: {
                color: "#4285F4",
                opacity: .2
            },
            editStructurePreviewStroke: {
                color: "#4285F4",
                thickness: 2
            },
            editStructurePreviewDashStroke: {
                color: "#4285F4",
                dash: "4 4"
            },
            tooltip: {
                anchor: "leftTop",
                content: {
                    hAlign: "left"
                },
                textFormatter: function() {
                    var a = this.name;
                    return void 0 !== a ? a + "" : ""
                }
            },
            defaultColumnSettings: {
                width: 90,
                cellTextSettings: {
                    anchor: "leftTop",
                    vAlign: "middle",
                    padding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 5
                    },
                    textWrap: "noWrap",
                    background: null,
                    rotation: 0,
                    width: null,
                    height: null,
                    fontSize: 11,
                    minFontSize: 8,
                    maxFontSize: 72,
                    disablePointerEvents: !0
                },
                depthPaddingMultiplier: 0,
                collapseExpandButtons: !1,
                title: {
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    textWrap: "noWrap",
                    hAlign: "center",
                    vAlign: "middle",
                    background: {
                        enabled: !1
                    }
                },
                textFormatter: function() {
                    return ""
                }
            },
            columns: [{
                width: 50,
                textFormatter: function(a) {
                    a = a.meta("index");
                    return null !=
                        a ? a + 1 + "" : ""
                },
                title: {
                    text: "#"
                }
            }, {
                width: 170,
                collapseExpandButtons: !0,
                depthPaddingMultiplier: 15,
                textFormatter: function(a) {
                    a = a.get("name");
                    return null != a ? a + "" : ""
                },
                title: {
                    text: "Name"
                }
            }]
        },
        ganttBase: {
            splitterPosition: "30%",
            headerHeight: 70,
            hoverFill: "#edf8ff",
            rowSelectedFill: "#d2eafa",
            columnStroke: "#ccd7e1",
            rowStroke: "#ccd7e1",
            title: {
                enabled: !1
            },
            background: {
                fill: "#fff"
            },
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            dataGrid: {},
            timeline: {
                columnStroke: "#ccd7e1",
                rowStroke: "#ccd7e1",
                backgroundFill: "none",
                rowOddFill: "#fff",
                rowEvenFill: "#fafafa",
                rowFill: "#fff",
                hoverFill: "#edf8ff",
                rowSelectedFill: "#d2eafa",
                zIndex: 5,
                headerHeight: 70,
                editing: !1,
                connectorPreviewStroke: {
                    color: "#0000ff",
                    dash: "3 3",
                    opacity: .6
                },
                editPreviewFill: {
                    color: "#fff",
                    opacity: 1E-5
                },
                editProgressFill: "#fff",
                editProgressStroke: "#000",
                editIntervalThumbFill: "#fff",
                editIntervalThumbStroke: "#000",
                editConnectorThumbFill: "#fff",
                editConnectorThumbStroke: "#000",
                editStructurePreviewFill: {
                    color: "#4285F4",
                    opacity: .2
                },
                editStructurePreviewStroke: {
                    color: "#4285F4",
                    thickness: 2
                },
                editStructurePreviewDashStroke: {
                    color: "#4285F4",
                    dash: "4 4"
                },
                baseFill: {
                    keys: ["#3CA0DE", "#3085BC"],
                    angle: -90
                },
                baseStroke: "#0C3F5F",
                baselineFill: {
                    keys: ["#E1E1E1", "#A1A1A1"],
                    angle: -90
                },
                baselineStroke: "#0C3F5F",
                progressFill: {
                    keys: ["#63FF78", "#3DC351", "#188E2D"],
                    angle: -90
                },
                progressStroke: "#006616",
                milestoneFill: {
                    keys: ["#FAE096", "#EB8344"],
                    angle: -90
                },
                milestoneStroke: "#000",
                parentFill: {
                    keys: ["#646464", "#282828"],
                    angle: -90
                },
                parentStroke: "#000",
                selectedElementFill: {
                    keys: ["#f1b8b9", "#f07578"],
                    angle: -90
                },
                connectorFill: "#000090",
                connectorStroke: "#000090",
                minimumGap: .1,
                maximumGap: .1,
                baselineAbove: !1,
                tooltip: {
                    anchor: "leftTop",
                    content: {
                        hAlign: "left"
                    }
                },
                labels: {
                    enabled: !0,
                    anchor: "leftCenter",
                    position: "rightCenter",
                    padding: {
                        top: 3,
                        right: 5,
                        bottom: 3,
                        left: 5
                    },
                    vAlign: "middle",
                    textWrap: "noWrap",
                    background: null,
                    rotation: 0,
                    width: null,
                    height: null,
                    fontSize: 11,
                    minFontSize: 8,
                    maxFontSize: 72,
                    zIndex: 40,
                    disablePointerEvents: !0
                },
                markers: {
                    anchor: "centerTop",
                    zIndex: 50,
                    type: "star5",
                    fill: "#ff0",
                    stroke: "2 red"
                },
                defaultLineMarkerSettings: {
                    layout: "vertical",
                    zIndex: 1.5
                },
                defaultRangeMarkerSettings: {
                    layout: "vertical",
                    zIndex: 1
                },
                defaultTextMarkerSettings: {
                    layout: "vertical",
                    zIndex: 2,
                    textWrap: "byLetter"
                },
                header: {
                    labelsFactory: {
                        anchor: "leftTop",
                        vAlign: "middle",
                        padding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 5
                        },
                        textWrap: "noWrap",
                        background: null,
                        rotation: 0,
                        width: null,
                        height: null,
                        fontSize: 11,
                        minFontSize: 8,
                        maxFontSize: 72,
                        disablePointerEvents: !0
                    }
                }
            }
        },
        ganttResource: {
            dataGrid: {
                tooltip: {
                    titleFormatter: function() {
                        return this.name || ""
                    },
                    textFormatter: function() {
                        var a = this.minPeriodDate,
                            b = this.maxPeriodDate;
                        return (a ? "Start Date: " + window.anychart.format.dateTime(a) : "") + (b ? "\nEnd Date: " + window.anychart.format.dateTime(b) : "")
                    }
                }
            },
            timeline: {
                selectedElementStroke: "none",
                tooltip: {
                    titleFormatter: function() {
                        return this.name || ""
                    },
                    textFormatter: function() {
                        var a = this.periodStart || this.minPeriodDate,
                            b = this.periodEnd || this.maxPeriodDate;
                        return (a ? "Start Date: " + window.anychart.format.dateTime(a) : "") + (b ? "\nEnd Date: " + window.anychart.format.dateTime(b) : "")
                    }
                }
            }
        },
        ganttProject: {
            dataGrid: {
                tooltip: {
                    titleFormatter: function() {
                        return this.name ||
                            ""
                    },
                    textFormatter: function() {
                        var a = this.actualStart || this.autoStart,
                            b = this.actualEnd || this.autoEnd,
                            d = this.progressValue;
                        void 0 === d && (d = (Math.round(1E4 * this.autoProgress) / 100 || 0) + "%");
                        return (a ? "Start Date: " + window.anychart.format.dateTime(a) : "") + (b ? "\nEnd Date: " + window.anychart.format.dateTime(b) : "") + (d ? "\nComplete: " + d : "")
                    }
                }
            },
            timeline: {
                selectedElementStroke: "#000",
                tooltip: {
                    titleFormatter: function() {
                        return this.name || ""
                    },
                    textFormatter: function() {
                        var a = this.actualStart || this.autoStart,
                            b = this.actualEnd ||
                            this.autoEnd,
                            d = this.progressValue;
                        void 0 === d && (d = (Math.round(1E4 * this.autoProgress) / 100 || 0) + "%");
                        return (a ? "Start Date: " + window.anychart.format.dateTime(a) : "") + (b ? "\nEnd Date: " + window.anychart.format.dateTime(b) : "") + (d ? "\nComplete: " + d : "")
                    }
                }
            }
        },
        stock: {
            grouping: {},
            scrollerGrouping: {
                levels: [{
                    unit: "millisecond",
                    count: 1
                }, {
                    unit: "millisecond",
                    count: 2
                }, {
                    unit: "millisecond",
                    count: 5
                }, {
                    unit: "millisecond",
                    count: 10
                }, {
                    unit: "millisecond",
                    count: 25
                }, {
                    unit: "millisecond",
                    count: 50
                }, {
                    unit: "millisecond",
                    count: 100
                }, {
                    unit: "millisecond",
                    count: 250
                }, {
                    unit: "millisecond",
                    count: 500
                }, {
                    unit: "second",
                    count: 1
                }, {
                    unit: "second",
                    count: 2
                }, {
                    unit: "second",
                    count: 5
                }, {
                    unit: "second",
                    count: 10
                }, {
                    unit: "second",
                    count: 20
                }, {
                    unit: "second",
                    count: 30
                }, {
                    unit: "minute",
                    count: 1
                }, {
                    unit: "minute",
                    count: 2
                }, {
                    unit: "minute",
                    count: 5
                }, {
                    unit: "minute",
                    count: 10
                }, {
                    unit: "minute",
                    count: 20
                }, {
                    unit: "minute",
                    count: 30
                }, {
                    unit: "hour",
                    count: 1
                }, {
                    unit: "hour",
                    count: 2
                }, {
                    unit: "hour",
                    count: 3
                }, {
                    unit: "hour",
                    count: 4
                }, {
                    unit: "hour",
                    count: 6
                }, {
                    unit: "hour",
                    count: 12
                }, {
                    unit: "day",
                    count: 1
                }, {
                    unit: "day",
                    count: 2
                }, {
                    unit: "day",
                    count: 4
                }, {
                    unit: "week",
                    count: 1
                }, {
                    unit: "week",
                    count: 2
                }, {
                    unit: "month",
                    count: 1
                }, {
                    unit: "month",
                    count: 2
                }, {
                    unit: "month",
                    count: 3
                }, {
                    unit: "month",
                    count: 6
                }, {
                    unit: "year",
                    count: 1
                }],
                maxVisiblePoints: NaN,
                minPixPerPoint: 1
            },
            defaultPlotSettings: {
                defaultSeriesSettings: {
                    base: {
                        pointWidth: "75%",
                        tooltip: {
                            textFormatter: function() {
                                var a = this.value;
                                void 0 === a && (a = this.close);
                                a = parseFloat(a).toFixed(4);
                                return this.seriesName + ": " + this.valuePrefix + a + this.valuePostfix
                            }
                        },
                        legendItem: {
                            iconStroke: "none"
                        }
                    },
                    line: {
                        stroke: "1.5 #64b5f6"
                    },
                    column: {
                        fill: "#64b5f6",
                        stroke: "none"
                    },
                    ohlc: {
                        risingStroke: "#1976d2",
                        fallingStroke: "#ef6c00"
                    }
                },
                defaultGridSettings: {
                    enabled: !0,
                    isMinor: !1,
                    layout: "horizontal",
                    drawFirstLine: !0,
                    drawLastLine: !0,
                    oddFill: null,
                    evenFill: null,
                    stroke: "#cecece",
                    scale: 0,
                    zIndex: 11
                },
                defaultMinorGridSettings: {
                    enabled: !0,
                    isMinor: !0,
                    layout: "horizontal",
                    drawFirstLine: !0,
                    drawLastLine: !0,
                    oddFill: null,
                    evenFill: null,
                    stroke: "#eaeaea",
                    scale: 0,
                    zIndex: 10
                },
                defaultYAxisSettings: {
                    enabled: !0,
                    orientation: "left",
                    title: {
                        enabled: !1,
                        text: "Y-Axis"
                    },
                    staggerMode: !1,
                    staggerLines: null,
                    ticks: {
                        enabled: !0
                    },
                    width: 50,
                    labels: {
                        fontSize: "11px",
                        padding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 5
                        }
                    },
                    minorLabels: {
                        fontSize: "11px",
                        padding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 5
                        }
                    },
                    scale: 0
                },
                xAxis: {
                    enabled: !0,
                    orientation: "bottom",
                    background: {},
                    height: 25,
                    scale: 0,
                    labels: {
                        enabled: !0,
                        fontSize: "11px",
                        padding: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 5
                        },
                        anchor: "centerTop",
                        textFormatter: function() {
                            var a = this.tickValue;
                            switch (this.majorIntervalUnit) {
                                case "year":
                                    return window.anychart.format.dateTime(a, "yyyy");
                                case "semester":
                                case "quarter":
                                case "month":
                                    return window.anychart.format.dateTime(a, "yyyy MMM");
                                case "thirdOfMonth":
                                case "week":
                                case "day":
                                    return window.anychart.format.dateTime(a, "MMM dd");
                                case "hour":
                                    return window.anychart.format.dateTime(a, "MMM-dd HH");
                                case "minute":
                                    return window.anychart.format.dateTime(a, "dd HH:mm");
                                case "second":
                                    return window.anychart.format.dateTime(a, "HH:mm:ss");
                                case "millisecond":
                                    return window.anychart.format.dateTime(a, "HH:mm:ss.SSS")
                            }
                            return window.anychart.format.dateTime(a,
                                "yyyy MMM dd")
                        }
                    },
                    minorLabels: {
                        enabled: !0,
                        anchor: "centerTop",
                        fontSize: "11px",
                        padding: {
                            top: 5,
                            right: 0,
                            bottom: 5,
                            left: 0
                        },
                        textFormatter: function() {
                            var a = this.tickValue;
                            switch (this.majorIntervalUnit) {
                                case "year":
                                    return window.anychart.format.dateTime(a, "yyyy");
                                case "semester":
                                case "quarter":
                                case "month":
                                    return window.anychart.format.dateTime(a, "MMM");
                                case "thirdOfMonth":
                                case "week":
                                case "day":
                                    return window.anychart.format.dateTime(a, "dd");
                                case "hour":
                                    return window.anychart.format.dateTime(a, "HH");
                                case "minute":
                                    return window.anychart.format.dateTime(a,
                                        "HH:mm");
                                case "second":
                                    return window.anychart.format.dateTime(a, "HH:mm:ss");
                                case "millisecond":
                                    return window.anychart.format.dateTime(a, "SSS")
                            }
                            return window.anychart.format.dateTime(a, "HH:mm:ss.SSS")
                        }
                    }
                },
                dateTimeHighlighter: "#B9B9B9",
                legend: {
                    enabled: !0,
                    vAlign: "bottom",
                    fontSize: 12,
                    itemsLayout: "horizontal",
                    itemsSpacing: 15,
                    items: null,
                    iconSize: 13,
                    itemsFormatter: null,
                    itemsTextFormatter: null,
                    itemsSourceMode: "default",
                    inverted: !1,
                    hoverCursor: "pointer",
                    iconTextSpacing: 5,
                    width: null,
                    height: null,
                    position: "top",
                    titleFormatter: function() {
                        var a = this.value;
                        switch (this.dataIntervalUnit) {
                            case "year":
                                return window.anychart.format.dateTime(a, "yyyy");
                            case "semester":
                            case "quarter":
                            case "month":
                                return window.anychart.format.dateTime(a, "MMM yyyy");
                            case "hour":
                            case "minute":
                                return window.anychart.format.dateTime(a, "HH:mm, dd MMM");
                            case "second":
                                return window.anychart.format.dateTime(a, "HH:mm:ss");
                            case "millisecond":
                                return window.anychart.format.dateTime(a, "HH:mm:ss.SSS")
                        }
                        return window.anychart.format.dateTime(a, "dd MMM yyyy")
                    },
                    align: "center",
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    padding: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    },
                    background: {
                        enabled: !1,
                        fill: "#fff",
                        stroke: "none",
                        corners: 5
                    },
                    title: {
                        enabled: !0,
                        fontSize: 12,
                        text: "",
                        background: {
                            enabled: !1,
                            fill: {
                                keys: ["#fff", "#f3f3f3", "#fff"],
                                angle: "90"
                            },
                            stroke: {
                                keys: ["#ddd", "#d0d0d0"],
                                angle: "90"
                            }
                        },
                        margin: {
                            top: 0,
                            right: 15,
                            bottom: 0,
                            left: 0
                        },
                        padding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        orientation: "left",
                        align: "left",
                        hAlign: "left",
                        rotation: 0
                    },
                    titleSeparator: {
                        enabled: !1,
                        width: "100%",
                        height: 1,
                        margin: {
                            top: 3,
                            right: 0,
                            bottom: 3,
                            left: 0
                        },
                        orientation: "top",
                        fill: ["#000 0", "#000", "#000 0"],
                        stroke: "none"
                    },
                    paginator: {
                        enabled: !0,
                        fontSize: 12,
                        fontColor: "#545f69",
                        background: {
                            enabled: !1,
                            fill: {
                                keys: ["#fff", "#f3f3f3", "#fff"],
                                angle: "90"
                            },
                            stroke: {
                                keys: ["#ddd", "#d0d0d0"],
                                angle: "90"
                            }
                        },
                        padding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        margin: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        orientation: "right",
                        layout: "horizontal",
                        zIndex: 30
                    },
                    tooltip: {
                        enabled: !1,
                        title: {
                            enabled: !1,
                            margin: {
                                top: 3,
                                right: 3,
                                bottom: 0,
                                left: 3
                            },
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }
                        }
                    },
                    zIndex: 20
                },
                scales: [{
                    type: "linear",
                    inverted: !1,
                    maximum: null,
                    minimum: null,
                    minimumGap: .1,
                    maximumGap: .1,
                    softMinimum: null,
                    softMaximum: null,
                    ticks: {
                        mode: "linear",
                        base: 0,
                        minCount: 4,
                        maxCount: 6
                    },
                    minorTicks: {
                        mode: "linear",
                        base: 0,
                        count: 5
                    },
                    stackMode: "none",
                    stickToZero: !0
                }],
                yScale: 0,
                zIndex: 10,
                xAxes: [{}],
                yAxes: [{}]
            },
            padding: [20, 30, 20, 60],
            plots: [{}],
            scroller: {
                defaultSeriesSettings: {
                    base: {
                        pointWidth: "75%"
                    },
                    line: {
                        stroke: "#999 0.9",
                        selectedStroke: "1.5 #64b5f6"
                    },
                    column: {
                        fill: "#64b5f6 0.6",
                        stroke: "none",
                        selectedFill: "#64b5f6 0.9",
                        selectedStroke: "none"
                    },
                    ohlc: {
                        risingStroke: "#1976d2 0.6",
                        fallingStroke: "#ef6c00 0.6",
                        selectedRisingStroke: "#1976d2 0.9",
                        selectedFallingStroke: "#ef6c00 0.9"
                    }
                },
                enabled: !0,
                fill: "#fff",
                selectedFill: "#1976d2 0.2",
                outlineStroke: "#cecece",
                height: 40,
                minHeight: null,
                maxHeight: null,
                thumbs: {
                    enabled: !0,
                    autoHide: !1,
                    fill: "#f7f7f7",
                    stroke: "#7c868e",
                    hoverFill: "#ffffff",
                    hoverStroke: "#545f69"
                },
                zIndex: 40,
                xAxis: {
                    background: {
                        enabled: !1
                    },
                    minorTicks: {
                        enabled: !0,
                        stroke: "#cecece"
                    },
                    labels: {
                        enabled: !0,
                        fontSize: "11px",
                        padding: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 5
                        },
                        anchor: "leftTop",
                        textFormatter: function() {
                            var a = this.tickValue;
                            switch (this.majorIntervalUnit) {
                                case "year":
                                    return window.anychart.format.dateTime(a, "yyyy");
                                case "semester":
                                case "quarter":
                                case "month":
                                    return window.anychart.format.dateTime(a, "yyyy MMM");
                                case "thirdOfMonth":
                                case "week":
                                case "day":
                                    return window.anychart.format.dateTime(a, "MMM dd");
                                case "hour":
                                    return window.anychart.format.dateTime(a, "MMM-dd HH");
                                case "minute":
                                    return window.anychart.format.dateTime(a, "dd HH:mm");
                                case "second":
                                    return window.anychart.format.dateTime(a, "HH:mm:ss");
                                case "millisecond":
                                    return window.anychart.format.dateTime(a, "HH:mm:ss.SSS")
                            }
                            return window.anychart.format.dateTime(a, "yyyy MMM dd")
                        }
                    },
                    minorLabels: {
                        enabled: !0,
                        anchor: "leftTop",
                        fontSize: "11px",
                        padding: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 5
                        },
                        textFormatter: function() {
                            var a = this.tickValue;
                            switch (this.majorIntervalUnit) {
                                case "year":
                                    return window.anychart.format.dateTime(a, "yyyy");
                                case "semester":
                                case "quarter":
                                case "month":
                                    return window.anychart.format.dateTime(a,
                                        "MMM");
                                case "thirdOfMonth":
                                case "week":
                                case "day":
                                    return window.anychart.format.dateTime(a, "dd");
                                case "hour":
                                    return window.anychart.format.dateTime(a, "HH");
                                case "minute":
                                    return window.anychart.format.dateTime(a, "HH:mm");
                                case "second":
                                    return window.anychart.format.dateTime(a, "HH:mm:ss");
                                case "millisecond":
                                    return window.anychart.format.dateTime(a, "SSS")
                            }
                            return window.anychart.format.dateTime(a, "HH:mm:ss.SSS")
                        }
                    },
                    zIndex: 75
                }
            },
            tooltip: {
                allowLeaveScreen: !1,
                allowLeaveChart: !0,
                displayMode: "union",
                positionMode: "float",
                title: {
                    enabled: !0,
                    fontSize: 13
                },
                separator: {
                    enabled: !0
                },
                titleFormatter: function() {
                    var a = this.hoveredDate;
                    switch (this.dataIntervalUnit) {
                        case "year":
                            return window.anychart.format.dateTime(a, "yyyy");
                        case "semester":
                        case "quarter":
                        case "month":
                            return window.anychart.format.dateTime(a, "MMM yyyy");
                        case "hour":
                        case "minute":
                            return window.anychart.format.dateTime(a, "HH:mm, dd MMM");
                        case "second":
                            return window.anychart.format.dateTime(a, "HH:mm:ss");
                        case "millisecond":
                            return window.anychart.format.dateTime(a,
                                "HH:mm:ss.SSS")
                    }
                    return window.anychart.format.dateTime(a, "dd MMM yyyy")
                },
                textFormatter: function() {
                    return this.formattedValues.join("\n")
                }
            },
            a11y: {
                titleFormatter: g
            }
        },
        pert: {
            tooltip: {
                enabled: !1
            },
            horizontalSpacing: "15%",
            verticalSpacing: "25%",
            expectedTimeCalculator: function() {
                return void 0 === this.duration ? Math.round((this.optimistic + 4 * this.mostLikely + this.pessimistic) / 6 * 100) / 100 : Number(this.duration)
            },
            background: {
                zIndex: 0
            },
            milestones: {
                shape: "circle",
                size: "5%",
                labels: {
                    enabled: !0,
                    anchor: "leftTop",
                    vAlign: "middle",
                    hAlign: "center",
                    fontColor: "#fff",
                    disablePointerEvents: !0,
                    textFormatter: u
                },
                hoverLabels: {
                    fontColor: "#fff",
                    fontOpacity: 1
                },
                selectLabels: {
                    fontWeight: "bold"
                },
                color: "#64b5f6",
                fill: k,
                stroke: "none",
                hoverFill: l,
                hoverStroke: l,
                selectFill: "#333 0.85",
                selectStroke: "#333 0.85",
                tooltip: {
                    title: {
                        enabled: !0
                    },
                    separator: {
                        enabled: !0
                    },
                    titleFormatter: function() {
                        return this.creator ? "Milestone - " + this.index : "Milestone - " + (this.isStart ? "Start" : "Finish")
                    },
                    textFormatter: function() {
                        var a = "",
                            b = 0;
                        if (this.successors && this.successors.length) {
                            a +=
                                "Successors:";
                            for (b = 0; b < this.successors.length; b++) a += "\n - " + this.successors[b].get("name");
                            this.predecessors && this.predecessors.length && (a += "\n\n")
                        }
                        if (this.predecessors && this.predecessors.length)
                            for (a += "Predecessors:", b = 0; b < this.predecessors.length; b++) a += "\n - " + this.predecessors[b].get("name");
                        return a
                    }
                }
            },
            tasks: {
                color: "#64b5f6",
                fill: k,
                stroke: k,
                hoverFill: l,
                hoverStroke: t,
                selectFill: "#333 0.85",
                selectStroke: "#333 0.85",
                dummyFill: k,
                dummyStroke: v,
                upperLabels: {
                    enabled: !0,
                    anchor: "centerBottom",
                    vAlign: "bottom",
                    hAlign: "center",
                    fontSize: 12,
                    fontOpacity: 1,
                    textWrap: "noWrap",
                    contColor: "#333",
                    padding: {
                        top: 1,
                        right: 0,
                        bottom: 1,
                        left: 0
                    },
                    textFormatter: function() {
                        return this.name
                    }
                },
                hoverUpperLabels: {
                    fontSize: 13,
                    offsetY: 1
                },
                selectUpperLabels: {
                    fontSize: 13,
                    offsetY: 1,
                    fontWeight: "bold"
                },
                lowerLabels: {
                    enabled: !0,
                    anchor: "centerTop",
                    vAlign: "top",
                    hAlign: "center",
                    fontSize: 12,
                    fontOpacity: 1,
                    textWrap: "noWrap",
                    contColor: "#333",
                    padding: {
                        top: 1,
                        right: 0,
                        bottom: 1,
                        left: 0
                    },
                    textFormatter: function() {
                        return "t: " + this.duration
                    }
                },
                hoverLowerLabels: {
                    fontSize: 13,
                    offsetY: -1
                },
                selectLowerLabels: {
                    fontSize: 13,
                    offsetY: -1,
                    fontWeight: "bold"
                },
                tooltip: {
                    title: {
                        enabled: !0
                    },
                    separator: {
                        enabled: !0
                    },
                    titleFormatter: function() {
                        return this.name
                    },
                    textFormatter: function() {
                        var a = "Earliest start: " + this.earliestStart + "\nEarliest finish: " + this.earliestFinish + "\nLatest start: " + this.latestStart + "\nLatest finish: " + this.latestFinish + "\nDuration: " + this.duration + "\nSlack: " + this.slack;
                        isNaN(this.variance) || (a += "\nStandard deviation: " + Math.round(100 * this.variance) / 100);
                        return a
                    }
                }
            },
            criticalPath: {
                milestones: {
                    shape: "circle",
                    size: "5%",
                    labels: {
                        enabled: !0,
                        anchor: "leftTop",
                        vAlign: "middle",
                        hAlign: "center",
                        fontColor: "#fff",
                        disablePointerEvents: !0,
                        textFormatter: u
                    },
                    hoverLabels: {
                        fontColor: "#fff",
                        fontOpacity: 1
                    },
                    selectLabels: {
                        fontWeight: "bold"
                    },
                    color: "#64b5f6",
                    fill: k,
                    stroke: "none",
                    hoverFill: l,
                    hoverStroke: t,
                    selectFill: "#333 0.85",
                    selectStroke: "#333 0.85",
                    tooltip: {
                        title: {
                            enabled: !0
                        },
                        separator: {
                            enabled: !0
                        },
                        titleFormatter: function() {
                            return this.creator ? "Milestone - " + this.index : "Milestone - " +
                                (this.isStart ? "Start" : "Finish")
                        },
                        textFormatter: function() {
                            var a = "",
                                b = 0;
                            if (this.successors && this.successors.length) {
                                a += "Successors:";
                                for (b = 0; b < this.successors.length; b++) a += "\n - " + this.successors[b].get("name");
                                this.predecessors && this.predecessors.length && (a += "\n\n")
                            }
                            if (this.predecessors && this.predecessors.length)
                                for (a += "Predecessors:", b = 0; b < this.predecessors.length; b++) a += "\n - " + this.predecessors[b].get("name");
                            return a
                        }
                    }
                },
                tasks: {
                    color: "#e06666",
                    fill: k,
                    stroke: k,
                    hoverFill: l,
                    hoverStroke: t,
                    selectFill: "#333 0.85",
                    selectStroke: "#333 0.85",
                    dummyFill: k,
                    dummyStroke: v,
                    upperLabels: {
                        enabled: !0,
                        anchor: "centerBottom",
                        vAlign: "bottom",
                        hAlign: "center",
                        fontSize: 12,
                        fontOpacity: 1,
                        textWrap: "noWrap",
                        contColor: "#333",
                        padding: {
                            top: 1,
                            right: 0,
                            bottom: 1,
                            left: 0
                        },
                        textFormatter: function() {
                            return this.name
                        }
                    },
                    hoverUpperLabels: {
                        fontSize: 13,
                        offsetY: 1
                    },
                    selectUpperLabels: {
                        fontSize: 13,
                        offsetY: 1,
                        fontWeight: "bold"
                    },
                    lowerLabels: {
                        enabled: !0,
                        anchor: "centerTop",
                        vAlign: "top",
                        hAlign: "center",
                        fontSize: 12,
                        fontOpacity: 1,
                        textWrap: "noWrap",
                        contColor: "#333",
                        padding: {
                            top: 1,
                            right: 0,
                            bottom: 1,
                            left: 0
                        },
                        textFormatter: function() {
                            return "t: " + this.duration
                        }
                    },
                    hoverLowerLabels: {
                        fontSize: 13,
                        offsetY: -1
                    },
                    selectLowerLabels: {
                        fontSize: 13,
                        offsetY: -1,
                        fontWeight: "bold"
                    },
                    tooltip: {
                        title: {
                            enabled: !0
                        },
                        separator: {
                            enabled: !0
                        },
                        titleFormatter: function() {
                            return this.name
                        },
                        textFormatter: function() {
                            var a = "Earliest start: " + this.earliestStart + "\nEarliest finish: " + this.earliestFinish + "\nLatest start: " + this.latestStart + "\nLatest finish: " + this.latestFinish + "\nDuration: " + this.duration +
                                "\nSlack: " + this.slack;
                            isNaN(this.variance) || (a += "\nStandard deviation: " + Math.round(100 * this.variance) / 100);
                            return a
                        }
                    }
                }
            }
        },
        standalones: {
            background: {
                enabled: !0,
                zIndex: 0
            },
            label: {
                enabled: !0,
                fontSize: 11,
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontWeight: "bold",
                textWrap: "byLetter",
                text: "Label text",
                background: {
                    enabled: !1
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                width: null,
                height: null,
                anchor: "leftTop",
                position: "leftTop",
                offsetX: 0,
                offsetY: 0,
                minFontSize: 8,
                maxFontSize: 72,
                adjustFontSize: {
                    width: !1,
                    height: !1
                },
                rotation: 0,
                zIndex: 0
            },
            labelsFactory: {
                enabled: !0,
                background: {
                    enabled: !1,
                    stroke: "#000"
                },
                zIndex: 0
            },
            legend: {
                enabled: !0,
                position: "bottom",
                align: "center",
                itemsSpacing: 15,
                iconTextSpacing: 5,
                iconSize: 13,
                width: null,
                height: null,
                itemsLayout: "horizontal",
                inverted: !1,
                items: null,
                itemsSourceMode: "default",
                itemsFormatter: function(a) {
                    return a
                },
                fontColor: "#232323",
                background: {
                    enabled: !0,
                    fill: {
                        keys: ["0 #fff 1", "0.5 #f3f3f3 1", "1 #fff 1"],
                        angle: "90"
                    },
                    stroke: {
                        keys: ["0 #ddd 1", "1 #d0d0d0 1"],
                        angle: "90"
                    },
                    cornerType: "round",
                    corners: 5
                },
                title: {
                    enabled: !0,
                    fontFamily: "Verdana, Helvetica, Arial, sans-serif",
                    fontSize: 10,
                    fontColor: "#232323",
                    text: "Legend Title",
                    background: {
                        enabled: !1,
                        stroke: {
                            keys: ["0 #DDDDDD 1", "1 #D0D0D0 1"],
                            angle: "90"
                        },
                        fill: {
                            keys: ["0 #FFFFFF 1", "0.5 #F3F3F3 1", "1 #FFFFFF 1"],
                            angle: "90"
                        }
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 3,
                        left: 0
                    }
                },
                paginator: {
                    enabled: !0,
                    fontColor: "#232323",
                    orientation: "right",
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    background: {
                        enabled: !1,
                        stroke: {
                            keys: ["0 #DDDDDD 1", "1 #D0D0D0 1"],
                            angle: "90"
                        },
                        fill: {
                            keys: ["0 #FFFFFF 1", "0.5 #F3F3F3 1", "1 #FFFFFF 1"],
                            angle: "90"
                        }
                    },
                    zIndex: 30
                },
                titleSeparator: {
                    enabled: !0,
                    width: "100%",
                    height: 1,
                    margin: {
                        top: 3,
                        right: 0,
                        bottom: 3,
                        left: 0
                    },
                    orientation: "top",
                    fill: {
                        keys: ["0 #333333 0", "0.5 #333333 1", "1 #333333 0"]
                    },
                    stroke: "none"
                },
                padding: {
                    top: 7,
                    right: 7,
                    bottom: 7,
                    left: 7
                },
                margin: {
                    top: 5,
                    right: 5,
                    bottom: 5,
                    left: 5
                },
                zIndex: 0
            },
            markersFactory: {
                enabled: !0,
                zIndex: 0
            },
            title: {
                enabled: !0,
                zIndex: 0
            },
            linearAxis: {
                enabled: !0,
                zIndex: 0,
                minorTicks: {
                    enabled: !0
                }
            },
            polarAxis: {
                enabled: !0,
                stroke: {
                    color: "black",
                    opacity: .1,
                    lineJoin: "round",
                    lineCap: "square"
                },
                zIndex: 0
            },
            radarAxis: {
                enabled: !0,
                stroke: {
                    color: "black",
                    opacity: .1,
                    lineJoin: "round",
                    lineCap: "square"
                },
                zIndex: 0
            },
            radialAxis: {
                enabled: !0,
                minorLabels: {
                    padding: {
                        top: 1,
                        right: 1,
                        bottom: 0,
                        left: 1
                    }
                }
            },
            linearGrid: {
                enabled: !0,
                isMinor: !1,
                layout: "horizontal",
                drawFirstLine: !0,
                drawLastLine: !0,
                oddFill: "#fff",
                evenFill: "#f5f5f5",
                stroke: "#c1c1c1",
                scale: null
            },
            polarGrid: {
                enabled: !0,
                isMinor: !1,
                layout: "circuit",
                drawLastLine: !0,
                oddFill: "#fff 0.3",
                evenFill: "#f5f5f5 0.3",
                stroke: "#c1c1c1"
            },
            radarGrid: {
                enabled: !0,
                isMinor: !1,
                layout: "circuit",
                drawLastLine: !0,
                oddFill: "#fff 0.3",
                evenFill: "#f5f5f5 0.3",
                stroke: "#c1c1c1"
            },
            lineAxisMarker: {
                enabled: !0,
                value: 0,
                layout: null,
                stroke: {
                    color: "#DC0A0A",
                    thickness: 1,
                    opacity: 1,
                    dash: "",
                    lineJoin: "miter",
                    lineCap: "square"
                }
            },
            textAxisMarker: {
                enabled: !0,
                fontSize: 11,
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontWeight: "bold",
                value: 0,
                anchor: "center",
                align: "center",
                layout: null,
                offsetX: 0,
                offsetY: 0,
                text: "Text marker",
                width: null,
                height: null
            },
            rangeAxisMarker: {
                enabled: !0,
                from: 0,
                to: 0,
                layout: null,
                fill: "#000 0.3"
            },
            dataGrid: {
                isStandalone: !0,
                backgroundFill: "#fff",
                zIndex: 0
            },
            scroller: {
                enabled: !0,
                fill: "#fff",
                selectedFill: "#e2e2e2",
                outlineStroke: "#fff",
                height: 40,
                minHeight: null,
                maxHeight: null,
                thumbs: {
                    enabled: !0,
                    autoHide: !1,
                    fill: "#f7f7f7",
                    stroke: "#545f69",
                    hoverFill: "#ccc",
                    hoverStroke: "#000"
                }
            }
        }
    }
})();