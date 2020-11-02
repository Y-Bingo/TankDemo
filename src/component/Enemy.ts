import { ApplicationBase } from "../ApplicationBase";
import { vec2 } from "../core/math2D";

/**
 * 敌人 
 */
export class Enemy {
  public pos: vec2 = vec2.create( 0, 0 );
  public radius: number = 0;

  public isFound: boolean = true;  // 是否被发现

  public constructor( x: number, y: number, radius: number = 10 ) {
    this.pos.reset( x, y );
    this.radius = radius;
  }

  public draw( app: ApplicationBase ): void {
    if ( this.isFound ) {
      app.fillCircle( this.pos.x, this.pos.y, this.radius, 'red' );
    } else {
      app.fillCircle( this.pos.x, this.pos.y, this.radius, 'green' );
    }
  }
}