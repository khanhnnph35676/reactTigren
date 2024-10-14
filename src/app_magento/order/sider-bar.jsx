import React from 'react';
import {Link} from 'react-router-dom';

const SiderBar = () => {
    return (
        <div className="sider-bar">
            <div className="box"></div>
            <ul>
                <li><Link to='#'>History Orders</Link></li>
            </ul>
        </div>
    );
};

export default SiderBar;