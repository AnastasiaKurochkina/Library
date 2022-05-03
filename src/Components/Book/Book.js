import React from "react";
import './Book.css'
import { useRef } from "react";

const Book = (props) => {

    const refBook = useRef()
    const getBook = () => {
        const activeBook = document.querySelector('.container__book-active')
        if (activeBook) {
            activeBook.classList.remove('container__book-active')
        }
        refBook.current.classList.add('container__book-active')
        props.openBookInfo(props.book)
    }

    return (

        <div ref={refBook} className="container__book" onClick={getBook}>
            <div className="back side"></div>
            <div className="left side"> </div>
            <div className="right side">
                <div className="book__text-horizontal">
                    {props.book.title}
                    <div>
                        {props.book.author}
                    </div>
                </div>
            </div>
            <div className="top side" ></div>
            <div className="bottom side"></div>
            <div className="front side">
                <div className="book__text-vertical">
                    <div>
                        {props.book.title}
                    </div>
                    <div>
                        {props.book.author}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Book;