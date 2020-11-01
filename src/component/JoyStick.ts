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

    // private _lookAt(): void {
    //     // 将鼠标点的x和y变换为相对坦克的坐标系的原点的标示值
    //     let diffX: number = this._target.x - this.pos.x;
    //     let diffY: number = this._target.y - this.pos.y;

    //     // 计算弧度
    //     let radian = Math.atan2( diffY, diffX );

    //     this.tankRotation = radian;
    // }

    // public onMouseMove( evt: CanvasMouseEvent ): void {
    //     // 每次移动， 记录当前鼠标指针在canvas2d画布中的位置
    //     // this._targetX = evt.canvasPosition.x;
    //     // this._targetY = evt.canvasPosition.y;
    //     this._target.reset( evt.canvasPosition.x, evt.canvasPosition.y );
    //     this._lookAt();
    // }

    public onJoyStickMove( evt: CanvasMouseEvent ): void {
        vec2.difference( evt.canvasPosition, this.pos, this.innerCenterPos );
        // 限制可拖动范围
        if ( this.innerCenterPos.squaredLength > this.outerRadius * this.outerRadius ) {
            this.innerCenterPos.normalize();
            vec2.scale( this.innerCenterPos, this.outerRadius, this.innerCenterPos );
        }
    }

    // private _moveTowardTo( intervalSec: number ): void {
    //     // 计算坦克当前的位置到鼠标点之间的向量
    //     const dir: vec2 = vec2.difference( this._target, this.pos );
    //     const curSpeed: number = this.linearSpeed * intervalSec;
    //     dir.normalize();
    //     this.pos = vec2.scaleAdd( this.pos, dir, curSpeed );
    // }

    // public update( intervalSec: number ): void {

    // }
}