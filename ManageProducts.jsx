import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import theme from '../../theme';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('book');

  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
    author: '',
    genre: '',
    roastType: '',
    description: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }

  function handleAdd() {
    const newProduct = { ...form, category };
    axios.post('http://localhost:5000/api/products', newProduct)
      .then(res => {
        setProducts([...products, res.data]);
        resetForm();
      })
      .catch(err => console.error(err));
  }

  function resetForm() {
    setForm({
      title: '',
      price: '',
      image: '',
      author: '',
      genre: '',
      roastType: '',
      description: ''
    });
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter(p => p._id !== id)))
      .catch(err => console.error(err));
  }

  function handleUpdate() {
    const currentCategory = editForm.category;

    const updatedProduct = {
      ...editForm,
      ...(currentCategory === 'book' && {
        author: editForm.author || '',
        genre: editForm.genre || '',
        description: editForm.description || ''
      }),
      ...(currentCategory === 'coffee' && {
        roastType: editForm.roastType || '',
        description: editForm.description || ''
      }),
      ...(currentCategory === 'bundle' && {
        description: editForm.description || ''
      })
    };

    axios.put(`http://localhost:5000/api/products/${editingId}`, updatedProduct)
      .then(res => {
        setProducts(products.map(p => (p._id === editingId ? res.data : p)));
        setEditingId(null);
        setEditForm({});
      })
      .catch(err => console.error(err));
  }

  const filteredProducts = products.filter(p => p.category === category);

  return (
    <>
      <section style={styles.container}>
        <h2 style={styles.heading}>Manage Products</h2>

        <Link to="/" style={styles.link}>← Back to Home</Link>

        {/* Category Buttons */}
        <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
          <button style={category === 'book' ? styles.activeBtn : styles.btn} onClick={() => setCategory('book')}>Book</button>
          <button style={category === 'coffee' ? styles.activeBtn : styles.btn} onClick={() => setCategory('coffee')}>Coffee</button>
          <button style={category === 'bundle' ? styles.activeBtn : styles.btn} onClick={() => setCategory('bundle')}>Bundle</button>
        </div>

        {/* Add Form */}
        <div style={{ marginBottom: '2rem' }}>
          <h3>Add New {category.charAt(0).toUpperCase() + category.slice(1)}</h3>

          <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={styles.input} />
          <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={styles.input} />
          <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={styles.input} />

          {category === 'book' && (
            <>
              <input type="text" placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} style={styles.input} />
              <input type="text" placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} style={styles.input} />
              <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={styles.input} />
            </>
          )}

          {category === 'coffee' && (
            <>
              <input type="text" placeholder="Roast Type" value={form.roastType} onChange={e => setForm({ ...form, roastType: e.target.value })} style={styles.input} />
              <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={styles.input} />
            </>
          )}

          {category === 'bundle' && (
            <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={styles.input} />
          )}

          <button style={styles.btn} onClick={handleAdd}>Add {category}</button>
        </div>

        {/* Product Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Image</th>
                {category === 'book' && <th>Author</th>}
                {category === 'book' && <th>Genre</th>}
                {category === 'coffee' && <th>Roast Type</th>}
                {category !== 'book' && <th>Description</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p._id}>
                  {editingId === p._id ? (
                    <>
                      <td><input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} style={styles.input} /></td>
                      <td><input value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} style={styles.input} /></td>
                      <td><input value={editForm.image} onChange={e => setEditForm({ ...editForm, image: e.target.value })} style={styles.input} /></td>

                      {category === 'book' && <td><input value={editForm.author || ''} onChange={e => setEditForm({ ...editForm, author: e.target.value })} style={styles.input} /></td>}
                      {category === 'book' && <td><input value={editForm.genre || ''} onChange={e => setEditForm({ ...editForm, genre: e.target.value })} style={styles.input} /></td>}
                      {category === 'coffee' && <td><input value={editForm.roastType || ''} onChange={e => setEditForm({ ...editForm, roastType: e.target.value })} style={styles.input} /></td>}
                      {category !== 'book' && <td><input value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} style={styles.input} /></td>}

                      <td>
                        <button style={styles.btn} onClick={handleUpdate}>Save</button>
                        <button style={{ ...styles.btn, backgroundColor: '#e57373' }} onClick={() => setEditingId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{p.title}</td>
                      <td>₹{p.price}</td>
                      <td><img src={p.image} alt={p.title} style={styles.image} /></td>

                      {category === 'book' && <td>{p.author}</td>}
                      {category === 'book' && <td>{p.genre}</td>}
                      {category === 'coffee' && <td>{p.roastType}</td>}
                      {category !== 'book' && <td>{p.description}</td>}

                      <td>
                        <button style={styles.btn} onClick={() => { setEditingId(p._id); setEditForm(p); }}>Edit</button>
                        <button style={{ ...styles.btn, backgroundColor: '#e57373' }} onClick={() => handleDelete(p._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: theme.colors.background,
    minHeight: '80vh',
    fontFamily: theme.fonts.body
  },
  heading: {
    fontSize: '2rem',
    color: theme.colors.accentPink,
    fontFamily: theme.fonts.heading,
    marginBottom: '1rem'
  },
  link: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: theme.colors.accentGreen,
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme.colors.card
  },
  image: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  btn: {
    padding: '0.4rem 0.8rem',
    marginRight: '0.5rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  activeBtn: {
    padding: '0.4rem 0.8rem',
    marginRight: '0.5rem',
    backgroundColor: theme.colors.accentPink,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  input: {
    padding: '0.5rem',
    marginRight: '0.5rem',
    marginTop: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  }
};

export default ManageProducts;
