/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../style/Add.css';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Add() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  const [category, setCategory] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [subCategory, setSubCategory] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [item, setItem] = useState({
    title: '',
    description: '',
    price: '',
    categoriesID: 0,
    subcategoriesID: 0,
    err: '',
    successMessage: null,
  });

  const image = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setItem({ ...item });

    const formData = new FormData();
    formData.append('title', item.title);
    formData.append('description', item.description);
    formData.append('price', item.price);
    formData.append('categoriesID', item.categoriesID);
    formData.append('subcategoriesID', item.subcategoriesID);
    if (image.current.files && image.current.files[0]) {
      formData.append('image', image.current.files[0]);
    }

    //if there is no subID, then delete it from fromData and it will be assigned to null by default in database
    if (item.subcategoriesID === null) {
      formData.delete('subcategoriesID');
    }
    axios
      .post('https://food-menu-dashboard.vercel.app/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setItem({
          title: '',
          description: '',
          price: '',
          err: [],
          loading: false,
          successMessage: 'Item Added Successfully !!',
        });
        image.current.value = null;
      })
      .catch((err) => {
        setItem({
          ...item,
          successMessage: null,
          err: 'Something went wrong, Please try again later !!',
        });
      });
  };

  const handleChange = async (e) => {
    const categoryName = e.target.options[e.target.selectedIndex].text;
    setCategoryName(categoryName);
  };

  useEffect(() => {
    setCategory({ ...category });
    axios
      .get('https://food-menu-dashboard.vercel.app/categories')
      .then((res) => {
        setCategory({
          ...category,
          results: res.data,
          loading: false,
        });
        setCategoriesLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (categoriesLoaded && categoryName != 'Seyami Menu') {
      setSubCategory({ ...subCategory });
      axios
        .get(
          `https://food-menu-dashboard.vercel.app/subCategories/?name=${categoryName}`
        )
        .then((res) => {
          setSubCategory({
            ...subCategory,
            results: res.data,
          });
        });
    }
  }, [categoryName]);

  if (item.successMessage) {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  return (
    <>
      {/* {item.err && alert(item.err)} */}
      {/* {item.successMessage && alert(item.successMessage)} */}
      {item.successMessage && (
        <div className='alert'>Item Added Successfully!!✅✅</div>
      )}
      {category.loading === true && <div className='spinner'></div>}
      {categoriesLoaded === true && (
        <div className='form-container'>
          <form onSubmit={handleSubmit} className='form'>
            <input
              type='text'
              id='text'
              className='input'
              placeholder='Item title'
              value={item.name}
              onChange={(e) => {
                setItem({ ...item, title: e.target.value });
              }}
            ></input>
            <textarea
              className='input'
              placeholder='Description'
              value={item.description}
              onChange={(e) => {
                setItem({ ...item, description: e.target.value });
              }}
              rows={3}
            ></textarea>
            <input
              type='file'
              htmlFor='choose image'
              className='file-input'
              ref={image}
            ></input>
            <input
              type='text'
              className='input'
              id='price'
              placeholder='Item Price'
              onChange={(e) => setItem({ ...item, price: e.target.value })}
            ></input>
            <select
              className='selection'
              onChange={(e) => {
                handleChange(e);
                const id = e.target.value;
                setItem({
                  ...item,
                  categoriesID: id,
                  subcategoriesID: null,
                });
              }}
            >
              <option value=''>choose category</option>
              {category.results.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
            <select
              className='selection'
              onChange={(e) => {
                if (e.target.value == 0) {
                  const id = null;
                  setItem({ ...item, subcategoriesID: id });
                } else {
                  const id = e.target.value;
                  setItem({ ...item, subcategoriesID: id });
                }
              }}
            >
              <option value='0'>choose subcategory</option>
              {subCategory.results.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
