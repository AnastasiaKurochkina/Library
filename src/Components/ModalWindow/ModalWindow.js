import React from 'react';
import './ModalWindow.css';
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import TextField from '@mui/material/TextField';

const ModalWindow = (props) => {

   const [form, setForm] = useState({
      title: '',
      author: '',
      year: '',
      pages: '',

   })

   useEffect(() => {
      if (typeof props.book != 'undefined') {
         setForm({
            title: props.book.title,
            author: props.book.author,
            year: props.book.year,
            pages: props.book.pages
         })
      }
   }, []);

   const changeHandler = (event) => {
      setForm({
         ...form,
         [event.target.name]: event.target.value
      })
   }

   return (

      <div className='modal' >
         <div className='modal__content'>
            <form>
               <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ textAlign: 'center', marginBottom: '20px' }}>
                     {typeof props.book != 'undefined' ? `Редактирование книги "${props.book.title}"` : 'Добавление книги'}
                  </Typography>
                  <TextField
                     variant="filled"
                     label="Название"
                     name="title"
                     value={form.title}
                     onChange={changeHandler} />
                  <TextField
                     variant="filled"
                     label="Автор"
                     type="text"
                     name="author"
                     value={form.author}
                     onChange={changeHandler} />
                  <TextField
                     variant="filled"
                     label="Год издания"
                     type="number"
                     name="year"
                     value={form.year}
                     onChange={changeHandler} />
                  <TextField
                     variant="filled"
                     label="Количество страниц"
                     type="number"
                     name="pages"
                     value={form.pages}
                     onChange={changeHandler} />
               </Box>
               <Box sx={{ textAlign: 'center' }}>
                  {typeof props.book != 'undefined' ? (
                     <Button onClick={props.editBook(form)} >
                        ОК
                     </Button>)
                     : (
                        <Button onClick={props.addBook(form)} >
                           Сохранить
                        </Button>
                     )}
                  {typeof props.book != 'undefined' ? (
                     <Button onClick={() => props.setActiveEdit(false)}>
                        Закрыть
                     </Button>)
                     : (
                        <Button onClick={() => props.setActiveAdd(false)}>
                           Закрыть
                        </Button>
                     )}
               </Box>
            </form>
         </div>

      </div>

   )
}
export default ModalWindow;