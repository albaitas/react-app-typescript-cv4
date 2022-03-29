import React from 'react';
import { IItem, RemoveItem, EditItem } from './types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ListProps {
  items: IItem[];
  removeItem: RemoveItem;
  editItem: EditItem;
}

const List: React.FC<ListProps> = ({ items, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        return (
          <article className='grocery-item' key={item.id}>
            <p className='title'>{item.title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(item)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
