import React from "react";
import {FIELD, VIEW} from "./config";

const determine = (view, field) => {
    switch (view) {
        case VIEW.VISIBLE:
            return field === FIELD.BOMB ? 'cell fired' : 'cell empty'
        case VIEW.MARK:
            return 'cell mark'
        case VIEW.FOG:
        default:
            return 'cell'
    }
}

const Board = ({ views, fields, onClick }) => {
    const rendered = views.map((row, y) => {
        const renderedRow = row.map((view, x) => {
            const field = fields[y][x]
            return (
                <div
                    key={x}
                    className={determine(view, field)}
                    onClick={(e) => onClick(x, y, e)}
                    onContextMenu={(e) => onClick(x, y, e)}
                >
                    {view === VIEW.VISIBLE && field !== FIELD.BOMB && field !== 0 ? field : null}
                </div>
            )
        })
        return (
            <section key={y} className="board-row">
                {renderedRow}
            </section>
        )
    })
    return <>{rendered}</>
}

export default Board
