//main.js

$(document).ready(function(){

  //메인 영상을 숨기는 함수
  function videoHide(){
    $('#main_video').hide();
  }
  let Timer2 = setTimeout(videoHide, 7000); //7초뒤에 videoHide함수 실행

  //scroll 마우스 애니메이션 함수
  function scroll_btn(){
    $('.next_img').animate({'bottom':'10%'},800).animate({'bottom':'8%'},800);
  }

  //매 1.6초마다 함수를 반복 실행한다.
  let Timer3 = setInterval(scroll_btn, 1000);
  
  //next_btn을 클릭하면 comming가 상단으로 애니메이션되면서 올라오게 한다.
  $('.next_btn, .next_img').click(function(){
    //e.prevent.Default();
    $('html, body').stop().animate({scrollTop:$('#comming').offset().top-70},100,'easeOutQuint');
    $('#comming_inner .h2_before').animate({'top':'-17px'},500,'easeInQuart');
    $('#comming_inner .h2_after').animate({'top':'5px'},1500,'easeOutBounce');
    return false;
  });
  
  //이벤트 무력화 방법
  //a태그의 #때문에 클릭시 새로고침되는 현상이 발생되는데
  //이런 경우는 함수의 마지막에 return false를 넣어주는 방법과
  //e(이벤트 객체)를 사용하여 e.preventDefault();를 작성해주는 방법이 있다.


  //번개모양 애니메이션
  $(window).scroll(function(){
    let sPos2 = $(this).scrollTop();

    if(sPos2>=850){
      $('#comming_inner .h2_before').animate({'top':'-17px'},500,'easeInQuart');
      $('#comming_inner .h2_after').animate({'top':'5px'},1500,'easeOutBounce');
    }
    else{
      $('#comming_inner .h2_before').css('top','-144px'); 
      $('#comming_inner .h2_after').css('top','-127px'); 
    }
    return false;
  });


  //좌우슬라이드
  const l_btn = $('#latest i.fa-angle-left');
  const r_btn = $('#latest i.fa-angle-right');

  //5번 슬라이드를 1번의 앞으로 자리 배치한다.
  // B.insertBefore(A) : a요소의 앞에 b를 배치
  $('.slide_wrap > li:last-child').insertBefore('.slide_wrap > li:first-child');

  // 1번이 중앙에 오도록 부모의 위치를 왼쪽으로 이동한다.
  $('.slide_wrap').css('margin-left','-100%');


  //왼쪽으로 움직이는 함수
  function moveLeft(){
    $('.slide_wrap').animate({'margin-left':'-200%'},300, function(){

    $('.slide_wrap > li:first-child').insertAfter('.slide_wrap > li:last-child'); //맨 왼쪽 5번 이미지를 오른쪽 4번의 뒤로 자리를 옮겨준다.
    $('.slide_wrap').css('margin-left','-100%'); 
    });
  }

  //오른쪽으로 움직이는 함수
  function moveRight(){
    $('.slide_wrap').animate({'margin-left':'0px'},300,function(){
      $('.slide_wrap > li:last-child').insertBefore('.slide_wrap > li:first-child');
      $('.slide_wrap').css('margin-left','-100%');
    });
  }

   //시간객체를 사용하여 매3초마다 함수를 호출한다.
  let Timer = setInterval(moveLeft, 3000);

   //좌, 우버튼 클릭시 각각 해당 함수를 호출하여 슬라이드가 움직이도록 한다.
  l_btn.click(function(){
    moveLeft();
    //시간을 제거하여 움직이는 콘텐츠가 중복되지 않게
    clearInterval(Timer);
  });
  r_btn.click(function(){
    moveRight();
    //시간을 제거하여 움직이는 콘텐츠가 중복되지 않게
    clearInterval(Timer);
  });

  //마우스를 아웃시 다시 시간객체를 생성하여 자동으로 움직이게 한다.
  $('#latest i.fas').mouseleave(function(){
    clearInterval(Timer);
    Timer = setInterval(moveLeft, 3000);
  });

  //MORE 버튼 hover시
  $('#news .news_inner .more').hover(function(){
    $('.more a #btn_more').attr('src','./images/more_black.png');
  },function(){ //마우스 아웃시 다시 원래대로 변경
    $('.more a #btn_more').attr('src','./images/more.png');
  });


   //1. 이미지 캡션
   let g_img = $('.g_list li');

   //2. 이미지에 마우스오버시 캡션이 나오게 / 아웃시 다시 아래로 숨기기
   g_img.hover(function(){
     //this => li
     $(this).find('.caption').stop().animate({'top':'0px'}, 700,'easeOutCirc');
   },function(){
     $(this).find('.caption').stop().animate({'top':'-408px'}, 700,'easeOutCirc');
   });

   let page_no;

   //3. 이미지를 클릭시 해당 목록안에 이미지 src속성값을 변수에 담아 모달윈도에 출력한다.
   g_img.click(function(){
     let img_url = $(this).find('a').attr('href');
     console.log(img_url); //이미지 주소를 출력해본다.
     let title= $(this).find('a').attr('title');
     let num = $(this).index()+1; //번호출력
     
     console.log(page_no);

     let modal = `
     <div class="movies_modal">
       <div>
         <h3>${title}</h3>
         <img src=${img_url} alt="">
         <span class="page">${num}/${page_no}</span>
         <i class="fas fa-times"></i>
         <i class="fas fa-angle-left"></i>
         <i class="fas fa-angle-right"></i>
       </div>
     </div>
     `;

     $('body').append(modal);

     function moveLeft(){
       if(num==1){
         num=12;
       }else{
         num--;
       }
       $('.movies_modal .page').text(num+'/'+page_no);
       $('.movies_modal h3').text($('.g_list > li').eq(num-1).find('a').attr('title'));
      imgCheck();
     }

     function moveRight(){
       if(num==12){
         num=1;
       }else{
         num++;
       }
       $('.movies_modal .page').text(num+'/'+page_no);
       $('.movies_modal h3').text($('.g_list > li').eq(num-1).find('a').attr('title'));
      imgCheck();
     }
     
     function imgCheck(){
      $('.movies_modal img').attr('src','./images/img'+num+'.jpg');
      //  if(num==4||num==9||num==11){
      // $('.movies_modal img').attr('src','./images/img'+num+'.png');
      //  }else{
      //    $('.movies_modal img').attr('src','./images/img'+num+'.jpg');
      //  }
     }

     $('.movies_modal i.fa-angle-left').click(function(){
       moveLeft();
     });

     $('.movies_modal i.fa-angle-right').click(function(){
       moveRight();
     });

     $('.movies_modal i.fa-times').click(function(){
       $('.movies_modal').fadeOut('fast');
     });

     return false; //이미지가 안열리게...
   });

   //갤러리 메뉴 변수
   let total_mnu = $('.g_nav li:first-child a');
   let avengers_mnu = $('.g_nav li:nth-child(2) a');
   let iron_Man_mnu = $('.g_nav li:nth-child(3) a');
   let captain_america_mnu = $('.g_nav li:nth-child(4) a');
   let thor_mnu = $('.g_nav li:nth-child(5) a');
   let hulk_mnu = $('.g_nav li:nth-child(6) a');
   let guardians_of_the_galaxy_mnu = $('.g_nav li:nth-child(7) a');
   let doctor_strange_mnu = $('.g_nav li:nth-child(8) a');
   let spider_man_mnu = $('.g_nav li:nth-child(9) a');
   let black_panther_mnu = $('.g_nav li:nth-child(10) a');
   let ant_man_mnu = $('.g_nav li:nth-child(11) a');
   let captain_marvel_mnu = $('.g_nav li:nth-child(12) a');
   let black_widow_mnu = $('.g_nav li:nth-child(13) a');
   let shang_chi_mnu = $('.g_nav li:last-child a');

   total_mnu.click(function(){
     //$('.total').show();
     $('.total').hide();
     $('.total').fadeIn();
     page_no = g_img.length;
     return false;
   });

   avengers_mnu.click(function(){
     $('.total').hide();
     $('.avengers').fadeIn();
     page_no = g_img.length;
     return false;
   });

   iron_Man_mnu.click(function(){
     $('.total').hide();
     $('.iron_Man').fadeIn();
     page_no = g_img.length;
     return false;
   });
   
   captain_america_mnu.click(function(){
     $('.total').hide();
     $('.captain_america').fadeIn();
     page_no = g_img.length;
     return false;
   });

   thor_mnu.click(function(){
     $('.total').hide();
     $('.thor').fadeIn();
     page_no = g_img.length;
     return false;
   });

   hulk_mnu.click(function(){
    $('.total').hide();
    $('.hulk').fadeIn();
    page_no = g_img.length;
    return false;
  });

  guardians_of_the_galaxy_mnu.click(function(){
    $('.total').hide();
    $('.guardians_of_the_galaxy').fadeIn();
    page_no = g_img.length;
    return false;
  });

  doctor_strange_mnu.click(function(){
    $('.total').hide();
    $('.doctor_strange').fadeIn();
    page_no = g_img.length;
    return false;
  });

  spider_man_mnu.click(function(){
    $('.total').hide();
    $('.spider_man').fadeIn();
    page_no = g_img.length;
    return false;
  });

  black_panther_mnu.click(function(){
    $('.total').hide();
    $('.black_panther').fadeIn();
    page_no = g_img.length;
    return false;
  });

  ant_man_mnu.click(function(){
    $('.total').hide();
    $('.ant_man').fadeIn();
    page_no = g_img.length;
    return false;
  });

  captain_marvel_mnu.click(function(){
    $('.total').hide();
    $('.captain_marvel').fadeIn();
    page_no = g_img.length;
    return false;
  });

  black_widow_mnu.click(function(){
    $('.total').hide();
    $('.black_widow').fadeIn();
    page_no = g_img.length;
    return false;
  });

  shang_chi_mnu.click(function(){
    $('.total').hide();
    $('.shang_chi').fadeIn();
    page_no = g_img.length;
    return false;
  });

   //내가 선택한 메뉴에만 act서식을 추가하여 메뉴배경색을 변경한다.
   $('.g_nav ul li a').click(function(){
    $('.g_nav ul li a').removeClass('act_btn');
    $(this).addClass('act_btn').parent().siblings().find('a');
    return false; // a의 #때문에 페이지가 새로고침 되는 것을 방지한다.
   });





  //배너(새로고침시 변경)
  let img_num = Math.floor(Math.random()*5+1);
  console.log(img_num);
  $('#banner').attr('src','./images/banner0' + img_num +'.jpg');


  //cs faq
  let faq = $('.faq > li > a');

  //1. 첫번째 li의 .asw를 나오게 한다
  $('.faq li').first().find('.asw').show();

  //2. 첫번째 li에 on클래스를 적용한다.
  $('.faq > li a').first().addClass('on');


  //3. 메뉴 클릭시 해당 서브가 보이게하고 나머지 부모의 형제요소들을 숨긴다.
  faq.click(function(){

    //3. 사용자가 선택한 메뉴의 서브가 펼쳐지고, 그외 다른 서브는 숨겨짐.
    $(this).next().slideDown().parent().siblings().find('.asw').slideUp();

    //선택한 메뉴에 서식을 적용하고 선택하지 않은 다른 a요소에는 서식을 제거한다.
    $(this).addClass('on').parent().siblings().find('a').removeClass('on');

    return false;
  });



});