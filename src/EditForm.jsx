/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Edit() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [item, setItem] = useState({
    title: '',
    description: '',
    price: '',
    categoriesID: 0,
    subcategoriesID: 0,
    err: '',
    successMessage: null,
  });

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
    if (categoriesLoaded) {
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

  useEffect(() => {
    setItem({ ...item, loading: true });
    axios
      .get(`https://food-menu-dashboard.vercel.app/items/${id}`)
      .then((res) => {
        setItem({
          ...item,
          title: res.data[0].title,
          description: res.data[0].description,
          price: res.data[0].price,
          categoriesID: res.data[0].categoriesID,
          subcategoriesID: res.data[0].subcategoriesID,
        });
      })
      .catch((err) => {
        setItem({ ...item, loading: false, err: 'something went wrong' });
      });
  }, [item.reload]);

  const handleChange = async (e) => {
    const categoryName = e.target.options[e.target.selectedIndex].text;
    setCategoryName(categoryName);
  };

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
    axios
      .put(`https://food-menu-dashboard.vercel.app/items/${id}`, formData, {
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
          successMessage: 'Item Updated Successfully !!',
        });
        image.current.value = null;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setItem({
          ...item,
          successMessage: null,
          err: 'Something went wrong, Please try again later !!',
        });
      });
  };

  if (item.successMessage) {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  return (
    <>
      {item.successMessage && (
        <div className='alert'>Item Updated Successfully!!✅✅</div>
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
              value={item.title}
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
              value={item.price}
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
                });
              }}
              // value={item.categoriesID}
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
                const id = e.target.value;
                setItem({ ...item, subcategoriesID: id });
              }}
            >
              <option value=''>choose subcategory</option>
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
