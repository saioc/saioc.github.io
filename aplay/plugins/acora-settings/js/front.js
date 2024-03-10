 /**
 * Front js.
 *
 * @package acora-settings
 * @since acora-settings 1.0
 */

jQuery(document).ready(function($){

	'use strict';

	function init(){
        FWDUtils.checkIfHas3D();
        initShare();
        addExtraPasswordText();
    }

	/**
     * Like AJAX.
     * --------------------------------------------------------
     */
    $('.like-button .fwdicon-love').on('mouseover mouseout', function(e){
        if($(this).hasClass('loading')) { return; }
        var lb = e.target;
        FWDAnimation.killTweensOf(lb);
        if(e.type == 'mouseover'){
            FWDAnimation.to(lb, .8, {scale:2, ease:Elastic.easeOut, repeat: 50});
        }else if(e.type == 'mouseout'){
            FWDAnimation.to(lb, .4, {scale:1, ease:Elastic.easeOut});
        }
    });

    $('.like-button .fwdicon-love').on('click', function(e) {
        if($(this).hasClass('loading')) return;
        var lb = e.target;
        FWDAnimation.killTweensOf(lb);
        FWDAnimation.to(lb, .4, {scale:1, ease:Elastic.easeOut});
       
        var self = $(this);
        self.addClass('loading');
       
        $.ajax({
            url:ajaxURL,
            type:'post',
            data:{
                postId: postId,
                security: acora_nonce,
                action:'acora_settings_save_like'
            },
            error: function(response){
                console.log(response);
            },
            success: function(response){
                self.removeClass('loading');
                if(response != 0) $('.like-result').html(response);
                if(response == 0){
                    myShare.showInfo(self[0], 'You already liked this!');
                }
                //console.log(response);
            }
        });
    });

       /*
     *  Send message with contact form.
     *  -----------------------------------------------------
    */
    $('#commentform #submit').on("click", function(e){
        
        var valid = true;
        if($('#author').length && $('#author').val().length <= 1){
            if(e.preventDefault()) e.preventDefault();
            setRedInput($('#author')[0]);
            valid = false;
        }else if($('#email').length && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val())){
            if(e.preventDefault()) e.preventDefault();
            setRedInput($('#email')[0]);
            valid = false;
        }else if($('#comment').val().length <= 1){
            if(e.preventDefault()) e.preventDefault();
            setRedInput($('#comment')[0]);
            valid = false;
        }

        var receiverEmail = $('#commentform').data('receiverEmail');

        if($('.first-button').length){
           receiverEmail = $('.first-button').data('receiverEmail');
        }

    
        if(!valid) return;
        if(window.location.href.indexOf('flash.ro') != -1 && !$(this).parents('.contact-form').length){ 
            if(e.preventDefault()) e.preventDefault();
            myShare.showInfo($('#comment')[0], 'Posting comments disabeld in demo version.', true);
            return;
        }
        
        if($(this).parents('.contact-form').length){
            if(e.preventDefault()) e.preventDefault();
            var self = $(this);
            self.addClass('loading');
            var data = {
                name:             $('#author').val(),
                email:            $('#email').val(),
                comment:          $('#comment').val(),
                phone:            $('#phone').val(),
                receiverEmail:    receiverEmail
            }
            $.ajax({
                url:ajaxURL,
                type:'post',
                data:{
                    postId: postId,
                    security:         acora_nonce,
                    data: data,
                    action:'acora_settings_send_contact_form'
                },
                error: function(response){
                   //console.log(response);
                    myShare.showInfo($('#comment')[0], response, true, 'error', true);
                    resetContactForm();
                },
                success: function(response){
                    //console.log(response);
                    self.removeClass('loading');
                    if(response.indexOf('!') != -1){
                        myShare.showInfo($('#comment')[0], response, true, 'error', true);
                    }else{
                        myShare.showInfo($('#comment')[0], response, true, 'message_sent', true);
                    }
                    
                    resetContactForm();
                }
            });
        }       
    });

    function resetContactForm(){
        $('#author').val('');
        $('#email').val('');
        $('#comment').val('');
        $('#phone').val('');
    }

    function setRedInput(input){
        var firstColor = '#FFF';
        if(window['is_dark']){
            firstColor = '#1A1A1A';
        }
        FWDAnimation.killTweensOf(input);
        FWDAnimation.to(input, .1, {backgroundColor:'#F00',  ease:Sine.easeOut});
        FWDAnimation.to(input, .1, {backgroundColor:firstColor,  delay:.1, ease:Sine.easeOut});
        FWDAnimation.to(input, .1, {backgroundColor:'#F00',  delay:.2, ease:Sine.easeOut});
        FWDAnimation.to(input, .1, {backgroundColor:firstColor,  delay:.3, ease:Sine.easeOut});
    }

    function addExtraPasswordText(){
        if(window['location']['href'].indexOf("flash.ro") != -1){
            var initVal = $('.post-password-form').find('p:first-child').html();
            initVal += ' Test password is <strong>acora</strong>.';
            $('.post-password-form').find('p:first-child').html(initVal);
        }
    }

    /*
     *  Share.
     *  -----------------------------------------------------
     */
    function initShare(){
       // if(!$('.share-buttons-container').length) return;
        window['myShare'] = new FWDShare($('.share-buttons-container')[0],
                     $('.share-buttons-container').data('title'),
                     $('.share-buttons-container').data('permalink'),
                     $('.share-buttons-container').data('images')
                    );
    }

    init();
});