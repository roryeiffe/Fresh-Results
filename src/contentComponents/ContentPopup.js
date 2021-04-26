import React, { useRef, useState, useEffect } from 'react'
import { useSpring, motion, useTransform } from 'framer-motion'

const ContentPopup = () => {

    const containerRef = useRef(null);
    const [pageBlurred, setPageBlurred] = useState(true);

    /**
     * @desc This function should blur the contents on
     * the page while disregarding the popup.
     */
    const blurPage = () => {
        let body = document.getElementsByTagName("body")[0] || undefined;
        if (body == undefined) {
            console.error("Body could not be found.");
            return;
        }

        for (let i = 0; i < body.childNodes.length; ++i) {

            // skip the content popup
            if (body.childNodes[i].getAttribute('id') == "sb-content-popup-container") continue;
            body.childNodes[i].classList.add("sb-blurred");
        }
    }

    /**
     * @desc This function should unblur the contents on
     * the page while disregarding the popup.
     */
    const unblurPage = () => {
        let body = document.getElementsByTagName("body")[0] || undefined;
        if (body == undefined) {
            console.error("Body could not be found.");
            return;
        }

        for (let i = 0; i < body.childNodes.length; ++i) {

            // skip the content popup
            if (body.childNodes[i].getAttribute('id') == "sb-content-popup-container") continue;
            body.childNodes[i].classList.remove("sb-blurred");
        }
    }

    useEffect(() => {

        console.log("ContentPopup::useEffect[containerRef]", containerRef);
        if (containerRef.current) {
            // blur the contents

            if (pageBlurred) {
                blurPage();
            }
            else unblurPage();
        }

    }, [containerRef, pageBlurred]);

    return (<div
        style={{
            blur
        }}
        ref={containerRef}
        id="content-popup"
        className="sb-content-popup">
        THIS IS A THE CONTENT POPUP!!!!
    </div>)
}

export default ContentPopup;