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
				$formItems = $formItems.not('select');
			}
			
			$formItems.each(function(i, o) {
				var $item = $(o);
				var tagType = o.tagName.toLowerCase();
				
				if (tagType == 'select') {
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
				else {
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
						$selectedLink.removeClass('open');
						var $optionToChoose = $select.find('option[value="' + chosenVal + '"]');
						$optionToChoose.prop('selected', true).trigger('change');
						$wrapper.removeClass('open');
						$form.removeClass('open up down');
					});
				}
			}
		});

		$forms.off('click', 'a.ojjeform-select-chosen-link').on('click', 'a.ojjeform-select-chosen-link', function(e) {
			e.preventDefault();
			
			var $link = $(this);
			var $parent = $link.parent();
			var $wrapper = $parent.parent();
			var $select = $wrapper.find('select');
			var $label = $wrapper.find('label');
			var $form = $link.closest('form');
			var $selectList = $wrapper.find('ul.ojjeform-select-list');
			
			$('form.ojjeform.open').each(function(k, v) {
				var $currForm = $(v);
				var $currLink = $currForm.find('a.ojjeform-select-chosen-link');
				
				if ($currForm.is($form) == false) {
					$currForm.removeClass('open down up');
					$currForm.find('.form-type-select').removeClass('open');
					$currForm.find('.ojjeform-select-list').fadeOut(150);
				}
			});
			
			if ($select.is(':disabled') == false) {
				$.each($form.find('ul.ojjeform-select-list.open'), function(k, v) {
					var $list = $(v);
					var $listParent = $(v).closest('.form-type-select');
					var $listLink = $listParent.find('.ojjeform-select-chosen-link');
					$list.slideUp(200, function() {
						$wrapper.removeClass('open');
					});
				});

				if ($wrapper.hasClass('open')) {
					var linkHeight = $link.outerHeight();
					var listHeight = $selectList.outerHeight();
					var labelHeight = $label.outerHeight();
					var listHeightTotal = listHeight + linkHeight;
				}
				else {
					$selectList.css({ display: 'block' });
					var linkHeight = $link.outerHeight();
					var listHeight = $selectList.outerHeight();
					var labelHeight = $label.outerHeight();
					var listHeightTotal = listHeight + linkHeight;
					$selectList.css({ display: 'none' });
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
						$selectList.fadeOut(150, function() {
							$form.removeClass('open down up');
							$wrapper.removeClass('open');
						});
					}
					else if (direction === 'up') {
						$selectList.fadeOut(150, function() {
							$form.removeClass('open down up');
							$wrapper.removeClass('open');
						});
					}
				}
				else {
					if (direction === 'down') {
						$selectList.css({ top: linkHeight + labelHeight - 1 });
						$form.addClass('open down');
						$selectList.fadeIn(150, function() {
							$wrapper.addClass('open');
						});
					}
					else if (direction === 'up') {
						$selectList.css({ top: -(listHeight - labelHeight - 1)});
						$form.addClass('open up');
						
						$selectList.fadeIn(150, function() {
							$wrapper.addClass('open');
						});
					}
				}
			}
		});

		$forms.off('reset').on('reset', function() {
			var $form = $(this);
			$form.find('.active').removeClass('active');
		});
		
		$document.off('click').on('click', function() {
			$('.form-type-select').each(function(k, v) {
				var $wrapper = $(v);
				var $selectList = $wrapper.find('ul.ojjeform-select-list');
				var $link = $wrapper.find('.ojjeform-select-chosen .ojjeform-select-chosen-link');
				if ($selectList.hasClass('open')) {
					$selectList.slideUp(200, function() {
						$selectList.removeClass('open');
						$link.removeClass('open');
					});
				}
			});
		});
		
	};
	
})(jQuery);
