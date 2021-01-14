import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12">
            {/*Create a rotating spinner on the screen*/}
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
    );
};