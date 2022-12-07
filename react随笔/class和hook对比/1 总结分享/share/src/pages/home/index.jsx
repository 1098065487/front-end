import React from 'react';
import {Outlet, Link} from 'react-router-dom';
 import '../style.css';

const Home = () => {

    return (
        <div className='share-content'>
            <div className='share-left'>
                <Link className='menu-link' to='/home/test1'>示例1-函数组件</Link>
                <Link className='menu-link' to='/home/test2'>示例1-类组件</Link>
                <br />
                <br />
                <Link className='menu-link' to='/home/test3'>示例2-函数组件</Link>
                <Link className='menu-link' to='/home/test4'>示例2-类组件</Link>
                <Link className='menu-link' to='/home/test5'>中间页</Link>
                <br />
                <br />
                <Link className='menu-link' to='/home/test6'>示例3-类组件-1</Link>
                <Link className='menu-link' to='/home/test7'>示例3-函数组件-1</Link>
                <Link className='menu-link' to='/home/test8'>示例3-类组件-2</Link>
                <Link className='menu-link' to='/home/test9'>示例3-函数组件-2</Link>
                <br />
                <br />
                <Link className='menu-link' to='/home/test11'>示例4-类组件</Link>
                <Link className='menu-link' to='/home/test12'>示例4-函数组件</Link>
            </div>
            <div className='share-right'>
                <Outlet />
            </div>
        </div>
    );
};

export default Home;