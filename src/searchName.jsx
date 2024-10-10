import React, {useState} from 'react';

function SearchableNameList() {
    // Mảng các tên
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

    // State để lưu trữ giá trị tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');

    // Hàm để xử lý thay đổi trong input
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Lọc danh sách tên dựa trên từ khóa tìm kiếm
    const filteredNames = names.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <h2>Tìm kiếm tên:</h2>
            <input
                type="text"
                placeholder="Nhập tên để tìm kiếm..."
                value={searchTerm}
                onChange={handleChange} // Gọi hàm khi người dùng nhập
            />
            <ul>
                {filteredNames.map((name, index) => (
                    <li key={index}>{name}</li> // Render danh sách tên đã lọc
                ))}
            </ul>
        </div>
    );
}

export default SearchableNameList;
