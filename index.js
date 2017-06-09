(function() {
  function draw(img) {
    var c = document.getElementById('c');
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    var ctx = c.getContext('2d');

    var cRatio = c.width / c.height;
    var imgRatio = img.width / img.height;

    console.log('c: ' + c.width + ', ' + c.height);
    console.log('img: ' + img.width + ', ' + img.height);

    var same = cRatio == imgRatio;
    if (same) {
      console.log('same');
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return;
    }

    var skinny = imgRatio < cRatio;
    if (skinny) {
      console.log('skinny');
      var dWidth = c.height * imgRatio;
      var dHeight = c.height;
      var dx = (c.width - dWidth) / 2;
      var dy = 0;
      console.log('dx=' + dx + ',dy=' + dy);
      ctx.drawImage(img, dx, dy, dWidth, dHeight);
      return;
    }

    var fat = cRatio < imgRatio;
    if (fat) {
      console.log('fat');
      var dWidth = c.width;
      var dHeight = c.width / imgRatio;
      var dx = 0;
      var dy = (c.height - dHeight) / 2;
      console.log('dx=' + dx + ',dy=' + dy);
      ctx.drawImage(img, dx, dy, dWidth, dHeight);
      return;
    }
  }

  var img = new Image();
  img.onload = function() {
    draw(img);
    window.addEventListener('resize', function() {
      draw(img);
    }, true);
  };

  var url = window.location.pathname.substring(1);
  if (url.startsWith('http://') || url.startsWith('https://')) {
    img.src = url;
  } else {
    img.onerror = function() {
      // Fallback to HTTP.
      img.src = 'http://' + url;
    };
    img.src = 'https://' + url;
  }
})();
