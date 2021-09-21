let count = 0;
let buyItem_price = [];  // to make item price array

let quantity = [];// to make quantity array
let quantityCount = 0;  // id count on quantity
let cal = [];    // mulitple new array
let today = new Date(); // get date for promotion
let promotionDay = false;
console.log(today.getDay(),today.getDate(),today.getHours());
$(document).ready(function(){

    initial();
  
    console.log(today.getDate());
    $(".card").click(function(){
        // console.log("hello");
        let alreadyExist = false;
        let img = $(this).find("img").attr("src");
        // console.log(img);
    
        let pTag = $(this).find("h4").text();
        // let pText = pTag.text();
        let spanTag = $(this).find("p").text();
        // let spanText = spanTag.text();
        let price = $(this).find(".price").text();

    
        // console.log(price);
        let cards = $(".item");
        
        for(let index = 0 ; index < cards.length; index++){
                let exist = cards[index].childNodes[3].childNodes[1].innerText;
                // console.log(exist);
                if(exist == spanTag){
                    alreadyExist = true;
                alert("This item has already in cart!");
                }
        }
      
      
        
        if(!alreadyExist){
                buyItem_price.push(Number(price.substring(3,7)));
                // console.log(buyItem_price);
              $(".cart .title2").append(`<div class="item"  >
              <img src="${img}" alt=""  class="smallimage">
              <p>${pTag}<span>${spanTag}</span></p>
              <div>
              <input type="text" name="count" id="${quantityCount}"  class="count" value="1"  />
              </div>
              <i id="${count}" class="fa fa-trash icon"></i>
              </div>`);
              quantityCount++;
              count++;
              quantity.push(Number($(".count").val()));
            //   console.log(quantity);
               
               calculate();

               checkWeekEnd();
             
               addDelieverPrice();
                        
            
            //   console.log(quantity);
        }
       
    
        $(".icon").click(function(){
            // console.log($(this).attr("id"));
            buyItem_price[$(this).attr("id")] = 0;
            $(this).parent().remove();
            calculate();
            checkWeekEnd();
          
            addDelieverPrice();
        });

        $(".count").mouseleave(function(){
           if(Number($(this).val())  > 0  && Number($(this).val()) < 11 ){
            quantity[$(this).attr("id")] = Number($(this).val());
            calculate();
            checkWeekEnd(); 
            addDelieverPrice();
           }else {
               alert("Quantity only 10 points");
           }
            // console.log(quantity);
          
          
        })

      
      
    });

    // $('select').on("change",function (){
    //         console.log($(this).val());
    // })

    // to show order log to customer
    $("form").submit(function(e){
        // console.log('hello');
      window.confirm("Are u sure want to order?")
      $(".orderbox").show();
      $(".ordername").text($("#name").val());
      $(".orderaddress").text($("#address").val());

     let place =  $(".deliverfee option:selected").text().substring(0,9);
  //    console.log(place.substring(0,9));
     $(".ordertownship").text(place);
        e.preventDefault();

       
    });

    $(".icon2").click(function(){
        $(".orderbox").hide();
        location.reload();
});
});


function initial(){
    $("#discount").hide();
    $("#discountprice").hide();
    $(".orderbox").hide();
    // call for discount
    // checkWeekEnd();
}
// to show discount time and date
function checkWeekEnd(){
    // check sun and sat
    // console.log(today.getDay());
    let promotion = 0;
    if(today.getDay() == 0 || today.getDay() == 6){
        if(Number(today.getHours()) >= 9 && Number(today.getHours()) <= 17){
            promotionDay = true;
            $("#discount").show();
            $("#discountprice").show();
            promotion =   calculate() - (calculate() * 0.15);
            $("#dprice").text(promotion);
        }
    }
}


// to calculte orignal price and quntatiy
function calculate(){

    let currentPrice = 0;
   
    for(let index = 0 ;index < buyItem_price.length; index++){
        cal[index] = buyItem_price[index] * quantity[index];
    }
   
    for(let i = 0 ; i < cal.length; i++){
        currentPrice +=  cal[i];
    }

     // current amount
    return currentPrice;
}


// final deliver with promotion and delivery
function addDelieverPrice(){

    // check promotion with deliver fee
    if(promotionDay){
    $(".fprice").text((calculate() - (calculate() * 0.15)) + Number($("select").val()));
    }else{
    $(".fprice").text( calculate() + Number($('select').val()));
    }


    // when deliever fee change
    $("select").change(function(){
        if(promotionDay){
            $(".fprice").text((calculate() - (calculate() * 0.15)) + Number($('select').val()));
        }else{
            $(".fprice").text(calculate() + Number($("select").val()));
        }

    })
}