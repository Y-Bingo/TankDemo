import { ApplicationBase } from '../ApplicationBase';
import { CanvasMouseEvent } from '../core/Event';
import { vec2 } from "../core/math2D";

/**
 * JoyStick 摇杆
 */
export class JoyStick {

    public outerRadius: number = 50;
    public innerRadius: number = 30;

    public pos: vec2 = vec2.create( 100, 100 );
    public outerCenterPos: vec2 = vec2.create( 0, 0 );  // 外圆圆心 局部坐标
    public innerCenterPos: vec2 = vec2.create( 0, 0 );  // 内圆圆心 局部坐标
    // x、y方向上的缩放系数
    public scaleX: number = 1.0;
    public scaleY: number = 1.0;

    public showCoord: boolean = true; // 是否显示 局部坐标系
    public showLine: boolean = true; // 是否显示 局部坐标系的连线

    public draw( app: ApplicationBase ): void {
        if ( app.context2D === null ) return;
        const x = this.pos.x;
        const y = this.pos.y;

        app.context2D.save();
        // 注意局部变换的经典顺序（trs： translate -> rotation -> scale ）
        app.context2D.translate( x, y );
        // app.context2D.rotate( this.rotation );
        app.context2D.scale( this.scaleX, this.scaleY );

        // 绘制外圆
        app.context2D.save();
        app.strokeCircle( 0, 0, this.outerRadius, 'grey' );
        app.context2D.restore();

        // 绘制内圆
        app.context2D.save();
        app.fillCircle( this.innerCenterPos.x, this.innerCenterPos.y, this.innerRadius, 'black' );
        app.context2D.restore();

        // 跟随坦克的坐标系
        if ( this.showCoord ) {
            app.context2D.save();
            app.context2D.lineWidth = 1;
            app.context2D.lineCap = "butt";
            app.strokeCoord( 0, 0, this.outerRadius * 1.2, this.outerRadius * 1.2 );
            app.context2D.restore();
        }

        // 绘制内外圆圆心的连线
        if ( this.showLine ) {
            app.context2D.save();
            app.strokeLine( this.outerCenterPos.x, this.outerCenterPos.x, this.innerCenterPos.x, this.innerCenterPos.y );
            // 绘制坦克原点到目标原点的连线
            app.context2D.restore();
        }

        app.context2D.restore();
    }

    public onJoyStickMove( evt: CanvasMouseEvent ): void {
        vec2.difference( evt.canvasPosition, this.pos, this.innerCenterPos );
        // 限制可拖动范围
        if ( this.innerCenterPos.squaredLength > this.outerRadius * this.outerRadius ) {
            this.innerCenterPos.normalize();
            vec2.scale( this.innerCenterPos, this.outerRadius, this.innerCenterPos );
        }
    }

    public setDirection( dir: vec2 ): void {
        vec2.sum( this.outerCenterPos, dir, this.innerCenterPos );
        // 限制可拖动范围
        if ( this.innerCenterPos.squaredLength > this.outerRadius * this.outerRadius ) {
            this.innerCenterPos.normalize();
            vec2.scale( this.innerCenterPos, this.outerRadius, this.innerCenterPos );
        }
    }
}