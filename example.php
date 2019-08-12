<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>Ojjeform Example</title>
	
	<link rel="stylesheet" href="css/main.css" type="text/css" />
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
						multiselect: true
					},
					radio: {
						deselect: true
					}
				};
				$.ojjeform($questions_form, formOptions);
			}
		
		});
		
	</script>
		
	
</head>

<body>
	
	<?php
		if (!empty($_POST)) {
			print "<br /><br /><br /><pre>"; print_r($_POST); print "</pre>";
		}
	?>
	
	<form id="questions-form" method="post">
		
		<div class="form-row">
			<h2>Where do you wanna go?</h2>
			<div class="form-checkboxes">
				<input type="checkbox" name="hawaii" value="hawaii">
				<label for="hawaii">Hawaii</label>
	
				<input type="checkbox" name="vienna" value="vienna">
				<label for="vienna">Vienna</label>
			
				<input type="checkbox" name="moscow" value="moscow">
				<label for="moscow">Moscow</label>
			</div>
		</div>
		
		<div class="form-row">
			<h2>Where were you born?</h2>
			<div class="form-radios">
				<input type="radio" name="hawaii" value="hawaii">
				<label for="hawaii">Hawaii</label>
				
				<input type="radio" name="vienna" value="vienna">
				<label for="vienna">Vienna</label>
				
				<input type="radio" name="moscow" value="moscow">
				<label for="moscow">Moscow</label>
			</div>
		</div>
		
		<div class="form-row">
			<h2>Favourite soccer team</h2>
			<div class="form-select">
				<label for="soccer-teams">Team</label>
				<select class="soccer-teams" name="soccer-teams" id="soccer-teams">
					<option value="manchester_united">Manchester United</option>
					<option value="milan">Milan</option>
					<option value="barcelona">Barcelona</option>
					<option value="porto">Porto</option>
					<option value="dortmund">Dortmund</option>
					<option value="real_madrid">Real Madrid</option>
					<option value="liverpool">Liverpool</option>
				</select>
			</div>
		</div>
		
		<div class="form-row">
			<h2>Favourite baseball team</h2>
			<div class="form-select">
				<label for="baseball-teams">Team</label>
				<select class="baseball-teams" name="baseball-teams" id="baseball-teams">
					<option value="new_york_yankees">New York Yankees</option>
					<option value="chicago_cubs">Chicago Cubs</option>
					<option value="los_angeles_dodgers" selected>Los Angeles Dodgers</option>
					<option value="pittsburgh_pirates">Pittsburgh Pirates</option>
					<option value="oakland_athletics">Oakland Athletics</option>
				</select>
			</div>
		</div>
		
		<div class="form-row">
			<h2>Favourite hockey team</h2>
			<div class="form-multiselect">
				<label for="hockey-teams">Teams</label>
				<select class="hockey-teams" name="hockey-teams" id="hockey-teams" data-title="Teams" multiple="multiple">
					<option value="colorado_avalanche">Colorado Avalanche</option>
					<option value="new_york_rangers">New York Rangers</option>
					<option value="boston_bruins">Boston Bruins</option>
					<option value="vancouver_canucks">Vancouver Canucks</option>
					<option value="washington_capitals">Washington Capitals</option>
					<option value="toronto_maple_leafs">Toronto Maple Leafs</option>
					<option value="detroit_red_wings">Detroit Red Wings</option>
					<option value="minnesota_wild">Minnesota Wild</option>
					<option value="pittsburg_penguins">Pittsburgh Penguins</option>
				</select>
			</div>
		</div>
		
		<div class="form-row">
			<h2>Favourite basketball team</h2>
			<div class="form-multiselect">
					<label for="basketball-teams">Teams</label>
					<select class="basketball-teams" name="basketball-teams" id="basketball-teams" data-title="Teams" multiple="multiple">
						<option value="los_angeles_lakers">Los Angeles Lakers</option>
						<option value="new_york_knicks">New York Knicks</option>
						<option selected value="chicago_bulls">Chicago Bulls</option>
						<option selected value="toronto_raptors">Toronto Raptors</option>
						<option value="houston_rockets">Houston Rockets</option>
					</select>
			</div>
		</div>
		
		<div class="btn-wrapper">
			<input class="btn btn-done" type="submit" value="Ok!">
			<a href="#" class="more-form-button">
				<span class="icon-marker"></span>
				<span class="icon"></span>
				<span class="text"></span>
			</a>
		</div>
		
	</form>

</body>
</html>
