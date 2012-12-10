class Circle
  constructor: (canvas, context, bkgColor, ellipses) ->
    @canvas = canvas
    @context = context

    # Set Background Color
    @canvas.style.background = bkgColor

    @ellipses = ellipses
    @loopDrawing(@ellipses)
  
  loopDrawing: (ellipses) ->
    @draw(ellipse, ellipses) for ellipse in [1..ellipses]
      

  draw: (totalItems, item) ->
    startingAngle = 0
    endingAngle = (2 * Math.PI) + startingAngle
    centerX = @canvas.width / 2
    centerY = @canvas.height / 2
    radius = (@canvas.width - 50) / 2

    scaleX = 0.25
    scaleY = 1

    @context.save()
    @context.translate(centerX, centerY)
    @context.rotate @rotate(totalItems, item)
    @context.scale(scaleX, scaleY)
    @context.beginPath()
    @context.arc(0, 0, radius, startingAngle, endingAngle, false)
    @context.closePath()
    @context.restore()

    @context.lineWidth = 2
    @context.strokeStyle = @strokeColor(totalItems, item)
    @context.stroke()

  rotate: (totalItems, item) ->
    ((2 * Math.PI) / totalItems) * item

  strokeColor: (totalItems, item) ->
    'hsl(' + Math.random() * totalItems + ', 100%, 50%)'

$ ->
  canvas = document.getElementById "circly"
  context = canvas.getContext("2d")
  circly = new Circle(canvas, context, 'yellow', 50)