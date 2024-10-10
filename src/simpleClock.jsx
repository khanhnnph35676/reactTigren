import React, {useState, useEffect} from 'react';

function SimpleClock() {
    // State để lưu trữ thời gian hiện tại
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Hàm cập nhật thời gian
        const updateTime = () => {
            setCurrentTime(new Date());
        };

        // Thiết lập interval để cập nhật thời gian mỗi giây
        const intervalId = setInterval(updateTime, 1000);
        // Dọn dẹp interval khi component bị gỡ bỏ
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h2>Đồng hồ hiện tại:</h2>
            <p>{currentTime.toLocaleTimeString()}</p>
        </div>
    );
}

export default SimpleClock;