import { useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl/distribution/exports";

const UnityGame = ({  }) => {
    try{
        const {
            unityProvider,
        } = useUnityContext({
            codeUrl: `/unitybuild/game.wasm`,
            dataUrl: `/unitybuild/game.data`,
            frameworkUrl: `/unitybuild/game.framework.js`,
            loaderUrl: `/unitybuild/game.loader.js`,
            webglContextAttributes: {
                preserveDrawingBuffer: true,
            },
        });

        const canvasRef = useRef<HTMLCanvasElement>(null);

        return (
            <div>
                <Unity
                    unityProvider={unityProvider}
                    style={{ border: "1px solid red", height: 599, width: 900 }}
                    ref={canvasRef}
                />

            </div>
        );
    } catch {
        return (
            <div>
               

            </div>
        );
    }

};

export { UnityGame };