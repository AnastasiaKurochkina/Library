import React from 'react';
import { useState, useEffect } from 'react';
import './Library.css'
import Book from '../Book/Book';
import { Button, IconButton, Dialog, DialogActions, DialogTitle, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ModalWindow from '../ModalWindow/ModalWindow';

export const arrayBooks = [
    {
        id: '1',
        title: 'Мастер и Маргарита',
        author: 'Булгаков М.А.',
        year: 1928,
        pages: 512
    },
    {
        id: '2',
        title: 'Преступление и наказание',
        author: 'Достоевский Ф.М.',
        year: 1866,
        pages: 592
    },
    {
        id: '3',
        title: 'Собачье сердце',
        author: 'Булгаков М.А.',
        year: 1925,
        pages: 288
    },
    {
        id: '4',
        title: 'Мертвые души',
        author: 'Гоголь Н.В.',
        year: 1842,
        pages: 352
    },
    {
        id: '5',
        title: 'Ревизор',
        author: 'Гоголь Н.В.',
        year: 1836,
        pages: 352
    },
    {
        id: '6',
        title: 'Горе от ума',
        author: 'Грибоедов А.С.',
        year: 1828,
        pages: 320
    },
    {
        id: '7',
        title: 'Капитанская дочка',
        author: 'Пушкин А.С.',
        year: 1828,
        pages: 160
    },
    {
        id: '8',
        title: 'Вишневый сад',
        author: 'Чехов А.П.',
        year: 1828,
        pages: 66
    },
]

const Library = () => {

    const [books, setBooks] = useState({ arrayBooks })
    const [tempBooks, setTempBooks] = useState([])
    const [bookInfo, setBookInfo] = useState(false)
    const [currentBook, setCurrentBook] = useState()
    const [currentArrayBooks, setCurrentArrayBooks] = useState()
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [openDialofError, setOpenDialogError] = useState(false)
    const [modalActiveEdit, setModalActiveEdit] = useState(false)
    const [modalActiveAdd, setModalActiveAdd] = useState(false)

    const devideArray = (array, number) => {
        let tempBooks = [];
        for (let i = 0; i < array.length; i += number) {
            let tempArray = array.slice(i, i + number);
            tempBooks.push(tempArray);
        }
        return tempBooks;
    }

    useEffect(() => {
        let array = devideArray(books.arrayBooks, 5)
        setTempBooks(array)
    }, [books.arrayBooks]);

    const openBookInfo = (book) => {
        setCurrentBook(book)
        setBookInfo(true)
    }

    const closeBookInfo = (event) => {
        setBookInfo(false)
    }

    const addBook = (book) => (event) => {
        if ((book.title === '' || book.author === '')) {
            setOpenDialogError(true)
        }
        else {
            setBooks((prevState) => ({
                ...prevState,
                arrayBooks: [...prevState.arrayBooks, book]
            })
            )
        }
    }

    const deleteBook = (book) => (event) => {
        setOpenDialogDelete(false)
        let newArrayBooks = books.arrayBooks.filter((item) => item.title !== book.title)
        setBooks({ arrayBooks: newArrayBooks })
    }

    const editBook = (book) => (event) => {
        if ((book.title === '' || book.author === '')) {
            setOpenDialogError(true)
        }
        else {
            let newBooks = books.arrayBooks
            let index = newBooks.indexOf(currentBook)
            newBooks[index] = book
            setBooks((prevState) => ({
                ...prevState,
                arrayBooks: [...newBooks]
            })
            )
            setCurrentBook(book)
        }


    }

    const sortBookTitle = (array) => (event) => {
        setCurrentArrayBooks(array)
        const temp = JSON.parse(JSON.stringify(array))
        temp.sort((a, b) => a.title > b.title ? 1 : -1)
        setBooks({ arrayBooks: temp })
    }

    const sortBookAuthor = (array) => (event) => {
        setCurrentArrayBooks(array)
        const temp = JSON.parse(JSON.stringify(array))
        temp.sort((a, b) => a.author > b.author ? 1 : -1)
        setBooks({ arrayBooks: temp })
    }

    return (

        <div className='container'>
            <div className='container-book'>
                <div style={{ display: 'flex' }}>
                    <p className='title'>Сортировать по</p>
                    <Button
                        variant="text"
                        sx={{ color: 'brown', textDecoration: 'underline' }}
                        onClick={sortBookTitle(books.arrayBooks)}
                    >
                        Названию
                    </Button>
                    <Button
                        variant="text"
                        sx={{ marginRight: '30px', color: 'brown', textDecoration: 'underline' }}
                        onClick={sortBookAuthor(books.arrayBooks)}
                    >
                        Автору
                    </Button>
                    <div style={{ marginTop: '10px' }}>
                        <Button
                            variant="contained"
                            sx={{ marginRight: '30px', backgroundColor: 'brown' }}
                            onClick={() => setBooks({ arrayBooks: currentArrayBooks })}
                        >
                            Сбросить
                        </Button>
                    </div>
                </div>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'brown' }}
                    onClick={() => setModalActiveAdd(true)}
                >
                    Добавить новую книгу
                </Button>
                <div className='container-book__books'>
                    {tempBooks.map(item => (
                        <>
                            <div className='current-book'>
                                {item.map((el) => (
                                    <Book book={el} key={el.id} openBookInfo={openBookInfo} info={bookInfo} />
                                ))}
                            </div>
                            <div className='shelf'> </div>
                        </>
                    ))}
                </div>
            </div>
            {bookInfo &&
                <div className='book-info'>
                    <div className='book-info__close'>
                        <IconButton sx={{ width: '10%', display: "flex", justifyContent: "flex-end", }} aria-label="delete" size="small" onClick={closeBookInfo}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <strong>Характеристика книги</strong>
                    <strong>Название: </strong> <p>{currentBook.title}</p>
                    <strong>Автор:</strong> <p>{currentBook.author}</p>
                    <strong>Год издания:</strong> <p>{currentBook.year}</p>
                    <strong>Количество страниц:</strong> <p>{currentBook.pages}</p>
                    <div>
                        <Button
                            variant="contained"
                            sx={{ marginRight: '5px', backgroundColor: 'brown' }}
                            onClick={() => setOpenDialogDelete(true)}
                        >
                            Удалить книгу
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'brown' }}
                            onClick={() => setModalActiveEdit(true)}
                        >
                            Редактировать
                        </Button>
                    </div>
                </div>
            }
            {openDialogDelete &&
                <Dialog
                    open={openDialogDelete}
                >
                    <DialogTitle>{"Вы точно хотите удалить данную книгу?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={deleteBook(currentBook)}>
                            Да
                        </Button>
                        <Button onClick={() => setOpenDialogDelete(false)}>
                            Нет
                        </Button>
                    </DialogActions>
                </Dialog>}
            {openDialofError &&
                <Dialog
                    open={openDialofError}
                >
                    <DialogTitle>{"Поле не может быть пустым!"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpenDialogError(false)}>
                            Ок
                        </Button>
                    </DialogActions>
                </Dialog>}


            {modalActiveEdit &&
                <ModalWindow active={modalActiveEdit} book={currentBook} setActiveEdit={setModalActiveEdit} editBook={editBook} />}

            {modalActiveAdd &&
                <ModalWindow active={modalActiveAdd} setActiveAdd={setModalActiveAdd} addBook={addBook} />}

        </div>
    )

}
export default Library;