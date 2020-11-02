import { ApplicationBase } from './ApplicationBase';
import { Enemy } from "./component/Enemy";
import { JoyStick } from './component/JoyStick';
import { TankVc } from './component/TankVc';
import { TankVc2 } from "./component/TankVc2";
import { CanvasKeyBoardEvent, CanvasMouseEvent } from "./core/Event";
import { Math2D } from "./core/math2D";

export class TankDemo extends ApplicationBase {

    // public _tank: Tank;
    public _tank: TankVc2;
    public _joyStickMove: JoyStick;
    public _joyStickGun: JoyStick;
    private enemyPool: Enemy[] = []; // empty

    public isOnJoyStickMove: boolean = false; // 是否在 joy 上
    public isOnJoyStickGun: boolean = false; // 是否在 joy 上

    constructor( canvas: HTMLCanvasElement, contextAttributes?: CanvasRenderingContext2DSettings ) {
        super( canvas, contextAttributes );

        this._tank = new TankVc2();
        this._tank.pos.reset( canvas.width * .5, canvas.height * .5 );
        this._tank.target.reset( canvas.width * .5, canvas.height * .5 );

        this._joyStickMove = new JoyStick();
        this._joyStickMove.pos.reset( this._joyStickMove.outerRadius + 50, canvas.height - this._joyStickMove.outerRadius - 50 );

        this._joyStickGun = new JoyStick();
        this._joyStickGun.pos.reset( canvas.width - this._joyStickMove.outerRadius - 50, canvas.height - this._joyStickMove.outerRadius - 50 );

        this.enemyPool.push( new Enemy( 300, 233 ) );
    }

    public update( elapsedMsec: number, intervalSec: number ): void {
        super.update( elapsedMsec, intervalSec );

        // this._joyStick.update( intervalSec );
        this._tank.update( intervalSec );
    }

    public render(): void {
        if ( this.context2D === null ) return;

        this.context2D.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.strokeGrid();

        this.drawCanvasCoordCenter();
        this.draw4Quadrant();
        this.drawTank();
        this.drawJoyStick();
        this.drawEnemy();

        const { x, y } = this._tank.pos;
        // const { x, y } = this._tank;
        // this.drawCoordInfo( `坐标：[ ${ ( this._mouseX - x ).toFixed( 0 ) },  ${ ( this._mouseY - y ).toFixed( 0 ) } ]`, this._mouseX, this._mouseY );
        // this.drawCoordInfo( `角度：${ Math2D.toDegree( Math2D.atan2( this._mouseX - x, this._mouseY - y ) ).toFixed( 0 ) }`, this._mouseX, this._mouseY + 30 );
    }

    protected dispatchMouseDown( evt: CanvasMouseEvent ): void {
        this._mouseX = evt.canvasPosition.x;
        this._mouseY = evt.canvasPosition.y;
        if ( Math2D.isPointInCircle( this._joyStickMove.pos, evt.canvasPosition, this._joyStickMove.innerRadius ) ) {
            this.isOnJoyStickMove = true;
            console.log( '==================== 分割线 ====================' );
            console.log( 'onJoyStickMove: ', this.isOnJoyStickMove );
        }

        if ( Math2D.isPointInCircle( this._joyStickGun.pos, evt.canvasPosition, this._joyStickGun.innerRadius ) ) {
            this.isOnJoyStickGun = true;
            console.log( '==================== 分割线 ====================' );
            console.log( 'onJoyStickGun: ', this.isOnJoyStickMove );
        }
    }

    protected dispatchMouseMove( evt: CanvasMouseEvent ): void {
        this._mouseX = evt.canvasPosition.x;
        this._mouseY = evt.canvasPosition.y;
        // this._tank.onMouseMove( evt );
        if ( this.isOnJoyStickMove ) {
            this._joyStickMove.onJoyStickMove( evt );
            this._tank.setSpeed( this._joyStickMove.innerCenterPos );
            // console.log( 'innerCenterPox: ', this._joyStickMove.innerCenterPos.toString() );
        }

        if ( this.isOnJoyStickGun ) {
            this._joyStickGun.onJoyStickMove( evt );
            this._tank.lookAt( this._joyStickGun.innerCenterPos );
            // console.log( 'innerCenterPox: ', this._joyStickMove.innerCenterPos.toString() );
        }
    }

    protected dispatchMouseUp( evt: CanvasMouseEvent ): void {
        if( this.isOnJoyStickMove ) {
            this.isOnJoyStickMove = false;
            this._joyStickMove.innerCenterPos.reset();
            this._tank.setSpeed( this._joyStickMove.innerCenterPos );
            console.log( 'onJoyStickMove: ', this.isOnJoyStickMove );
        }

        if ( this.isOnJoyStickGun ) {
            this.isOnJoyStickGun = false;
            this._joyStickGun.innerCenterPos.reset();
            // this._tank.setSpeed( this._joyStickGun.innerCenterPos );
            console.log( 'onJoyStickGun: ', this.isOnJoyStickGun );
        }
    }

    protected dispatchKeyPress( evt: CanvasKeyBoardEvent ): void {
        this._tank.onKeyPress( evt );
    }

    public drawTank(): void {
        this._tank.draw( this );
    }

    public drawJoyStick(): void {
        this._joyStickMove.draw( this );
        this._joyStickGun.draw( this );
    }

    public drawEnemy(): void {
        for ( let i = 0; i < this.enemyPool.length; i++ ) {
            const enemy = this.enemyPool[ i ];
            enemy.draw( this );
        }
    }
}




let canvas: HTMLCanvasElement = document.querySelector( '#canvas' ) as HTMLCanvasElement;
let startBtn: HTMLButtonElement = document.querySelector( '#start' ) as HTMLButtonElement;
let stopBtn: HTMLButtonElement = document.querySelector( '#stop' ) as HTMLButtonElement;

let app: TankDemo = new TankDemo( canvas );

// app.render();

let ptX: number = 600;
let ptY: number = 500;

app.strokeGrid();
app.drawCanvasCoordCenter();
app.draw4Quadrant();

app.drawTank();
app.drawJoyStick();
// app._tank.tankRotation = Math.atan2( ptX - app.canvas.width * .5, ptY - app.canvas.height * .5 );
// app.drawTank();

// let len = app.distance( ptX, ptY, app.canvas.width * .5, app.canvas.height * .5 );
// app._tank.x = app._tank.x + Math.cos( app._tank.tankRotation ) * len * .5;
// app._tank.y = app._tank.y + Math.sin( app._tank.tankRotation ) * len * .5;

// app.drawTank();

// app._tank.x = app._tank.x + Math.cos( app._tank.tankRotation ) * len * .5;
// app._tank.y = app._tank.y + Math.sin( app._tank.tankRotation ) * len * .5;

// app.drawTank();

// 绘制三角型
// app.drawTriangle( app.canvas.width * .5, app.canvas.height * .5, ptX, app.canvas.height * .5, ptX, ptY );

app.start();

// startBtn.onclick = ( ev: MouseEvent ): void => {
//     app.start();
// };

// stopBtn.onclick = ( ev: MouseEvent ): void => {
//     app.stop();
// };
