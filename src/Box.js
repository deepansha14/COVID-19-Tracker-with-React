import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Box.css";

function Box({ title, cases, total, selected, RedColor, ...props }) {
    console.log(title, selected);
    return (
        <Card
            onClick={props.onClick}
            className={`Box ${selected && "Box--selected"} ${RedColor && "Box--red"
                }`}
        >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <h2 className={`Box__cases ${!RedColor && "Box__cases--green"}`}>
                    {cases}
                </h2>

                <Typography className="Box__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Box;
