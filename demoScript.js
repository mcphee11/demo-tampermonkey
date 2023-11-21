// ==UserScript==
// @name         WebMessager CX DEFAULT
// @namespace    https://github.com/mcphee11
// @version      4.1
// @description  Genesys Cloud Demo Script
// @author       https://github.com/mcphee11/demo-tampermonkey
// @match        http*://*/*
// @grant        none
// @exclude      https://*.mypurecloud.*
// ==/UserScript==
;(function () {
  'use strict'
  if (window.location !== window.parent.location) {
    // skip for iFrames
    return
  }
  const deploymentId = 'ENTER_YOUR_DEPLOYMENTID'
  const region = 'ENTER_YOUR_REGION' // eg: mypurecloud.com.au
  const environment = 'ENTER_YOUR_ENVIRONMENT' // eg: apse2

  window.addEventListener('load', function () {
    //When document has loaded

    //Setup Support Center DIV
    if (document.location.href === 'https://customers_website.com/help') {
      var support = document.createElement('div')
      support.id = 'genesys-support-center'
      document.body.appendChild(support)
    }

    var headers = document.createElement('meta')
    headers.name = 'referrer'
    headers.content = 'no-referrer-when-downgrade'

    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
    (function (g, e, n, es, ys) {
      g['_genesysJs'] = e; g[e] = g[e] || function () { (g[e].q = g[e].q || []).push(arguments) };
      g[e].t = 1 * new Date(); g[e].c = es;
      ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
    })(window, 'Genesys', 'https://apps.${region}/genesys-bootstrap/genesys.min.js', {
      environment: '${environment}',
      deploymentId: '${deploymentId}',
      debug: true
    });`
    document.head.appendChild(headers)
    document.head.appendChild(script)

    //-------------------------------------------------------BASIC SECTION------------------------------------------------------------------------------------------------

    //Alt+9
    function PageView() {
      Genesys('command', 'Journey.pageview', {})
    }
    //Alt+8
    function databaseSet() {
      Genesys('command', 'Database.set', { messaging: { customAttributes: { varUser: 'Jeff' } } })
    }
    //Alt+7
    function FormSubmitted() {
      Genesys('command', 'Journey.record', { eventName: 'form_submitted', customAttributes: { label: 'form submitted' } })
    }
    //Alt+6
    function FormAbandoned() {
      Genesys('command', 'Journey.record', { eventName: 'form_abandoned', customAttributes: { label: 'form abandoned' } })
    }
    //Alt+5
    function webMessage() {
      Genesys('command', 'Journey.record', { eventName: 'GenericMessage', customAttributes: { label: 'Hello' } })
    }
    //Alt+4
    function Identify() {
      Genesys('command', 'Journey.pageview', { customAttributes: { email: 'jeff@test.com', givenName: 'Jeff' }, traitsMapper: [{ fieldName: 'email' }, { fieldName: 'givenName' }] })
    }
    //Alt+3
    function RemovedFromCart() {
      Genesys('command', 'Journey.record', { eventName: 'product_removed', customAttributes: { label: 'product removed' } })
    }
    //Alt+2
    function AddedToCart() {
      Genesys('command', 'Journey.record', { eventName: 'product_added', customAttributes: { label: 'product added', data: 'hello' } })
    }
    //Alt+1
    function custom() {
      Genesys('command', 'Journey.record', { eventName: 'customData', customAttributes: { label: 'KVPs', customData: 'Demo54321' } })
    }

    /////////////////////
    // HOT KEY MONITOTING
    /////////////////////
    function doc_keyUp(e) {
      if (e.altKey && e.keyCode == 49) {
        console.log('alt+1')
        custom()
      }
      if (e.altKey && e.keyCode == 50) {
        console.log('alt+2')
        AddedToCart()
      }
      if (e.altKey && e.keyCode == 51) {
        console.log('alt+3')
        RemovedFromCart()
      }
      if (e.altKey && e.keyCode == 52) {
        console.log('alt+4')
        Identify()
      }
      if (e.altKey && e.keyCode == 53) {
        console.log('alt+5')
        webMessage()
      }
      if (e.altKey && e.keyCode == 54) {
        console.log('alt+6')
        FormAbandoned()
      }
      if (e.altKey && e.keyCode == 55) {
        console.log('alt+7')
        FormSubmitted()
      }
      if (e.altKey && e.keyCode == 56) {
        console.log('alt+8')
        databaseSet()
      }
      if (e.altKey && e.keyCode == 57) {
        console.log('alt+9 - PAGEVIEW')
        PageView()
      }
    }
    document.addEventListener('keyup', doc_keyUp, false)

    //-------------------------------------------------------------------------------------------------------------------------------------------------------

    //Button to clear-Destroy GPE session cookies
    var button1 = document.createElement('div')
    button1.innerHTML = '<button id="myButton" type="button">Clear Session</button>'
    button1.setAttribute('id', 'myContainer')
    document.body.appendChild(button1)

    //--- Activate the newly added button.
    document.getElementById('myButton').addEventListener('click', sessionClear, false)

    function sessionClear() {
      localStorage.removeItem(`_${deploymentId}:gcmcopn`)
      localStorage.removeItem(`_${deploymentId}:gcmcsessionActive`)
      Genesys('command', 'Identifiers.purgeAll')
      console.log('GPE & WebMessenger Session Destroyed')
      document.location.reload()
    }
    //Button to login session
    var button2 = document.createElement('div')
    button2.innerHTML = '<button id="myButton1" type="button">Identify Session</button>'
    button2.setAttribute('id', 'myContainer1')
    document.body.appendChild(button2)

    //--- Activate the newly added button.
    document.getElementById('myButton1').addEventListener('click', sessionIdentify, false)

    function sessionIdentify() {
      Identify()
      console.log('GPE Session Identified')
    }
  }) //End of on ready
})()
