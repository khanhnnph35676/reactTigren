import React, {useState} from 'react';

function TodoList() {
    // State để lưu trữ danh sách công việc
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    // Hàm để thêm công việc vào danh sách
    const handleAddTodo = () => {
        if (inputValue.trim() !== '') { // Kiểm tra nếu trường nhập không rỗng
            setTodos([...todos, inputValue]); // Thêm công việc vào danh sách
            setInputValue(''); // Xóa trường nhập
        }
    };
    // Hàm để xóa công việc
    const handleDeleteTodo = (index) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa công việc này?');
        if (confirmDelete) {
            const newTodos = todos.filter((_, i) => i !== index); // Lọc bỏ công việc tại vị trí index
            setTodos(newTodos); // Cập nhật danh sách
        }
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Cập nhật giá trị khi người dùng nhập
                placeholder="Nhập công việc..."
            />
            <button onClick={handleAddTodo}>Thêm</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => handleDeleteTodo(index)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
