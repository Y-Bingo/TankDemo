import { ApplicationBase } from '../ApplicationBase';
import { CanvasKeyBoardEvent } from "../core/Event";
import { Math2D, vec2 } from "../core/math2D";

/**
 * tank 类 vector
 */
export class TankVc2 {
    public width: number = 80;
    public height: number = 50;
    // 坦克当前位置
    public pos: vec2 = vec2.create( 100, 100 );
    public target: vec2 = vec2.create( 0, 0 );

    // x、y方向上的缩放系数
    public scaleX: number = 1.0;
    public scaleY: number = 1.0;
    // 坦克旋转角度
    public tankRotation: number = 0;        // 坦克旋转角度 弧度
    public turretRotation: number = 0;      // 炮塔旋转角度 弧度
    public scanRotation: number = 45;       // 扫描区域
    public scanRadius: number = 200;        // 扫描半径

    public initYAxis: boolean = false;       // 用来标记坦克是否朝着y轴正方向
    public showLine: boolean = true;        // 是否显示坦克原点于画布中心点和目标 的连线
    public showCoord: boolean = false;      // 是否显示坦克本身的局部坐标系
    public showScanning: boolean = true;    // 显示扫描区域

    public gunLength: number = Math.max( this.width, this.height );         // 炮管长度，default情况下，等于坦克的width 和height 中最大的一个数值
    public gunMuzzleRadius: number = 5;

    public linearSpeed: number = 1;       // 线性速率
    public speed: vec2 = vec2.create( 0, 0 ); // 速度向量

    public turretRotateSpeed: number = Math2D.toRadian( 2 );        // 旋转速度

    constructor() {
        console.log( 'draw tankVc2' );
    }

    public draw( app: ApplicationBase ): void {
        if ( app.context2D === null ) return;
        const x = this.pos.x;
        const y = this.pos.y;
        // 绘制坦克
        app.context2D.save();
        // 整个坦克移动和旋转，注意局部变换的经典顺序（trs： translate -> rotation -> scale ）
        app.context2D.translate( x, y );
        app.context2D.rotate( this.initYAxis ? this.tankRotation - Math.PI * .5 : this.tankRotation );
        app.context2D.scale( this.scaleX, this.scaleY );

        // 绘制坦克的底盘
        app.context2D.save();
        app.context2D.fillStyle = 'grey';
        app.context2D.beginPath();
        if ( this.initYAxis ) {
            app.context2D.rect( - this.height * 0.5, -this.width * 0.5, this.height, this.width );
        } else {
            app.context2D.rect( -this.width * 0.5, - this.height * 0.5, this.width, this.height );
        }
        app.context2D.fill();
        app.context2D.restore();

        // 绘制炮塔
        app.context2D.save();
        app.context2D.rotate( this.turretRotation );

        // 扫描区域显示
        if ( this.showScanning ) {
            app.context2D.save();
            app.fillArc( 0, 0, this.scanRotation, this.scanRadius, 'rgba( 0 ,0, 0, 0.5 )' );
            app.context2D.restore();
        }

        // 椭圆炮塔ellipse方法
        app.context2D.fillStyle = "red";
        app.context2D.beginPath();
        if ( this.initYAxis ) {
            app.context2D.ellipse( 0, 0, 10, 15, 0, 0, 2 * Math.PI );
        } else {
            app.context2D.ellipse( 0, 0, 15, 10, 0, 0, 2 * Math.PI );
        }
        app.context2D.fill();
        // 炮管
        app.context2D.strokeStyle = 'blue';
        app.context2D.lineWidth = 5;
        app.context2D.lineCap = 'round';
        app.context2D.moveTo( 0, 0 );
        if ( this.initYAxis ) {
            app.context2D.lineTo( 0, this.gunLength );
        } else {
            app.context2D.lineTo( this.gunLength, 0 );
        }
        app.context2D.stroke();
        if ( this.initYAxis ) {
            app.context2D.translate( 0, this.gunLength );
            app.context2D.translate( 0, this.gunMuzzleRadius );
        } else {
            app.context2D.translate( this.gunLength, 0 );
            app.context2D.translate( this.gunMuzzleRadius, 0 );
        }
        app.fillCircle( 0, 0, 10, 'green' );
        app.context2D.restore();

        // 绘制一个圆球，标记坦克的正方向，一旦炮管旋转后，可以知道正方向在哪里
        app.context2D.save();
        if ( this.initYAxis ) {
            app.context2D.translate( 0, this.width * 0.5 );
        } else {
            app.context2D.translate( this.width * 0.5, 0 );
        }
        app.fillCircle( 0, 0, 10, 'green' );
        app.context2D.restore();

        // 跟随坦克的坐标系
        if ( this.showCoord ) {
            app.context2D.save();
            app.context2D.lineWidth = 1;
            app.context2D.lineCap = "butt";
            app.strokeCoord( 0, 0, this.width * 1.2, this.height * 1.2 );
            app.context2D.restore();
        }

        app.context2D.restore();

        if ( !this.showLine )
            return;
        // 绘制坦克原点到画布中心原点的连线
        app.context2D.save();
        app.strokeLine( x, y, app.canvas.width * .5, app.canvas.height * .5 );
        // 绘制坦克原点到目标原点的连线
        app.strokeLine( x, y, this.target.x, this.target.y );
        app.context2D.restore();
    }

    public turnTo( dir: vec2 ): void {
        this.tankRotation = Math.atan2( dir.y, dir.x );
    }

    public lookAt( dir: vec2): void {
        this.turretRotation = Math.atan2( dir.y, dir.x );
    }
   
    public onKeyPress( evt: CanvasKeyBoardEvent ): void {
        if ( evt.key == "r" ) {
            this.turretRotation += this.turretRotateSpeed;
        } else if ( evt.key == "t" ) {
            this.turretRotation = 0;
        } else if ( evt.key === 'e' ) {
            this.turretRotation -= this.turretRotateSpeed;
        }
    }

    public onMouseMove( target: vec2 ): void {
        // 每次移动， 记录当前鼠标指针在canvas2d画布中的位置
        this.target.reset( target.x, target.y );
    }

    // 更新速度
    public setSpeed( speed: vec2 ): void {
        vec2.scale( speed, this.linearSpeed, this.speed );
    }

    private _moveTowardTo( intervalSec: number ): void {
        // 计算坦克当前的位置到鼠标点之间的向量
        const dir: vec2 = vec2.difference( this.target, this.pos );
        const curSpeed: number = this.linearSpeed * intervalSec;
        dir.normalize();
        vec2.scaleAdd( this.pos, dir, curSpeed, this.pos );
    }

    private _moveTowardToSpeed( intervalSec: number ): void {
        const dir: vec2 = vec2.scale( this.speed, intervalSec );
        console.log( 'tankSpeed: ', this.speed.toString(), '偏移量', dir.toString() );
        this.pos.add( dir );
    }

    public update( intervalSec: number ): void {
        // this._moveTowardTo( intervalSec );
        if ( this.speed.squaredLength !== 0 ) {
            this._moveTowardToSpeed( intervalSec );
            this.turnTo( this.speed );
        }
    }
}