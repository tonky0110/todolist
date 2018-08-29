import React from "react";
import Footer from "./presenter";

const Container = props => {
    const todo = props;
    console.log("footer container todo: ", todo);
    return (
        <Footer {...props}/>
    );
}

export default Container;
