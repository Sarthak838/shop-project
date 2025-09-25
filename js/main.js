
$(document).ready(()=>{
    // Ripples
    $('#about').ripples({ // #header, .info, .ripple, .bg-image
        resolution: 1080,
        dropRadius: 20,
        perturbance: 0.01,
      });

      //   magnific popup
     $('.magnificPop').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery:{ //show next photo 
            enabled: true
        }
        // other options
    });

    // humbeger Menu Toggler
    $('.navbar-toggler').click(function(){
        $('.navbar-toggler').toggleClass('change')
    })
    // Sticky navBar less padding i.e stop the nav bar from moving
    $(window).scroll(() =>{
        let position = $(this).scrollTop();
        let navbar = document.getElementById('navbar');
        navbar.style.background = 'black';
        $('.navbar').addClass('navbar-background');
        $('.navbar').addClass('fixed-top'); 
    });

    // smooth scroll Add smooth scrolling to all links
    $(".nav-item a, .header-link, #back-to-top, #momosPrice, .navbar a, #about a ").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;

        $('html, body').stop().animate({
            scrollTop: $(hash).offset().top
        }, 2500, function(){
    
            window.location.hash = hash;
        });
        } // End if
    });

    // come along (arrow-up) back to top
    $(window).scroll(() =>{
        let position = $(this).scrollTop();
        // console.log(position);
        if(position >= 705){
            $('#back-to-top').addClass('scrollTop');            
        }
        else{
            $('#back-to-top').removeClass('scrollTop');            

        }
    })

    //Contact for submission
     $('#contact-form').submit(function(e){
        e.preventDefault(); // Prevent full page reload

        let name = $('input[name="name"]').val();
        let email = $('input[name="email"]').val();
        let message = $('textarea[name="message"]').val();

        $.ajax({
            type: "POST",
            url: "/contact",
            data: { name, email, message },
            success: function(response){
                $('#contact-success').text(response); // show success message
                $('#contact-form')[0].reset();        // clear form
            },
            error: function(){
                $('#contact-success').text("❌ Something went wrong. Please try again.");
            }
        });
    });
});
