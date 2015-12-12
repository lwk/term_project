function addsurveymulti() {
	$('#multi').click(function() {
		$("#addsurvey").append($('#addmulti').html());
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
		$("#addsurvey").append($('#addshort').html());
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
		$("#addsurvey").append($('#addlong').html());
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
