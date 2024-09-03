/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2023-04-02 19:52:06
 * @LastEditors: iowen
 * @LastEditTime: 2023-04-03 02:48:54
 * @FilePath: \onenav\js\gutenberg-edit.js
 * @Description: 
 */
(function (blocks, blockEditor, element, components, escapeHtml) {
    "use strict"; 
    var el = element.createElement; 

    var registerBlockType = blocks.registerBlockType,
        createBlock = blocks.createBlock,
        PlainText = blockEditor.PlainText,
        InnerBlocks = blockEditor.InnerBlocks,
        Fragment = element.Fragment,
        InspectorControls = blockEditor.InspectorControls,
        PanelBody = components.PanelBody,
        TextControl = components.TextControl,
        RadioControl = components.RadioControl,
        Toolbar = components.ToolbarGroup,
        Button = components.Button,
        SelectControl = components.SelectControl,
        ToggleControl = components.ToggleControl,
        DropdownMenu = components.ToolbarDropdownMenu,
        BlockControls = blockEditor.BlockControls,
        MediaUpload = blockEditor.MediaUpload,
        escapeEditableHTML = escapeHtml.escapeEditableHTML;

    var post_type = {
        "post":"文章",
        "site":"网址",
        "app":"APP",
        "book":"书籍",
    }
    var hide_type = {
        "reply":"评论可见",
        "logged":"登录可见",
        "password":"密码验证",
        "buy":"付费阅读",
    }

    registerBlockType("ioblock/post-card",{
        title: "IO:内容卡片",
        icon: "embed-generic",
        category: "io_block_cat",
        description: "以卡片的形式显示内容",
        keywords: ["card", "文章"],
        attributes: { 
            type: {
                type: "string",
            },
            ids: {
                type: "string",
            },
        },
        transforms: {
            from: [
                {
                    type: "raw",
                    priority: 4,
                    isMatch: function(e) {
                        return "div" === e.nodeName && "io-edit-post-card-content" === e.className
                    },
                    transform: function (e) {
                        e = e.firstChild;
                        var pattern = /\[([a-z]+)_card ids="([0-9]+)"\]/g;
                        let result = e.textContent.match(pattern);
                        return createBlock("ioblock/post-card", {
                            type: result[1],
                            ids: result[2]
                        })
                    }
                },{
                    type: "block",
                    blocks: ["core/shortcode "],
                    transform: function (e) {
                        var t = e.content;
                        var pattern = /\[([a-z]+)_card ids="([0-9]+)"\]/g;
                        let result = t.textContent.match(pattern);
                        return createBlock("ioblock/post-card", {
                            type: result[1],
                            ids: result[2]
                        })
                    }
                }
            ]
        },
        supports: {
            customClassName: !0,
            className: !1
        },
        example: {},
        edit: function(props) {
            var d = props.attributes,
                r = props.setAttributes;
            if (!d.type) {
                d.type = "post";
            }
            var sm = el(Toolbar, null, el(DropdownMenu, {
                className: "post-type-dropdownmenu",
                icon: "media-default",
                label: "文章类型",
                text: post_type[d.type],
                controls: Object.keys(post_type).map(
                        (lang) => ({
                            title: post_type[lang],
                            value: lang,
                            onClick: function () {
                                return r({
                                    type: lang
                                })
                            }
                        })
                    ) 
                }
            ));
            var sz = el(InspectorControls, null,
                el(
                    PanelBody, {
                        title: "卡片设置"
                    },
                    el(SelectControl, {
                        label: "文章类型",
                        value: d.type,
                        options: 
                            Object.keys(post_type).map(
                                (lang) => ({
                                    label: post_type[lang],
                                    value: lang,
                                })
                            ),
                        onChange: function (e) {
                            return r({
                                type: e
                            })
                        }
                    })
                )
            );
            
            var si = el(TextControl, {
                label: "可填一个或者多个ID，用英语逗号分割！",
                value: d.ids,
                onChange: function (e) {
                    return r({
                        ids: e
                    })
                },
                placeholder: "如：12,2,234"
            });
            
            return el(Fragment, null, el(BlockControls, null, sm),
                el("div", {
                        className: "io-post-card"
                    }, el("div", {
                        className: "io-block-title"
                    },"文章卡片" + "【" + post_type[d.type] + "】"),
                    si
                ),
                sz
            )
        },
        save: function (props) {
            var d = props.attributes,
                e = props.className; 
            e = "io-edit-post-card-content" + (e ? " " + e : "");
            var ids = d.ids ? d.ids.replaceAll("，", ",") : "";
            var type = d.type;
            return el("div", {
                className: e
            }, "["+type+"_card ids=\"" + ids + "\"]");
        }
    }); 

    registerBlockType("ioblock/hide-content", {
        title: "IO:隐藏内容",
        icon: "welcome-view-site",
        category: "io_block_cat",
        description: "隐藏文章部分内容",
        keywords: ["hide", "隐藏"],
        attributes: {
            type: {
                source: "attribute",
                selector: "div",
                attribute: "data-type",
            },
            password: {
                source: "attribute",
                selector: "div",
                attribute: "data-password",
                default: ""
            },
            img_id: {
                source: "attribute",
                selector: "div",
                attribute: "data-img-id",
                default: ""
            },
            image: {
                source: "attribute",
                selector: "div",
                attribute: "data-image",
                default: ""
            },
            tips: {
                source: "attribute",
                selector: "div",
                attribute: "data-tips",
                default: ""
            },
        },
        transforms: {
            from: [
                {
                    type: "block",
                    blocks: ["core/preformatted", "core/paragraph"],
                    transform: function (e) {
                        var t = e.content;
                        return createBlock("ioblock/hide-content", {
                            content: t
                        })
                    }
                }
            ]
        },
        example: {},
        edit: function (props) {
            var d = props.attributes,
                r = props.setAttributes;
            if (!d.type) {
                d.type = "reply";
            }
            var sm = el(Toolbar, null, el(DropdownMenu, {
                className: "hide-content-dropdownmenu",
                icon: "hidden",
                label: "隐藏模式",
                text: hide_type[d.type],
                controls: Object.keys(hide_type).map(
                    (lang) => ({
                        title: hide_type[lang],
                        value: lang,
                        onClick: function () {
                            return r({
                                type: lang
                            })
                        }
                    })
                )
            }
            ));
            var sz = el(InspectorControls, null,
                el(
                    PanelBody, {
                    title: "隐藏内容设置"
                },
                    el(SelectControl, {
                        label: "隐藏模式",
                        value: d.type,
                        options:
                            Object.keys(hide_type).map(
                                (lang) => ({
                                    label: hide_type[lang],
                                    value: lang,
                                })
                            ),
                        onChange: function (e) {
                            return r({
                                type: e
                            })
                        }
                    }), [d.type == "password" && el("div", {
                        className: "block-editor-block-card__description"
                    },
                        el(TextControl, {
                            label: "设置密码",
                            value: d.password || "",
                            onChange: function (e) {
                                return r({
                                    password: e
                                })
                            },
                            placeholder: "请输入密码..."
                        }),
                        el(TextControl, {
                            label: "提醒文案",
                            value: d.tips || "",
                            onChange: function (e) {
                                return r({
                                    tips: e
                                })
                            },
                            placeholder: "请输入提醒内容...",
                        }),
                        [d.img_id && el("div", {
                            className: "io-preview mb-2",
                        }, el("img", {
                            src: d.image,
                        },))],
                        el(MediaUpload, {
                            title: "提醒图片",
                            allowedTypes: ["image"],
                            onSelect: function onSelect(media) {
                                r({
                                    image: media.url,
                                    img_id: media.id
                                });
                            },
                            value: d.img_id,
                            render: function render(_ref) {
                                var open = _ref.open;
                                return el(Button, {
                                    className: "components-button is-primary mb-2",
                                    onClick: open
                                }, [d.img_id ? "替换提醒图片" : "添加图片提醒"]);
                            }
                        }),
                        el("div", {
                            className: "mb-2",
                        }, "通过提示文案和图片，可实现引导用户关注微信公众号获取密码引流等功能。")
                    )],
                )
            );
            
            var si = el("div", {
                className: "io-hide-innerblocks"
            }, el(InnerBlocks));
            
            return el(Fragment, null, el(BlockControls, null, sm),
                el("div", {
                    className: "io-hide-content"
                }, el("div", {
                    className: "io-block-title"
                }, "隐藏内容" + "【" + hide_type[d.type] + "】"),
                    si
                ),
                sz
            )
        },
        save: function (props) {
            var d = props.attributes,
                e = props.className;
            e = "io-edit-hide-content" + (e ? " " + e : "");
            var type = d.type || "reply";
            var tag = {
                className: e,
                "data-type": type
            };
            var tag_2 = "";
            if (type == "password") {
                tag = Object.assign(tag, {
                    "data-password": d.password,
                    "data-img-id": d.img_id,
                    "data-image": d.image,
                    "data-tips": d.tips,
                });
                tag_2 = " password=\"" + d.password + "\" image=\"" + d.image + "\" tips=\"" + d.tips + "\"";
            }
            return el("div", tag, el("span", {}, "[hide_content type=\"" + type + "\"" + tag_2 + "]"),
                el(InnerBlocks.Content),
                el("span", {}, "[/hide_content]"));
        }
    }); 
}(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.element,
    window.wp.components,
    window.wp.escapeHtml
));
    
