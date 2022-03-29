import React, { useState, useEffect, useRef } from 'react';
import List from './List';
import Alert from './Alert';
import './App.css';
import { RemoveItem, EditItem, ShowAlert, IItem } from './types';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (typeof list === 'string') {
    return (list = JSON.parse(list));
  } else {
    return [];
  }
};

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState<IItem[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState<number | null>(null);
  const [alert, setAlert] = useState({ show: false, msg: '', typ: '' });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || /^\s*$/.test(name)) {
      showAlert(true, 'danger', 'Please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) =>
          item.id === editID ? { ...item, title: name } : item
        )
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Value changed');
    } else {
      showAlert(true, 'success', 'Item added to the list');
      const newItem = { id: Date.now(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert: ShowAlert = (show = false, typ = '', msg = '') => {
    setAlert({ show, typ, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
  };

  const removeItem: RemoveItem = (id) => {
    showAlert(true, 'danger', 'Item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem: EditItem = (item) => {
    const editedItem = list.find((el) => el.id === item.id);
    setIsEditing(true);
    setEditID(item.id);
    if (editedItem) {
      setName(editedItem.title);
    }
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && (
          <Alert alert={alert} removeAlert={showAlert} list={list} />
        )}
        <h3>Todo list</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='new todo'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'add'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            {' '}
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
