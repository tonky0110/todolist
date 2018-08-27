import React from "react";
import Footer from "./presenter";

const Container = props => {
    const todo = props;
    console.log("todo: ", todo);
    return (
        <Footer {...props}/>
    );
}

export default Container;
