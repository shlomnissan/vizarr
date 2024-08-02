import Application, { WebGLContext } from "core/application";
import Camera from "core/camera";
import Mesh from "core/mesh";
import Plane from "core/plane";
import Program from "core/program";
import Texture from "core/texture";

import Grid from "helpers/grid";

import { mat4 } from "gl-matrix";

import vertexShaderSrc from "shaders/default_vert.glsl";
import fragmentShaderSrc from "shaders/default_frag.glsl";

const app = new Application("#webgl-app");
const plane = new Plane(5, 5, 1, 1);

let program: Program;
let camera: Camera;
let mesh: Mesh;
let grid: Grid;
let texture: Texture;

app.initialize((gl: WebGLContext) => {
  program = new Program(gl, [
    [vertexShaderSrc, gl.VERTEX_SHADER],
    [fragmentShaderSrc, gl.FRAGMENT_SHADER],
  ]);

  camera = new Camera(app.getCanvas(), [0, 0, 0]);
  grid = new Grid(gl, 16);
  mesh = new Mesh(gl, plane.vertices, plane.indices);
  texture = new Texture(gl, "./texture_placeholder.png");

  gl.activeTexture(gl.TEXTURE0);
  texture.bind();

  program.use();
});

app.tick((_: number) => {
  program.use();
  camera.update();

  const model = mat4.translate(mat4.create(), mat4.create(), [0, 2.5, 0]);
  const modelView = mat4.multiply(mat4.create(), camera.viewMatrix, model);
  program.setUniformMat4("Projection", camera.projectionMatrix);
  program.setUniformMat4("ModelView", modelView);

  mesh.draw(program);
  grid.draw(camera);
});

app.onResize((width: number, height: number) => {
  camera.updateProjectionMatrix(width, height);
});
