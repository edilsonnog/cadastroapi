import React from 'react';

import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toasti = () => {
    const sucessToast = () => {
        toast("success custom Toast https://www.youtube.com/watch?v=VdVGPov7Yqc", {
            className: "custon-toast",
            draggable: true,
            position: toast.POSITION.TOP_RIGHT
        });
    };

    toast.error("Oh no error");
    toast.success("You succeeded");
    toast.info("You have been Informationzlied");
    toast.warn("You have been Warned");

    return(
        <div className="Toasti">

            <ToastContainer draggable={false} transition={Zoom} autoClose={8000}/>

        </div>
    );
}

export default Toasti;
