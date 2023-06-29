import React from 'react';

type Point = {
  x: number;
  y: number;
}

interface Props {
  idCanvas: string;
  width: number;
  height: number;
  backgroundColor?: string;
  lineWidth?: number;
  strokeStyle?: string;
}

export class DrawCanvas extends React.Component<Props> {

  _canvas: HTMLCanvasElement | null = null;
  _context: CanvasRenderingContext2D | null = null;
  _initialPoint: Point = {x: 0, y: 0};

  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    this._canvas = document.getElementById(this.props.idCanvas) as HTMLCanvasElement;
    this._context = this._canvas?.getContext('2d') as CanvasRenderingContext2D;
    this._canvas?.addEventListener("mousedown", this.mouseDown);
    this._canvas?.addEventListener("mouseup", this.mouseUp);
  }

  draw(point: Point): void {
    if(!this._context) return;
    this._context.beginPath();
    this._context.moveTo(this._initialPoint.x, this._initialPoint.y);
    this._context.lineWidth = this.props.lineWidth || 5;
    this._context.strokeStyle = this.props.strokeStyle || "#000";
    this._context.lineCap = "round";
    this._context.lineJoin = "round";
    this._context.lineTo(point.x, point.y);
    this._context.stroke();
    this._initialPoint = point;
  }

  clear(): void {
    if(!this._context) return
    this._context.clearRect(0, 0, this.props.width, this.props.height);
  }

  mouseMoving = (e: any) => {
    this.draw({
      x: e.offsetX,
      y: e.offsetY
    });
  }

  mouseDown = (e: any) => {
    this._initialPoint = {
      x: e.offsetX,
      y: e.offsetY
    };
    this.draw(this._initialPoint);
    this._canvas?.addEventListener("mousemove", this.mouseMoving);
  }

  mouseUp = () => {
    this._canvas?.removeEventListener("mousemove", this.mouseMoving);
  }

  render(): JSX.Element {
    const { idCanvas, width, height, backgroundColor } = this.props;
    return (
      <>
        <canvas
          id={idCanvas}
          width={width}
          height={height}
          style={{
            backgroundColor: backgroundColor || "#fff",
          }}
        ></canvas>
        <button onClick={() => this.clear()}>Clear</button>
      </>
    )
  }
}
