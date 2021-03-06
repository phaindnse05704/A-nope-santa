class Player {
  constructor( ctx, x, y ) {
    this.x = x
    this.y = y
    
    this.dest = { x: 0, y: 0 }
    
    this.width = 200
    this.height = 200
    this.velocity = 30
    
    this.angularVelocity = 7
    this.rotation = 1.58
    
    this.ctx = ctx
    
    this.image = new Image()
    this.image.src = "//habrastorage.org/files/447/9b4/6d3/4479b46d397e439a9613ce122a66a506.png"
  }
  
  draw() {
    this.ctx.translate( this.x, this.y )
    this.ctx.rotate( this.rotation + 4.7 )
    this.ctx.drawImage(
      this.image,
      -this.width / 2, -this.height / 2,
      this.width, this.height
      )
    this.ctx.rotate( -this.rotation - 4.7 )
    this.ctx.translate( -this.x, -this.y )
  }
  
  distance( target ) {
    let data = {
      x: target.x - this.x,
      y: target.y - this.y
    }
    data.len = Math.sqrt( data.x * data.x + data.y * data.y )
    return data
  }
  
  rotate() {
    let path = this.distance( this.dest )
    let target = Math.atan2( path.y, path.x )

    let delta = this.rotation - target
    if ( delta > 0.1 || delta < -0.1 ) {

      let _delta = delta
      if ( _delta < 0 ) {
        _delta += Math.PI * 2
      }

      if ( delta < -Math.PI || ( delta > 0 && delta < Math.PI ) ) {
        this.rotation -= _delta / this.angularVelocity
      } else {
        this.rotation -= ( _delta - Math.PI * 2 ) / this.angularVelocity
      }

      // Reduce character rotation into the -PI thru PI range
      this.rotation = ( this.rotation + 3 * Math.PI ) % ( 2 * Math.PI ) - Math.PI
    }
  }

  step() {
    let distance = this.distance( this.dest ).len
    if ( distance < this.width / 1.5 ) {
      this.draw()
      return
    }

    let vel = distance / 15

    if ( vel > this.velocity ) {
      vel = this.velocity
    }

    this.rotate()

    this.x += vel * Math.cos( this.rotation )
    this.y += vel * Math.sin( this.rotation )
    
    this.draw()
  }
 
}
