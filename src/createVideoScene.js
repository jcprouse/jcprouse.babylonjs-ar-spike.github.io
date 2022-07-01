import * as BABYLON from 'babylonjs';

import olivia from '../assets/olivia.mp4';

const setScene = function (canvas, scene, parent) {
  // This creates and positions a free camera (non-mesh)
  /* const camera = new BABYLON.ArcRotateCamera('arcR', -Math.PI / 2, Math.PI / 2, 15, BABYLON.Vector3.Zero(), scene);

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
*/

// 56.25 RATIO

  const planeOpts = {
    height: 2.08, //2.06, //2.04,
    width: 1.17, //1.1588,//1.14,
    sideOrientation: BABYLON.Mesh.FRONTSIDE,
  };
  const ANote0Video = BABYLON.MeshBuilder.CreatePlane('plane', planeOpts, scene);
  const vidPos = (new BABYLON.Vector3(0, 0, 0.1));
  ANote0Video.position = vidPos;
  const ANote0VideoMat = new BABYLON.StandardMaterial('m', scene);
  const ANote0VideoVidTex = new BABYLON.VideoTexture('vidtex', olivia, scene, false, false, BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODEM, {
    autoUpdateTexture: true,
    autoPlay: false,
    loop: false,
  });
  ANote0VideoMat.diffuseTexture = ANote0VideoVidTex;
  ANote0VideoMat.roughness = 1;
  ANote0VideoMat.emissiveColor = new BABYLON.Color3.White();
  ANote0Video.material = ANote0VideoMat;
  scene.onPointerObservable.add((evt) => {
    if (evt.pickInfo.pickedMesh === ANote0Video) {
      // console.log("picked");
      // eslint-disable-next-line max-len
      if (ANote0VideoVidTex.video.paused) { ANote0VideoVidTex.video.play(); } else { ANote0VideoVidTex.video.pause(); }
      console.log(ANote0VideoVidTex.video.paused ? 'paused' : 'playing');
    }
  }, BABYLON.PointerEventTypes.POINTERPICK);

  // console.log(ANote0Video);
  // return scene;

  // return scene;
  
  ANote0Video.parent = parent;

  return ANote0VideoVidTex.video;
};

export default setScene;
