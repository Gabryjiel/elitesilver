import React from 'react';
import CanvasLine from "./CanvasLine";

export default function Bracket({data}){

    return(
        <div className="list-brackets">

                {data && data.map((stage, stageNr) => {
                    if(stage.stage === '3rd'){
                        // const width = document.getElementsByClassName("list-brackets-col")[0]
                        // console.log('wd', width)
                        return(
                            <div className="list-brackets-col-item" style={{position:"absolute", top: "20%", left: "80%"}}>
                                <div className="list-brackets-col-item-blue">
                                    {stage.matches[0].BluePlayer}
                                </div>
                                <div className=""></div>
                                <div className="list-brackets-col-item-red">
                                    {stage.matches[0].RedPlayer}
                                </div>
                                <div className=""></div>
                            </div>
                        )
                    }
                    else
                    return(
                        <>
                            <div className="list-brackets-col">
                                
                                <div className="list-brackets-col-title">
                                    {stage.stage}
                                </div>

                                <div className="list-brackets-col-items">
                                    {stage.matches.map(match => {
                                        //console.log(match, match !== {})
                                        if(match.id !== undefined)
                                            return(
                                                <div className="list-brackets-col-item">
                                                    <div className="list-brackets-col-item-blue">
                                                        {match.BluePlayer}
                                                    </div>
                                                    <div className=""></div>
                                                    <div className="list-brackets-col-item-red">
                                                        {match.RedPlayer}
                                                    </div>
                                                    <div className=""></div>
                                                </div>
                                            )
                                        else //dummy item
                                            return(
                                                <div style={{opacity: 0}} className="list-brackets-col-item"></div>
                                            )
                                        })}
                                </div>
                            </div>

                            <div className="list-brackets-gap">
                                {stage.matches.map((match,index) => {
                                    let display = 1
                                    let gapId = `ListBracketsGapItem ${stageNr},${index}` 
                                    if(match.id === undefined) display = 0
                                    else if(stage.stage === 'Final' || stage.stage === '3rd') display = 0
                            
                                    return(
                                        <div id={gapId} className="list-brackets-gap-item" style={{opacity: display}}>
                                            {index % 2 === 0 ? <CanvasLine gapId={gapId} direction="down" /> : <CanvasLine gapId={gapId} direction="up" />}
                                        </div>)
                                })}
                            </div>
                        </>
                )})}
            </div>
    )
};