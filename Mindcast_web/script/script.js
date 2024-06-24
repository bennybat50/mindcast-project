
$(document).ready(function () {
    loadHeader()
    loadFooter()




function loadHeader() {
    let view = `  <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
        <a class="navbar-brand" href="/index.html">
            <img src="/image/LOGO MINDCASTS.png" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <!-- <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li> -->
                <!-- <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li> -->
                <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li> -->
                <!-- <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                </li> -->
            </ul>
            <ul class="nav-list">
                <li><a href="/business.html">For Business</a></li> 
                <li><a href="/about.html">About us</a></li>
                <li><a href="/resources.html">Resources</a></li>
                <li class="me-0"><a class="host" href="/host.html" target="_blank">Get Started</a></li>
            </ul>
        </div>
    </div>
</nav>`;



    document.getElementById("nav_bar").innerHTML = view

}



function loadFooter() {
    let view = ` <div class="container">
    <div class="row">
        <div class="col-md-3 ">
            <ul>
                <li><a href="index.html"><img class="mb-4" src="/image/MINDCASTS.png" alt=""></a></li>
                <li>Take charge of your <br> mental health and <br> well-being</li>
            </ul>
        </div>
        <!-- <div class="row"> -->
        <div class="col-md-3">
            <ul>
                <li><a href="/about.html" target="_blank">About Us</a></li>
                <li><a href="/host.html" target="_blank">Become a host</a></li>
            </ul>
        </div>
        <div class="col-md-3">
            <ul>
                <li><a href="/resources.html">Resources</a></li>
                <li><a href="/business.html">For Business</a></li>
            </ul>
        </div>
        <div class="col-md-3">
            <ul>
                <li><a href="/privacy-policy.html">Privacy Policy</a></li>
                <li><a href="/support.html">Support</a> </li>
                <li><a href="/tems.html">Terms Of Us</a> </li>
            </ul>
        </div>
        <!-- </div> -->
    </div>
</div> `;



    document.getElementById("footer_side").innerHTML = view




}

const events = ['mousemove', 'touchmove']
let totalEmployes = 0
$('#customRange1').val(5)

$.each(events, function (k, v) {
    $('#customRange1').on(v, function () {
        $('#employee').text($('#customRange1').val());
        let employee = $('#customRange1').val()
        totalEmployes = parseInt(employee)

        let total = 49.99 * parseInt(employee)


        $("#total").text(`$${total.toFixed(2)}`);

    });
})






$("#buyItem").on('click', function () {
    $("#buyItem").html(`<div class="loader"></div>`)
    let email_address = $("#email_address").val()
    let assignedName = $("#assignedName").val()

    if (email_address == "") {
        alert("Please provide your email address")
    } else if (assignedName == "") {
        alert("Please provide your Business Name")
    } else if(email_address != "" && assignedName != "") {

        let paymentData = {
            "assignedName": assignedName,
            "email": email_address,
            "totalUsers": totalEmployes,
            "totalMonths": 12
        }
        sessionStorage.setItem("paymentData", JSON.stringify(paymentData))

        $.ajax({
            url: "https://mindcastserver-a98c5305de98.herokuapp.com/api/v1/user/stripe-payment",
            type: "POST",
            data: paymentData,
            success: function(data, textStatus, jqXHR) {
                console.log(data);
               if(data.status==true){
                window.location.href = data.data.paymentLink.url;
               }
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error occurred!');
                $("#buyItem").html(`Buy Now`)
            }
        
        });

        
    }




})

});