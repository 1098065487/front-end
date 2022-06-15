<%@ page import="com.alibaba.fastjson.JSON" %>
<%@ page import="com.ly.monitoring.entities.UserInfo" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    pageContext.setAttribute("path", path);
    UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
    pageContext.setAttribute("userInfo", JSON.toJSONString(userInfo));
%>

<link href="${path}/assets/css/metis/font-awesome.min.css" rel="stylesheet">

<!-- 规章制度 -->
<style>

    .navigation {
        border-right: 1px solid rgb(178 188 199);
        min-height: 860px;
        width: 325px;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .content .content-footer {
        height: 60px;
        /*position: absolute;
        bottom: 5px;*/
        border-top: 1px solid rgb(178 188 199);
        display: flex;
        align-items: center;
        padding: 15px;
        width: 100%;
        display: none;
    }

    .content .content-title {
        width: 100%;
        min-height: 40px;
        border-bottom: 2px solid rgb(248 248 248);
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        align-items: center;
    }

    .content .content-title .input-title {
        border: none;
        outline: none;
    }

    .content .content-body {
        flex: 1;
        text-align: center;
    }

    .fa {
        display: inline-block;
        position: relative;
        color: rgb(216 216 216);
    }

    .fa:hover, a:hover {
        cursor: pointer;
    }

    .fa-search {
        left: 28px;
    }

    .input-radius {
        border: 1px solid rgb(216 216 216);
        border-radius: 30px;
        height: 30px;
        outline: none;
        padding-left: 25px;
        padding-right: 25px;
    }

    .input-search {
        padding-left: 30px;
    }

    .div-nav-row {
        display: flex;
        align-items: center;
        width: 100%;
        border-bottom: 2px solid rgb(248 248 248);
    }

    .div-nav-row.div-nav-search {
        display: flex;
        height: 60px;
        justify-content: space-around;
    }

    .div-nav-row.menu-item {
        display: flex;
        justify-content: space-between;
        padding-right: 10px;
        height: 55px;
        font-size: 12px;
        color: #333333;

    }

    .div-nav-row.menu-item:hover {
        background-color: #EAF0FB;
    }

    .div-nav-row.menu-item:hover input {
        background-color: #EAF0FB;
    }

    .div-nav-row.menu-item:hover .item-op {
        display: flex;
    }

    .div-nav-row.menu-item:hover .div-tag {
        display: none;
    }

    .item-op {
        display: none;
        width: 70px;
        height: 100%;
        align-items: center;
    }

    .item-op img {
        width: 16px;
        height: 16px;
        margin-left: 10px;
    }

    .div-title {
        padding-left: 20px;
        display: flex;
        align-items: center;
    }

    .menu-item.sub-item {
        padding-left: 30px;
        display: none;
    }

    .menu-item.sub-item2 {
        padding-left: 60px;
        display: none;
    }

    .div-tag {
        padding: 5px 10px;
        background-color: #EC808D;
        border-radius: 25px;
        height: 25px;
        color: white;
        width: 56px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #item_list {
        width: 100%;
    }

    .menu-folder-block {
        height: 48px;
        overflow: hidden;
    }

    .menu-folder, .menu-file {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 48px;
        border-bottom: 2px solid rgb(248 248 248);
        padding: 0 10px;
        font-size: 12px;
    }

    .menu-folder:hover, .menu-file:hover {
        background-color: #EAF0FB;
    }

    .menu-folder:hover .item-op, .menu-file:hover .item-op {
        display: flex;
    }

    .menu-folder:hover .div-tag, .menu-file:hover .div-tag {
        display: none;
    }

    .item-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .menu-title {
        padding: 0 5px;
        font-size: 16px;
        line-height: 28px;
    }

    .menu-folder .menu-title {
        width: calc(100% - 35px - 18px);
    }

    .menu-file .menu-title {
        width: calc(100% - 30px - 18px);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 21px;
    }

    #content-text {
        padding-left: 10px;
        padding-top: 5px;
    }

    #content-editor {
        width: 100%;
        display: none;
    }

    .btn-special {
        color: #12b0f5;
        border: 1px solid rgb(178 188 199);
        height: 25px;
        line-height: 25px;
        border-radius: 5px;
        width: 70px;
        background-color: transparent;
        margin-left: 5px;
        font-size: 12px;
    }

    .w-e-text-container {
        height: 714px !important;
        border: none !important;
    }

    .item-date {
        color: #c2c2ce;
        font-size: 12px;
        flex-shrink: 0;
    }

    .div-file-add-icon {
        text-align: center;
        width: 80px;
        display: flex;
        justify-content: space-around;
    }

    .dialog {
        display: none;
        position: absolute;
        width: 350px;
        min-height: 120px;
        box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        z-index: 100;
        background-color: #f2f5f7;
    }

    .fa.fa-folder {
        color: #12b0f5;
    }

    .btn-upload{
        background-color: rgb(0,142,224);
        width:230px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        margin: 30% auto;
        display: flex;
        justify-content: center;
        display: none;
    }

    .btn-upload span{
        color: white;
    }

    #div-save{
        display: none;
    }

    /*.content-body:hover #btn-close{
        display: block;
    }*/

    #img_preview{
        margin: 0 auto;
    }

    #input-tag{
        padding-left: 15px;
    }


