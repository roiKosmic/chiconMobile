# chiconMobile

##Pre-requisite
* This application is written in HTML5/jquery/jquery mobile and need cordova to generate application for appropriate OS (Android/IOS...)
* This application connect to chic'on application cloud. Thus a chic'on server and a chic'on account is needed.
* Use the free chicon application cloud at http://www.chicon.fr/ or run your own chic'on server(source code on ChiconServer Repository)

##Configuration
Update the globalVariables.js file to point to the required chic'on server.
If you are using the free application cloud hosted on Internet you have to update from
* var serviceURL = "http://127.0.0.1/chicon/webServices/";
* var imgURL = "http://127.0.0.1/chicon/webSite/";
To
var serviceURL = "http://www.chicon.fr/chicon/webServices/";
var imgURL = "http://www.chicon.fr/chicon/webSite/";

 ##Warnings
 I have only tested this application on Android devices.
