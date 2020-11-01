
import { Canvas2DApplication } from "./core/Canvas2DApplication";
import { TextAlign, TextBaseLine, TextHelper } from "./helper/TextHelper";

export class ApplicationBase extends Canvas2DApplication {

    protected _mouseX: number = 0;
    protected _mouseY: number = 0;

    public isSupportMouseMove: boolean = true;

    public fillText(
        title: string,
        x: number,
        y: number,
        color: string = 'white',
        align: TextAlign = "left",
        baseLine: TextBaseLine = "top",
        font: string = "10px sans-serif"
    ): void {
        if ( this.context2D === null ) return;

        this.context2D.save();

        this.context2D.textAlign = align;
        this.context2D.textBaseline = baseLine;
        this.context2D.fillStyle = color;
        this.context2D.font = font;
        this.context2D.fillText( title, x, y );

        this.context2D.restore();
    }

    public fillCircle( x: number, y: number, radius: number = 10, color: string = 'black' ): void {
        if ( this.context2D === null ) return;

        this.context2D.save();
        this.context2D.fillStyle = color;
        this.context2D.beginPath();
        this.context2D.arc( x, y, radius, 0, 2 * Math.PI );
        this.context2D.fill();
        this.context2D.restore();
    }

    public strokeCircle( x: number, y: number, radius: number = 10, color: string = 'black' ): void {
        if ( this.context2D === null ) return;

        this.context2D.save();
        this.context2D.fillStyle = color;
        this.context2D.beginPath();
        this.context2D.arc( x, y, radius, 0, 2 * Math.PI );
        this.context2D.stroke();
        this.context2D.restore();
    }

    public strokeLine( x0: number, y0: number, x1: number, y1: number ): void {
        if ( this.context2D === null ) return;

        this.context2D.save();
        this.context2D.beginPath();
        this.context2D.moveTo( x0, y0 );
        this.context2D.lineTo( x1, y1 );
        this.context2D.stroke();
        this.context2D.restore();
    }

    public strokeCoord( originX: number, originY: number, width: number, height: number, lineWidth: number = 3 ): void {
        if ( this.context2D === null ) return;

        this.context2D.save();
        this.context2D.beginPath();
        this.context2D.lineWidth = lineWidth;
        this.context2D.strokeStyle = "red";
        this.strokeLine( originX, originY, originX + width, originY );
        this.context2D.strokeStyle = 'blue';
        this.strokeLine( originX, originY, originX, originY + height );
        this.context2D.restore();
    }

    public strokeGrid( color: string = "grey", interval: number = 10 ): void {
        if ( this.context2D === null ) return;

        this.context2D.save();
        this.context2D.strokeStyle = color;
        this.context2D.lineWidth = 0.5;
        // 横
        for ( let i = interval + 0.5; i < this.canvas.height; i += interval )
            this.strokeLine( 0, i, this.canvas.width, i );
        // 纵
        for ( let i = interval + 0.5; i < this.canvas.width; i += interval )
            this.strokeLine( i, 0, i, this.canvas.height );
        this.context2D.restore();
        this.fillCircle( 0, 0, 5, 'green' );
        this.strokeCoord( 0, 0, this.canvas.width, this.canvas.height );
    }

    // 绘制三角型
    public drawTriangle( x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, stroke: boolean = true ): void {
        if ( this.context2D == null ) return;
        this.context2D.save();
        this.context2D.lineWidth = 3;
        this.context2D.strokeStyle = 'rgba(0,0,0,0.5)';
        this.context2D.beginPath();
        this.context2D.moveTo( x0, y0 );
        this.context2D.lineTo( x1, y1 );
        this.context2D.lineTo( x2, y2 );
        this.context2D.closePath();

        if ( stroke ) {
            this.context2D.stroke();
        } else {
            this.context2D.fill();
        }
        this.fillCircle( x2, y2, 5 );
        this.context2D.restore();
    }

    public drawCoordInfo( info: string, x: number, y: number ): void {
        this.fillText( info, x, y, 'red', 'center', 'bottom', TextHelper.makeFontString( '24px', 'bold', 'normal', 'normal', 'fantasy' ) );
    }

    public drawCanvasCoordCenter(): void {
        if ( this.context2D === null ) return;

        let halfWidth: number = this.canvas.width * .5;
        let halfHeight: number = this.canvas.height * .5;

        this.context2D.save();
        this.context2D.lineWidth = 2;
        this.context2D.strokeStyle = 'rgba( 255, 0, 0, 0.5 )';
        this.strokeLine( halfWidth, 0, halfWidth, this.canvas.height );
        this.context2D.strokeStyle = 'rgba( 0, 0, 255, 0.5 )';
        this.strokeLine( 0, halfHeight, this.canvas.width, halfHeight );
        this.context2D.restore();

        this.fillCircle( halfWidth, halfHeight, 5, "rgba( 0 ,0, 0, 0.5 )" );

    }

    public draw4Quadrant(): void {
        if ( this.context2D === null ) return;

        this.context2D.save();

        this.fillText( "第一象限", this.canvas.width, this.canvas.height, 'rgba(0, 0, 255, 0.5)', 'right', 'bottom', TextHelper.makeFontString( '24px', 'bolder', 'normal', 'normal', 'serif' ) );
        this.fillText( "第二象限", 0, this.canvas.height, 'rgba(0, 0, 255, 0.5)', 'left', 'bottom', TextHelper.makeFontString( '24px', 'bolder', 'normal', 'normal', 'serif' ) );
        this.fillText( "第三象限", 0, 0, 'rgba(0, 0, 255, 0.5)', 'left', 'top', TextHelper.makeFontString( '24px', 'bolder', 'normal', 'normal', 'serif' ) );
        this.fillText( "第四象限", this.canvas.width, 0, 'rgba(0, 0, 255, 0.5)', 'right', 'top', TextHelper.makeFontString( '24px', 'bolder', 'normal', 'normal', 'serif' ) );

        this.context2D.restore();
    }

    public distance( x0: number, y0: number, x1: number, y1: number ): number {
        let diffX: number = x1 - x0;
        let diffY: number = y1 - y0;
        return Math.sqrt( diffX * diffX + diffY * diffY );
    }
}