</style>

<div class="navigation">

    <div class="div-nav-row div-nav-search">

        <div>
            <i class="fa fa-search"></i>
            <input id="input-search" class="input-radius input-search" type="text" placeholder="搜索...">
        </div>
        <div class="div-file-add-icon">
            <i class="fa fa-plus-square-o fa-lg" onclick="add_file_click()"></i>
            <i class="fa fa-folder-o fa-lg" onclick="add_folder_click()"></i>
            <input type="hidden" id="selectItem"/>
        </div>

    </div>
    <div id="item_list">

    </div>

</div>

<div class="content">

    <div class="content-title">
        <h5 id="h4-title"><span id="title-folder"></span><span id="title-file"></span></h5>
        <div id="div-save">
            <div style="display: flex">
                <input class="input-radius" id="input-tag" placeholder="请输入标签名称" maxlength="6" autocomplete="off">
                <button type="button" id="btn-addTag" class="btn-special " onclick="addTag(this)">保存</button>
                <button type="button" id="btn-close" class="btn-special" onclick="deleteMajor(this)">删除</button>
            </div>
        </div>
    </div>

    <div id="content-body" class="content-body">
        <%--<div id="btn-close" onclick="deleteMajor(this)">&times;</div>--%>

        <div class="btn-upload">
            <span style="font-size: 18px;margin-right: 3px">+</span>
            <span style="font-size: 12px">请上传正文区需要预览的图片或PDF</span>
        </div>

        <div id="pdf_preview"></div>
        <img id="img_preview" src="">

    </div>

    <div id="content-footer" class="content-footer">
        <%--<input class="input-radius" id="input-tag" placeholder="请输入标签名称" maxlength="6">--%>
    </div>

</div>

<style>

    .attach-container {
        border-left: solid 1px rgb(178 188 199);
        min-width: 250px;
        padding: 10px 16px;
        display: none;
    }

    .div-line {
        display: flex;
        padding: 5px;
    }

    .upload-content:hover .upload-tips {
        display: block;
    }

    /*.attach-icon:after{
        content: "\EA42";
    }*/

    .attach-label {
        font-size: 14px;
        color: #333;
    }

    .attach-add {
        font-size: 12px;
        color: rgb(216 216 216);
        text-decoration: none;
        cursor: pointer;
        transform: scale(0.8);
        padding-top: 3px;
    }

    .attach-add:hover {
        content: none;
    }

    .upload-tips {
        display: none;
        width: 216px;
        height: 28px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.3);
        line-height: 28px;
        font-size: 14px;
        color: #333;
        text-align: center;
    }

    input[type=file]{
        display: none !important;
    }

    .file-info{
        margin-left: 5px;
        padding-left: 3px;
        font-size: 10px;
    }

    .file-info-other{
        display: flex;
        padding: 3px 0;
    }

    .file-info:hover .file-info-other{
        display: none;
    }

    .file-info-other-item{
        color: rgb(216 216 216);
        transform: scale(0.8);
        margin-right: 5px;
    }

    .file-operate{
        display: none;
    }

    .file-info:hover .file-operate{
        display: flex;
    }

    .file-info-name{
        padding-left: 2px;
    }

    .file-icon{
        margin: 3px 0;
        width: 10px;
        color: #1E9FFF;
    }

    .file-operate, .file-info-other{
        height: 20px;
    }

    .file-operate .file-info-other-item{
        cursor: pointer;
    }

    .file-operate .file-info-other-item a{
        padding-top: 5px;
    }

