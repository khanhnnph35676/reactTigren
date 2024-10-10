import React, {useState} from "react";

function Counter() {
    // Khai báo state "count" với giá trị khởi tạo là 0
    const [count, setCount] = useState(0);

    // Hàm xử lý khi nhấn nút
    const handleClick = () => {
        setCount(count + 1); // Tăng giá trị của count lên 1
    };

    return (
        <div>
            <p>Current count: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
}

export default Counter;