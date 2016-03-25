# chiconMobile
## Android End User
The application is not yet available on Google play store. Check out our wiki to install the application on your android smartphone:
https://github.com/roiKosmic/chiconMobile/wiki/How-to-install-and-use-chiconMobile-on-Android-device

## Developper
###Pre-requisite
* This application is written in HTML5/jquery/jquery mobile and need cordova to generate application for appropriate OS (Android/IOS...)
* This application connect to chic'on application cloud. Thus a chic'on server and a chic'on account is needed.
* Use the free chicon application cloud at http://www.chicon.fr/ or run your own chic'on server(source code on ChiconServer Repository)

###Cordova
* Create your project
```
cordova create chiconMobile com.chicon.mobile ChiconMobile  
```
* Build for your platform (Here android)
```
cd chiconMobile
cordova platform add android 
```
* Update android manifest to allow Internet connection
``` 
cd chiconMobile\platforms\android\AndroidManifest.xml
``` 
``` xml
<uses-permission android:name="android.permission.INTERNET" />
```
* copy the www folder contents to chiconMobile\www
* Build your project
``` 
cd chiconMobile
cordova build android
``` 

###Configuration
Update the globalVariables.js file to point to the required chic'on server.
If you are NOT using the free application cloud hosted on Internet you have to update from
* var serviceURL = "http://www.chicon.fr/chicon/webServices/";
* var imgURL = "http://www.chicon.fr/chicon/webSite/";   
TO
* var serviceURL = "http://[YOUR_SERVER_IP_OR_NAME]/chicon/webServices/";
* var imgURL = "http://[YOUR_SERVER_IP_OR_NAME]/chicon/webSite/";   


###Warnings
I have only tested this application on Android devices.
