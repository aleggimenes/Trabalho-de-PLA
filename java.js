
$(document).ready(function(){

    principal();

});
$(document).ready(function(){
    $("h1").hide(1000).show(1000);
});
$(document).ready(function(){
    $("section").mouseenter(function(){
       $("section").animate({
        left: '15px',
        padding: '245px'
       });     
    });
    $("section").mouseleave(function(){
        $("section").animate({
            padding: '250px'
    });
});
});
function principal(){
    var aux=0;
    $("#continuar").on('click',function(){
        if($("#qtd-var").val() == "" || $("#qtd-res").val() == ""){
        }else{
        event.preventDefault();
        $("#qtd-var").prop("disabled", true);
        $("#qtd-res").prop("disabled", true); 

    let res =  Number($("#qtd-res").val());
    let num = Number($("#qtd-var").val());



    /**
     * 
     * criação de textbox de acordo com quantidade
     */
    if(aux==0){

        /**
         * criando variaveis
         */
      for(var i=1 ; i<=num; i++){
      $('#add-var').append('<p>X'+i+'<= 0 </p>'+'');
      }


      /**
       * criando restrições
       */
      for(var j=1 ; j<=res; j++){
        $('#add-res').append('<tr>' +'');
        for(i=1 ; i<=num; i++){
            if(j==1 && i==1){
            
                $('#add-max').append('<td> MAX Z = </td>'+'');
            }if(j==1){
                if(i>1){
                $('#add-max').append('<td>+</td>'+'' );
                }
                $('#add-max').append( '<td><input type = "text" id="m'+i+'" class="form-control"></td> <td> X'+i+'</td> '+'' );
        
            }
            if(i>1){
             $('#add-res').append('<td>+</td>'+'' );
            }
            $('#add-res').append( '<td><input type = "text" id="x'+i+'r'+j+'" class="form-control"></td> <td> X'+i+'</td> '+'' );
            if(i==num){
                $('#add-res').append( '<td> <=  </td><td><input type = "text" id="b'+j+'" class="form-control"></td>'+'');
            }
            
        }
        $('#add-res').append('</tr>' +'');
        }




       
    }else   //fim do if(criação de textbox dinamicos)
    /**
    * começo do calculo
    */
     if(aux==1){
        
        var m=[];
        var b=[];
        var id;
        var id_b;
		var result=[];
        var contador=0;
        /**
         * pegando os valores de max Z
         */
        for(var i=0; i<num; i++){
            id = i+1;
            m[i]= Number($('#m'+id+'').val()) * -1;
        }
        
        /**
         * pegando os valores do total das restrições
         */
        for(var i=0;i<=res;i++){
            id_b = i+1;
            b[i] = Number($('#b'+id_b+'').val());
        }

        /**
         * criar matriz
         */
        var matriz=[]
        for(var linha=0;linha<=res;linha++){
            matriz[linha]=new Array(num+res+1);
        }

        var cont = 0;
        for(linha=0;linha<=res;linha++){ 
            for(var coluna=0;coluna<=(num+res);coluna++){
                
                if(coluna<num && linha==0){
                    matriz[linha][coluna] = m[coluna];
                }else if(linha==0){
                    matriz[linha][coluna] = 0;
                } 
                if(linha!= 0 && linha<=res ){
                    if(coluna<num){
                    var id_x = coluna+1;
                    var id_r = linha;
                    matriz[linha][coluna] = Number($('#x'+id_x+'r'+id_r+'').val());
                    }
                }//fim do if colocando as restriçoes na matriz
                 if(coluna>(num-1) && coluna<(num+res) && linha!=0){
                            if(cont==0){
                            var aux_col = coluna;
                            var aux_lin = linha;
                            }
                            if(coluna==aux_col && linha== aux_lin){
                                matriz[linha][coluna]= 1;
                                cont=1;
                                aux_col++;
                                aux_lin++;

                            }else{
                                matriz[linha][coluna]=0;
                            }       
                 }//fim do if da parte indentidade(maior)
                 if(coluna==(num+res) && linha!=0){
                     matriz[linha][coluna] = b[linha-1];
                 }//fim do if sobre o resultado das restrições
            }  //fim do 2° for

        }//fim do 3° for


        do{
    /**
      * printando a primeira tabela
      */
      for(linha=0;linha<=res;linha++){
		  if(linha==0){
			  $("#table_calculo").append( '<tr>Tabela</tr>');
		  }
        $("#table_calculo").append( '<tr>');
        for(coluna=0;coluna<=(num+res);coluna++){
            var matriz_1 = matriz[linha][coluna];
            $("#table_calculo").append( '<td>'+matriz_1+'</td>');
        }//fim do 2° for
        $("#table_calculo").append( '</tr>');
    
     }//fim do 1°for


     /**
      * encontrar o pivo da coluna
      */
     var pivo_coluna;
        for(coluna=0;coluna<num;coluna++){
            if(coluna==0){
                var maior = (matriz[0][coluna]) * -1;
                var pivo_coluna = coluna;
            }else if((matriz[0][coluna])* -1 > maior){
                maior = (matriz[0][coluna]) * -1; 
                 pivo_coluna = coluna;
            }
        }


        /**
         * encontrar o pivo da linha
         */
        var menor;
        var pivo_linha;
        var cont_pivo=0;
        for(linha=0;linha<=res;linha++){
            if(matriz[linha][pivo_coluna] > 0 && matriz[linha][(num+res)] != 0){
                if(cont_pivo==0){
            menor = (matriz[linha][(num+res)] /  matriz[linha][pivo_coluna]);
            pivo_linha = linha;
            cont_pivo++;

                }else if((matriz[linha][(num+res)] / matriz[linha][pivo_coluna]) < menor &&
                (matriz[linha][(num+res)] / matriz[linha][pivo_coluna])>0){
                    menor = matriz[linha][(num+res)]/matriz[linha][pivo_coluna];
                    pivo_linha = linha;
                }
            }
        }//fim do for;

        result[contador] = menor;
		contador++;
        cont_pivo=0;

        /**
         * dividindo a  linha do pivo
         */
        var vetor=[];
        var num_pivo = matriz[pivo_linha][pivo_coluna];
        for(coluna=0;coluna<=(num+res);coluna++){
            matriz[pivo_linha][coluna] = (matriz[pivo_linha][coluna] / num_pivo);
            vetor[coluna]= matriz[pivo_linha][coluna];
            
        }
        
        
        /**
         * multiplicando as demais linhas
         */

       
        var pivo_linha1 = pivo_linha;
        var pivo_coluna1 = pivo_coluna;
        for(linha=0;linha<pivo_linha1;linha++){
            if(matriz[linha][pivo_coluna1] !=  0){
                var mult = matriz[linha][pivo_coluna1];
                for(coluna=0;coluna<=(res+num);coluna++){
                    
                    matriz[pivo_linha1][coluna] = matriz[pivo_linha1][coluna] * (mult * -1);
                    
                    matriz[linha][coluna] = matriz[pivo_linha1][coluna] + matriz[linha][coluna];
                    
                }
                for(coluna=0;coluna<=(res+num);coluna++){
                    matriz[pivo_linha1][coluna] = vetor[coluna];
                    
                }
                
            }
        }
        
       
        var verif=0;
        for(coluna=0;coluna<num;coluna++){
            if(matriz[0][coluna]!=0){
                verif=1;
            }
        }
        console.log(verif);
        //aumentar contador
    }while(verif==1);

    for(linha=0;linha<=res;linha++){
		  
        $("#table_calculo").append( '<tr>');
        for(coluna=0;coluna<=(num+res);coluna++){
            var matriz_1 = matriz[linha][coluna];
            $("#table_calculo").append( '<td>'+matriz_1+'</td>');
        }//fim do 2° for
        $("#table_calculo").append( '</tr>');
    
     }//fim do 1°for
	 
	 $("#table_respostas").append( '<tr><td>Max Z= '+matriz[0][(num+res)]+'</td></tr>');
	 
	 for(i=0;i<contador;i++){
		 var ajuda = i+1;
	 $("#result_var").append( '<p>X'+ajuda+' = '+result[i]+'</p>');
	 }
	 
    
    
	 
     }//fim do if(calculo)

     
    

       aux++;
    }});
    
    
}

    
