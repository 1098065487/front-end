import React from 'react';
import {RightOutline, FileOutline, FolderOutline} from 'antd-mobile-icons';

const MenuList = props => {
    const {data = [], handleClick} = props;
    const minHeight = 48;  // 设置收起到最小高度

    const clickToggle = (node, icon) => {
        // 不存在tid的创建，tid为点击的唯一标识
        if (!node.tid) {
            node.tid = "_" + Math.random() * 100;
        }
        // window对象创建属性记录所有tid的属性，主要是height和记录展开收起标识的action
        if (!window.toggler) {
            window.toggler = {};
        }
        if (!window.toggler[node.tid]) {
            window.toggler[node.tid] = {
                obj: node,
                maxHeight: node.offsetHeight,
                minHeight: minHeight,
                timer: null,
                action: -1,
            };
        }

        if (window.toggler[node.tid].action > 0) {
            node.style.height = `${minHeight}px`;
            icon.style.transform = 'rotate(0deg)';
        } else {
            node.style.height = 'auto';
            icon.style.transform = 'rotate(90deg)';
        }

        window.toggler[node.tid].action *= -1;
    };

    // 获取当前点击的顶部父级
    const findTopNode = node => {
        if (node.parentNode.className !== 'menu-folder-block') {
            return node;
        } else {
            return findTopNode(node.parentNode);
        }
    };

    // 关闭由父级开始的所有存在tid的文件夹
    const closeAll = node => {
        if (node.className === 'menu-folder-block') {
            node.style.height = `${48}px`;
            window.toggler[node.tid].action = -1;
            node.firstChild.childNodes[2].style.transform = 'rotate(0deg)';
        }
        for (let i = 0; i < node.children.length; i += 1) {
            // 存在tid表示已经点击过
            if (node.children[i].tid) {
                closeAll(node.children[i]);
            }
        }
    };

    const handleMenuFolderClick = e => {
        const icon = e.currentTarget.children[2];

        // 点击文件夹，选中节点应该是点击区域的包裹父级（包括当前文件夹和底下的文件夹及文件）
        const node = e.currentTarget.parentNode;

        // 同级其他菜单关闭
        const sameLevelNode = node.parentNode.children;
        for (let i = 0; i < sameLevelNode.length; i += 1) {
            // 存在tid表示已经点击过
            if (sameLevelNode[i].tid) {
                if (sameLevelNode[i].tid !== node.tid) {
                    sameLevelNode[i].style.height = `${minHeight}px`;
                    window.toggler[sameLevelNode[i].tid].action = -1;
                    sameLevelNode[i].firstChild.childNodes[2].style.transform = 'rotate(0deg)';
                }
            }
        }

        // 优化--> 最上层父级的同级，已展开菜单全部关闭
        const topLevelNode = findTopNode(node);
        const allTopNode = topLevelNode.parentNode.children;
        for (let i = 0; i < allTopNode.length; i += 1) {
            // 存在tid表示曾经展开过（不管有没有关闭）
            if (allTopNode[i].tid) {
                if (allTopNode[i].tid !== topLevelNode.tid) {
                    // 遍历该父级所有子级有tid的全部关闭
                    closeAll(allTopNode[i])
                }
            }
        }

        clickToggle(node, icon);
    };

    const renderData = (data, index) => {
        return (
            data.map(e => {
                if (e.type === 1) {
                    return (
                        <div className='menu-folder-block' key={e.id}>
                            <div className="menu-folder" style={{paddingLeft: 10 + 30 * index}}
                                 onClick={handleMenuFolderClick}>
                                <FolderOutline fontSize={35} color='#1e80ff'/>
                                <div className='menu-title'>{e.title}</div>
                                <div className='menu-right-icon-folder'>
                                    <RightOutline/>
                                </div>
                            </div>
                            {e.fileList !== null ? renderData(e.fileList, index + 1) : null}
                        </div>
                    );
                }
                if (e.type === 0) {
                    return (
                        <div key={e.id} className="menu-file" style={{paddingLeft: 10 + 30 * index}}
                             onClick={() => handleClick(e.id, e.title)}>
                            <FileOutline fontSize={30}/>
                            <div className='menu-title'>{e.title}</div>
                            <div className='menu-right-icon-file'>
                                <RightOutline/>
                            </div>
                        </div>
                    );
                }
                return null;
            })
        );
    };

    return (
        <div className="menu-bg">
            {renderData(data, 0)}
        </div>
    );
};

export default MenuList;