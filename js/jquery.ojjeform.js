(function($) {
  "use strict";
  
  $.ojjeform = function($forms, options) {  
    
    $forms = $forms.filter(':not(".ojjeform")');
          
    /* Set our default settings */
    var defaults = {
    	types: {
        checkbox: false,
        radio: false,
        select: false
    	}
    };

    /* Merge the defaults with the user provided options recursive */
    var settings = $.extend(true, {}, defaults, options);    

    $forms.each(function(e, v) {
      var $form = $(v);
      var $formItems = $form.find('input[type=checkbox], input[type=radio], select');
      $form.addClass('ojjeform');

      if (settings.types.checkbox == false) {
        $formItems = $formItems.not('[type=checkbox]');
      }
      if (settings.types.radio == false) {
        $formItems = $formItems.not('[type=radio]');
      }
      if (settings.types.select == false) {
        $formItems = $formItems.not('select');
      }
  
      $formItems.each(function(i, o) {
        var $item = $(o);
        var tagType = o.tagName.toLowerCase();
        
        if (tagType == 'select') {
          $item.addClass('form-select');
          $item.wrap('<div class="form-type-select"></div>');
          var $parent = $item.parent();
          var name = $item.prop('name');
          var $label = $form.find('label[for="' + name + '"]');
          $label.prependTo($parent);
          var itemType = 'ojjeform-select';
          var selectLink = '<div class="ojjeform-select-chosen"><a href="#" class="ojjeform-select-chosen-link"></a></div>';
          $parent.append(selectLink);
          var listClass = itemType + '-list';
          var $selectList = $('<ul class="' + listClass + '"/>');
          $parent.append($selectList);
    
          var optionsArray = [];                
          var $listOptions = $item.find('option');
    
          $listOptions.each(function(k, opt) {
            var $optObj = $(opt);
            optionsArray.push('<li><a class="' + itemType + '" href="#" data-value="' + $optObj.val() + '">' + $optObj.text() + '</a></li>');
          });   
    
          var optionString = optionsArray.join('');
          $selectList.append(optionString);
    
          var selectedValue = $item.find('option:selected').text();
          var $selectedWrapper = $parent.find('.ojjeform-select-chosen');
          var $selectedLi = $selectedWrapper.find('.ojjeform-select-chosen-link');
          if (selectedValue.length > 0) {
            $selectedLi.text(selectedValue);
          }        
    
          $selectList.slideUp(0, function() {
            $selectList.removeClass('open');
          });
        } else if (tagType == 'input') {
          var itemType = $(o).prop('type');
          $item.addClass('form-' + itemType); 
          $item.wrap('<div class="form-type-' + itemType + '"></div>');
          var $parent = $item.parent();    
          
          var id = $item.prop('id');
          if (typeof id !== typeof undefined && id !== false && id.length > 0) {
             var $label = $form.find('label[for="' + id + '"]');
          } else {
            var name = $item.prop('name');
            var $label = $form.find('label[for="' + name + '"]');
          }
          
          if ((itemType == 'radio' || itemType == 'checkbox') && $item.is(':checked')) {
            $parent.addClass('active');
          }
          
          $label.prependTo($parent);          
          var link = '<a href="#" class="ojjeform-' + itemType + '"><span class="icon-marker"></span><span class="icon"></span><span class="text">' + $label.html() + '</span></a>';
          $parent.append(link);
        }
      });
    });
    
    $forms.on('click', 'a.ojjeform-checkbox', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $parent = $link.parent();
      var $checkbox = $parent.find('input.form-checkbox');
      if ($checkbox.is(':disabled') == false) {
        if ($parent.hasClass('active') == false) {
          $parent.addClass('active');
          $checkbox.prop("checked", true).trigger('change');
        } else {
          $parent.removeClass('active');
          $checkbox.prop("checked", false).trigger('change');
        }
      }
    });
    
    $forms.on('click', 'a.ojjeform-radio', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $parent = $link.parent();
      var $radio = $parent.find('input.form-radio');
      if ($radio.is(':disabled') == false) {    
        if ($parent.hasClass('active') == false) {
          var $radios = $link.parents('.form-radios');
          $radios.find('.form-type-radio').removeClass('active');
          $radios.find("input:radio").prop("checked", false);
          $parent.addClass('active');   
          $parent.find('input.form-radio').prop("checked", true).trigger("change");    
        } else {
          $parent.find('input.form-radio').prop("checked", false);
          $parent.removeClass('active');
        }
      }
    });
    
    $forms.on('click', 'a.ojjeform-select', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $parentLi = $link.parent();
      var $parentUl = $parentLi.parent();
      var $wrapper = $parentUl.parent();
      var $select = $wrapper.find('select');
      var $selectedWrapper = $wrapper.find('.ojjeform-select-chosen');
      var $selectedLink = $selectedWrapper.find('.ojjeform-select-chosen-link');
      if ($select.is(':disabled') == false) {
        if ($link.hasClass('open') == false) {
          var $selectList = $link.parents('ul');
          $selectList.find('li').each(function(index, selectObj) {
            $(selectObj).removeClass('active');
          });
          $parentLi.addClass('active');
          var chosenVal = $link.data('value');
          $selectedLink.text($link.text());
          $selectList.slideUp(200, function() {
            $selectList.removeClass('open');
            var $optionToChoose = $select.find('option[value="' + chosenVal + '"]');
            $optionToChoose.prop('selected', true).trigger('change');
          });
        }
      }
    });

    $forms.on('click', 'a.ojjeform-select-chosen-link', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $parent = $link.parent();
      var $wrapper = $parent.parent();
      var $select = $wrapper.find('select');
      var $form = $link.closest('form');
      if ($select.is(':disabled') == false) {
        $.each($form.find('ul.ojjeform-select-list.open'), function(k, v) {
          var $list = $(v);
          var $listParent = $(v).closest('.form-type-select');
          var $listLink = $listParent.find('.ojjeform-select-chosen-link');
          $list.slideUp(200, function() {
            $list.removeClass('open');
            $listLink.removeClass('open');
          });
        });

        var $selectList = $wrapper.find('ul.ojjeform-select-list');
        if ($selectList.hasClass('open')) {
          $selectList.slideUp(200, function(){
            $selectList.removeClass('open');
            $link.removeClass('open');
          });
        } else {
          $selectList.slideDown(200, function(){
            $selectList.addClass('open');
            $link.addClass('open');
          });
        }
      }
    });

    $forms.on('reset', function() {
      var $form = $(this);
      $form.find('.active').removeClass('active');
    });
    
  };
  
})(jQuery);
