import { Fragment, useEffect, useRef, useState } from "react";
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
