"use strict";function openGoogle(){var e="https://www.google.com/search?q="+$("#b-word").val();window.open(e)}function openBaidu(){var e="https://www.dogedoge.com/results?q="+$("#b-word").val();window.open(e)}$(document).ready(function(){function e(){z={website_id:"0",website_name:"",website_link:"",website_sibling_name:[],website_sibling_id:[]}}function t(){T=!1}function i(){for(var e="",t="",i=0;i<S.length;i++)t=S[i],e+='<li class="website-category"><span>'+t+"</span></li>";$("div.website-grid ul.website-categories").children("li").remove(),$("div.website-grid ul.website-categories").append(e),$("div.website-grid ul.website-categories li").each(function(){"常用"==$(this).children("span").text()&&$(this).addClass("selected")}),$("div.website-grid li.website-category").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}function s(e){a(e.message,2e3)}function n(){$(this).css("display","none"),$("ul.navbar-right a").css("display","none"),$("a.website").css("z-index","1"),$("a.website").off("mouseenter mouseleave"),$("a.website").css("cursor","default"),$("a.website").on("click",function(e){e.preventDefault()}),$("span.edit-website").css("z-index","10"),$("span.edit-website").css("display","inherit"),$("a#finish-customize").css("display","inherit"),$("div#customize-mode-tips").css("display","inherit");var e=($(window).width()-$("div#customize-mode-tips").outerWidth())/2;$("div#customize-mode-tips").css("left",e),jQuery.isEmptyObject(j)&&w(),r()}function o(){try{return localStorage=window.localStorage,localStorage.setItem("str","str"),localStorage.removeItem("str"),!0}catch(e){return!1}}function a(e,t){t=isNaN(t)?3e3:t;var i=document.createElement("div");i.innerHTML=e,i.style.cssText="width:20%; min-width:150px; background:#1db0b8; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:50px; position:fixed; top:20%; left:40%; z-index:999999; font-weight:bold;",document.body.appendChild(i),setTimeout(function(){i.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",i.style.opacity="0",setTimeout(function(){document.body.removeChild(i)},500)},t)}function r(){$("a.block-name").off("mouseenter mouseleave"),$("a.block-name").hover(function(){$(this).addClass("edit-hover")},function(){$(this).removeClass("edit-hover")}),$("a.block-name").off("click"),$("input.edit-category").each(function(){$(this).val($(this).prev().text().trim())}),$("a.block-name").on("click",function(){$(this).css("z-index","1"),$(this).css("cursor","default"),$(this).next().css("z-index","10"),$(this).next().css("visibility","visible"),$(this).next().focus(),$(this).next().select(),$(this).next().on("keydown",function(e){if(13==(e.which||e.keyCode)){var t=$(this).val();$(this).css("z-index","1"),$(this).css("visibility","hidden"),$(this).prev().css("z-index","10"),y({id:$(this).prev().attr("id"),name:t})}}),$(this).next().on("blur",function(){var e=$(this).val();$(this).css("z-index","1"),$(this).css("visibility","hidden"),$(this).prev().css("z-index","10"),y({id:$(this).prev().attr("id"),name:e})})})}function d(){$("a.block-name").css("z-index","10"),$("a.block-name").css("cursor","pointer"),$("a.block-name").off("mouseenter mouseleave"),$("a.block-name").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}),$("a.block-name").off("click"),$("a.block-name").on("click",function(e){_=$(this).parents("div.building"),O=$(this).text(),$("#categoryConfirmModal").modal("show")}),$("input.edit-category").css("z-index","1"),$("input.edit-category").css("visibility","hidden")}function c(e){new Object;return I[parseInt(e)]}function l(e){var t=new Object;t=I[parseInt(e)];var i=t.name,s=t.url;$("input#website-name").val(i),$("input#website-url").val(s)}function u(e){var t=new Object,i="";if(void 0!==(I=j[e]))for(var s=0;s<I.length;s++)t=I[s],i+='<li class="website"><span class="website" id="'+s+'">'+t.name+"</span></li>";else i+="<p>不好意思，程序员的脑袋秀逗了：该分类下暂无站点，麻烦你选择其他分类吧</p>";$("div.website-grid ul.websites li").remove(),$("div.website-grid ul.websites").append(i)}function h(){$("div.website-grid li.website-category").on("click",function(){var e=$(this).find("span").text();$(this).siblings(".selected").removeClass("selected"),$(this).addClass("selected"),u(e),v()})}function p(){$("div#more-website-grid li.website-category").on("click",function(){var e=$(this).find("span").text();$(this).siblings(".selected").removeClass("selected"),$(this).addClass("selected"),u(e),b()})}function v(){$("div.website-grid li.website span.website").mouseenter(function(){var e=$(this).get(0);e.offsetWidth<e.scrollWidth&&$(this).attr("title",$(this).text()),$(this).addClass("hover");var t=$(this).attr("id"),i=c(t),s=i.url,n='<li class="preview"><img src="https://static.apkdv.com/hao/img/preview.png"/><span> </span><a target="_blank" href="'+s+'">预览</a></li>',o=$(this).parent().position().top-28,a=$(this).parent().position().left;$(this).parent().after(n),$("div.website-grid li.preview").css({top:o,left:a}),$("div.website-grid li.preview").mouseleave(function(e){var t=e.relatedTarget||e.toElement;void 0!==$(t).attr("class")&&-1!=$(t).attr("class").indexOf("preview-related-element")||($(this).prev().children("span.website").removeClass("hover"),$(this).prev().removeClass("preview-related-element"),$(this).remove())})}).mouseleave(function(e){var t=e.relatedTarget||e.toElement;void 0!==$(t).attr("class")&&-1!=$(t).attr("class").indexOf("preview")?$(this).parent().addClass("preview-related-element"):($(this).removeClass("hover"),$(this).parent().siblings(".preview").remove())}),$("div.website-grid li.website span.website").on("click",function(){l($(this).attr("id"))})}function b(){$("div#more-website-grid li.website span.website").hover(function(){var e=$(this).get(0);e.offsetWidth<e.scrollWidth&&$(this).attr("title",$(this).text()),$(this).addClass("hover")},function(){$(this).removeClass("hover")}),$("div#more-website-grid li.website span.website").on("click",function(){f($(this).attr("id")),$(this).removeClass("hover")})}function f(e){var t=new Object;t=I[parseInt(e)];var i=t.url;window.open(i,"_blank")}function w(){j=new Object,S=new Array,$.getJSON("/static/websitetips.json",function(e){$.each(e,function(e,t){var i=new Object;if(i.name=t.name,i.url=t.url,i.weight=t.weight,i.category=t.category,j[i.category])s=j[i.category],s.unshift(i);else{var s=new Array;s.unshift(i),j[i.category]=s,S.unshift(i.category)}});for(var t in j)j[t].sort(function(e,t){return e.weight-t.weight});S.sort(function(e,t){var i=["常用","社交","新闻","财经","科技","体育","数码","深度","商业","游戏","阅读","发现","二次元","娱乐","设计","IT技术","商旅","邮箱","工具","券商理财","求职兼职","房产","银行","生活","视频","音乐","游戏直播","购物","我在香港","我在台湾","我在日本","我在韩国","我在海外"],s=jQuery.inArray(e,i),n=jQuery.inArray(t,i);return s*n>0||s*n==0&&s+n>0?s-n:n-s})})}function m(e){var t=void 0,i=void 0;for(var s in M)t=$("a."+hotkeyInClassName).children("span").text(),i=M[s].toLowerCase(),$("div#"+e+" span."+i).next().text(t);if(A.length>0){var n=g(A);for(var s in n){var o=n[s];$("div#"+e+" span."+o.toLowerCase()).next().text("")}var a=$("input#website-hotkey").val().split(",");t=$("input#website-name").val();for(var s in a)o=a[s],$("div#"+e+" span."+o.toLowerCase()).next().text(t)}}function g(e){var t=[];for(var i in e){var s=e[i].replace("hotkey",""),n=String.fromCharCode(parseInt(s));32==parseInt(s)?t.unshift("SPACE"):t.unshift(n)}return t=t.sort()}function y(e){$.ajax({type:"POST",url:"/replace/category",data:e,contentType:"application/x-www-form-urlencoded",success:function(t){"200"===t.code?x(e):s(t)}})}function x(e){$("a#"+e.id).text(e.name)}function k(e){console.log(e);var t=e.id,i=$("#"+t);i.text(e.name),i.attr("href",e.url),i.removeClass(),i.addClass("website"),$("#editWebsiteModal").modal("hide")}function C(){window.location.reload()}loadImage(),$("#change_bg").click(function(){extracted()}),$("div.blocks").css("opacity","0"),$(window).resize(function(){$("div.content").css({position:"initial",top:15,margin:"0 auto",float:"none",display:"inherit"})}),$(window).resize(),$("a.website").attr("target","_blank"),$("a.website").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}),$("a.website").click(function(){$(this).removeClass("hover")});var _,O;$("a.block-name").click(function(){_=$(this).parents("div.building"),O=$(this).text().trim(),$("#categoryConfirmModal").modal("show")}),$("#categoryConfirmModal").on("show.bs.modal",function(e){$(this).find("#varText").text("打开 "+O+" 下所有站点？")}),$("#categoryConfirmButton").click(function(){_.find("a.website").each(function(){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!0,!1,!1,!0,0,null),$(this).get(0).dispatchEvent(e)}),$("#categoryConfirmModal").modal("hide")}),$("a.chrome_extension").click(function(){$(this).parents("div.modal").modal("hide"),$("#extensionDownloadingModal").modal("show"),chrome.webstore.install("https://chrome.google.com/webstore/detail/aaaekojmfgkdoliidgddnefhnoibjbpi",C)});var z={},M=["SPACE","1","2","3","4","5","6","7","8","9","0","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"],j=new Object,S=new Array,A=new Array,I=new Array,T=!0;!function(e){for(var t in e){if(parseInt(t)>0&&parseInt(t)<10){var i=JSON.parse(e.getItem(t));$("a#"+t).text(i.category_name)}if(parseInt(t)>10&&parseInt(t)<100){var s=JSON.parse(e.getItem(t));$("a#"+t).children("span").text(s.website_name),$("a#"+t).attr("href",s.website_link),$("a#"+t).removeClass(),$("a#"+t).addClass("website")}}$("div.blocks").css("opacity","1")}(window.localStorage),function(){$("a.website").after("<span class='edit-website'>编辑</span>")}(),function(){$("a.block-name").after("<input class='edit-category' />")}(),function(){$("input#website-hotkey").tagsinput()}(),function(){jQuery.isEmptyObject(j)&&w()}(),function(){var e=$.cookie("login");""===e||null==e||"null"===e?($("#login").attr("src","../img/btnuser_login.png"),$(".customize").css("display","none")):($("#login").attr("src","../img/btnlogout.png"),$("#loginModal").attr("id","loginModal233"))}(),$(function(){var e={},t=!1;$("input#website-name").autocomplete({source:function(i,s){$.getJSON("/static/websitetips.json",function(n){var o=$.ui.autocomplete.escapeRegex(i.term),a=new RegExp(o,"i");0==t?(e=n,t=!0,s($.grep(n,function(e){return a.test(e.name)||a.test(e.url)}))):s($.grep(e,function(e){return a.test(e.name)||a.test(e.url)}))})},appendTo:"#autocomplete-div",autoFocus:!0,select:function(e,t){return $("input#website-name").val(t.item.name),$("input#website-url").val(t.item.url),!1},open:function(){$("ul.ui-menu").width($(this).innerWidth()),$("#editWebsiteModal div.modal-header h3").next().html("小提示：鼠标点击输入框外任意位置即可关闭自动联想浮层")},close:function(){$("#editWebsiteModal div.modal-header h3").next().html("")}}).autocomplete("instance")._renderItem=function(e,t){return $("<li>").append("<a>"+t.name+"<br>"+t.url+"</a>").appendTo(e)}}),$(function(){$('[data-toggle="tooltip"]').tooltip()}),$("a.block-name").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}),$("a.customize").on("click",function(){o()?n():$("#notSupportLocalStorage").modal("show")}),$("a#finish-customize").on("click",function(){$("a.customize").css("display","inherit"),$("ul.navbar-right a").css("display","inherit"),$("a.website").css("z-index","10"),$("a.website").css("cursor","pointer"),$("a.website").off("click"),$("a.website").on("click",function(){$(this).removeClass("hover")}),$("span.edit-website").css("display","none"),$("span.edit-website").css("z-index","1"),$(this).css("display","none"),$("div#customize-mode-tips").css("display","none"),$("a.website").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}),d()}),$("span.edit-website").hover(function(){$(this).addClass("hover"),$(this).prev().addClass("edit-hover")},function(){$(this).removeClass("hover"),$(this).prev().removeClass("edit-hover")}),$("span.edit-website").on("click",function(){e(),i(),$(this).prev().removeClass("edit-hover"),z.website_id=$(this).prev().attr("id"),z.website_name=$(this).prev().text(),z.website_link=$(this).prev().attr("href"),z.website_sibling_name=$(this).parents("div.building").find("a.website").text(),z.website_sibling_id=$(this).parents("div.building").find("a.website").attr("id"),$("input#website-id").val(z.website_id),$("input#website-name").val(z.website_name),$("input#website-url").val(z.website_link),u("常用"),h(),v(),$("#editWebsiteModal").modal("show")}),$("#editWebsiteModal").on("shown.bs.modal",function(){$("input#website-name").focus()}),$("#editWebsiteModal").on("hidden.bs.modal",function(){$("div.website-grid").css("display","none"),$("div#input-keyboard").css("display","none")}),$("button#update-website").on("click",function(){var e={id:$("input#website-id").val(),name:$("input#website-name").val(),url:$("input#website-url").val()};$.ajax({type:"POST",url:"/replace",data:e,contentType:"application/x-www-form-urlencoded",success:function(t){"200"===t.code?k(e):s(t)}})}),$("button#cancel-update").on("click",function(){$("#editWebsiteModal").modal("hide")}),$("input#website-name").on("focus",function(){$(this).select(),$("div.website-grid").css("display","inherit"),$("div#input-keyboard").css("display","none")}),$("input#website-url").on("focus",function(){$(this).select()}),$("div#input-keyboard li.key").hover(function(){$(this).addClass("hover"),$(this).css("cursor","pointer");var e=$(this).children("span.website-name").get(0);e.offsetWidth<e.scrollWidth&&$(this).attr("title",$(this).children("span.website-name").text())},function(){$(this).removeClass("hover"),$(this).css("cursor","default")}),$("div#input-keyboard li.key").on("click",function(){var e=$(this).children("span.letter").text(),t=$("input#website-name").val();$(this).children("span.website-name").text(t),$("input#website-hotkey").tagsinput("add",e)}),$("div.bootstrap-tagsinput input").on("focus",function(){m("input-keyboard"),t(),$("div#input-keyboard").css("display","inherit"),$("div.website-grid").css("display","none"),$(this).parents("div.bootstrap-tagsinput").css("border-color","#66afe9"),$(this).parents("div.bootstrap-tagsinput").css("box-shadow","0 0 8px #66afe9"),$(this).parents("div.bootstrap-tagsinput").css("-webkit-box-shadow","0 0 8px #66afe9"),$(this).parents("div.bootstrap-tagsinput").css("-moz-box-shadow","0 0 8px #66afe9")}),$("#login").on("click",function(){var e=$.cookie("login");""!==e&&null!=e&&"null"!==e&&($.cookie("login","",-1),window.location.reload())}),$("#login_btn").on("click",function(){var e={username:$("input#username").val(),password:$("input#password").val()};$.ajax({type:"POST",url:"login",data:e,contentType:"application/x-www-form-urlencoded",success:function(e){"200"===e.code?(a("登录成功",2e3),window.location.reload()):s(e)}})}),$("div.bootstrap-tagsinput input").on("blur",function(){$(this).parents("div.bootstrap-tagsinput").css("border-color","#dcdddd"),$(this).parents("div.bootstrap-tagsinput").css("box-shadow",""),$(this).parents("div.bootstrap-tagsinput").css("-webkit-box-shadow",""),$(this).parents("div.bootstrap-tagsinput").css("-moz-box-shadow","")}),$("div#hotkey-modal-keyboard li.hotkey-modal-key").hover(function(){$(this).addClass("hover"),$(this).css("cursor","pointer");var e="";e=""==$(this).children("span.website-name").text()?"该快捷键尚未设置，您可进入自定义模式设置":"按下该按键将打开 "+$(this).children("span.website-name").text(),$("#hotkeyModal div.modal-header h3").next().html(e);var t=$(this).children("span.website-name").get(0);t.offsetWidth<t.scrollWidth&&$(this).attr("title",$(this).children("span.website-name").text())},function(){$(this).removeClass("hover"),$(this).css("cursor","default")}),$("#moreSitesModal").on("show.bs.modal",function(){$("div.website-grid").css("display","inherit"),i(),u("常用"),p(),b()}),$("#aboutModal div.about-modal-header ul.list-inline li").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}),$("div#aboutModal div.modal-header ul.list-inline li").on("click",function(){var e=$(this).attr("class").replace("selected","").replace("hover","").trim();$(this).siblings().removeClass("selected"),$(this).addClass("selected"),$("div#aboutModal div.modal-body div."+e).css("display","inherit"),$("div#aboutModal div.modal-body div."+e).siblings().css("display","none")}),$("div#customizeConfirmModal a.open_new_tab").on("click",function(){window.postMessage({type:"FROM_PAGE",text:"newtab"},"*")}),$("div#customizeConfirmModal a.skip").on("click",function(){$("#customizeConfirmModal").modal("hide"),n()});var W="index_tips_"+function(){return(isIE=-1!=navigator.userAgent.toLowerCase().indexOf("msie"))?"ie":(isOpera=-1!=navigator.userAgent.toLowerCase().indexOf("metasr"))?"sougou":(isOpera=-1!=navigator.userAgent.toLowerCase().indexOf("lbbrowser"))?"liebao":(isOpera=-1!=navigator.userAgent.toLowerCase().indexOf("qihu 360ee"))?"360ee":(isFirefox=-1!=navigator.userAgent.toLowerCase().indexOf("firefox"))?"firefox":(isChrome=-1!=navigator.userAgent.toLowerCase().indexOf("chrome"))?"chrome":(isSafari=-1!=navigator.userAgent.toLowerCase().indexOf("safari"))?"safari":(isOpera=-1!=navigator.userAgent.toLowerCase().indexOf("opera"))?"opera":void 0}();$("div#"+W).css("display","inherit")});