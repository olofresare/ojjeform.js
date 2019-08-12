(function($) {
	"use strict";
	
	$.ojjeform = function($forms, options) {
		
		var $document = $(document);
		
		// First we need to unwrap and remove some created markup for already initiated selects
		$forms.each(function(k, v) {
			var $form = $(v);
			
			if ($form.hasClass('ojjeform')) {
				var $selects = $form.find('select');
				if ($selects.length > 0) {
					$selects.unwrap();
					$form.find('.ojjeform-select-chosen').remove();
					$form.find('.ojjeform-select-list').remove();
				}
				
				var $radios = $form.find('input[type="radio"]');
				if ($radios.length > 0) {
					$.each($radios, function(radio_key, radio_obj) {
						var $radio = $(radio_obj);
						var radio_name = $radio.attr('id');
						var $radio_parent = $radio.closest('.form-radios');
						var $label = $radio_parent.find('label[for="' + radio_name + '"]');
						$radio_parent.append($radio);
						$radio_parent.append($label);
					});
					
					$form.find('.form-type-radio').remove();
					$form.removeClass('ojjeform');
				}
				
				return false;
			}
		});
		
		$forms = $forms.filter(':not(".ojjeform")');
		
		/* Set our default settings */
		var defaults = {
			types: {
				checkbox: false,
				radio: false,
				select: false,
				multiselect: false,
				textfield: false
			}
		};

		/* Merge the defaults with the user provided options recursive */
		var settings = $.extend(true, {}, defaults, options);

		$forms.each(function(e, v) {
			var $form = $(v);
			var $formItems = $form.find('input[type=text], input[type=tel], input[type=checkbox], input[type=radio], select');
			$form.addClass('ojjeform');
			
			if (settings.types.textfield == false) {
				$formItems = $formItems.not('[type=text]');
			}
			if (settings.types.textfield == false) {
				$formItems = $formItems.not('[type=tel]');
			}
			if (settings.types.checkbox == false) {
				$formItems = $formItems.not('[type=checkbox]');
			}
			if (settings.types.radio == false) {
				$formItems = $formItems.not('[type=radio]');
			}
			if (settings.types.select == false) {
				$formItems = $formItems.not('select:not([multiple])');
			}
			if (settings.types.multiselect == false) {
				$formItems = $formItems.not('select[multiple]');
			}
			
			$formItems.each(function(i, o) {
				var $item = $(o);
				var tagType = o.tagName.toLowerCase();
				var multiple = ($item.attr('multiple') === 'multiple') ? true : false;
				
				if (tagType == 'select' && multiple === false) {
					$item.addClass('form-select');
					
					if ($item.closest('.form-select-wrapper').length > 0) {
						return;
					}
					
					$item.wrap('<div class="form-type-select cf"></div>');
					
					var $parent = $item.parent();
					var name = $item.prop('name');
					var $label = $form.find('label[for="' + name + '"]');
					$label.prependTo($parent);
					var itemType = 'ojjeform-select';
					var selectLink = '<div class="ojjeform-select-chosen"><a href="#" class="ojjeform-select-chosen-link"></a></div>';
					$parent.append(selectLink);
					var listClass = itemType + '-list';
					var selectList = '<ul class="' + listClass + '"></ul>';
					var select_id = $item.prop('id');
					$parent.append('<div class="select-content" data-id="' + select_id + '">' + selectList + '</div>');
					
					var $content = $parent.find('.select-content');
					var $selectList = $content.find('ul');
					
					var optionsArray = [];
					var $listOptions = $item.find('option');
					
					$listOptions.each(function(k, opt) {
						var $optObj = $(opt);
						var select_value = $optObj.val();
						var select_text = $optObj.text();
						optionsArray.push('<li><a class="' + itemType + '" href="#" data-value="' + select_value + '">' + select_text + '</a></li>');
					});
					
					var optionString = optionsArray.join('');
					$selectList.append(optionString);
					
					var selectedValue = $item.find('option:selected').text();
					var $selectedWrapper = $parent.find('.ojjeform-select-chosen');
					var $selectedLi = $selectedWrapper.find('.ojjeform-select-chosen-link');
					if (selectedValue.length > 0) {
						$selectedLi.text(selectedValue);
					}
				}
				else if (tagType == 'select' && multiple === true) {
					$item.addClass('form-multiselect');
					if ($item.closest('.form-select-wrapper').length > 0) {
						return;
					}
					
					$item.wrap('<div class="form-type-multiselect cf"></div>');
					
					var $parent = $item.parent();
					var name = $item.prop('name');
					var $label = $form.find('label[for="' + name + '"]');
					$label.prependTo($parent);
					var itemType = 'ojjeform-multiselect';
					var selectLink = '<div class="multiselect-headline">' + $label.text() + '</a></div>';
					$parent.append(selectLink);
					var listClass = itemType + '-list';
					var selectList = '<ul class="' + listClass + '"></ul>';
					var select_id = $item.prop('id');
					$parent.append('<div class="select-content" data-id="' + select_id + '">' + selectList + '</div>');
					
					var $content = $parent.find('.select-content');
					var $selectList = $content.find('ul');
					
					var optionsArray = [];
					var $listOptions = $item.find('option');
					
					$listOptions.each(function(k, opt) {
						var $optObj = $(opt);
						var select_value = $optObj.val();
						var select_text = $optObj.text();
						var is_selected = $optObj.prop('selected');
						
						if (is_selected) {
							optionsArray.push('<li><input checked="checked" class="checkbox" type="checkbox" value="' + select_value + '" name="' + name + '[]"><label for="' + name + '-' + select_value + '">' + select_text + '</label></li>');
						}
						else {
							optionsArray.push('<li><input class="checkbox" type="checkbox" value="' + select_value + '" name="' + name + '[]"><label for="' + name + '-' + select_value + '">' + select_text + '</label></li>');
						}
					});
					
					var optionString = optionsArray.join('');
					$selectList.append(optionString);
					
					$content.append('<a href="#" class="multiselect-close-list">Välj</a>');
				}
				else if (tagType == 'input') {
					var itemType = $(o).prop('type');
					itemType = (itemType == 'tel') ? 'text' : itemType;
					$item.addClass('form-' + itemType); 
					$item.wrap('<div class="form-type-' + itemType + '"></div>');
					var $parent = $item.parent();
					var id = $item.prop('id');
					
					if (typeof id !== typeof undefined && id !== false && id.length > 0) {
						var $label = $form.find('label[for="' + id + '"]');
					}
					else {
						var name = $item.prop('name');
						var $label = $form.find('label[for="' + name + '"]');
					}
					
					if ((itemType == 'radio' || itemType == 'checkbox') && $item.is(':checked')) {
						$parent.addClass('active');
					}
					
					$label.prependTo($parent);
					
					if (itemType == 'radio' || itemType == 'checkbox') {
						var link = '<div class="ojjeform-' + itemType + '"><span class="icon"></span><span class="text">' + $label.html() + '</span></div>';
						$parent.append(link);
					}
				}
			});
		});
		
		$forms.off('click', '.ojjeform-checkbox').on('click', '.ojjeform-checkbox', function(e) {
			var $link = $(this);
			var $target = $(e.target);
			
			if ($target.hasClass('terms-link') == false) {
				e.preventDefault();
				
				var $parent = $link.parent();
				var $checkbox = $parent.find('input.form-checkbox');
				if ($checkbox.is(':disabled') == false) {
					if ($parent.hasClass('active') == false) {
						$parent.addClass('active');
						$checkbox.prop("checked", true).trigger('change');
					}
					else {
						$parent.removeClass('active');
						$checkbox.prop("checked", false).trigger('change');
					}
				}
			}
		});
		
		$forms.off('click', '.ojjeform-radio').on('click', '.ojjeform-radio', function(e) {
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
				}
				else if (typeof settings.radio.deselect === undefined || settings.radio.deselect === true) {
					$parent.find('input.form-radio').prop("checked", false).trigger("change");
					$parent.removeClass('active');
				}
			}
		});
		
		$forms.off('click', 'a.ojjeform-select').on('click', 'a.ojjeform-select', function(e) {
			e.preventDefault();
			
			var $link = $(this);
			var $form = $link.closest('form');
			var $parentLi = $link.parent();
			var $wrapper = $parentLi.closest('.form-type-select');
			var $select = $wrapper.find('select');
			var $selectedWrapper = $wrapper.find('.ojjeform-select-chosen');
			var $selectedLink = $selectedWrapper.find('.ojjeform-select-chosen-link');
			
			if ($select.is(':disabled') == false) {
				if ($link.hasClass('open') == false) {
					var $content = $link.closest('.select-content');
					$content.find('li').each(function(index, selectObj) {
						$(selectObj).removeClass('active');
					});
					$parentLi.addClass('active');
					var chosenVal = $link.data('value');
					$selectedLink.text($link.text());
					$content.slideUp(200, function() {
						$content.removeClass('open');
						$selectedLink.removeClass('open');
						var $optionToChoose = $select.find('option[value="' + chosenVal + '"]');
						$optionToChoose.prop('selected', true).trigger('change');
						$wrapper.removeClass('open up down');
					});
				}
			}
		});

		$forms.off('click', 'a.ojjeform-select-chosen-link').on('click', 'a.ojjeform-select-chosen-link', function(e) {
			e.preventDefault();
			
			var $link = $(this);
			var $parent = $link.closest('.ojjeform-select-chosen');
			var $wrapper = $parent.closest('.form-type-select');
			var $select = $wrapper.find('select');
			var $label = $wrapper.find('label');
			var $form = $link.closest('form');
			var $list = $wrapper.find('.select-content');
			
			$('form.ojjeform .form-type-select.open').each(function(k, v) {
				var $currWrapper = $(v);
				
				if ($currWrapper.is($wrapper) == false) {
					$currWrapper.removeClass('open down up');
					$currWrapper.find('.select-content').fadeOut(150);
				}
			});
			
			if ($select.is(':disabled') == false) {
				// $.each($form.find('ul.ojjeform-select-list.open'), function(k, v) {
// 					var $list = $(v);
// 					var $listParent = $(v).closest('.form-type-select');
//
// 					$list.slideUp(200, function() {
// 						$wrapper.removeClass('open');
// 					});
// 				});

				if ($wrapper.hasClass('open')) {
					var linkHeight = $link.outerHeight();
					var listHeight = $list.outerHeight();
					var listHeightTotal = listHeight + linkHeight;
				}
				else {
					$list.css({ display: 'block' });
					var linkHeight = $link.outerHeight();
					var listHeight = $list.outerHeight();
					var listHeightTotal = listHeight + linkHeight;
					$list.css({ display: 'none' });
				}
				
				var eTop = $link.offset().top;
				var windowTop = $(window).scrollTop();
				var windowHeight = $(window).height();
				var docHeight = $(document).height();
				var footerHeight = $('footer').outerHeight();
				
				if (eTop + listHeightTotal + footerHeight > windowHeight + windowTop) {
					var direction = 'up';
				}
				else {
					var direction = 'down';
				}
				
				if ($wrapper.hasClass('open')) {
					if (direction === 'down') {
						$list.fadeOut(150, function() {
							$wrapper.removeClass('open down up');
						});
					}
					else if (direction === 'up') {
						$list.fadeOut(150, function() {
							$wrapper.removeClass('open down up');
						});
					}
				}
				else {
					if (direction === 'down') {
						$list.css({ top: linkHeight - 1 });
						$wrapper.addClass('open down');
						$list.fadeIn(150, function() {});
					}
					else if (direction === 'up') {
						$list.css({ top: -(listHeight - 1)});
						$wrapper.addClass('open up');
						$list.fadeIn(150, function() {});
					}
				}
			}
		});

		$forms.off('reset').on('reset', function() {
			var $form = $(this);
			$form.find('.active').removeClass('active');
		});
		
		$document.off('click').on('click', function(e) {
			var $target = $(e.target);
			var $openComponents = $('.ojjeform .open');
			
			if ($openComponents.length > 0 && $target.hasClass('ojjeform-select-chosen-link') === false && $target.hasClass('ojjeform-select') === false && $target.hasClass('multiselect-headline') === false && $target.closest('.select-content').length === 0) {
				$openComponents.each(function(k, v) {
					var $v = $(v);
					$v.removeClass('open down up');
					$v.find('.form-type-select').removeClass('open');
					$v.find('.select-content').fadeOut(150);
					$v.find('.form-type-multiselect').removeClass('open');
					// $v.find('.multiselect-content').fadeOut(150);
				});
			}
		});
		
		$forms.off('click', '.multiselect-headline').on('click', '.multiselect-headline', function(e) {
			e.preventDefault();
			
			var $link = $(this);
			var $wrapper = $link.closest('.form-type-multiselect');
			var $select = $wrapper.find('select');
			var $label = $wrapper.find('label');
			var $form = $link.closest('form');
			var $list = $wrapper.find('.select-content');
			
			$('form.ojjeform .form-type-multiselect.open').each(function(k, v) {
				var $currWrapper = $(v);
				
				if ($currWrapper.is($wrapper) == false) {
					$currWrapper.removeClass('open down up');
					$currWrapper.find('.select-content').fadeOut(150);
				}
			});
			
			if ($select.is(':disabled') == false) {
				// $.each($form.find('ul.ojjeform-select-list.open'), function(k, v) {
// 					var $list = $(v);
// 					var $listParent = $(v).closest('.form-type-multiselect');
//
// 					$list.slideUp(200, function() {
// 						$wrapper.removeClass('open');
// 					});
// 				});

				if ($wrapper.hasClass('open')) {
					var linkHeight = $link.outerHeight();
					var listHeight = $list.outerHeight();
					var listHeightTotal = listHeight + linkHeight;
				}
				else {
					$list.css({ display: 'block' });
					var linkHeight = $link.outerHeight();
					var listHeight = $list.outerHeight();
					var listHeightTotal = listHeight + linkHeight;
					$list.css({ display: 'none' });
				}
				
				var eTop = $link.offset().top;
				var windowTop = $(window).scrollTop();
				var windowHeight = $(window).height();
				var docHeight = $(document).height();
				var footerHeight = $('footer').outerHeight();
				
				if (eTop + listHeightTotal + footerHeight > windowHeight + windowTop) {
					var direction = 'up';
				}
				else {
					var direction = 'down';
				}
				
				if ($wrapper.hasClass('open')) {
					if (direction === 'down') {
						$list.fadeOut(150, function() {
							$wrapper.removeClass('open down up');
						});
					}
					else if (direction === 'up') {
						$list.fadeOut(150, function() {
							$wrapper.removeClass('open down up');
						});
					}
				}
				else {
					if (direction === 'down') {
						$list.css({ top: linkHeight - 1 });
						$wrapper.addClass('open down');
						$list.fadeIn(150, function() {});
					}
					else if (direction === 'up') {
						$list.css({ top: -(listHeight - 1)});
						$wrapper.addClass('open up');
						$list.fadeIn(150, function() {});
					}
				}
			}
		});
		
		$forms.off('click', '.ojjeform-multiselect-list li label').on('click', '.ojjeform-multiselect-list li label', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			var $label = $(this);
			var $li = $label.closest('li');
			var $checkbox = $li.find('.checkbox');
			
			if ($checkbox.prop('checked') === true) {
				$checkbox.prop('checked', false);
			}
			else {
				$checkbox.prop('checked', true);
			}
		});
		
		$forms.off('click', '.ojjeform-multiselect-list li').on('click', '.ojjeform-multiselect-list li', function(e) {
			var tagType = e.target.tagName.toLowerCase();
			
			if (tagType === 'li') {
				e.preventDefault();
				
				var $li = $(this);
				var $checkbox = $li.find('.checkbox');
			
				if ($checkbox.prop('checked') === true) {
					$checkbox.prop('checked', false);
				}
				else {
					$checkbox.prop('checked', true);
				}
			}
		});
		
		$forms.off('click', '.multiselect-close-list').on('click', '.multiselect-close-list', function(e) {
			e.preventDefault();
			
			var multiselect_selected = [];
			
			var $link = $(this);
			var $wrapper = $link.closest('.form-type-multiselect');
			var $select = $wrapper.find('select');
			var $options = $select.find('option');
			var $content = $wrapper.find('.select-content');
			var filter_type = $content.data('id');
			var $checked_checkboxes = $content.find('input[type="checkbox"]:checked');
			var multiselect_selected = [];
			
			if ($checked_checkboxes.length > 0) {
				$checked_checkboxes.each(function(k, v) {
					var $v = $(v);
					var value = $v.val();
					multiselect_selected.push(value);
				});
				
				$options.each(function(k, v) {
					var $v = $(v);
					var value = $v.val();
				
					if (multiselect_selected.indexOf(value) > -1) {
						$v.prop('selected', true);
					}
					else {
						$v.prop('selected', false);
					}
				});
				
				$select.trigger('change');
			}
			else {
				$options.prop('selected', false);
				$select.val('').trigger('change');
			}
			
			$content.fadeOut(300, function() {});
		});
		
	};
	
})(jQuery);
