<script>
mmjQuery(document).ready(function(){
    //Megadjuk a termék-fizetési mód megfeleltetést:
    //termek_fizetes_matrix['termékid'] = [fizetési módok];
    //Ha egy termék nem szerepel a mátrixban, akkor ahhoz minden fizetési mód engedélyezett
    //Ha több termék van kiválasztva, az a fizetési mód elérhető, amelyik mindegyikhez engedélyezett
    var termek_fizetes_matrix = Array();
    termek_fizetes_matrix['304800'] = [20025, 20055, 20401];
    termek_fizetes_matrix['334391'] = [20025, 20026, 20041];
    
    //Ha változik a kiválasztott termék
    mmjQuery(".prodchk").change(function() {
        //Minden módot bekapcsolunk, és kikapcsoljuk majd a nem kellő módokat
    	mmjQuery(".shippingmethodradio").parent().show();

        //Minden kiválasztott termékre
    	mmjQuery('.prodchk:checked').each( function() {
			var selected_prod = mmjQuery(this).prop('name').substr(4);

            //Ha van a termékhez korlátozás
			if(termek_fizetes_matrix[selected_prod]) {
                //Minden fizetési módra
	  			mmjQuery('.shippingmethodradio').each( function() {
                    //Ha a fizetési mód nincs a termékhez engedélyezettek között
	  				if( !termek_fizetes_matrix[selected_prod].includes(parseInt(mmjQuery(this).val())) ) {
                        //Akkor elrejtjük
	  					mmjQuery(this).parent().hide();

                        //Ha ez a mód van épp kiválasztva
	  					if( mmjQuery(this).prop('checked') ) {
                            //Akkor kikapcsoljuk a kiválasztást
	  						mmjQuery(this).prop('checked',false);
                            //És eltűntetjük az esetleges Kártyás fizetési mód blokkot
	  						mmjQuery("#online-payment-container").hide();
	  					}
	  				}
	  			});
    		}
    	});
        
        //Ha csak egy engedélyezett fizetési mód van, azt válasszuk is ki egyből
    	if (1==mmjQuery('.shippingmethodradio:visible').length) {
    		mmjQuery('.shippingmethodradio:visible').prop('checked', true);
    	}
    });
});
</script>