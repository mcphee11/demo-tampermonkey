# Demo Script

This is an example [tampermonkey](https://www.tampermonkey.net/) script that can be used with Genesys Cloud to demo or POC WebMessaging as well as Predective Routing. Whenever injecting JS scripts please make sure you understand the JS thats being injected and the impacts of doing so!

## Install Tampermonkey

Ok so if you dont already have Tampermonkey installed in your browser you can either go the the browser store of your choice or the official TM site [here](https://www.tampermonkey.net/) which will then link you to the web store based on the browser your using.

## Install the demo script

Now that you have it installed in the browser you can go into the "Utilities" and import the demo script. To do this go into the "Dashboard" by clicking on the icon and selecting dashboard

![](/docs/images/menu.png?raw=true)

NOTE: if the icon does not appear in the menu at the top check to see if its "Pinned" as an extension in the browser. Im using Google Chrome in this example.

From here go to the Utilities menu and type in the URL to import from

```
https://raw.githubusercontent.com/mcphee11/demo-tampermonkey/main/demoScript.js
```

Then click "Install"

![](/docs/images/install.png?raw=true)

## Config Options

The main parts of the script that you will need to edit are the "const" items at the start which are based on your own configuration. These are from the WebMessenger Deployment configuration.

```
  const deploymentId = 'ENTER_YOUR_DEPLOYMENTID'
  const region = 'ENTER_YOUR_REGION' // eg: mypurecloud.com.au
  const environment = 'ENTER_YOUR_ENVIRONMENT' // eg: apse2
```

By default im allowing this script to "match" any URL... you may want to set this to a specific website that you want to demo on. This can be changed in the top part of the config

```
// @match        http*://*/*
```

## Running the script

Now that its all installed simply ensure that its turned "on" and the script you want to run is. As over tiem you may want to make multiply different scripts for different demos etc.

![](/docs/images/running.png?raw=true)

![](/docs/images/loaded.png?raw=true)

![](/docs/images/loaded2.png?raw=true)

NOTE: To make it easier when doing different testing and demos the script inserts 2x buttons at the bottom left corner of the website. The

```
Clear Session
```

button is quite handy as you can then clear out the session and start a fresh one including the Predictive Engagment tracking. It saves you having to manually into your browser storage and cookies cleaning them out each time you want to do another test.
