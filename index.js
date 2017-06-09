(function() {
  var canvas = document.getElementById('c');
  canvas.ondrag = function(e) {
    console.log('ondrag: ' + e.screenX + ',' + e.screenY);
  };
  canvas.ondragstart = function(e) {
    console.log('ondragstart: ' + e.screenX + ',' + e.screenY);
  };
  canvas.ondragend = function(e) {
    console.log('ondragend: ' + e.screenX + ',' + e.screenY);
  };

  function draw(img) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext('2d');

    var cRatio = canvas.width / canvas.height;
    var imgRatio = img.width / img.height;

    console.log('c: ' + canvas.width + ', ' + canvas.height);
    console.log('img: ' + img.width + ', ' + img.height);

    var same = cRatio == imgRatio;
    if (same) {
      console.log('same');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return;
    }

    var skinny = imgRatio < cRatio;
    if (skinny) {
      console.log('skinny');
      var dw = canvas.height * imgRatio;
      var dh = canvas.height;
      var dx = (canvas.width - dw) / 2;
      var dy = 0;
      console.log('dx=' + dx + ',dy=' + dy);
      ctx.drawImage(img, dx, dy, dw, dh);
      return;
    }

    var fat = cRatio < imgRatio;
    if (fat) {
      console.log('fat');
      var dw = canvas.width;
      var dh = canvas.width / imgRatio;
      var dx = 0;
      var dy = (canvas.height - dh) / 2;
      console.log('dx=' + dx + ',dy=' + dy);
      ctx.drawImage(img, dx, dy, dw, dh);
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
