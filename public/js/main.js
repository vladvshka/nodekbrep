//client-side JS-file
$(document).ready(()=>{
	$('.delete-article').on('click', (event) => {
		$target = $(event.target); //variable
		const id = $target.attr('data-id');
		$.ajax({
			type: 'DELETE',
			url: '/articles/'+id,
			success: response=>{
				alert("deleting article");
				window.location.href='/';
			},
			error: err=>{
				console.log(err);
			}
		});
	});
});
//event.target.pathname