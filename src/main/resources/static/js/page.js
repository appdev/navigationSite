$(document).ready(function () {
    loadImage();
    $("#change_bg").click(function () {
        extracted()
    });
    //自定义改动，避免出现先加载原始站点，然后又更新部分站点信息的情况；设置整体div.blocks为透明，不影响resize，并且可以做到在获取storage数据后再取消透明
    $("div.blocks").css('opacity', '0');
    $(window).resize(function () {
        $("div.content").css({
            position: "initial",
            top: 15,
            margin: "0 auto",
            float: "none",
            display: "inherit"
        });
    });
    $(window).resize();
    $("a.website").attr("target", "_blank");
    $("a.website").hover(
        function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        }
    );
    $("a.website").click(function () {
        $(this).removeClass("hover");
    });
    var temp_building;
    var temp_category_name;
    //自定义改动：从div.block-name变成了a.block-name，将text()加上了trim()
    $("a.block-name").click(function () {
        temp_building = $(this).parents("div.building");
        temp_category_name = $(this).text().trim();
        $('#categoryConfirmModal').modal('show');
    });
    //自定义改动，在打开后和下前加入了一个空格
    $('#categoryConfirmModal').on('show.bs.modal', function (event) {
        var modal = $(this);
        modal.find('#varText').text('打开 ' + temp_category_name + ' 下所有站点？');
    });
    $("#categoryConfirmButton").click(function () {
        temp_building.find("a.website").each(function () {
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                true, false, false, true, 0, null);
            $(this).get(0).dispatchEvent(evt);
        });
        $('#categoryConfirmModal').modal('hide');
    });
    $("a.chrome_extension").click(function () {
        $(this).parents('div.modal').modal('hide');
        $('#extensionDownloadingModal').modal('show');
        chrome.webstore.install("https://chrome.google.com/webstore/detail/aaaekojmfgkdoliidgddnefhnoibjbpi", successCallBack);
    });

    /*----------------------------------------------自定义----------------------------------------------*/
    /*------------------------公有变量定义部分------------------------*/
    //编辑弹层中待编辑站点信息
    var website_to_be_edited = {};
    //键盘快捷键位表
    var keyboardHotkeys =
        ['SPACE', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ];
    //website-grid中的map
    var categoryWebsiteMap = new Object();
    //website-grid中的categories,['常用','社交','新闻','财经','科技','体育','数码','深度','商业',
    //'游戏','阅读','发现','二次元','娱乐','设计','IT技术','商旅','邮箱','工具',
    //'券商理财','求职兼职','房产','银行','生活','视频','音乐','游戏直播','购物',
    //'我在香港','我在台湾','我在日本','我在韩国','我在海外']
    var categoriesInWebsiteGrid = new Array();
    //因为快捷键设置而受到影响的站点们
    var allHotkeyClassnamesToBeDeletedAfterEdit = new Array();
    //当前可供选择的站点对象
    var currentWebsiteChoicesInArray = new Array();
    //打开编辑弹层后初始化快捷键列表的旗帜，当该旗帜为true时，不对allHotkeysInClassnameToBeDeletedAfterEdit做初始化
    var initializeHotkeyInEditModalFlag = true;

    /*------------------------初始化数据部分------------------------*/
    //testGrammar();
    //testConvert();
    //readAllWebsitesFromDocument();
    //testAutoComplete();
    //testSplit();
    // initiateAllWebsitesAndCategoriesWithStorage();
    updateAllWebsitesAndCategoriesWithStorage(window.localStorage);
    initiateEditSpansForWebsites();
    initiateEditInputForCategories();
    initiateBootStrapTagsInput();
    initiateLoadJSONAsCategoryWebsiteMap();
    initLoginStatus();
    //getBytesInUse();
    //chrome.storage.sync.clear();
    /*------------------------test部分------------------------*/
    /*
    function testConvert(){
      var array1 = ['hotkey65','hotkey67','hotkey88'];
      console.log(hotkeyClassNameToCapitalLetter(array1));
      var array2 = ['w'];
      console.log(capitalLetterToHotkeyClassName(array2));
    }
    function testGrammar(){
      var jsonObj = { StudentID: "100", Name: "tmac", Hometown: "usa" };
      console.log("test: " , typeof(jsonObj));
      var buttons = {
        foo: 'bar',
        fiz: 'buz'
      };
      for ( property in buttons ) {
        console.log( property ); // Outputs: foo, fiz or fiz, foo
      }
    }
    function testSplit(){
      var s1 = 'abc';
      var s2 = 'abc,uhe';
      var a1 = s1.split(',');
      var a2 = s2.split(',');
      console.log("test split a1 of abc: ", a1);
      console.log("test split a1 of abc,uhe: ", a2);
    }*/
    /*------------------------AutoComplete部分------------------------*/
    $(function () {
        var cache = {};
        var cache_flag = false;
        $("input#website-name").autocomplete({
            source: function (req, response) {
                $.getJSON('/static/websitetips.json', function (data) {
                    var re = $.ui.autocomplete.escapeRegex(req.term);
                    var matcher = new RegExp(re, "i");
                    if (cache_flag == false) {
                        cache = data;
                        cache_flag = true;
                        response($.grep(data, function (item) {
                            return matcher.test(item.name) || matcher.test(item.url);
                        }));
                    } else {
                        response($.grep(cache, function (item) {
                            return matcher.test(item.name) || matcher.test(item.url);
                        }));
                    }
                });
            },
            appendTo: "#autocomplete-div",
            autoFocus: true,
            select: function (event, ui) {
                $("input#website-name").val(ui.item.name);
                $("input#website-url").val(ui.item.url);
                return false;
            },
            open: function () {
                $("ul.ui-menu").width($(this).innerWidth());
                $('#editWebsiteModal div.modal-header h3').next().html('小提示：鼠标点击输入框外任意位置即可关闭自动联想浮层');
            },
            close: function () {
                $('#editWebsiteModal div.modal-header h3').next().html('');
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<a>" + item.name + "<br>" + item.url + "</a>")
                .appendTo(ul);
        };
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
    /*------------------------事件侦听部分------------------------*/
    //站点分类被鼠标悬停时的动作
    $('a.block-name').hover(
        function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });
    //按下自定义链接，如果已安装插件则提示可在插件内配置，如未安装提示安装插件
    $("a.customize").on('click', function () {
        if (supportLocalStorage()) {
            initiateOnCustomizeListener();
        } else {
            $('#notSupportLocalStorage').modal('show');
        }
    });
    //按下退出自定义链接
    $("a#finish-customize").on('click', function () {
        $("a.customize").css('display', 'inherit');
        $('ul.navbar-right a').css('display', 'inherit');
        $("a.website").css('z-index', '10');
        $("a.website").css('cursor', 'pointer');
        $("a.website").off('click');
        $("a.website").on('click', function () {
            $(this).removeClass("hover");
        });
        $("span.edit-website").css('display', 'none');
        $("span.edit-website").css('z-index', '1');
        $(this).css('display', 'none');
        $("div#customize-mode-tips").css('display', 'none');
        $("a.website").hover(
            function () {
                $(this).addClass("hover");
            }, function () {
                $(this).removeClass("hover");
            }
        );
        stopEditCategoryListener();
    });
    //mouoseover至编辑层
    $("span.edit-website").hover(
        function () {
            $(this).addClass("hover");
            $(this).prev().addClass("edit-hover");
        }, function () {
            $(this).removeClass("hover");
            $(this).prev().removeClass("edit-hover");
        }
    );
    //点击编辑弹层
    $("span.edit-website").on('click', function () {
        initiateWebsiteToBeEdited();
        initiateWebsiteCategoriesInWebsiteGrid();
        $(this).prev().removeClass("edit-hover");
        website_to_be_edited.website_id = $(this).prev().attr('id');
        website_to_be_edited.website_name = $(this).prev().text();
        website_to_be_edited.website_link = $(this).prev().attr('href');
        website_to_be_edited.website_sibling_name = $(this).parents('div.building').find('a.website').text();
        website_to_be_edited.website_sibling_id = $(this).parents('div.building').find('a.website').attr('id');
        $('input#website-id').val(website_to_be_edited.website_id);
        $('input#website-name').val(website_to_be_edited.website_name);
        $('input#website-url').val(website_to_be_edited.website_link);
        displayWebsitesOfSelectedCategory('常用');
        initiateClickListenerForLiInWebsiteGrid();
        initiateEventListenerForWebsiteInWebsiteGrid();
        $("#editWebsiteModal").modal('show');
    });
    //编辑弹层展示
    $('#editWebsiteModal').on('shown.bs.modal', function () {
        $('input#website-name').focus();
    });
    //编辑层关闭
    $('#editWebsiteModal').on('hidden.bs.modal', function () {
        $('div.website-grid').css('display', 'none');
        $('div#input-keyboard').css('display', 'none');
    });
    //编辑弹层更新按钮，先更新快捷键被修改的站点，再更新被编辑站点，保证数据完整
    $('button#update-website').on('click', function () {
        let postData = {
            id: $('input#website-id').val(),
            name: $('input#website-name').val(),
            url: $('input#website-url').val()
        };
        $.ajax({
            type: "POST",
            url: '/replace',
            data: postData,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
                if ("200" === data['code'])
                    updateWebsiteInDocument(postData);
                else showError(data);
            }
        });
    });
    //编辑弹层取消按钮，点击后关闭关闭弹层
    $('button#cancel-update').on('click', function () {
        $("#editWebsiteModal").modal('hide');
    });
    //编辑站点名称输入框获得焦点时，展示站点选择面板
    $('input#website-name').on('focus', function () {
        $(this).select();
        $('div.website-grid').css('display', 'inherit');
        $('div#input-keyboard').css('display', 'none');
    });
    //站点url获得焦点时，隐藏站点选择面板
    $('input#website-url').on('focus', function () {
        $(this).select();
        //$('div.website-grid').css('display','none');
        //$('div#input-keyboard').css('display','none');
    });
    //键盘面板的按键被鼠标悬停时的动作
    $('div#input-keyboard li.key').hover(
        function () {
            $(this).addClass('hover');
            $(this).css('cursor', 'pointer');
            var spanOfWebsiteNameAsDom = $(this).children('span.website-name').get(0);
            if (spanOfWebsiteNameAsDom.offsetWidth < spanOfWebsiteNameAsDom.scrollWidth) {
                $(this).attr('title', $(this).children('span.website-name').text());
            }
        }, function () {
            $(this).removeClass('hover');
            $(this).css('cursor', 'default');
        });
    //键盘面板的按键被按下的动作，更新编辑状态站点名称到虚拟键盘中
    $('div#input-keyboard li.key').on('click', function () {
        var keycode = $(this).children('span.letter').text();
        var new_website_name = $('input#website-name').val();
        $(this).children('span.website-name').text(new_website_name);
        $('input#website-hotkey').tagsinput('add', keycode);
    });
    //当taginput输入框获得焦点时，打开软键盘
    $('div.bootstrap-tagsinput input').on('focus', function () {
        updateInputKeyboardFromDocument('input-keyboard');
        deactivateInitializeHotkeyInEditModalFlag();
        $('div#input-keyboard').css('display', 'inherit');
        $('div.website-grid').css('display', 'none');
        $(this).parents('div.bootstrap-tagsinput').css('border-color', '#66afe9');
        $(this).parents('div.bootstrap-tagsinput').css('box-shadow', '0 0 8px #66afe9');
        $(this).parents('div.bootstrap-tagsinput').css('-webkit-box-shadow', '0 0 8px #66afe9');
        $(this).parents('div.bootstrap-tagsinput').css('-moz-box-shadow', '0 0 8px #66afe9');
    });

    $('#login').on("click", function () {
        let cookie = $.cookie("login");
        if (cookie !== "" && cookie != null && cookie !== "null") {
            $.cookie('login', "", -1);
            window.location.reload();
        }
    });
    //登录按钮
    $('#login_btn').on('click', function () {
        let postData = {
            username: $('input#username').val(),
            password: $('input#password').val()
        };
        $.ajax({
            type: "POST",
            url: 'login',
            data: postData,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {

                if ("200" === data['code']) {
                    Toast("登录成功", 2000);
                    window.location.reload();
                } else {
                    showError(data);
                }
            }
        });
    });
    //当taginput输入框失去焦点时，关闭input框的边缘阴影效果
    $('div.bootstrap-tagsinput input').on('blur', function () {
        $(this).parents('div.bootstrap-tagsinput').css('border-color', '#dcdddd');
        $(this).parents('div.bootstrap-tagsinput').css('box-shadow', '');
        $(this).parents('div.bootstrap-tagsinput').css('-webkit-box-shadow', '');
        $(this).parents('div.bootstrap-tagsinput').css('-moz-box-shadow', '');
    });


    //键盘面板的按键被鼠标悬停时的动作
    $('div#hotkey-modal-keyboard li.hotkey-modal-key').hover(
        function () {
            $(this).addClass('hover');
            $(this).css('cursor', 'pointer');
            var tips = '';
            if ($(this).children('span.website-name').text() == '') {
                tips = '该快捷键尚未设置，您可进入自定义模式设置';
            } else {
                tips = '按下该按键将打开 ' + $(this).children('span.website-name').text();
            }
            $("#hotkeyModal div.modal-header h3").next().html(tips);
            var spanOfWebsiteNameAsDom = $(this).children('span.website-name').get(0);
            if (spanOfWebsiteNameAsDom.offsetWidth < spanOfWebsiteNameAsDom.scrollWidth) {
                $(this).attr('title', $(this).children('span.website-name').text());
            }
        }, function () {
            $(this).removeClass('hover');
            $(this).css('cursor', 'default');
        });
    $('#moreSitesModal').on('show.bs.modal', function () {
        $('div.website-grid').css('display', 'inherit');
        initiateWebsiteCategoriesInWebsiteGrid();
        displayWebsitesOfSelectedCategory('常用');
        initiateClickListenerForLiInMoreWebsiteGrid();
        initiateEventListenerForWebsiteInMoreWebsiteGrid();
    });

    $('#aboutModal div.about-modal-header ul.list-inline li').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });
    $('div#aboutModal div.modal-header ul.list-inline li').on('click', function () {
        var class_name = $(this).attr('class').replace('selected', '').replace('hover', '').trim();
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        $('div#aboutModal div.modal-body div.' + class_name).css('display', 'inherit');
        $('div#aboutModal div.modal-body div.' + class_name).siblings().css('display', 'none');
    });
    $('div#customizeConfirmModal a.open_new_tab').on('click', function () {
        window.postMessage({type: "FROM_PAGE", text: "newtab"}, "*");
    });
    $("div#customizeConfirmModal a.skip").on('click', function () {
        $('#customizeConfirmModal').modal('hide');
        initiateOnCustomizeListener();
    });
    /*
    $("p#thankyou").on("click", function(){
      var temp_input = document.createElement("input");
      temp_input.setAttribute("value", document.getElementById("thankyou").innerHTML);
      document.getElementById("thanks").appendChild(temp_input);
      temp_input.select();
      document.execCommand("copy");
      document.getElementById("thanks").removeChild(temp_input);
      alert("邮箱地址已复制到剪贴板");
    });*/
    /*------------------------初始化部分------------------------*/

    //初始化待编辑站点信息
    function initiateWebsiteToBeEdited() {
        website_to_be_edited = {
            'website_id': '0',
            'website_name': '',
            'website_link': '',
            'website_sibling_name': [],
            'website_sibling_id': []
        };
    }

    //initiateEditSpansForWebsites，页面加载时初始化编辑弹层，此时z-index=1，显示在a.website下方，不可见
    function initiateEditSpansForWebsites() {
        $("a.website").after("<span class='edit-website'>编辑</span>");
    }

    //initiateEditInputForCategories
    function initiateEditInputForCategories() {
        $("a.block-name").after("<input class='edit-category' />");
    }

    //initiateBootStrapTagsInput
    function initiateBootStrapTagsInput() {
        $('input#website-hotkey').tagsinput();
    }

    function activateInitializeHotkeyInEditModalFlag() {
        initializeHotkeyInEditModalFlag = true;
    }

    function deactivateInitializeHotkeyInEditModalFlag() {
        initializeHotkeyInEditModalFlag = false;
    }

    function getInitializeHotkeyInEditModalFlag() {
        return initializeHotkeyInEditModalFlag;
    }

    //initiateWebsiteCategoriesInWebsiteGrid，点击自定义链接，加载json数据完成后，分类数组已经被初始化，调用该方法展示常用分类下的站点
    function initiateWebsiteCategoriesInWebsiteGrid() {
        var websiteCategoriesInHtmlAsStr = '';
        var category_name = '';
        //console.log('execute here: categoriesInWebsiteGrid',categoriesInWebsiteGrid);
        for (var i = 0; i < categoriesInWebsiteGrid.length; i++) {
            category_name = categoriesInWebsiteGrid[i];
            websiteCategoriesInHtmlAsStr += '<li class="website-category"><span>' + category_name + '</span></li>';
        }
        $('div.website-grid ul.website-categories').children('li').remove();
        $('div.website-grid ul.website-categories').append(websiteCategoriesInHtmlAsStr);
        $('div.website-grid ul.website-categories li').each(function () {
            if ($(this).children('span').text() == '常用') {
                $(this).addClass('selected');
            }
        });
        //website-grid的category被鼠标悬停的动作
        $('div.website-grid li.website-category').hover(
            function () {
                $(this).addClass('hover');
            }, function () {
                $(this).removeClass('hover');
            });
    }

    function initiateLoadJSONAsCategoryWebsiteMap() {
        if (jQuery.isEmptyObject(categoryWebsiteMap)) {
            loadJSONAsCategoryWebsiteMap();
        }
    }

    function showError(data) {
        Toast(data['message'], 2000)
    }

    function initiateOnCustomizeListener() {
        $(this).css('display', 'none');
        $('ul.navbar-right a').css('display', 'none');
        $("a.website").css('z-index', '1');
        $("a.website").off('mouseenter mouseleave');
        $("a.website").css('cursor', 'default');
        $("a.website").on('click', function (e) {
            e.preventDefault();
        });
        $("span.edit-website").css('z-index', '10');
        $("span.edit-website").css('display', 'inherit');
        $("a#finish-customize").css('display', 'inherit');
        $("div#customize-mode-tips").css('display', 'inherit');
        var left_in_digits = ($(window).width() - $("div#customize-mode-tips").outerWidth()) / 2;
        $("div#customize-mode-tips").css('left', left_in_digits);
        if (jQuery.isEmptyObject(categoryWebsiteMap)) {
            loadJSONAsCategoryWebsiteMap();
        }
        startEditCategoryListener();
    }

    /*------------------------方法部分------------------------*/
    function supportLocalStorage() {
        var mod = 'str';
        try {
            localStorage = window.localStorage;
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    }

    //toast
    function Toast(msg, duration) {
        duration = isNaN(duration) ? 3000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "width:20%; min-width:150px; background:#1db0b8; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:50px; position:fixed; top:20%; left:40%; z-index:999999; font-weight:bold;";
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    }


    //进入分类名可编辑
    function startEditCategoryListener() {
        $('a.block-name').off('mouseenter mouseleave');
        $('a.block-name').hover(function () {
            $(this).addClass('edit-hover');
        }, function () {
            $(this).removeClass('edit-hover');
        });
        $("a.block-name").off('click');
        $("input.edit-category").each(function () {
            $(this).val($(this).prev().text().trim());
        });
        $("a.block-name").on('click', function () {
            $(this).css('z-index', '1');
            $(this).css('cursor', 'default');
            $(this).next().css('z-index', '10');
            $(this).next().css('visibility', 'visible');
            $(this).next().focus();
            $(this).next().select();
            $(this).next().on('keydown', function (e) {
                var key = e.which || e.keyCode;
                if (key == 13) {
                    var new_category_name = $(this).val();
                    //$(this).prev().text(new_category_name);
                    $(this).css('z-index', '1');
                    $(this).css('visibility', 'hidden');
                    $(this).prev().css('z-index', '10');
                    let category = {
                        'id': $(this).prev().attr('id'),
                        'name': new_category_name
                    };
                    updateCategory(category);
                }
            });
            $(this).next().on('blur', function () {
                var new_category_name = $(this).val();
                //$(this).prev().text(new_category_name);
                $(this).css('z-index', '1');
                $(this).css('visibility', 'hidden');
                $(this).prev().css('z-index', '10');
                let category = {
                    'id': $(this).prev().attr('id'),
                    'name': new_category_name
                };
                updateCategory(category);
            });
        });
    }

    //退出分类名编辑
    function stopEditCategoryListener() {
        $('a.block-name').css('z-index', '10');
        $("a.block-name").css('cursor', 'pointer');
        $('a.block-name').off('mouseenter mouseleave');
        $('a.block-name').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });
        $('a.block-name').off('click');
        $("a.block-name").on('click', function (e) {
            temp_building = $(this).parents("div.building");
            temp_category_name = $(this).text();
            $('#categoryConfirmModal').modal('show');
        });
        $('input.edit-category').css('z-index', '1');
        $('input.edit-category').css('visibility', 'hidden');
    }

    //输入序号，返回目前待选站点数组中的站点
    function getWebsiteFromCurrentChoicesAsObject(websiteSerialIDInArray) {
        var website = new Object();
        website = currentWebsiteChoicesInArray[parseInt(websiteSerialIDInArray)];
        return website;
    }

    //按下待选站点后，用待选站点的信息填入编辑弹层
    function setWebsiteInfoInEditArea(websiteSerialIDInArray) {
        var website = new Object();
        website = currentWebsiteChoicesInArray[parseInt(websiteSerialIDInArray)];
        var website_name = website.name;
        var website_url = website.url;
        $('input#website-name').val(website_name);
        $('input#website-url').val(website_url);
        //$('div.website-grid').css('display','none');
    }

    //点击website-grid的分类标签后，从Map中找到该分类对应站点并展示，如果站点为空，提示暂无该类站点，其实最好的办法是压根就不展示为空的分类
    function displayWebsitesOfSelectedCategory(selected_category_name) {
        var website = new Object();
        var websitesInHtmlAsStr = '';
        //console.log('category_name:', selected_category_name);
        currentWebsiteChoicesInArray = categoryWebsiteMap[selected_category_name];
        //console.log('currentWebsiteChoicesInArray',currentWebsiteChoicesInArray);
        if (typeof (currentWebsiteChoicesInArray) != 'undefined') {
            for (var i = 0; i < currentWebsiteChoicesInArray.length; i++) {
                website = currentWebsiteChoicesInArray[i];
                websitesInHtmlAsStr += '<li class="website"><span class="website" id="' + i + '">' + website['name'] + '</span></li>';
            }
        } else {
            websitesInHtmlAsStr += '<p>不好意思，程序员的脑袋秀逗了：该分类下暂无站点，麻烦你选择其他分类吧</p>';
        }
        $('div.website-grid ul.websites li').remove();
        $('div.website-grid ul.websites').append(websitesInHtmlAsStr);
    }

    //initiateClickListenerForLiInWebsiteGrid，编辑层div.website-grid，切换分类事件
    function initiateClickListenerForLiInWebsiteGrid() {
        //编辑层中的div.website-grid的category被鼠标点击时，替换下方站点序列为分类名对应的站点
        $('div.website-grid li.website-category').on('click', function () {
            var category_name = $(this).find('span').text();
            $(this).siblings('.selected').removeClass('selected');
            $(this).addClass('selected');
            displayWebsitesOfSelectedCategory(category_name);
            initiateEventListenerForWebsiteInWebsiteGrid();
        });
    }

    //initiateClickListenerForLiInMoreWebsiteGrid，编辑层div.website-grid，切换分类事件
    function initiateClickListenerForLiInMoreWebsiteGrid() {
        //编辑层中的div.website-grid的category被鼠标点击时，替换下方站点序列为分类名对应的站点
        $('div#more-website-grid li.website-category').on('click', function () {
            var category_name = $(this).find('span').text();
            $(this).siblings('.selected').removeClass('selected');
            $(this).addClass('selected');
            displayWebsitesOfSelectedCategory(category_name);
            initiateEventListenerForWebsiteInMoreWebsiteGrid();
        });
    }

    //initiateEventListenerForWebsiteInWebsiteGrid，当编辑站点中的website-grid被成功创建后，初始化站点的事件操作
    function initiateEventListenerForWebsiteInWebsiteGrid() {
        //website-grid的website被鼠标悬停的动作
        $('div.website-grid li.website span.website').mouseenter(
            function () {
                var spanOfWebsiteAsDom = $(this).get(0);
                if (spanOfWebsiteAsDom.offsetWidth < spanOfWebsiteAsDom.scrollWidth) {
                    $(this).attr('title', $(this).text());
                }
                $(this).addClass('hover');
                let websiteSerialIDInArray = $(this).attr('id');
                let website = getWebsiteFromCurrentChoicesAsObject(websiteSerialIDInArray);
                let website_url = website.url;
                let htmlAsStr = '<li class="preview"><img src="https://static.apkdv.com/hao/img/preview.png"/><span> </span><a target="_blank" href="' + website_url + '">预览</a></li>';
                let topOfPreview = $(this).parent().position().top - 28;
                let leftOfPreview = $(this).parent().position().left;
                $(this).parent().after(htmlAsStr);
                $('div.website-grid li.preview').css({top: topOfPreview, left: leftOfPreview});
                //website-grid的preview被鼠标悬停及移出后
                $('div.website-grid li.preview').mouseleave(function (e) {
                    //console.log("mouseleave targer:", e.relatedTarget);
                    var related_target = e.relatedTarget || e.toElement;
                    if (typeof ($(related_target).attr('class')) != 'undefined' && $(related_target).attr('class').indexOf('preview-related-element') != -1) {
                    } else {
                        $(this).prev().children('span.website').removeClass('hover');
                        $(this).prev().removeClass('preview-related-element');
                        $(this).remove();
                    }
                });
            }).mouseleave(function (e) {
            var related_target = e.relatedTarget || e.toElement;
            if (typeof ($(related_target).attr('class')) != 'undefined' && $(related_target).attr('class').indexOf('preview') != -1) {
                $(this).parent().addClass('preview-related-element');
            } else {
                $(this).removeClass('hover');
                $(this).parent().siblings('.preview').remove();
            }
        });
        //website-grid的website被鼠标点击时，用website的信息更新编辑框的内容
        $('div.website-grid li.website span.website').on('click', function () {
            var websiteSerialIDInArray = $(this).attr('id');
            setWebsiteInfoInEditArea(websiteSerialIDInArray);
        });
    }

    //initiateEventListenerForWebsiteInMoreWebsiteGrid，首页更多站点的事件监听器，不需要展示预览，不需要修改编辑框的内容，直接在新窗口打开站点即可
    function initiateEventListenerForWebsiteInMoreWebsiteGrid() {
        //hover站点后
        $('div#more-website-grid li.website span.website').hover(
            function () {
                var spanOfWebsiteAsDom = $(this).get(0);
                if (spanOfWebsiteAsDom.offsetWidth < spanOfWebsiteAsDom.scrollWidth) {
                    $(this).attr('title', $(this).text());
                }
                $(this).addClass('hover');
            }, function () {
                $(this).removeClass('hover');
            });
        //点击站点后新窗口打开链接
        $('div#more-website-grid li.website span.website').on('click', function () {
            var websiteSerialIDInArray = $(this).attr('id');
            openWebsiteInNewTab(websiteSerialIDInArray);
            $(this).removeClass('hover');
        });
    }

    //openWebsiteInNewTab，更多站点弹层点击站点的后继事件，从当前站点序列中提取出url，并在新标签页中打开
    function openWebsiteInNewTab(websiteSerialIDInArray) {
        var website = new Object();
        website = currentWebsiteChoicesInArray[parseInt(websiteSerialIDInArray)];
        var website_url = website.url;
        window.open(website_url, '_blank');
    }

    //loadJSONAsCategoryWebsiteMap，从JSON读取出Website和Category，并保存成新的JSON对象，等到打开编辑弹层时展示
    function loadJSONAsCategoryWebsiteMap() {
        categoryWebsiteMap = new Object();
        categoriesInWebsiteGrid = new Array();
        $.getJSON("/static/websitetips.json", function (data) {
            $.each(data, function (i, item) {
                var website = new Object();
                website.name = item.name;
                website.url = item.url;
                website.weight = item.weight;
                website.category = item.category;
                if (!categoryWebsiteMap[website.category]) {
                    var website_in_array = new Array();
                    website_in_array.unshift(website);
                    categoryWebsiteMap[website.category] = website_in_array;
                    categoriesInWebsiteGrid.unshift(website.category);
                } else {
                    website_in_array = categoryWebsiteMap[website.category];
                    website_in_array.unshift(website);
                }
            });
            for (var j in categoryWebsiteMap) {
                categoryWebsiteMap[j].sort(function (website_a, website_b) {
                    return website_a.weight - website_b.weight;
                });
            }
            //a>0,b>0:a-b;a>0,b<0:b-a;a<0,b>0:b-a;a<0,b<0:a-b;a=0,b<0:b-a;a=0,b>0:a-b;a<0,b=0:b-a;a>0,b=0:a-b;
            categoriesInWebsiteGrid.sort(function (category_name_a, category_name_b) {
                var weightedArray = ['常用', '社交', '新闻', '财经', '科技', '体育', '数码', '深度', '商业', '游戏',
                    '阅读', '发现', '二次元', '娱乐', '设计', 'IT技术', '商旅', '邮箱', '工具', '券商理财', '求职兼职',
                    '房产', '银行', '生活', '视频', '音乐', '游戏直播', '购物', '我在香港', '我在台湾', '我在日本', '我在韩国', '我在海外'];
                var indexOfA = jQuery.inArray(category_name_a, weightedArray);
                var indexOfB = jQuery.inArray(category_name_b, weightedArray);
                if (indexOfA * indexOfB > 0 || ((indexOfA * indexOfB == 0) && (indexOfA + indexOfB > 0))) {
                    return indexOfA - indexOfB;
                } else {
                    return indexOfB - indexOfA;
                }
            });
            //console.log("sorted categoriesInWebsiteGrid:", categoriesInWebsiteGrid);
            //console.log("sorted categoryWebsiteMap:", categoryWebsiteMap);
        });
    }


    //updateInputKeyboardFromDocument，从页面读出各个站点的快捷键，初始化输入键盘面板，让用户在设置快捷键时，就对当前的键位布置有所了解
    function updateInputKeyboardFromDocument(div_class_name) {
        let hotkeyAsArray;
        let hotkeyInClassNameAsArray;
        let website_name;
        let hotkeyInLowerCase;
        for (var id in keyboardHotkeys) {
            website_name = $('a.' + hotkeyInClassName).children('span').text();
            hotkeyInLowerCase = keyboardHotkeys[id].toLowerCase();
            $('div#' + div_class_name + ' span.' + hotkeyInLowerCase).next().text(website_name);
            //console.log('update hotkey from document: ', website_name);
        }
        if (allHotkeyClassnamesToBeDeletedAfterEdit.length > 0) {
            var allHotkeyCapitalLettersToBeDeletedAfterEdit = hotkeyClassNameToCapitalLetter(allHotkeyClassnamesToBeDeletedAfterEdit);
            for (var id in allHotkeyCapitalLettersToBeDeletedAfterEdit) {
                var hotkeyInCapitalLetter = allHotkeyCapitalLettersToBeDeletedAfterEdit[id];
                $('div#' + div_class_name + ' span.' + hotkeyInCapitalLetter.toLowerCase()).next().text('');
            }
            var currentlyEdittingHotkeys = $('input#website-hotkey').val().split(',');
            website_name = $('input#website-name').val();
            for (var id in currentlyEdittingHotkeys) {
                hotkeyInCapitalLetter = currentlyEdittingHotkeys[id];
                $('div#' + div_class_name + ' span.' + hotkeyInCapitalLetter.toLowerCase()).next().text(website_name);
            }
        }
    }

    //hotkeyClassNameToCapitalLetter，将hotkeyXX的类名转换为字符，例如hotkey65->a，默认传入的是字符数组，即[hotkey01,hotkey02,hotkey03]
    function hotkeyClassNameToCapitalLetter(allHotkeysInClassName) {
        var allHotkeysInCapitalLetter = [];
        for (var key in allHotkeysInClassName) {
            var hotkeyInCodeAsString = allHotkeysInClassName[key].replace('hotkey', '');
            var hotkeyInCapitalLetter = String.fromCharCode(parseInt(hotkeyInCodeAsString));
            if (parseInt(hotkeyInCodeAsString) == 32) {
                allHotkeysInCapitalLetter.unshift('SPACE');
            } else {
                allHotkeysInCapitalLetter.unshift(hotkeyInCapitalLetter);
            }
        }
        allHotkeysInCapitalLetter = allHotkeysInCapitalLetter.sort();
        return allHotkeysInCapitalLetter;
    }


    //updateCategoryInStorage，将编辑后的分类名写入storage，取全部分类数据可以用updateAllWebsitesAndCategoriesWithStorage，方法名加上分类，因为这里已经取了全量数据
    function updateCategory(category) {
        $.ajax({
            type: "POST",
            url: '/replace/category',
            data: category,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
                if ("200" === data['code'])
                    updateCategoryInDocument(category);
                else showError(data);
            }
        });
    }

    //updateCategoryInDocument，将编辑后的分类名写入document，取全部分类数据可以用updateAllWebsitesAndCategoriesWithStorage，方法名加上分类，因为这里已经取了全量数据
    function updateCategoryInDocument(category) {
        let category_in_document = $('a#' + category.id);
        category_in_document.text(category.name);
    }

    //updateWebsiteInStorage，将编辑后的站点信息写入storage，插件用chrome.storage，其他用localStorage；写入chrome.storage的是json对象，而写入localStorage的是json字符串
    function updateWebsiteInStorage(website_to_be_updated) {
        var obj = {};
        var website_id = website_to_be_updated.website_id;
        obj[website_id] = website_to_be_updated;
        /*
        chrome.storage.sync.set(obj, function(){
          chrome.storage.sync.get(website_id, function(data){
            console.log('updateWebsiteInStorage: saved website in chrome.storage.sync', data);
          });
        });
        */
        //localStorage对主站使用
        localStorage = window.localStorage;
        website_to_be_updated_in_str = JSON.stringify(website_to_be_updated);
        localStorage.setItem(website_id, website_to_be_updated_in_str);
        //console.log('updateWebsiteInStorage: saved website in localStorage', localStorage.getItem(website_id));
    }

    //updateWebsiteInDocument，单次编辑完成后将被编辑的站点信息更新到document
    function updateWebsiteInDocument(website_to_be_updated) {
        console.log(website_to_be_updated)
        let website_id = website_to_be_updated.id;
        let website_in_document = $('#' + website_id);
        website_in_document.text(website_to_be_updated.name);
        website_in_document.attr('href', website_to_be_updated.url);
        website_in_document.removeClass();
        website_in_document.addClass('website');
        $("#editWebsiteModal").modal('hide');
    }

    function initLoginStatus() {
        let cookie = $.cookie("login");
        if (cookie === "" || cookie == null || cookie === "null") {
            $("#login").attr('src', '../img/btnuser_login.png');
            $(".customize").css("display", "none");
        } else {
            $("#login").attr('src', '../img/btnlogout.png');
            $("#loginModal").attr('id', 'loginModal233');
        }
    }


    //updateAllWebsitesAndCategoriesWithStorage，被initiateAllWebsitesAndCategoriesWithStorage异步读取storage后调用，修改页面中的自定义站点
    function updateAllWebsitesAndCategoriesWithStorage(data_in_storage) {
        //localStorage对主站使用，这里先注释掉
        for (var data_id in data_in_storage) {
            if (parseInt(data_id) > 0 && parseInt(data_id) < 10) {
                //console.log("updateAllWebsitesAndCategoriesWithStorage: category " + data_id);
                var category_to_be_updated_in_document = JSON.parse(data_in_storage.getItem(data_id));
                $("a#" + data_id).text(category_to_be_updated_in_document.category_name);
            }
            if (parseInt(data_id) > 10 && parseInt(data_id) < 100) {
                //console.log("updateAllWebsitesAndCategoriesWithStorage: website " + data_id);
                var website_to_be_updated_in_document = JSON.parse(data_in_storage.getItem(data_id));
                $("a#" + data_id).children('span').text(website_to_be_updated_in_document.website_name);
                $("a#" + data_id).attr('href', website_to_be_updated_in_document.website_link);
                $("a#" + data_id).removeClass();
                $("a#" + data_id).addClass('website');
            }
        }

        $("div.blocks").css('opacity', '1');
    }

    var prefix = "index_tips_";
    var div_id = prefix + getBrowserOS();
    $("div#" + div_id).css("display", "inherit");

    function successCallBack() {
        window.location.reload();
    }


    function getBrowserOS() {
        var OsObject = "";
        if (isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
            return "ie";
        }
        if (isOpera = navigator.userAgent.toLowerCase().indexOf("metasr") != -1) {
            return "sougou";
        }
        if (isOpera = navigator.userAgent.toLowerCase().indexOf("lbbrowser") != -1) {
            return "liebao";
        }
        if (isOpera = navigator.userAgent.toLowerCase().indexOf("qihu 360ee") != -1) {
            return "360ee";
        }
        if (isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
            return "firefox";
        }
        if (isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
            return "chrome";
        }
        if (isSafari = navigator.userAgent.toLowerCase().indexOf("safari") != -1) {
            return "safari";
        }
        if (isOpera = navigator.userAgent.toLowerCase().indexOf("opera") != -1) {
            return "opera";
        }
    }
});

function openGoogle() {
    let url = "https://www.google.com/search?q=" + $('#b-word').val()
    window.open(url)
}

function openBaidu() {
    let url = "https://www.dogedoge.com/results?q=" + $('#b-word').val()
    window.open(url)
}
