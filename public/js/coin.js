$(function() {
  if (window.requestAnimationFrame) {
    var coins   = []
    var gravity = 0.001
    function animate(time) {
      var now = Date.now()
      var next = _.partition(coins, function(coin) {
        return now - coin.start > coin.ttl
      })
      var expired = next[0]
      var current = next[1]

      expired.forEach(function(coin) {
        coin.$el.remove()
      })

      coins = current

      coins.forEach(function(coin) {
        var elapsed = now - coin.start
        var x = coin.origin[0] + elapsed * coin.velocity[0]
        var y = coin.origin[1] + elapsed * coin.velocity[1] + elapsed * elapsed * gravity
        var opacity = 1 - (elapsed / coin.ttl)
        coin.$el.css({opacity: opacity, left: x, top: y})
      })

      requestAnimationFrame(animate)
    }
    function coin(pageX, pageY) {
      var coin = {
        start    : Date.now(),
        ttl      : 300 + (Math.random() * 300),
        origin   : [pageX - 12, pageY - 12],
        velocity : [
          (Math.random() * 0.4) - 0.2, 
          (Math.random() * 0.4) - 0.2
        ],
        $el      : $('<img class="coin" src="img/coin.png">')
      }
      return coin
    }
    function add(coin) {
      coins = coins.concat([coin])
      $('body').append(coin.$el)
    }
    $(document).on('mousemove', function(e) {
      add(coin(e.pageX, e.pageY))
    })
    $(document).on('click', function(e) {
      for (var i = 0; i < 75; ++i) {
        add(coin(e.pageX, e.pageY))
      }
    })
    requestAnimationFrame(animate)
  }
})