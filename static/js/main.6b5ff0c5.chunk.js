(this.webpackJsonpumavoice=this.webpackJsonpumavoice||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n.p+"static/media/arrow.607bb7c9.svg"},,,,,,function(e,t,n){e.exports=n(30)},,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/listener-one.2c38ffbb.svg"},function(e,t,n){},function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/stop.6af5a914.svg"},function(e,t,n){e.exports=n.p+"static/media/microphone.28cb80de.svg"},function(e,t,n){e.exports=n.p+"static/media/listening.520d9eb6.svg"},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),c=n(9),a=n.n(c),s=(n(19),n(20),n(10)),i=n(1),u=n.n(i),l=n(2),h=n(3),d=n(4),p=n(13),f=n(11);n(22),n(23);function m(e){return r.a.createElement("section",{className:"listener-area"},r.a.createElement("div",{className:"listener-wrapper"},r.a.createElement("img",{src:n(24),alt:"Listener Default Expression"}),r.a.createElement("div",{className:"bubble"},r.a.createElement("p",null,"That's it!"),r.a.createElement("p",null,"Good job!"))))}n(25);function g(e){var t=e.sentenceInfo,n=e.results,o=e.setWordSelected,c=e.wordSelected;return r.a.createElement("section",{className:"sentence-area"},r.a.createElement("div",{className:"phonetic-area"},c.phoneticValue?r.a.createElement("span",null,c.phoneticValue):r.a.createElement("span",{className:"unselected"}," Tap the word for more info ")),r.a.createElement("div",{className:"sentence-to-speech"},t.map((function(e,t){return r.a.createElement("span",{key:t,className:c.word===e.word?"word selected":"word",onClick:function(){return o(e)}},e.word)}))),r.a.createElement("div",{className:"result-area"},n.map((function(e,t){return e?r.a.createElement("span",{key:t,className:"correct"}):r.a.createElement("span",{key:t,className:"incorrect"})}))))}n(26);function v(e){var t=e.record,o=e.stop,c=e.isRecording;return r.a.createElement("section",{className:"actions-area"},r.a.createElement("button",{className:"arrow left"},r.a.createElement("img",{src:n(8),alt:"Previous Exercise"})),r.a.createElement("div",{className:"center-actions"},r.a.createElement("button",{className:"listen"},r.a.createElement("img",{src:n(29),alt:"Listen to example"})),c?r.a.createElement("button",{className:"stop",onClick:o},r.a.createElement("img",{src:n(27),alt:"Stop recording"})):r.a.createElement("button",{className:"talk",onClick:t},r.a.createElement("img",{src:n(28),alt:"Start recording"}))),r.a.createElement("button",{className:"arrow right"},r.a.createElement("img",{src:n(8),alt:"Next Exercise"})))}var w=n(12),S=function(){function e(){Object(h.a)(this,e),this.recognition=void 0,this.forceStop=!1,this.finalSpeechResult=[];var t=window.speechRecognition||window.webkitSpeechRecognition;t&&(this.recognition=new t,this.builder())}return Object(d.a)(e,[{key:"startSpeechToText",value:function(){var e=this;return new Promise((function(t,n){try{e.recognition.lang="en-US",e.recognition.interimResults=!1,e.recognition.maxAlternatives=1,e.recognition.continuous=!0,e.recognition.speechResult=[],e.recognition.start(),e.recognition.onaudiostart=function(e){t(!0)}}catch(o){console.log(o),n(!1)}}))}},{key:"stopSpeechToText",value:function(){this.finalSpeechResult=this.recognition.speechResult,this.forceStop=!0,this.recognition.abort()}},{key:"getFinalSpeech",value:function(){var e=this;return new Promise((function(t){t(e.finalSpeechResult.join(" "))}))}},{key:"builder",value:function(){var e=this;this.recognition.onresult=function(e){var t,n=e.results[e.results.length-1][0].transcript.toLowerCase(),o=e.results[e.results.length-1][0].confidence;(t=this.speechResult).push.apply(t,Object(w.a)(n.trim().split(" "))),console.log(this.speechResult),console.log("Confidence: "+o)},this.recognition.onspeechend=function(){e.recognition.stop()},this.recognition.onerror=function(e){console.log("Error occurred in recognition:"),console.log(e)},this.recognition.onaudioend=function(e){console.log("SpeechRecognition.onaudioend")},this.recognition.onend=function(t){console.log("SpeechRecognition.onend"),e.forceStop?e.forceStop=!1:(e.startSpeechToText(),console.log("Starting again"))},this.recognition.onnomatch=function(e){console.log("SpeechRecognition.onnomatch")},this.recognition.onsoundstart=function(e){console.log("SpeechRecognition.onsoundstart")},this.recognition.onsoundend=function(e){console.log("SpeechRecognition.onsoundend")},this.recognition.onspeechstart=function(e){console.log("SpeechRecognition.onspeechstart")},this.recognition.onstart=function(e){console.log("SpeechRecognition.onstart")}}}]),e}();function b(e){var t=new FormData;t.append("audioData",e);var n={method:"POST",body:t};return new Promise((function(e,t){fetch("/api",n).then((function(e){return e.json()})).then((function(t){e(t)})).catch((function(e){t(e)}))}))}var x=function(){function e(){Object(h.a)(this,e),this.mediaRecorder=void 0,this.chunks=void 0,this.chunks=[]}return Object(d.a)(e,[{key:"stopSpeechToText",value:function(){this.mediaRecorder.stop(),console.log("recorder stopped"),window.streamReference.getAudioTracks().forEach((function(e){e.stop()})),window.streamReference=null,console.log("recorder released"),console.log(this.chunks)}},{key:"startSpeechToText",value:function(){var e=this;return console.log("micCue hit"),new Promise((function(t,n){if(navigator.mediaDevices.getUserMedia){console.log("getUserMedia supported."),e.chunks=[];navigator.mediaDevices.getUserMedia({audio:!0}).then((function(n){window.streamReference=n,e.mediaRecorder=new MediaRecorder(window.streamReference),e.mediaRecorder.start(1e3),console.log(e.mediaRecorder.state),console.log("recorder started"),e.mediaRecorder.ondataavailable=function(t){e.chunks.push(t.data)},t(!0)}),(function(e){console.log("The following error occured: "+e),n(!1)}))}else console.log("getUserMedia not supported on your browser!"),n(!1)}))}},{key:"clearChunks",value:function(){this.chunks=[]}},{key:"mountFile",value:function(){var e=new Blob(this.chunks,{type:"audio/webm; codecs=opus"});return this.clearChunks(),new File([e],"webAudio.webm",{type:"audio/webm"})}},{key:"getFinalSpeech",value:function(){var e=this;return new Promise(function(){var t=Object(l.a)(u.a.mark((function t(n,o){var r,c,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.mountFile(),t.next=3,b(r);case 3:c=t.sent,a=c.text,n(a);case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}())}}]),e}(),k=function(e){var t;return null===(t=(new DOMParser).parseFromString(e,"text/html").querySelector(".IPA"))||void 0===t?void 0:t.textContent},E=function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://en.wiktionary.org/api/rest_v1/page/html/"+t).then((function(e){return e.text()})).then((function(e){return k(e)})).then((function(e){return String(e)})).catch((function(e){return console.error(e),""}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var o,r;return Object(h.a)(this,n),(o=t.call(this,e)).sentenceText="Nice to meet you",o.startSpeech=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.state.speechToText,e.next=3,t.startSpeechToText();case 3:e.sent&&(!0,o.setState({isRecording:!0}));case 5:case"end":return e.stop()}}),e)}))),o.stopSpeech=function(){o.state.speechToText.stopSpeechToText();o.setState({isRecording:!1}),o.setResult()},o.setResult=Object(l.a)(u.a.mark((function e(){var t,n,r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.state.speechToText,e.next=3,t.getFinalSpeech();case 3:n=e.sent,console.log("Final Speech: %c"+n,"font-family:system-ui;font-size:1rem;font-weight:bold"),"Nice to meet you",r=n.toLowerCase()==="Nice to meet you".toLowerCase(),(c=o.state.results).push(r),c.length>3&&c.shift(),o.setState({results:c});case 11:case"end":return e.stop()}}),e)}))),o.setSentenceInfo=Object(l.a)(u.a.mark((function e(){var t,n,r,c,a,i,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=o.sentenceText,n=t.split(" "),r=[],c=Object(s.a)(n),e.prev=4,c.s();case 6:if((a=c.n()).done){e.next=14;break}return i=a.value,e.next=10,E(i);case 10:l=e.sent,r.push({word:i,phoneticValue:l});case 12:e.next=6;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(4),c.e(e.t0);case 19:return e.prev=19,c.f(),e.finish(19);case 22:o.setState({sentenceInfo:r});case 23:case"end":return e.stop()}}),e,null,[[4,16,19,22]])}))),o.setWordSelected=function(e){e.word===o.state.wordSelected.word&&(e={word:"",phoneticValue:""}),o.setState({wordSelected:e})},r=e.serverSpeechValidation?new x:new S,o.state={results:[],speechToText:r,isRecording:!1,sentenceInfo:[{word:"loading...",phoneticValue:""}],wordSelected:{word:"",phoneticValue:""}},o}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.setSentenceInfo()}},{key:"render",value:function(){return r.a.createElement("div",{className:"exercise-wrapper"},r.a.createElement(m,null),r.a.createElement(g,{sentenceInfo:this.state.sentenceInfo,results:this.state.results,setWordSelected:this.setWordSelected,wordSelected:this.state.wordSelected}),r.a.createElement(v,{record:this.startSpeech,stop:this.stopSpeech,isRecording:this.state.isRecording}))}}]),n}(r.a.Component);var y=function(){return r.a.createElement(R,{serverSpeechValidation:!1})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.6b5ff0c5.chunk.js.map