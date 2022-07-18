import React, {useEffect, useRef, useState} from "react";
import logo from "./bomb.svg";
import  Board  from "./Board.jsx";
import {BOMBS, FIELD, VIEW} from "./config";
import Timer from "./Timer.jsx";
import {array2D, initFields, initViews, openArea, setBy2DIndexIn2DArray} from "./utils";
import Modal from "./Modal.jsx";

const Panel = () => {
    const [views, setViews] = useState(initViews())
    const [play, setPlay] = useState(false)
    const [flags, setFlags] = useState(BOMBS)
    const [fields, setFields] = useState(array2D(FIELD.EMPTY))
    const [modal, setModal] = useState(false)
    const unmarkedBombs = useRef(BOMBS)
    const position = useRef(undefined)

    useEffect(() => {
        if (play) {
            const {dx, dy} = position.current
            check(dx, dy)
        } else {
            setViews(initViews())
            setFlags(BOMBS)
            setFields(array2D(FIELD.EMPTY))
            unmarkedBombs.current = BOMBS
        }
    }, [play])

    useEffect(() => {
        if (modal === null) {
            setViews(views => {
                return views.map(row => row.map(() => VIEW.VISIBLE))
            })
            setPlay(false)
        }
    }, [modal])

    // place mark indicating bomb position (right click)
    const mark = (dx, dy) => {
        const view = views[dy][dx]

        // update state arrays
        if (view === VIEW.MARK) {
            setFlags(flags => flags + 1)
            setViews(view => setBy2DIndexIn2DArray(view, dx, dy, VIEW.FOG))
            if (fields[dy][dx] === FIELD.BOMB) unmarkedBombs.current += 1
        } else if (view === VIEW.FOG && flags > 0) {
            setFlags(flags => flags - 1)
            setViews(view => setBy2DIndexIn2DArray(view, dx, dy, VIEW.MARK))
            if (fields[dy][dx] === FIELD.BOMB) unmarkedBombs.current -= 1
        }

        // check is win
        if (unmarkedBombs.current === 0) {
            setModal(<Modal onClick={() => setModal(null)} message="You have won!"/>)
        }
    }

    // show true value of field (left click)
    const check = (dx, dy) => {
        const view = views[dy][dx]
        const field = fields[dy][dx]

        // update state arrays
        if (view === VIEW.FOG) {
            setViews(views => field === FIELD.EMPTY
                ? openArea(dx, dy, fields, views)
                : setBy2DIndexIn2DArray(views, dx, dy, VIEW.VISIBLE))
        }

        // lose condition
        if (fields[dy][dx] === FIELD.BOMB) {
            setModal(<Modal onClick={() => setModal(null)} message="You have lost!"/>)
        }
    }

    const onItemClick = (dx, dy, event) => {
        event.preventDefault()
        if (play) {
            event.type === 'click' ? check(dx, dy) : mark(dx, dy)
        } else {
            if (event.type === 'click') {
                position.current = {dx, dy}
                setFields(initFields(dx, dy))
                setPlay(true)
            }
        }
    }

    return (
        <>
            {modal}
            <section className="panel">
                <header className="app-header">
                    <h1 className="app-header-h1">Minesweeper</h1>
                    <img src={logo} className="app-header-logo" alt="logo" />
                </header>
                <nav className="app-nav">
                    <p>{flags}</p>
                    <p>:)</p>
                    {play ? <Timer /> : <p>0:00</p> }
                </nav>
                <main className="app-main">
                    <Board views={views} fields={fields} onClick={onItemClick} />
                </main>
            </section>
        </>
    )
}

export default Panel