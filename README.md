ojjeform
========

Style form compontents with custom graphics without breaking event listeners.

### Html example
```html
<input id="example-textfield1" name="example-freetext1" class="text placeholder not-changed" type="text" value="My default value here" /> <br />
<input id="example-textfield2" name="example-freetext2" class="text placeholder not-changed" type="text" value="Another default value here" /> <br />
<input id="example-textfield3" name="example-freetext3" class="text placeholder not-changed" type="text" value="Here too..." /> <br />
<input id="example-textfield4" name="example-freetext4" class="text placeholder not-changed" type="text" value="And here..." /> <br />
<input id="example-textfield5" name="example-freetext5" class="text placeholder not-changed" type="text" value="Well, you get it..." />
```

### Javascript example 
```javascript
$city_form = $('#city-form');
if ($city_form.length > 0) {
  var formOptions = {
    types: {
      checkbox: true,
      radio: true,
      select: true,
      textfield: true,
      textarea: true
    }
  };
  $.ojjeform($city_form, formOptions);
}  
```

