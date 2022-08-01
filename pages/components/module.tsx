import { Fragment, useEffect, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { UnityGame } from "./unityGame";
import Container from 'react-bootstrap/Container';
import { useSession, signIn, signOut } from "next-auth/react"
import ReactDOM, { createPortal } from "react-dom";

type Props = {
    show: boolean;
};

const Module = ({ show }: Props) => {
    const el = document.createElement("div");
    const wrapper: React.RefObject<HTMLElement> = useRef(el);    
    const [_document, setDocument] = useState<Document | null>(null);

    const [isShowBrowser, setShowBrowser] = useState<Document | null>(null);
    const { data: session } = useSession()

  useEffect(() => {
    setShowBrowser(document);
  }, []);

    const moduleContent = show ? (
        <div>
            test moduleContent
        </div>
    ) : null;

    if (isShowBrowser) {
        return createPortal(moduleContent,isShowBrowser.getElementById("modal") as HTMLElement);
      }
      return <>{null}</>;
}


export { Module };
