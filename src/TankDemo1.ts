import { ApplicationBase } from './ApplicationBase';
import { JoyStick } from './component/JoyStick';
import { TankVc } from './component/TankVc';
import { CanvasKeyBoardEvent, CanvasMouseEvent } from "./core/Event";
import { Math2D } from './core/math2D';

export class TankDemo extends ApplicationBase {

    // public _tank: Tank;
    public _tank: TankVc;
    public _joyStick: JoyStick;

    public isOnJoyStick: boolean = false; // 是否在 joy 上

    constructor( canvas: HTMLCanvasElement, contextAttributes?: CanvasRenderingContext2DSettings ) {
        super( canvas, contextAttributes );

        this._tank = new TankVc();
        this._tank.pos.reset( canvas.width * .5, canvas.height * .5 );
        this._tank.target.reset( canvas.width * .5, canvas.height * .5 );

        this._joyStick = new JoyStick();
        this._joyStick.pos.reset( this._joyStick.outerRadius + 50, canvas.height - this._joyStick.outerRadius - 50 );
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

        const { x, y } = this._tank.pos;
        // const { x, y } = this._tank;
        // this.drawCoordInfo( `坐标：[ ${ ( this._mouseX - x ).toFixed( 0 ) },  ${ ( this._mouseY - y ).toFixed( 0 ) } ]`, this._mouseX, this._mouseY );
        // this.drawCoordInfo( `角度：${ Math2D.toDegree( Math2D.atan2( this._mouseX - x, this._mouseY - y ) ).toFixed( 0 ) }`, this._mouseX, this._mouseY + 30 );
    }

    protected dispatchMouseDown( evt: CanvasMouseEvent ): void {
        this._mouseX = evt.canvasPosition.x;
        this._mouseY = evt.canvasPosition.y;
        if ( Math2D.isPointInCircle( this._joyStick.pos, evt.canvasPosition, this._joyStick.innerRadius ) ) {
            this.isOnJoyStick = true;
            console.log( '==================== 分割线 ====================' );
            console.log( 'onJoyStick: ', this.isOnJoyStick );
        }
    }

    protected dispatchMouseMove( evt: CanvasMouseEvent ): void {
        this._mouseX = evt.canvasPosition.x;
        this._mouseY = evt.canvasPosition.y;
        // this._tank.onMouseMove( evt );
        if ( this.isOnJoyStick ) {
            this._joyStick.onJoyStickMove( evt );
            this._tank.setSpeed( this._joyStick.innerCenterPos );
            console.log( 'innerCenterPox: ', this._joyStick.innerCenterPos.toString() );
        }
    }

    protected dispatchMouseUp( evt: CanvasMouseEvent ): void {
        this.isOnJoyStick = false;
        this._joyStick.innerCenterPos.reset();
        this._tank.setSpeed( this._joyStick.innerCenterPos );
        console.log( 'onJoyStick: ', this.isOnJoyStick );
    }

    protected dispatchKeyPress( evt: CanvasKeyBoardEvent ): void {
        // this._tank.onKeyPress( evt );
    }

    public drawTank(): void {
        this._tank.draw( this );
    }

    public drawJoyStick(): void {
        this._joyStick.draw( this );
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
