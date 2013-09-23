/**
 * @jsx React.DOM
 */

var Ball = React.createClass({displayName: 'Ball',

  getInitialState: function() {
    return {
      radius: 30,
      position: {x: 0, y: 0},
      velocity: {x: 0, y: 0}
    };
  },

  componentWillMount: function() {
    document.addEventListener('click', this._toggle, false)
    window.addEventListener('resize', throttle(this._updateWindow), false);
    this._updateWindow();
    this.setState({position: {x: this._maxX / 2, y: this._maxY / 2}});
  },

  _updateWindow: function() {
    var diameter = this.state.radius * 2;
    this._maxX = window.innerWidth - diameter;
    this._maxY = window.innerHeight - diameter;
  },

  _pause: function() {
    this.setState({velocity: {x:0, y:0}});
    cancelAnimationFrame(this._frame);
    this._frame = null;
  },

  _toggle: function() {
    this._frame ? this._pause() : this._tick();
  },

  _tick: function() {
    var position = this.state.position;
    var velocity = this.state.velocity;
    var velX = velocity.x, posX = position.x + velX;
    var velY = velocity.y, posY = position.y + velY;

    if (posX < 0) {
      posX *= -1;
      velX *= -1;
    } else if (posX > this._maxX) {
      posX = 2 * this._maxX - posX;
      velX *= -1;
    }

    if (posY < 0) {
      posY *= -1;
      velY *= -1;
    } else if (posY > this._maxY) {
      posY = 2 * this._maxY - posY;
      velY *= -1;
    }

    this.setState({
      position: {x: posX, y: posY},
      velocity: {x: velX, y: velY}
    });

    this._frame = requestAnimationFrame(this._tick.bind(this));
  },

  _startDrag: function(event) {
    this._frame && this._pause();

    var position = this.state.position;
    var startX = event.clientX, insetX = startX - position.x;
    var startY = event.clientY, insetY = startY - position.y;

    var mousemove = function(event) {
      var eventX = event.clientX;
      var eventY = event.clientY;
      this.setState({
        position: {x: eventX - insetX, y: eventY - insetY},
        velocity: {x: eventX - startX, y: eventY - startY}
      });
      startX = eventX;
      startY = eventY;
    }.bind(this);

    var mouseup = function() {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mousemove', mousemove, false);
    document.addEventListener('mouseup', mouseup, false);
  },

  render: function() {
    return (
      React.DOM.div( {className:"Ball", onMouseDown:this._startDrag, style:{
        top: this.state.position.y,
        left: this.state.position.x,
        width: this.state.radius * 2,
        height: this.state.radius * 2,
        borderRadius: this.state.radius
      }}, null )
    );
  }

});

React.renderComponent(Ball(null, null ), document.body);
