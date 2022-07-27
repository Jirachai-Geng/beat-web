import { Fragment, useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl/distribution/exports";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

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
                    style={{ border: "1px solid red", height: 500, width: 700 }}
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

