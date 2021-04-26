import React, { useRef, useState, useEffect } from 'react'
import { useSpring, motion, useTransform } from 'framer-motion'
import Button from './Button'

const SPOILER_STATE_SCANNING = 0;
const SPOILER_STATE_EXCEED_THRESHOLD = 1;
const SPOILER_STATE_UNDER_THRESHOLD = 2;

const Loader = ({ value }) => {

    return (<div>
        <div>
            Scanning for spoilers ...
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flexGrow: 1 }}>
                <div className="sb-content-loader">
                    <div className="loader-fill" style={{ width: `calc(${Math.min(100, value * 100)}% - 4px)` }} />
                </div>
            </div>
            <div style={{ width: '60px', minWidth: '60px', textAlign: 'right', transform: `translateY(1px)` }}>
                {(value * 100).toFixed(2)}%
    </div>
        </div>
    </div>);

    // return (<div className="sb-content-loader">
    //     <div className="loader-fill" style={{ width: `calc(${Math.min(100, value * 100)}% - 4px)` }} />
    // </div>)
}

const ExceedsThreshold = () => {

    return (<div id="exceeds-threshold">
        <div className="threshold-details">
            <div className="percentage-area_">99.99%</div>
            <div className="text-details-area_">chance of spoilers</div>
        </div>
        <div style={{ fontSize: '0.75rem' }}>Do you want to leave this page?</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', marginBottom: '4px' }}>
            <div style={{ width: '49%' }}><Button
                text="Yes"
                onClick={() => {
                    console.log(`CLICKED!`)
                }}
                background="#E84855"
                textColor="#EBEBEB"
            /></div>
            <div style={{ width: '49%' }}><Button
                text="No"
                onClick={() => {
                    console.log(`CLICKED!`)
                }}
                background="#3C4043"
                textColor="#EBEBEB"
            /></div>
        </div>
    </div>);
}

const UnderThreshold = ({ onComplete }) => {

    const timerSpring = useSpring(0, { duration: 3000 });
    const timerSliderWidthTransform = useTransform(timerSpring, (val) => `${val * 100}%`);

    useEffect(() => {
        timerSpring.set(1);

        const unmountTimerSpring = timerSpring.onChange(val => {
            if (val == 1) {
                onComplete();
            }
        });

        return () => {
            unmountTimerSpring();
        }
    }, []);

    return (<div className="under-threshold">
        <div style={{ marginBottom: '5px' }}>There is {(() => `< threshold %`)()} percent chance of spoilers on this page</div>

        <div className="slider">
            <motion.div className="slider_" style={{ width: timerSliderWidthTransform }} />
        </div>
    </div>);
}

const ContentPopup = () => {

    const containerRef = useRef(null);
    const [pageBlurred, setPageBlurred] = useState(true);
    const [scanStatus, setScanStatus] = useState(0);

    const viewStateRef = useState(0);
    const [viewState, setViewState] = useState(SPOILER_STATE_SCANNING);

    const transitionSpring = useSpring(0);

    const contentVisibilitySpring = useSpring(0);

    /**
     * @desc Transition the spoiler to the state 
     * defined in the parameter:
     * [toState] \in {SPOILER_STATE_EXCEED_THRESHOLD, SPOILER_STATE_UNDER_THRESHOLD}
     */
    const transitionToSpoilerState = (toState) => {
        setViewState(toState);
    }

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

    /**
     * @desc remove itself from existence
     */
    const commitSudoku = () => {
        let container = document.getElementById("sb-content-popup-container");
        if (!container) {
            console.error("Failed to supoku");
            return;
        }

        let body = document.getElementsByTagName('body')[0] || undefined;
        if (!body) {
            console.error("Cannot find body...");
            return;
        }

        body.removeChild(container);
        console.log("Successfully unmounted!");
    }

    /**
     * @desc Remove the popup and unblur the contents
     * on the page.
     */
    const destroyPopup = () => {
        unblurPage();
        setTimeout(() => commitSudoku(), 1500);
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

    useEffect(() => {
        if (scanStatus == 1) {
            setTimeout(() => transitionToSpoilerState(SPOILER_STATE_UNDER_THRESHOLD /*SPOILER_STATE_EXCEED_THRESHOLD*/), 1500);
        }
    }, [scanStatus]);

    useEffect(() => {

        // transition in
        transitionSpring.set(1);

        const unmountTransitionSpring = transitionSpring.onChange(val => {
            if (val == 1) contentVisibilitySpring.set(1);
        });

        // simulate the scanning happening
        for (let i = 0; i <= 50; ++i) {
            setTimeout(() => {
                setScanStatus((i * 2.0) / 100.0);
            }, 100 * i);
        }

        // cleanup ...
        return () => {
            unmountTransitionSpring();
            unmountContentVisibilitySpring();
        }
    }, []);

    return (<motion.div
        style={{
            // TODO create transform transition spring
            opacity: transitionSpring
        }}
        ref={containerRef}
        id="content-popup"
        className="sb-content-popup">

        <div className="sb-content-header">SpoilerBlock</div>
        <motion.div style={{ opacity: contentVisibilitySpring }} className="sb-content-container">

            {(() => {
                switch (viewState) {
                    case SPOILER_STATE_SCANNING:
                        return <Loader value={scanStatus} />;
                    case SPOILER_STATE_EXCEED_THRESHOLD:
                        return <ExceedsThreshold />;
                    case SPOILER_STATE_UNDER_THRESHOLD:
                        return <UnderThreshold onComplete={destroyPopup} />
                }

                // default
                return <div />
            })()}

        </motion.div>

    </motion.div>)
}

export default ContentPopup;