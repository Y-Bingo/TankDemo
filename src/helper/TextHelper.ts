import { Size } from "../core/math2D";

export type Repeatition = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
// 文字左右对齐
export type TextAlign = "start" | "left" | "center" | "right" | "end";
// 文字上下对齐
export type TextBaseLine = "alphabetic" | "hanging" | "top" | "middle" | "bottom";
// 文字样式
export type FontType = "10px sans-serif" | "15px sans-serif" | "20px sans-serif" | "25px sans-serif";
export type FontStyle = "normal" | "italic" | "oblique";
export type FontVariant = "normal" | "small-caps";
export type FontWeight = "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
export type FontSize = "10px" | "12px" | "16px" | "18px" | "24px" | "50%" | "75%" | "100%" | "125%" | "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large";
export type FontFamily = "sans-serif" | "serif" | "courier" | "fantasy" | "monspace";

const Colors: string[] = [
    'aqua',    //浅绿色
    'black',   //黑色
    'blue',    //蓝色 
    'fuchsia', //紫红色
    'gray',     //灰色
    'green',   //绿色
    'lime',    //绿黄色
    'maroon',  //褐红色
    'navy',    //海军蓝
    'olive',   //橄榄色
    'orange',  //橙色
    'purple',  //紫色
    'red',      //红色
    'silver',  //银灰色
    'teal',    //蓝绿色
    'yellow',   //黄色
    'white'   //白色
];

// 布局
export enum ELayout {
    LEFT_TOP,
    RIGHT_TOP,
    RIGHT_BOTTOM,
    LEFT_BOTTOM,
    CENTER_MIDDLE,
    CENTER_TOP,
    RIGHT_MIDDLE,
    CENTER_BOTTOM,
    LEFT_MIDDLE
}

// 填充
export enum EImageFillType {
    STRETCH,            // 拉伸模式
    REPEAT,             // xy重复填充模式
    REPEAT_X,           // x方向重复填充模式
    REPEAT_Y,           // y方向重复填充模式
}

export class TextHelper {

    // 计算字符的宽高
    public static calTextSize( context2D: CanvasRenderingContext2D, text: string, char: string = "W", scale: number = 0.5 ): Size {
        let size: Size = new Size();
        size.width = context2D.measureText( text ).width;
        let w: number = context2D.measureText( char ).width;
        size.height = w + w * scale; // 宽度加上scale比例

        return size;
    }

    // 合成font属性字符串
    public static makeFontString(
        size: FontSize = '10px',
        weight: FontWeight = 'normal',
        style: FontStyle = 'normal',
        variant: FontVariant = 'normal',
        family: FontFamily = 'sans-serif',
    ): string {

        let strArr: string[] = [];
        // 第一个是fontStyle
        strArr.push( style );
        // 第二个是fontVariant
        strArr.push( variant );
        // 第三个是 fontWeight
        strArr.push( weight );
        // 第四个是 fontSzie
        strArr.push( size );
        // 第五个是fontFamily
        strArr.push( family );

        // 最后需要将数组中的每个属性字符串以空格键合成
        let ret: string = strArr.join( " " );
        // console.log( ret );
        return ret;
    }
}