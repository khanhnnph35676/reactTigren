import React, {useState} from 'react';

function FormName() {
    // Khai báo state để lưu trữ giá trị nhập vào từ input
    const [name, setName] = useState('');
    const [submittedName, setSubmittedName] = useState('');
    // Hàm xử lý sự kiện khi người dùng nhập vào input
    const handleInputChange = (event) => {
        setName(event.target.value);  // Cập nhật giá trị name khi người dùng nhập
    };
    // Hàm xử lý sự kiện khi người dùng nhấn nút
    const handleSubmit = (event) => {
        event.preventDefault();  // Ngăn chặn hành vi mặc định của form
        setSubmittedName(name);  // Cập nhật giá trị submittedName với giá trị hiện tại của name
        setName('');             // Đặt lại giá trị name về rỗng
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Nhập tên của bạn"
                />
                <button type="submit">Gửi</button>
            </form>
            {submittedName && <p>Tên của bạn là: {submittedName}</p>}
        </div>
    );
}

export default FormName;
