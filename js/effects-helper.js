/**
 * This is used for loading camera-app's object.
 */
var Effects;
var FaceTracker;

var defineHandlers = [
  function(effects) {
    Effects = effects;
    Effects.defineAdditionalEffects = function(effects) {
      var glassesImage = new Image();
      glassesImage.src = 'scuba-mask.png';
      var scaleRate = 1;
      var offsetRateX = 0.6;
      var offsetRateY = 0.4;
      effects.data.push({
        id: 'glasses',
        name: 'Glasses',
        tracks: true,
        filter: function(canvas, element, frame, track) {
          var context = canvas.getContext('2d');
          for (var i = 0; i < track.faces.length; i++) {
            var face = track.faces[i];
            context.save();
            context.scale(element.width / track.trackWidth,
                          element.width / track.trackWidth);
            context.translate(face.x + face.width * offsetRateX,
                              face.y + face.height * offsetRateY);
            context.scale(
                face.width * scaleRate / glassesImage.width,
                face.width * scaleRate / glassesImage.width);
            context.translate(
                -glassesImage.width / 2, -glassesImage.height / 2);
            context.drawImage(glassesImage, 0, 0);
            context.restore();
          }
        }
      });
    };
  },

  function(faceTracker) {
    FaceTracker = faceTracker;
  }
];

var define = function(_, type) {
  defineHandlers.shift().call(null, type);
};