</style>

<div class="attach-container">
    <div class="upload-content" style="margin-top: 20px">
        <div style="display: flex; flex-flow: row nowrap; align-items: center">
            <div class="attach-label">附件</div>
            <div style="margin-left: 10px"><a class="attach-add" id="attach-add" >+添加</a></div>
        </div>
        <div class="upload-tips">单个附件大小限制在100M以内</div>
    </div>
    <div class="attach-list">

    </div>
</div>

<div class="dialog" id="transfer-dialog">

    <div style="width:100%">
        <button type="button" class="close" onclick="hide()"
                name="closeFrom">&times;
        </button>
    </div>

    <div style="margin-top: 30px;text-align: center;font-size: 16px;padding-top: 10px">请选择要移动到的目标文件夹</div>

    <div>
        <select style="margin-top:20px;width:200px;height: 30px" id="select-folder">
            <option>请选择</option>
        </select>
    </div>
    <div style="margin: 20px auto;">
        <button class="btn btn-dark" style="height: 30px;width: 100px;background-color: #12b0f5"
                onclick="save_transfer()">保存
        </button>
    </div>
</div>

<script src="${path}/assets/layui-v2.5.5/layui.js"></script>
<script src="${path}/assets/js/jquery.media.js"></script>

<script>

    let currentFile;
    let currentFile_id;
    var permissionUserArr = ["姚晓莲", "刘丹丹", "姚陈娟", "张丽娜", "洪萍", "陈文", "王旭", "蒋玉芬", "宋佳雯", "朱润", "黄红英", "崔恒慧", "王怡雯", "李超群"];

    var uploader;
    var reglist;
    var file;

    layui.use(["upload", "layer"],function () {
        uploader = layui.upload;
        uploader.render({
            elem: "#attach-add",
            url: '${path}/regulation/upload?isMajor=0',
            accept: 'file',
            before: function (obj) {
                console.log("before upload ", obj);
                this.data={'id':file.id};
            },
            done: function (res) {
                if (res) {
                    if (res.resultCode == '1001') {
                        getAttachesById(file.id);
                    } else {
                        messageTip(res.resultMessage);
                    }
                } else {
                    messageTip("上传失败");
                }
            }
        });

        uploader.render({
            elem: ".btn-upload",
            url: '${path}/regulation/upload?isMajor=1',
            accept: 'file',
            exts: 'pdf|jpg|png|jpeg',
            before: function (obj) {
                console.log("before upload ", obj);
                this.data={'id':file.id};
            },
            done: function (res) {
                if (res) {
                    if (res.resultCode == '1001') {
                        getAttachesById(file.id);
                        $("#div-save").show();
                    } else {
                        messageTip(res.resultMessage);
                    }
                } else {
                    messageTip("上传失败");
                }
            }
        });

    });


    $(function () {
        if(!hasEditPermission()) {
            $(".div-file-add-icon").hide();
        }

        // 查询nav
        $("#input-search").on("keydown", function (event) {
            if (event.key != "Enter") {
                return;
            }
            if (!reglist) return;

            const val = $("#input-search").val().trim();
            if(val === '') {
                let div = $("#item_list");
                div.empty();
                renderNav(div, reglist, 0);
                $('#item_list .menu-folder-block').css({ height: '48px'});
                return;
            } else {
                renderNavByFilter(val)
                $('#item_list .menu-folder-block').css({ height: 'auto'});
                return;
            }
        });

        // 初始获取菜单
        queryRegulations();
    });

    // 根据查询，筛选nav，并展示
    function renderNavByFilter(val) {
        // 深拷贝reglist，保证不干扰原reglist，不用重复调用查询接口
        const filter = filterList([], $.extend(true, [], reglist), val);
        let div = $("#item_list");
        div.empty();
        renderNav(div, filter, 0);
    }

    // 查询筛选nav
    function filterList(newList, list, val) {
        list.forEach(e => {
            // 文件夹筛选存在，则子级都展示
            if(e.title.indexOf(val) !== -1) {
                newList.push(e);
            } else {
                // 递归子级
                if(e.fileList !== null) {
                    let fileList = filterList([], e.fileList, val);
                    if(fileList.length !== 0) {
                        e.fileList = fileList;
                        newList.push(e);
                    }
                }
            }
        })
        return newList;
    }

    function hasEditPermission() {
        var userInfo = ${userInfo};
        if (permissionUserArr.indexOf(userInfo.username) >= 0) {
            return true;
        }
        return false;
    }

    function getById(id) {
        var data = {};
        $.ajax({
            url: "${path}/regulation/get/" + id,
            method: "get",
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (result) {
                if (result && result.resultCode == '1001') {
                    data = result.data;
                }
            }
        });

        return data;
    }

    function createAttachItem(item){
        var classFile = "fa-file-o";
        if(item.fileType == 'image'){
            classFile = "fa-file-image-o";
        }

        var html = '<div class="div-line">' +
            '            <div class="file-icon fa '+classFile+' "></div>' +
            '            <div class="file-info">' +
            '                <div class="file-info-name">'+item.fileName+'</div>' +
            '                <div class="file-info-other">' +
            '                    <div class="file-info-other-item">'+item.createUser+'</div>' +
            '                    <div class="file-info-other-item">'+item.createTimeStr+'</div>' +
            '                </div>' +
            '                <div class="file-operate">' +
            '                    <div class="file-info-other-item"><a class="fa fa-download" href="'+item.fileUrl+'"></a></div>';

        if(hasEditPermission()){
            html += '<div class="file-info-other-item"><a class="fa fa-remove" onclick="deleteAttach('+item.id+')"></a></div>';
        }

        html +='</div></div></div>';
        return html;
    }

    function deleteAttach(id){

        var ret = false;
            $.ajax({
                url: "${path}/regulation/deleteAttach/" + id,
                method: "delete",
                dataType: "json",
                contentType: "application/json",
                async: false,
                success: function (result) {
                    if (result && result.resultCode == '1001') {
                        //data = result.data;
                        getAttachesById(file.id);
                        ret = true;
                    }
                }
            });

            return ret;
    }

    function deleteMajor(dom){
        var id = $(dom).parent().parent().attr("data-id");
        if(id) {
            var ret = deleteAttach(id);
            if(ret) {
                $('#pdf_preview').hide();
                $("#img_preview").hide();
                $("#div-save").hide();
                $(".btn-upload").show();
            }
        }
    }

    function getAttachesById(id) {
        $(".attach-list").empty();
        $.ajax({
            url: "${path}/regulation/getAttaches/" + id,
            method: "get",
            dataType: "json",
            contentType: "application/json",
            async: true,
            success: function (result) {
                if (result && result.resultCode == '1001') {
                    result.data.forEach(function(item){
                        $('#pdf').hide();
                        if(item.major == 1){
                            filePreview(item);
                            $(".btn-upload").hide();
                            if(hasEditPermission()) {
                                $("#div-save").attr("data-id",item.id);
                                $("#div-save").show();
                            }
                        }else{
                            var html = createAttachItem(item);
                            $(".attach-list").append(html);
                        }
                    });
                }
            }
        });
    }

    function queryRegulations(folderId, fileId) {
        $.get("${path}/regulation/list", function (result) {
            if (result) {
                let div = $("#item_list");
                div.empty();
                reglist = result.data;

                renderNav(div, result.data, 0);
                // 根据当前folder id展开菜单
                if(folderId) {
                    // 获取菜单层级ids
                    const openList = getCollectIds([], result.data, folderId);
                    const reverseList = openList.reverse();
                    // 逐层展开菜单
                    openFolder(reverseList, fileId)
                }
            }
        }, "json")
    }

    // 根据菜单层级id展开
    function openFolder(ids, fileId) {
        ids.forEach((e, index) => {
            let node = $(".menu-folder[data-id='" + e + "']")[0];
            if(index === ids.length - 1) {
                if(fileId) {
                    // 存在file选中file
                    let fileNode = $(".menu-file[data-id='" + fileId + "']")[0];
                    handleMenuFileClick(fileNode);
                } else {
                    currentFile = node;
                    let id = $(node).attr("data-id");
                    currentFile_id = id;
                    $("#selectItem").val(id);
                    // 样式控制当前高亮
                    $(".menu-folder").css({'background-color' : '', 'font-weight' : ''});
                    $(".menu-file").css({'background-color' : '', 'font-weight' : ''});
                    $(node).css({'background-color' : 'pink', 'font-weight' : 'bolder'});

                    // 获取当前选中nav
                    let item = getById(id);
                    file = item;

                    $('#pdf_preview').hide();
                    $("#img_preview").hide();
                    $("#div-save").hide();

                    $(".attach-container").hide();
                    $(".btn-upload").hide();

                    $("#title-folder").show();
                    $("#title-folder").text(item.title);
                    $("#title-file").hide();
                }
            }

            // 控制icon展开
            let icon = $(node).find("i").eq(0);
            icon.addClass("fa-folder-open");

            const parentNode = node.parentNode;
            clickToggle(parentNode);
        })
    }

    // 获取当前展开文件夹id数组
    function getCollectIds(openList, list, id) {
        // 按结果正序获取树的路径，效率差一点
        // openList公共了，导致多次遍历信息存储，需要判断改变pop()
        // for(let i = 0; i < list.length; i += 1) {
        //     openList.push(list[i].id);
        //     if(list[i].type === 1) {
        //         if(list[i].id.toString() === id) {
        //             return openList;
        //         } else {
        //             if(list[i].fileList !== null) {
        //                 if(getCollectIds(openList, list[i].fileList, id)) {
        //                     return openList;
        //                 } else {
        //                     openList.pop();
        //                 }
        //             } else {
        //                 openList.pop();
        //             }
        //         }
        //     } else {
        //         openList.pop();
        //     }
        // }


        // 按查询倒序获取树的路径，结果需要反转
        for(let i = 0; i < list.length; i += 1) {
            if(list[i].type === 1) {
                if(list[i].id.toString() === id) {
                    openList.push(list[i].id)
                    return openList;
                } else {
                    if(list[i].fileList !== null) {
                        let filter = getCollectIds(openList, list[i].fileList, id);
                        if(filter) {
                            openList.push(list[i].id)
                            return openList;
                        }
                    }
                }
            }
        }
    }

    // 根据接口数据渲染nav
    function renderNav(node, data, idx) {
        data.forEach(function (e) {
            if(e.type === 1) {
                // 文件夹
                node.append(create_folder(e, idx));
            }
            if(e.type === 0) {
                // 文件
                node.append(create_file(e, idx));
            }
        })
    }

    // 创建文件夹
    function create_folder(item, idx) {
        // 文件夹主体
        let folderBlock = $("<div class='menu-folder-block'></div>");;
        let folder = $("<div class='menu-folder menu-item' data-id='" + item.id + "' onclick='handleMenuFolderClick(this)' style='padding-left:" + (10 + 20 * idx) + "px'></div>");
        // icon展开
        folder.append('<i class="fa fa-folder fa-lg" ></i>');
        folder.append("<div style='margin-left: 5px;width: 100%' class='item-title'>" + item.title + "</div>");
        folder.append("<input onblur='file_title_blur(this)' style='margin-left: 5px; display: none' ></input>");

        // 标签
        let opDiv = $("<div></div>");
        if (item.tag) {
            opDiv.append("<div class='div-tag'>" + item.tag + "</div>")
        }
        // 操作
        if (hasEditPermission()) {
            opDiv.append(getItemOpHtml(item));
        }
        folder.append(opDiv);
        // 创建日期
        folder.append('<div class="item-date">' + item.date + '</div>');

        folderBlock.append(folder)
        // 递归创建文件夹下子级
        if(item.fileList !== null) {
            folderBlock.append(renderNav(folderBlock, item.fileList, idx + 1));
        }
        return folderBlock;
    }

    // 创建文件
    function create_file(item, idx) {
        let folder = $("<div class='menu-file menu-item'  data-id='" + item.id + "'  onclick='handleMenuFileClick(this)' style='padding-left:" + (10 + 20 * idx) + "px'></div>");
        folder.append('<i class="fa fa-file fa-lg" ></i>');
        folder.append("<div style='margin-left: 5px;width: 100%' class='item-title'>" + item.title + "</div>");
        folder.append("<input onblur='file_title_blur(this)' style='margin-left: 5px; display: none' ></input>");

        let opDiv = $("<div></div>");
        if (item.tag) {
            opDiv.append("<div class='div-tag'>" + item.tag + "</div>")
        }
        if (hasEditPermission()) {
            opDiv.append(getItemOpHtml(item));
        }
        folder.append(opDiv);
        folder.append('<div class="item-date">' + item.date + '</div>');
        return folder;
    }

    // 文件点击
    function handleMenuFileClick(node) {
        // 当前点击数据
        currentFile = node;
        let id = $(node).attr("data-id");
        currentFile_id = id;
        // 文件下不允许创建
        // $("#selectItem").val(id);
        // 样式控制当前高亮
        $(".menu-folder").css({'background-color' : '', 'font-weight' : ''});
        $(".menu-file").css({'background-color' : '', 'font-weight' : ''});
        $(node).css({'background-color' : 'pink', 'font-weight' : 'bolder'});

        // 获取当前选中nav
        let item = getById(id);
        file = item;
        if(item.type === 0) {
            $(".div-file-add-icon").hide();
        }

        $('#pdf_preview').hide();
        $("#img_preview").hide();
        $("#div-save").hide();

        $("#input-title").attr("data-id", item.id);
        $("#input-title").val(item.title);
        $("#input-tag").val(item.tag);

        if(hasEditPermission()) {
            $(".btn-upload").show();
        }
        $(".attach-container").show();

        // 获取附件，并展示
        getAttachesById(id);

        let text = "";
        if(item.parentId === 0){
            $("#title-folder").hide();
            text = item.title;
        }else{
            text = " > " + item.title;
        }
        $("#title-file").html(text);
        $("#title-file").css("color","#02A7F0");
        $("#title-file").show();
    }

    // 文件夹点击
    function handleMenuFolderClick(e) {
        // 当前点击数据
        currentFile = e;
        let id = $(e).attr("data-id");
        currentFile_id = id;
        $("#selectItem").val(id);
        // 样式控制当前高亮
        $(".menu-folder").css({'background-color' : '', 'font-weight' : ''});
        $(".menu-file").css({'background-color' : '', 'font-weight' : ''});
        $(e).css({'background-color' : 'pink', 'font-weight' : 'bolder'});

        // 获取当前选中nav
        let item = getById(id);
        file = item;

        if(item.type === 1) {
            if(hasEditPermission()) {
                $(".div-file-add-icon").show();
            }
        }

        $('#pdf_preview').hide();
        $("#img_preview").hide();
        $("#div-save").hide();

        // 控制icon展开或收起
        let icon = $(e).find("i").eq(0);
        if (icon.hasClass("fa-folder-open")) {
            icon.removeClass("fa-folder-open");
        } else {
            icon.addClass("fa-folder-open");
        }

        $(".attach-container").hide();
        $(".btn-upload").hide();

        $("#title-folder").show();
        $("#title-folder").text(item.title);
        $("#title-file").hide();

        // 点击文件夹，选中节点应该是点击区域的包裹父级（包括当前文件夹和底下的文件夹及文件）
        const node = e.parentNode;

        // 同级其他菜单关闭
        const sameLevelNode = node.parentNode.children;
        for (let i = 0; i < sameLevelNode.length; i += 1) {
            // 存在tid表示已经点击过
            if (sameLevelNode[i].tid) {
                if (sameLevelNode[i].tid !== node.tid) {
                    sameLevelNode[i].style.height = '48px';
                    window.toggler[sameLevelNode[i].tid].action = -1;
                    // 关闭同级其他icon
                    let icon = $(sameLevelNode[i]).children().find("i").eq(0);
                    if (icon.hasClass("fa-folder-open")) {
                        icon.removeClass("fa-folder-open");
                    }
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

        clickToggle(node);
    }

    // 控制记录文件夹展开
    function clickToggle(node) {
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
                minHeight: 48,
                timer: null,
                action: -1,
            };
        }

        if (window.toggler[node.tid].action > 0) {
            node.style.height = '48px';
        } else {
            node.style.height = 'auto';
        }

        window.toggler[node.tid].action *= -1;
    }

    // 获取当前点击的顶部父级
    function findTopNode(node) {
        if (node.parentNode.className !== 'menu-folder-block') {
            return node;
        } else {
            return findTopNode(node.parentNode);
        }
    }

    // 关闭由父级开始的所有存在tid的文件夹
    function closeAll(node) {
        if (node.className === 'menu-folder-block') {
            node.style.height = '48px';
            window.toggler[node.tid].action = -1;
            // 关闭icon
            let icon = $(node).children().find("i").eq(0);
            if (icon.hasClass("fa-folder-open")) {
                icon.removeClass("fa-folder-open");
            }
        }
        for (let i = 0; i < node.children.length; i += 1) {
            // 存在tid表示已经点击过
            if (node.children[i].tid) {
                closeAll(node.children[i]);
            }
        }
    }

    // 创建文件
    function add_file_click() {
        var item = {};
        item.title = "无标题笔记（1）";
        item.type = 0;
        item.parentId = $("#selectItem").val();
        item.currentFolderId = $("#selectItem").val();
        saveRegular(item);
    }

    // 判断当前文件层级
    function countLevel(node, idx) {
        if(!node) {
            return idx;
        }
        if($(node).parent().hasClass('menu-folder-block')) {
            return countLevel($(node).parent(), idx + 1)
        }
        if(!$(node).parent().hasClass('menu-folder-block')) {
            return idx;
        }
        return idx;
    }

    // 创建文件夹
    function add_folder_click() {
        if(countLevel(currentFile, 0) >= 5) {
            messageTip("不允许创建五级以上文件夹");
            return;
        }
        var item = {};
        item.title = "无标题文件夹（1）";
        item.type = 1;
        item.parentId = $("#selectItem").val();
        item.currentFolderId = $("#selectItem").val();
        saveRegular(item);
    }

    // 展示附件预览
    function filePreview(file){
        if(file.fileType === "pdf"){
            $('#pdf_preview').media({
                    width:'100%',
                    height:'100%',
                    autoplay: true,
                    src:file.fileUrl,
                });
            $('#pdf_preview').show();

        }else if(file.fileType === "image"){
            $("#img_preview").attr("src",file.fileUrl);
            $("#img_preview").show();
        }
    }

    // 编辑nav title
    function file_title_blur(input) {
        var data = {};
        data.id = $(input).parents(".menu-item").attr("data-id");
        data.title = $(input).val();

        // 空格不走保存接口, 维持原输入框
        if(data.title.trim() === '') {
            return;
        }
        if(data.title.trim() !== $(input).prev().text()){
            // 获取当前选中nav
            let item = getById(data.id);
            if(item.type === 0) {
                data.currentFolderId = item.parentId.toString();
                data.currentFileId = data.id;
            } else {
                data.currentFolderId = data.id;
            }
            if(saveRegular(data)) {
                $(input).hide();
                $(input).prev().text(data.title);
                $(input).prev().show();
            }
        } else {
            // 值未变化不走保存接口
            $(input).hide();
            $(input).prev().show();
        }
    }

    function saveRegular(regular) {
        var data = {};
        $.ajax({
            url: "${path}/regulation/save",
            data: JSON.stringify(regular),
            method: "post",
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (result) {
                if (result && result.resultCode == '1001') {
                    data = result.data;

                    if(regular.currentFileId) {
                        queryRegulations(regular.currentFolderId, regular.currentFileId);
                    } else {
                        queryRegulations(regular.currentFolderId);
                    }
                }
            }
        });
        return data;
    }

    // 文件夹及文件操作渲染
    function getItemOpHtml(item) {
        if(item.type === 0) {
            return '<div class="item-op" data-id=' + item.id + ' data-pid=' + item.parentId + '>\n' +
                '            <a onclick="edit_item_title(this,event)" href="javascript:void(0)"><img src="${path}/assets/img/self/edit.png" ></a>\n' +
                '            <a onclick="delete_file(this,event)" href="javascript:void(0)"><img src="${path}/assets/img/self/delete.png"></a>\n' +
                '            <a onclick="transfer(this,event)"><img src="${path}/assets/img/self/transfer.png" ></a>\n' +
                '            </div>';
        }
        return '<div class="item-op" data-id=' + item.id + ' data-pid=' + item.parentId + '>\n' +
            '            <a onclick="edit_item_title(this,event)" href="javascript:void(0)"><img src="${path}/assets/img/self/edit.png" ></a>\n' +
            '            <a onclick="delete_file(this,event)" href="javascript:void(0)"><img src="${path}/assets/img/self/delete.png"></a>\n' +
            '            </div>';
    }

    // 编辑nav title点击事件
    function edit_item_title(dom, event) {
        event.stopPropagation();

        var div_title = $(dom).parents(".menu-item").find(".item-title");
        var input = $(dom).parents(".menu-item").find("input");
        var div_text = $(div_title).text();

        $(div_title).hide();
        $(input).val(div_text);
        $(input).show();
        $(input).focus();
        $(input).select();
    }

    function addTag(dom){
        var id = $(dom).parent().parent().attr("data-id");
        if(id){
            let item = getById(currentFile_id);
            saveRegular({id: file.id, tag: $("#input-tag").val(), currentFolderId: item.parentId.toString(), currentFileId: currentFile_id});
        }
    }

    function delete_file(dom, event) {
        event.stopPropagation();
        var id = $(dom).parent().attr("data-id");
        var pid = $(dom).parent().attr("data-pid");
        confimMessageBox("确定要删除么？", function () {
            $.ajax({
                url: "${path}/regulation/delete/" + id,
                method: "post",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    if(pid && pid !== '0') {
                        queryRegulations(pid);
                    } else {
                        queryRegulations();
                    }
                }
            })
        });
    }

    function transfer(dom, event) {
        $("#transfer-dialog").css({
            "left": $(dom).position().left + 20,
            "top": $(dom).position().top + 10
        });

        $("#transfer-dialog").attr("data-id", $(dom).parent().attr("data-id"));
        $("#select-folder").empty();
        $("#select-folder").append("<option value=''>请选择...</option>");

        $.ajax({
            url: "${path}/regulation/folder/list",
            method: "get",
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                if (result && result.data) {
                    result.data.forEach(function (item) {
                        $("#select-folder").append("<option value='" + item.id + "'>" + item.title + "</option>");
                    });
                }
            }
        });

        $("#transfer-dialog").show();
    }

    function hide() {
        $("#transfer-dialog").hide();
    }

    function save_transfer() {
        if (!$("#select-folder").val()) {
            messageTip("请选择文件夹");
            return;
        }
        $.ajax({
            url: "${path}/regulation/transfer",
            method: "get",
            dataType: "json",
            data: {id: $("#transfer-dialog").attr("data-id"), parentId: $("#select-folder").val()},
            contentType: "application/json",
            success: function (result) {
                if (result) {
                    $("#transfer-dialog").hide();
                    queryRegulations($("#select-folder").val());
                }
            }
        });
    }
</script>

