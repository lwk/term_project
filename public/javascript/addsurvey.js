function addsurveysub() {
	$('#sub').click(function() {
		$("#survey").append($('#addsub').html());
	});
	$('#del').click(function() {
		if (confirm("정말 삭제하시겠습니까?")) {
			var $els = $("tr input[type='checkbox']:checked");
      $els.each(function(idx, el) {
        $(el).parents("tr").empty();
      });
		}
	});
	$('#sub').click();
}
function addsurveymulti() {
	$('#multi').click(function() {
		$("#survey").append($('#addmulti').html());
	});
	$('#del').click(function() {
		if (confirm("정말 삭제하시겠습니까?")) {
			var $els = $("tr input[type='checkbox']:checked");
      $els.each(function(idx, el) {
        $(el).parents("tr").empty();
      });
		}
	});
	$('#multi').click();
}

function addsurveyshort() {
	$('#short').click(function() {
		$("#survey").append($('#addshort').html());
	});
	$('#del').click(function() {
		if (confirm("정말 삭제하시겠습니까?")) {
			var $els = $("tr input[type='checkbox']:checked");
      $els.each(function(idx, el) {
        $(el).parents("tr").empty();
      });
		}
	});
	$('#short').click();
}

function addsurveylong() {
	$('#long').click(function() {
		$("#survey").append($('#addlong').html());
	});
	$('#del').click(function() {
		if (confirm("정말 삭제하시겠습니까?")) {
			var $els = $("tr input[type='checkbox']:checked");
      $els.each(function(idx, el) {
        $(el).parents("tr").empty();
      });
		}
	});
	$('#long').click();
}
