import { ApplicationBase } from './ApplicationBase';
import { JoyStick } from './component/JoyStick';
import { Tank } from "./component/Tank";
import { TankVc } from './component/TankVc';
import { CanvasKeyBoardEvent, CanvasMouseEvent } from "./core/Event";

export class TankDemo extends ApplicationBase {

    public _tank: Tank;

    constructor( canvas: HTMLCanvasElement, contextAttributes?: CanvasRenderingContext2DSettings ) {
        super( canvas, contextAttributes );

        this._tank = new Tank();
        this._tank.x = canvas.width * .5;
        this._tank.y = canvas.height * .5;

        // this._tank = new Tank();
        // this._tank.pos.reset( canvas.width * .5, canvas.height * .5 );
        // this._tank.target.reset( canvas.width * .5, canvas.height * .5 );
    }

    public update( elapsedMsec: number, intervalSec: number ): void {
        super.update( elapsedMsec, intervalSec );

        this._tank.update( intervalSec );
    }

    public render(): void {
        if ( this.context2D === null ) return;

        this.context2D.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.strokeGrid();

        this.drawCanvasCoordCenter();
        this.draw4Quadrant();
        this.drawTank();

        const { x, y } = this._tank;
        // const { x, y } = this._tank;
        // this.drawCoordInfo( `坐标：[ ${ ( this._mouseX - x ).toFixed( 0 ) },  ${ ( this._mouseY - y ).toFixed( 0 ) } ]`, this._mouseX, this._mouseY );
        // this.drawCoordInfo( `角度：${ Math2D.toDegree( Math2D.atan2( this._mouseX - x, this._mouseY - y ) ).toFixed( 0 ) }`, this._mouseX, this._mouseY + 30 );
    }

    protected dispatchMouseMove( evt: CanvasMouseEvent ): void {
        this._mouseX = evt.canvasPosition.x;
        this._mouseY = evt.canvasPosition.y;
        this._tank.onMouseMove( evt );
    }

    protected dispatchMouseDown( evt: CanvasMouseEvent ): void {
        this._mouseX = evt.canvasPosition.x;
        this._mouseY = evt.canvasPosition.y;
        // this._tank.onMouseMove( evt );
    }

    protected dispatchKeyPress( evt: CanvasKeyBoardEvent ): void {
        // this._tank.onKeyPress( evt );
    }

    public drawTank(): void {
        this._tank.draw( this );
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
