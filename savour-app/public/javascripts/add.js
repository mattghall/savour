﻿// JS File for adding a new Restaurant etc. to the database.
var filters = [];

function GetDayJSON(day) {
    var response = "\"" + day + "\": \"";
    response += $("#" + day.toLowerCase() + "-open").val() + "-";
    response += $("#" + day.toLowerCase() + "-close").val() + "\"";
    return response;
}

function GetHours() {
    var hrs = "{";
    hrs += GetDayJSON("SUN") + ",";
    hrs += GetDayJSON("MON") + ",";
    hrs += GetDayJSON("TUE") + ",";
    hrs += GetDayJSON("WED") + ",";
    hrs += GetDayJSON("THU") + ",";
    hrs += GetDayJSON("FRI") + ",";
    hrs += GetDayJSON("SAT");
    hrs += "}";
    return hrs;
}

function GetLatLon() {
    var response = "{ \"LAT\": \"" + $("#lat").val() + "\", \"LON\": \"" + $("#lon").val() + "\"}";
    return response;
}

function RestaurantClass() {
    this.name = $("#name").val();
    this.phone = $("#phone").val();
    this.hours = GetHours();
    this.pricing = $("#priceRating").rate("getValue");
    this.rating = $("#starRating").rate("getValue");
    this.address = $("#address").val();
    this.location = GetLatLon();
    this.desc = $("#desc").val();
    this.website = $("#website").val();
    this.menu = $("#menu").val();
    this.green = $("#green").is(':checked')
    this.local = $("#local").is(':checked')
    this.ownership = $("#ownership").is(':checked')
    this.vegan = $("#vegan").is(':checked')
    this.ada = $("#ada").is(':checked')
}

function submitform() {
    var rest = new RestaurantClass();
    console.log(rest);

    $.ajax({
        url: "./add",
        type: "POST",
        data: JSON.parse(JSON.stringify(rest)),
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("could not post data");
            window.alert("Could not add Restaurant");
        }
    }).done(function () {
        window.location = "./..";
    });
}

$(function () {

    //set up for price rating
    var options = {
        max_value: 5,
        step_size: 1,
    }
    $("#priceRating").rate(options);

    //set up for rating stars
    $("#starRating").rate(options);


    $("#submitButton").click(function () {
        submitform();
    });
});

$(function () {
    $("#filter-button").click(function () {

        var val = $("#filter-add").val();
        //Add filter to database if it doesn't exist, 
        //and create new document in matches table that ties it to this restaurant
        AddBubble(val);
        $("#filter-search").val("");

    });
    $(".hotBox").click(function () {
        // TODO: Brandon put code her plz
        if (this.classList.contains("inactive")) {
            this.classList.remove("inactive")
        }
        else {
            this.classList.add("inactive")
        }
    });
});

function AddBubble(str) {
    if (!filters.includes(str)) {
        filters.push(str);
        $("#bubble-bar").append("<div class='actionBox'>" + str + "</div>");

        $(".actionBox").click(function () {
            // TODO: Brandon put code her plz
            filters.splice(filters.indexOf(str), 1);
            this.remove();
        });
    }
}