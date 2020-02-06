import React from "react";

const weather =(props) => {
    return (
        <div className="container text-lighter">
         <div className="cards pt-4"> 
           <center><h1>{props.city}</h1>
             <h5 className="py-4">
                <i className={`wi ${props.icon} display-1`}></i>
             </h5>
                {props.temp ?(<h1 className="py-2">{props.temp}&deg;</h1>):null}
               {/*  for min and max temp */}
               {minmaxTemp(props.temp_min,props.temp_max)}
             <h4 className="py-3"> {props.description}</h4>  
            </center>
         </div>
        </div>

    )
}

function minmaxTemp(min,max){
    if(min && max){
        return(
            <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
            </h3>
        )
    }
}

export default weather;