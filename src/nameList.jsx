import React from 'react';

function NameList() {
    // Mảng các tên
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

    return (
        <div>
            <h2>Danh sách tên:</h2>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>{name}</li>  // Render từng tên trong mảng
                ))}
            </ul>
        </div>
    );
}

export default NameList;
