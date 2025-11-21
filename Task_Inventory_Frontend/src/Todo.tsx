import React, { useState } from 'react';
import { type Todo as TodoType } from './Types/Types';
import DeleteButton from './Components/DeleteButton';
import EditButton from './Components/EditButton';
import Checkbox from './Components/CheckboxButton';
import CheckboxUpdate from './Components/UpdateButton';

type Props = TodoType;

export const Todo: React.FC<Props> = ({ id, name, done, dueDate, priority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName,setEditName] = useState(name)
  const [editPriority,setEditPriority] = useState(priority)
  const [editDueDate,setEditDueDate] = useState(dueDate||'')

  const handleEditClick = () => {
    setIsEditing(!isEditing); // alterna entre editar y ver
  };

  return (
    <tr className="border-b hover:bg-orange-50 bg-gray-100">
      <td><Checkbox id={id} initialChecked={done} /></td>
      <td className="p-3 px-5">
        <input
          id={id}
          type="text"
          value={editName}
          className="bg-transparent w-15"
          onChange={(e) => setEditName(e.target.value)}
          disabled={!isEditing}
        />
      </td>
      <td className="p-3 px-5">
        {isEditing ? (
          <div className="relative w-18">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="block appearance-none w-full rounded leading-tight focus:outline-none"
              id="grid-Priority"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        ) : (
          <input
            type="text"
            value={editPriority}
            className="bg-transparent w-full"
            disabled/>
        )}
      </td>
      <td className="p-3 px-5">

      {isEditing ? (
          <input
            type="date"
            value={editDueDate || ''}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="bg-transparent w-25"
            disabled={!isEditing}
          />
        ) : (
            <input
            type="text"
            value={editDueDate || 'No due date'}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="bg-transparent w-25"
            disabled={!isEditing}
          />
        )}
      </td>
      <td className="p-3 px-10">
        <EditButton onClick={handleEditClick} />
      </td>
      <td className="p-3 px-3">
        {!isEditing ? (
        <DeleteButton id={id} />):

        (<CheckboxUpdate id={id} name={editName} dueDate={editDueDate} priority={editPriority}/>
        )}
      </td>
    </tr>
  );
};