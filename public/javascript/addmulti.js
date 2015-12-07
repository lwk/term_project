function addmulti() {
	$('#add').click(function() {
		$("#addmulti").append($('#add').html());
	});
	$('#del').click(function() {
		if (confirm("정말 삭제하시겠습니까?")) {
			var $els = $("tr input[type='checkbox']:checked");
      $els.each(function(idx, el) {
        $(el).parents("tr").empty();
      });
		}
	});
	$('add').click();
}
