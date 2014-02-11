ojjeform
========

Style form compontents with custom graphics without breaking event listeners.

### Html example
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>Ojjeform Example</title>
	
	<link rel="stylesheet" href="css/ojjeform.css" type="text/css" />
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="js/jquery.ojjeform.js"></script>
	
	<script type="text/javascript">
	
	  $(document).ready(function() {
    
	    /* VARIABLES */
	    var $questions_form = $('#questions-form');
  
	    /* Style form components with jquery plugin */
	    if ($questions_form.length > 0) {
	      var formOptions = {
	        types: {
	          checkbox: true,
	          radio: true,
	          select: true,
	          textfield: false,
	          textarea: false
	        }
	      };
	      $.ojjeform($questions_form, formOptions);
	    }  
		
		});
		
	</script>
  
	
</head>

<body>
	
	<form id="questions-form" action="/tavla" method="post">

		<div class="form-row first">
			<h2>1. Where do you wanna go?</h2>
			<div class="form-components">

				<div class="form-checkboxes">

					<div class="form-type-checkbox">
						<input type="checkbox" name="hawaii" class="form-checkbox" value="hawaii">
						<label for="hawaii">Hawaii</label>
					</div>

					<div class="form-type-checkbox">
						<input type="checkbox" name="vienna" class="form-checkbox" value="vienna">
						<label for="vienna">Vienna</label>
					</div>

					<div class="form-type-checkbox active">
						<input type="checkbox" name="moscow" class="form-checkbox" value="moscow">
						<label for="moscow">Moscow</label>
					</div>

				</div>

			</div>

		</div>
		
		<div class="form-row second">
			<h2>2. Where were you born?</h2>
			<div class="form-components">

				<div class="form-radios">

					<div class="form-type-radio">
						<input type="radio" name="hawaii" class="form-radio" value="hawaii">
						<label for="hawaii">Hawaii</label>
					</div>

					<div class="form-type-radio">
						<input type="radio" name="vienna" class="form-radio" value="vienna">
						<label for="vienna">Vienna</label>
					</div>

					<div class="form-type-radio active">
						<input type="radio" name="moscow" class="form-radio" value="moscow">
						<label for="moscow">Moscow</label>
					</div>

				</div>

			</div>

		</div>
		
		<div class="form-row third">
			<h2>3. Favourite soccer team</h2>
			<div class="form-components">

				<div class="form-select">

					<div class="form-type-select">
						<select class="form-select">
							<option value="manchester_united">Manchester United</option>
							<option value="milan">Milan</option>
							<option value="barcelona">Barcelona</option>
							<option value="dortmund">Dortmund</option>
						</select>
					</div>

				</div>

			</div>

		</div>
		
		<div class="form-row third">
			<div class="form-text">
			<label for="name">Name</label><br />
			<input type="text" class="form-text" name="name" />
		</div>
		
		<div class="form-row fourth">
			<div class="form-text">
			<label for="message">Message</label><br />
			<textarea class="form-textarea" name="message"></textarea>
		</div>

		<div class="btn-wrapper">
			<input class="btn btn-next" type="button" value="Nästa val" style="display: none;">
			<input class="btn btn-done" type="submit" value="Ok!" style="display: inline-block;">
		<a href="#" class="more-form-button"><span class="icon-marker"></span><span class="icon"></span><span class="text"></span></a></div>

	</form>

</body>
</html>
```

### Javascript example 
```javascript
var $questions_form = $('#questions-form');

/* Style form components with jquery plugin */
if ($questions_form.length > 0) {
  var formOptions = {
    types: {
      checkbox: true,
      radio: true,
      select: true,
      textfield: false,
      textarea: false
    }
  };
  $.ojjeform($questions_form, formOptions);
}  
```

### Todo
- Fix support for textfields
- Fix support for textareas
- Fix support for submits
