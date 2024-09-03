/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2019-09-23 19:45:05
 * @LastEditors: iowen
 * @LastEditTime: 2023-11-19 21:37:59
 * @FilePath: /onenav/js/mce-buttons.js
 * @Description: https://www.tiny.cloud/docs-4x/integrations/angular2/#eventbinding
 * https://www.tiny.cloud/docs-4x/api/tinymce.ui/tinymce.ui.listbox/#settings
 */
(function($) {
	tinymce.create('tinymce.plugins.MyButtons', {
		init : function(ed, url) {
			ed.addButton( 'io_h2', {
				title : 'H2',
				icon: 'io-h2',
				onclick : function() {
					ed.formatter.toggle('h2')
					ed.nodeChanged() 
				},
				onPostRender: function () {
					$('.mce-i-io-h2').replaceWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width: 21px;height: 21px;fill: currentColor;"><path d="M143.616 219.648v228.864h278.016V219.648h89.856V768H421.632v-242.688H143.616V768H53.76V219.648h89.856z m660.48-10.752c52.992 0 96.768 15.36 131.328 46.08 33.792 30.72 50.688 69.888 50.688 119.04 0 47.616-18.432 90.624-53.76 129.792-16.554667 17.706667-43.093333 39.082667-78.933333 64.426667l-22.613334 15.701333-12.117333 8.192c-52.309333 34.389333-85.248 64.810667-99.413333 91.178667l-2.730667 5.589333h270.336V768h-382.464c0-56.064 17.664-104.448 54.528-145.92 8.746667-10.069333 21.76-22.186667 38.912-36.352l15.786667-12.586667c5.589333-4.352 11.52-8.874667 17.834666-13.568l19.84-14.506666 21.888-15.488 11.690667-8.106667c35.328-24.576 59.904-45.312 75.264-61.44 23.808-26.88 36.096-56.064 36.096-86.784 0-29.952-8.448-52.224-23.808-66.816-16.128-14.592-39.936-21.504-71.424-21.504-33.792 0-59.136 11.52-76.032 34.56-15.36 19.541333-24.362667 48.64-27.050667 86.058667l-0.597333 11.477333h-89.856c0.768-61.44 18.432-110.592 53.76-148.224 36.096-39.936 83.712-59.904 142.848-59.904z"></path></svg>');
				}
			});

			ed.addButton( 'io_h3', {
				title : 'H3',
				icon: 'io-h3',
				onclick : function() {
					ed.formatter.toggle('h3')
					ed.nodeChanged() 
				},
				onPostRender: function () {
					$('.mce-i-io-h3').replaceWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width: 21px;height: 21px;fill: currentColor;"><path d="M801.024 208.896c55.296 0 100.608 13.056 134.4 39.936 33.024 26.88 49.92 63.744 49.92 111.36 0 59.904-30.72 99.84-91.392 119.808 32.256 9.984 57.6 24.576 74.496 44.544 18.432 20.736 27.648 47.616 27.648 79.872 0 50.688-17.664 92.16-52.992 124.416-36.864 33.024-85.248 49.92-145.152 49.92-56.832 0-102.912-14.592-137.472-43.776-38.4-32.256-59.904-79.872-64.512-141.312h91.392c1.536 35.328 12.288 62.976 33.792 82.176 19.2 17.664 44.544 26.88 76.032 26.88 34.56 0 62.208-9.984 82.176-29.184 17.664-17.664 26.88-39.168 26.88-65.28 0-31.488-9.984-54.528-28.416-69.12-18.432-15.36-45.312-22.272-80.64-22.272h-38.4V449.28h38.4c32.256 0 56.832-6.912 73.728-20.736 16.128-13.824 24.576-34.56 24.576-61.44 0-26.88-7.68-46.848-22.272-60.672-16.128-13.824-39.936-20.736-71.424-20.736-32.256 0-56.832 7.68-74.496 23.808-18.432 16.128-29.184 40.704-32.256 73.728h-88.32c4.608-55.296 24.576-98.304 61.44-129.024 34.56-30.72 79.104-45.312 132.864-45.312z m-657.408 10.752v228.864h278.016V219.648h89.856V768H421.632v-242.688H143.616V768H53.76V219.648h89.856z"></path></svg>');
				}
			});

			ed.addButton( 'io_ad', {
				title : '插入广告',
				icon: 'io-ad',
				onclick : function() {
					ed.selection.setContent('[ad]' + ed.selection.getContent() + '');
				},
				onPostRender: function () {
					$('.mce-i-io-ad').replaceWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" style="width: 20px;height: 20px;fill: currentColor;"><path d="M484.62 111.52v776.96H342.74V500H198.4v388.48H79V380.3c0-24.92 4.6-52.95 13.81-84.11 9.2-31.15 24.2-60.36 45-87.66 20.78-27.28 47.96-50.29 81.53-68.97 33.55-18.69 74.69-28.04 123.4-28.04h141.88zM198.4 449.21h144.34V150.72c-21.99 0-41.88 5.93-59.7 17.77s-32.96 28.14-45.44 48.86-22.14 45.01-28.95 72.84c-6.83 27.84-10.25 57.46-10.25 88.84v70.18zM674.19 111.52c40.39 0 76.03 3.42 106.92 10.25 30.88 6.83 56.72 16.03 77.52 27.62 20.78 11.58 36.38 25.25 46.78 40.99 10.38 15.75 15.59 32.23 15.59 49.45v524.8c0 14.26-3.72 28.67-11.14 43.21-7.43 14.56-20.5 27.93-39.2 40.1-18.71 12.18-43.96 21.99-75.73 29.41-31.78 7.43-72.03 11.14-120.73 11.14H539.41V111.52h134.78zm123.85 129.19c0-18.41-3.55-33.7-10.62-45.88-7.08-12.17-16.36-21.83-27.86-28.95-11.5-7.12-24.78-12.17-39.82-15.15a235.338 235.338 0 0 0-45.56-4.45v706.57c21.24 0 39.66-2.82 55.29-8.47 15.62-5.63 28.6-13.05 38.92-22.27 10.31-9.2 17.83-19.29 22.55-30.29 4.72-10.99 7.08-21.83 7.08-32.52l.02-518.59z"/></svg>');
				}
			});
			
			ed.addButton( 'post_wzddm', {
				title : '插入星期微语录,右侧文章插入[saioc]短代码开关为开是使用',
				icon: 'io-ad',
				onclick : function() {
					ed.selection.setContent('[saioc]' + ed.selection.getContent() + '');
				},
				onPostRender: function () {
					$('.mce-i-io-ad').replaceWith('<svg t="1725367009276" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31078" width="200" height="200"><path d="M909.024 142a94.832 94.832 0 0 0-43.584-61.792 105.408 105.408 0 0 0-76.8-14.048 100.176 100.176 0 0 0-65.008 41.424l-101.216 144.64-343.552 492.208a31.456 31.456 0 0 0-5.168 11.2v1.408l-33.984 166.4a26.08 26.08 0 0 0 4.304 23.232 31.472 31.472 0 0 0 19.952 12.64 21.472 21.472 0 0 0 6.656 0.704 29.824 29.824 0 0 0 16.992-4.912l152.192-94.096a29.136 29.136 0 0 0 9.6-9.136l340.592-487.296 104.912-149.552a93.68 93.68 0 0 0 14.112-73.024zM737.616 332.272L400.72 814.656l-86.4 53.36 19.2-94.784 340.592-488 101.216-144.64a40 40 0 0 1 25.12-16.144 41.712 41.712 0 0 1 30.288 5.616 37.888 37.888 0 0 1 16.992 23.872 36.464 36.464 0 0 1-5.92 28.8z" fill="#5F5F5F" p-id="31079"></path><path d="M488.736 250.976h-387.2a36.944 36.944 0 0 1 0-73.888h387.2a36.944 36.944 0 1 1 0 73.888z" fill="#5F5F5F" p-id="31080"></path><path d="M372.8 545.808H100.944a36.944 36.944 0 0 1 0-73.888H372.8a36.944 36.944 0 1 1 0 73.888z" fill="#5F5F5F" p-id="31081"></path><path d="M229.536 854.352H101.712a36.944 36.944 0 0 1 0-73.888h127.824a36.944 36.944 0 0 1 0 73.888z" fill="#5F5F5F" p-id="31082"></path><path d="M923.056 854.352H703.632a36.944 36.944 0 1 1 0-73.888h219.424A36.576 36.576 0 0 1 960 817.408a37.04 37.04 0 0 1-36.944 36.944z" fill="#5F5F5F" p-id="31083"></path><path d="M922.976 529.28h-116.8a36.944 36.944 0 1 1 0-73.888h116.8a36.576 36.576 0 0 1 36.944 36.944 37.056 37.056 0 0 1-36.944 36.944z" fill="#5F5F5F" p-id="31084"></path></svg>');
				}
			});

			ed.addButton('io_img', {
				title : '插入图片',
				icon: 'image',
				onclick : function() {
				
					$('#io-img-modal').modal('show');
					//$('#io_img_input').click();
				},
				onPostRender: function () {
					var accept_exts = 'image/gif,image/jpeg,image/jpg,image/png';
					var upload_input_id = 'io-img-input';
					var modal_id = 'io-img-modal';
					var url_id = 'io-img-url';
					var url_btn_id = 'io-img-url-btn';
					var is_upload = mce.post_img_allow_upload; 
					var size_max = mce.post_img_max || 1024;
			
					var input_html = '<div class="box-body"><div class="mb-2 text-sm text-muted">请填写图片地址：</div><textarea id="'+url_id+'" rows="2" tabindex="1" class="form-control input-textarea" style="height:60px;" placeholder="http://..."></textarea></div><a id="' + url_btn_id + '" class="btn btn-danger btn-block mt-3" href="javascript:;">确认插入</a>';
					if (is_upload) {
						input_html += '<div class="dl-text">OR</div>';
						input_html += '<div class="box-body"><div class="mb-2 text-sm text-muted">上传图片支持jpg、png、gif格式，最大' +size_max + 'kb</div><label class="upload-box w-100 rounded-lg bg-light"><input id="' + upload_input_id + '" style="display: none;" class="" type="file" accept="' + accept_exts + '"><div style="padding: 40px 10px;background: inherit;border-radius: inherit;" class="text-center"><i aria-hidden="true" class="iconfont icon-upload mr-2"></i>上传图片</div></label></div>';
					}
			
					var modal_html = $('<div class="modal fade" id="' + modal_id + '" tabindex="-1" role="dialog" aria-hidden="true">\
										<div class="modal-mini modal-dialog modal-dialog-centered" role="document">\
										<div class="modal-content dlb">\
										<div class="modal-header"><p class="text-lg text-center">插入图片</p><button type="button" id="close-sites-modal" class="close io-close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="iconfont icon-close-circle text-xl"></i></button></div>\
										<div class="dl"></div>\
										<div class="modal-body">' + input_html + '</div>\
										</div></div></div></div>');
			
					$("body").append(modal_html);

					//输入图片地址
					modal_html.on('click', '#' + url_btn_id, function (e) {
						var src = $('#' + url_id).val();
						if (!src) {
							return showAlert({"status":3,"msg":"请输入图片地址" });
						}
						ed.insertContent('<img src="' + src + '"><p></p>');
						modalClose();
					})

					modal_html.on('change', "#"+upload_input_id, function (e) {
						var files = this.files || e.dataTransfer.files;
						var ing_key = 'uploading';
						
						if (!files[0] || $(this).data(ing_key)){
							return false;
						} 
						var file = files[0];
						//文件大小判断
						var size_max = mce.post_img_max || 1024;
						if (file.size > size_max * 1024 ) {
							return showAlert({"status":3,"msg":mce.local.post_img_max_msg });
						}

						modalClose();
						//执行上传
						upload(file, $(this), function (n) {
							if (n.src) {
								ed.insertContent('<img src="' + n.src + '" alt="' + file.name + '"><p></p>')
							}
						});
					});
					

					//关闭弹窗
					function modalClose() {
						$('#' + modal_id).modal('hide');
						$('#' + url_id).val('');
					}
				}
			});

			ed.addButton( 'io_hide', {
				title : '隐藏内容',
				icon: 'io-hide',
				onclick : function() {
					$('#io-hide-modal').removeClass('hidden');
					$('#io-hide-content').val( HtmlToText( ed.selection.getContent() ) );
				},
				onPostRender: function () {
					$('.mce-i-io-hide').replaceWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" style="width: 20px;height: 20px;fill: currentColor;"><path d="M512 861.867c-217.6 0-405.333-136.534-469.333-337.067-4.267-8.533-4.267-17.067 0-25.6 25.6-72.533 68.266-140.8 119.466-192 17.067-17.067 42.667-17.067 59.734 0 17.066 17.067 17.066 42.667 0 59.733C179.2 409.6 149.333 456.533 128 512c55.467 157.867 204.8 264.533 379.733 264.533 42.667 0 81.067-4.266 119.467-17.066 21.333-8.534 46.933 4.266 51.2 29.866 8.533 21.334-4.267 46.934-29.867 51.2C610.133 857.6 563.2 861.867 512 861.867zM832 729.6c-12.8 0-21.333-4.267-29.867-12.8-17.066-17.067-17.066-42.667 0-59.733C844.8 614.4 874.667 567.467 896 512c-55.467-157.867-204.8-264.533-379.733-264.533-42.667 0-81.067 4.266-119.467 17.066-25.6 8.534-51.2-4.266-55.467-29.866-8.533-21.334 4.267-46.934 25.6-51.2 46.934-12.8 93.867-21.334 145.067-21.334 217.6 0 405.333 136.534 469.333 337.067 4.267 8.533 4.267 17.067 0 25.6-21.333 72.533-64 140.8-119.466 192-8.534 8.533-21.334 12.8-29.867 12.8z" fill="#2c2c2c"/><path d="M840.533 789.333L665.6 610.133c21.333-29.866 34.133-68.266 34.133-106.666 0-98.134-76.8-174.934-174.933-174.934-38.4 0-72.533 12.8-102.4 29.867L247.467 174.933c-17.067-17.066-42.667-17.066-59.734 0-17.066 17.067-17.066 42.667 0 59.734l593.067 614.4c8.533 8.533 21.333 12.8 29.867 12.8 12.8 0 21.333-4.267 29.866-12.8 17.067-17.067 17.067-42.667 0-59.734zM524.8 409.6c51.2 0 89.6 38.4 89.6 89.6 0 17.067-4.267 29.867-8.533 42.667L486.4 418.133c8.533-4.266 21.333-8.533 38.4-8.533z"></path></svg>');

					var modal_id = 'io-hide-modal';
					var hide_type_id = 'io-hide-type';
					var hide_password_id = 'io-hide-password';
					var hide_tips_id = 'io-hide-tips';
					var hide_image_id = 'io-hide-image';
					var hide_image_btn_id = 'io-hide-add-img';
					var hide_content_id = 'io-hide-content';
					var submit_btn_id = 'io-hide-submit';

					var input_html = '<div class="box-body">\
					<select name="type" id="'+ hide_type_id + '" class="form-control my-2">\
						<option class="level-0" value="reply">评论可见</option>\
						<option class="level-0" value="logged">登录可见</option>\
						<option class="level-0" value="password">密码验证</option>\
						<option class="level-0" value="buy">付费阅读</option>\
					</select>\
						<div class="password-input hidden">\
						<h4>密码验证选项：</h4>\
						<div class="my-2"><input type="text" class="form-control" id="'+ hide_password_id + '" placeholder="请输密码"><span class="password-error" style="color:#f21"></span></div>\
						<input type="text" class="form-control my-2" id="'+ hide_tips_id + '" placeholder="请输提示">\
						<div class="input-group my-2">\
							<input type="text" class="form-control" id="'+ hide_image_id + '" placeholder="图片地址">\
                            <div class="input-group-append tg-sites-url" style="">\
                                <a href="javascript:" id="'+ hide_image_btn_id + '" class="btn btn-danger custom_btn-d button button-primary">添加图片</a>\
                            </div>\
                        </div>\
						<span>通过提示文案和图片，可实现引导用户关注微信公众号获取密码引流等功能。</spam>\
						</div>\
						<textarea id="'+ hide_content_id + '" rows="5" class="form-control input-textarea my-2" style="height: 186px;" placeholder="隐藏内容，可留空，添加后到正文中再写入。"></textarea>\
					</div>';
					
					var modal_html = $('<div class="io-modal ' + modal_id + ' wp-core-ui csf-modal csf-shortcode hidden" id="' + modal_id + '" role="dialog">\
										<div class="csf-modal-table" role="document">\
										<div class="csf-modal-table-cell">\
											<div class="csf-modal-overlay"></div>\
											<div class="csf-modal-inner">\
												<div class="csf-modal-title">添加隐藏内容<div class="csf-modal-close io-close-modal"></div></div>\
												<div class="csf-modal-content">' + input_html + '</div>\
												<div class="csf-modal-insert-wrapper"><a href="javascript:;" id="' + submit_btn_id + '" class="button button-primary">确认添加</a></div>\
											</div>\
										</div></div></div>');
			
					$("body").append(modal_html);

					modal_html.on('click', '#' + hide_image_btn_id, function (e) {
						if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {
							e.preventDefault();
							var button = $(this);
							var input = $('#' + hide_image_id);
							wp.media.editor.send.attachment = function (props, attachment) {
								input.val(attachment.url);
							};
							wp.media.editor.open(button);
							return false;
						}
					});
					modal_html.on('change', '#'+ hide_type_id, function (e) {
						if ($(this).find("option:selected").val() == 'password') {
							$('.password-input').removeClass('hidden');
						} else {
							$('.password-input').addClass('hidden');
						}
					});
					console
					modal_html.on('click', '.io-close-modal', function (e) {
						modalClose();
					});
					modal_html.on('click', '#' + submit_btn_id, function (e) {
						var type = $('#' + hide_type_id).find("option:selected").val();
						var password = $('#' + hide_password_id).val();
						var tips = $('#' + hide_tips_id).val();
						var image = $('#' + hide_image_id).val();
						var content = $('#' + hide_content_id).val();
						if (content == '') {
							content = '请输入需要隐藏的内容';
						} else {
							content = TextToHtml(content);
						}
						if (type == 'password' && password == '') {
							$('.password-error').html('错误！请输入密码。');
						} else {
							var _html = '<p>[hide_content type="' + type + '"]</p><p>' + content + '</p><p>[/hide_content]</p>';
							if (type == 'password') {
								_html = '<p>[hide_content type="password" password="123" tips="' + tips + '" image="' + image + '"]</p><p>' + content + '</p><p>[/hide_content]</p>';
							}
							ed.insertContent('<div class="io-edit-hide-content">' + _html + '</div><p>&nbsp;</p>');
							modalClose();
						}
					});

					function modalClose() {
						$('#' + modal_id).find('.form-control').val('');
						$('#' + hide_type_id).val('reply');
						$('#' + modal_id).addClass('hidden');
					}
					function getFormatCode(strValue) {
						return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
					}
				}
			});
			ed.addCommand('post_card_window', function() {
				var e = ed.dom.getViewPort(),
					w = Math.min((Math.min(e.w - 20, window.innerWidth - 20) || 460), 460);
				ed.windowManager.open({
					title: '插入内容卡片', 
					minWidth: w,
					body: [
						{
							type: "listbox",
							name: "type",
							label: "类型",
							values: [
								{ text: '文章', value: 'post' },
								{ text: '网址', value: 'site' },
								{ text: 'app', value: 'app' },
								{ text: '书籍', value: 'book' }
							], 
							value: 'post',
						}, {
							type: "textbox",
							name: "ids",
							label: "内容ID", 
							multiline: !1,
							placeholder: "如：12,2,234", 
							tooltip: '可填一个或者多个ID，用英语逗号分割！',
						}, 
					],
					onSubmit: function (api) {
						if (api.data.ids !== "") {
							var data = api.data;
							var content = '<div class="io-edit-post-card-content">['+data.type+'_card ids="'+data.ids.replaceAll("，",",")+'"]</div><p>&nbsp;</p>';
							ed.insertContent(content);
						}
					}
				})
			});
			
			ed.addButton('io_post_card', {
				title: '内容卡片',
				cmd: 'post_card_window',
				icon: 'io_card',
				onPostRender: function () {
					$('.mce-i-io_card').replaceWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width: 20px;height: 20px;fill: currentColor;"><path d="M888 232H136v560h752V232zm72 600c0 17.673-14.327 32-32 32H96c-17.673 0-32-14.327-32-32V192c0-17.673 14.327-32 32-32h832c17.673 0 32 14.327 32 32v640zM760 640a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H457a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h303zm7-200a8 8 0 0 1-8 8H456a8 8 0 0 1-8-8v-48a8 8 0 0 1 8-8h303a8 8 0 0 1 8 8v48zM312 704a8 8 0 0 0 8-8V328a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v368a8 8 0 0 0 8 8h48z"/></svg>');
				}
			});
		},
		createControl : function(n, cm) {
			return null;
		},
	});
	tinymce.PluginManager.add( 'io_button_script', tinymce.plugins.MyButtons );
	
	function TextToHtml(str) {
		return str.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
	}
	function HtmlToText( str ) {
		if (str == null) {
			return "";
		}
		str = str.replaceAll("<br />", "\n");
		str = str.replaceAll("<br />", "\r");    
		return str;
	}
	//上传图片
	function upload(file, _input, success_fun) {
		var formData = new FormData();
		var ing_key = 'uploading';
		formData.append('file', file, file.name);
		formData.append('action', 'edit_file_upload');
		formData.append('_wpnonce', mce.upload_nonce);
		showAlert({"status":0,"msg":"正在上传请稍候..."});
		_input.data(ing_key, true);
		$.ajax({
			type: 'POST',
			url: mce.ajax_url,
			data: formData,
			processData: false,
			contentType: false,
			dataType: 'json',
			error: function (n) {
				var _msg = "操作失败 " + n.status + ' ' + n.statusText + '，请刷新页面后重试';
				if (n.responseText && n.responseText.indexOf("致命错误") > -1) {
					_msg = '网站遇到致命错误，请检查插件冲突或通过错误日志排除错误';
				}
				showAlert({"status":3,"msg":_msg});
				_input.data(ing_key, false);
			},
			success: function (n) {
				var ys = (n.ys ? n.ys : (n.error ? 'danger' : ""));
				showAlert(n);
				$.isFunction(success_fun) && success_fun(n, _input);
				_input.data(ing_key, false);
			}
		})
	}
	setTimeout(function () { 
	// 自动夜间模式处理编辑器状态
	var _tinymce_body = $("#post_content_ifr").contents().find('body');
	if($('html').hasClass('io-black-mode') && _tinymce_body[0]){
		_tinymce_body.addClass('io-black-mode');
	}
	else{
		_tinymce_body.removeClass('io-black-mode');
	}
	}, 256);
})(jQuery);


