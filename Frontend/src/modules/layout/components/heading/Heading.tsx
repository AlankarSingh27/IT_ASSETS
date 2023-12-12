import React from 'react';

interface IProps {
    heading: string;
    color: string;
}

export const Heading: React.FC<IProps> = (props) => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className={`h3 ${props.color}`}>{props.heading}</p>
                        <p className="fst-italic">Sugmya Finance's app efficiently manages printer and laptop records, enabling centralized access and control. It tracks device status, facilitates maintenance scheduling, and offers detailed reports for cost analysis and decision-making. This streamlined system optimizes operations and enhances data security.
                            </p>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Heading;