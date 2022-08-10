import { useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl/distribution/exports";

function UnityGame(Width: any, Height: any) {
    const { unityProvider } = useUnityContext({
        codeUrl: `/unitybuild/game.wasm`,
        dataUrl: `/unitybuild/game.data`,
        frameworkUrl: `/unitybuild/game.framework.js`,
        loaderUrl: `/unitybuild/game.loader.js`,
        webglContextAttributes: {
            preserveDrawingBuffer: true,
        },
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    if (unityProvider) {
        return (
            <div>
                <Unity
                    unityProvider={unityProvider}
                    style={{ border: "1px solid red", width: Width, height: Height }}
                    ref={canvasRef} />

            </div>
        );
    } else {
        return (
            <div>


            </div>
        );
    }
}

export default UnityGame;