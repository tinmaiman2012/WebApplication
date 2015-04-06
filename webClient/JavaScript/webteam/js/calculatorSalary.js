$(document).ready(function(){

	$(document).on('click','#a-demoSalaryCalculator',function(){


		$("#page-wrapper").html($("#calculatorTemplate").html());	

	});

	$(document).on('click','#a-demoAjax',function(){

		$.ajax({
			url:'rest/data.json',
			method:'GET',
			beforeSend:function(){
				$("#page-wrapper").html('<img src="images/spinner.gif" />');
			}

		}).complete(function(){


		}).success(function(data){
			
			var table = '<div class="row">'+
							'<table class="table table-hover">'+
								'<tr>'+
									'<th>Index</th>'+
									'<th>Id</th>'+
									'<th>Username</th>'+
									'<th>Password</th>'+
								'</tr>';
			
							
			
			for(var i = 0; i<data.user.length;i++){
				table+= '<tr>'+
								'<td>'+(i+1)+'</td>'+
								'<td>'+data.user[i].id+'</td>'+
								'<td>'+data.user[i].username+'</td>'+
								'<td>'+data.user[i].password+'</td>'+
							'</tr>'

			}
			var result = table+ '</table>'+'</div>';

			console.log(result);


			$("#page-wrapper").html(result);

		}).error(function(){
			console.log("can not get data");
		});
	});

	$(document).on('click','#a-demoDragDrop',function(){


		$("#page-wrapper").html($("#dragDemoTemplate").html());
		

	});



	$(document).on('click','#btnCalculator',function(){

		
		var basic = isNaN(parseInt($("#txtBasic").val(),10)) ? 0 : parseInt($("#txtBasic").val(),10);
		var hra = isNaN(parseInt($("#txtHra").val(),10))?0: parseInt($("#txtHra").val(),10);
		var da = isNaN(parseInt($("#txtDa").val(),10)) ? 0 :parseInt($("#txtDa").val(),10);
		var tax = isNaN(parseInt($("#rangeTax").val(),10))?0: parseInt($("#rangeTax").val(),10);

		var result = (basic+hra+da)*(100 -tax)/100;


		$("#result").html('<span id="test" style="color:red">'+result+'</span>');

	});

	// $(document).on('change','#rangeTax',function(){
	// 	var tax = $('#rangeTax').val();
	// 	$('#spanTax').html('['+tax+'%]');

	// })

	$(document).on('mousemove','#rangeTax',function(){

		var tax = $('#rangeTax').val();
		$('#spanTax').html('['+tax+'%]');

	})
	// $('#test').click(function(){
	// 	alert("aaaaaa");
	// })

})