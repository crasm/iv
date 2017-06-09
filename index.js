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
      ctx.drawImage(img, 0, 0, c.height * imgRatio, c.height);
      return;
    }

    var fat = cRatio < imgRatio;
    if (fat) {
      console.log('fat');
      ctx.drawImage(img, 0, 0, c.width, c.width / imgRatio);
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
