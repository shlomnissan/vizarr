import { WebGLContext } from "./application";

export default class Texture {
  private gl: WebGLContext;
  private texture: WebGLTexture | null;

  constructor(gl: WebGLContext, imageSource: string) {
    this.gl = gl;
    this.texture = gl.createTexture();

    const image = new Image();
    image.src = imageSource;
    image.onload = () => {
      this.generateTexture(image);
    };
  }

  public bind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }

  private generateTexture(image: HTMLImageElement) {
    const gl = this.gl;
    const level = 0;
    const format = this.gl.RGBA;
    const type = this.gl.UNSIGNED_BYTE;

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, level, format, format, type, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
}
