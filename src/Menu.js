import React, { Component } from "react";

class Menu extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            chosenSlice: props.slice,
            sliceData: props.data
        }
    }

    render()
    {
        return(
            <div class="menu">
                {this.state.sliceData.map((item) => <li>{item}</li>)}
            </div>
        );
    }
}

export default Menu;