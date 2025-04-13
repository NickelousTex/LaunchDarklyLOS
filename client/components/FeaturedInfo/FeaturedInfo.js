import React from 'react';
import "./featuredInfo.css";
import { Grid } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

export default function FeaturedInfo() {
    return (
        <Grid container className="featured" spacing={3}>
            <Grid item xs={4}>
                <div className="featuredItem">
                    <div className="featuredTitle">Revenue</div>
                    <div className="featuredMoneyContainer">
                        <div className="featuredMoney">$487,013,129.82</div>
                        <div className="featuredMoneyRate">
                            +202.2% <ArrowUpward className="featuredIcon" />
                        </div>
                    </div>
                    <div className="featuredSub">YOY</div>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className="featuredItem">
                    <div className="featuredTitle">Sales</div>
                    <div className="featuredMoneyContainer">
                        <div className="featuredMoney">$78,392,415.71</div>
                        <div className="featuredMoneyRate">
                            +63.54%<ArrowUpward className="featuredIcon" />
                        </div>
                    </div>
                    <div className="featuredSub">Compared to this month last year</div>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className="featuredItem">
                    <div className="featuredTitle">Costs</div>
                    <div className="featuredMoneyContainer">
                        <div className="featuredMoney">-$38,521,964.49</div>
                        <div className="featuredMoneyRate">
                            -18.56%<ArrowUpward className="featuredIcon" />
                        </div>
                    </div>
                    <div className="featuredSub">YOY</div>
                </div>
            </Grid>
        </Grid>
    );
}