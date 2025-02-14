== start
#removeAllImages: canvas
#removeContainer: menu
#clear
	->->

== fadetoBlack
#setContainer: titlecard
#delay: 3000
#removeContainer: titlecard
	->->

== fadeIn_inkwindow
#animClass: animFadeIn >> target:inkwindow, time:1000, skippable:false, wait:false, remove:true
#delay: 1500
	->DONE

== inktube_TopLeft
#setContainer: inktube >> classes: topleft
#animClass: animFlash >> target:inktube, skippable:false, wait:false, remove:false
#clear
	->DONE

== inktube_BottomRight
#setContainer: inktube >> classes: bottomright
#animClass: animFlash >> target:inktube, skippable:false, wait:false, remove:false
#clear
	->DONE

== fadeOut_inktube
#delay: 500
#animClass: animFadeOut >> target:inktube, time:1000, skippable:false, wait:true, remove:false
	->DONE

== flash_inktube
#animClass: animFlash >> target:inktube, skippable:false, wait:false, remove:false
	->DONE

== startScene
#setContainer: inkwindow
#animClass: animFadeIn >> target:inkwindow, time:1000, skippable:false, wait:true, remove:false
#delay: 1500
	->DONE

== endScene
#removeAllImages: canvas
#animClass: animFadeOut >> target:inkwindow, time:1000, skippable:false, wait:true, remove:false
#removeContainer: inkwindow
	->DONE

== startTitlecard
#clear
#setContainer: titlecard
#delay: 1000
	->DONE

== endTitlecard
#clear
#removeContainer: titlecard
	->DONE

== fadeInBackground
#animClass: animFadeIn >> target:bgContainer, time:1000, skippable:false, wait:false, remove:false
	->DONE

== setInkwindow
#setContainer: inkwindow
#delay: 1500
	->DONE

== removeInkwindow
#removeAllImages: canvas
#removeContainer: inkwindow
	->DONE

== removeBg
#removeAllImages: bgContainer
#removeContainer: bgContainer
	->DONE


== animFlash
#animClass: animFlash >> target:inkwindow, skippable:false, wait:true, remove:true
->DONE

== matchFlash
#animClass: animFlash >> target:match, skippable:false, wait:false, remove:true
->DONE

== bigFlash // for the entire bg
#animClass: animFlash >> target:bgContainer, skippable:false, wait:false, remove:true
->DONE


== clear //clearing the container but waiting a bit before the next line appears
#clear
#delay: 1000
->DONE


/* screenplay */

== setChyron
#setContainer: chyron
#clear
	->DONE

== setMatch
#setContainer: match
	->DONE

== startTitlecardSD
#clear
#setContainer: titlecard >> classes: SuddenDeath
#playSound: siren 
#delay: 1000
#stopSound: siren >> fade: 2000
	->DONE

== startTitlecardFT
#clear
#setContainer: titlecard >> classes: FullTime
	->DONE

== setGamescreen(filename)
#setContainer: gamescreen >> classes: screenplay
#removeAllImages: gamescreen
#addImage: {filename} >> target: gamescreen
<-setMatch
<- DONE

== setGameportrait(filename)
#setContainer: gameportrait >> classes: screenplay
#removeAllImages: gameportrait
#addImage: {filename} >> target: gameportrait
<-setMatch
<- DONE

== setHeatmap(filename)
#setContainer: heatmap >> classes: screenplay
#removeAllImages: heatmap
#addImage: {filename} >> target: heatmap
<-setMatch
<- DONE

== setPressure(filename)
#setContainer: pressure >> classes: screenplay
#removeAllImages: pressure
#addImage: {filename} >> target: pressure
<-setMatch
<- DONE

== setScoreworm(filename)
#setContainer: scoreworm >> classes: screenplay
#removeAllImages: scoreworm
#addImage: {filename} >> target: scoreworm
<-setMatch
<- DONE

/* sudden death specific */

== setMatchSD
#setContainer: match >> classes: suddendeath
	->DONE

== setChyronSD
#setContainer: chyron >> classes: suddendeath
#clear
	->DONE

== setGamescreenSD(filename)
#setContainer: gamescreen >> classes: screenplay suddendeath
#removeAllImages: gamescreen
#addImage: {filename} >> target: gamescreen
<-setMatch
<- DONE

== setGameportraitSD(filename)
#setContainer: gameportrait >> classes: screenplay suddendeath
#removeAllImages: gameportrait
#addImage: {filename} >> target: gameportrait
<-setMatch
<- DONE

== setHeatmapSD(filename)
#setContainer: heatmap >> classes: screenplay suddendeath
#removeAllImages: heatmap
#addImage: {filename} >> target: heatmap
<-setMatch
<- DONE

== setPressureSD(filename)
#setContainer: pressure >> classes: screenplay suddendeath
#removeAllImages: pressure
#addImage: {filename} >> target: pressure
<-setMatch
<- DONE

== setScorewormSD(filename)
#setContainer: scoreworm >> classes: screenplay suddendeath
#removeAllImages: scoreworm
#addImage: {filename} >> target: scoreworm
<- DONE

/* CREATING... IMAGES */

== bgInterview
#setContainer: bgContainer >> classes: bgInterview
#addImage: bg-interview >> target: bgContainer, classes: background
#playSound: hum >> fade:1000, volume: 0.3, loop:true
->DONE

== bgScreenplay
#removeContainer: bgContainer
#setContainer: bgContainer >> classes: bgScreenplay
#addImage: ufl-logo-pixel >> target: bgContainer, classes: background
->DONE

== bgSuddenDeath
#setContainer: bgContainer >> classes: bgScreenplay
#addImage: ufl-logo-red >> target: bgContainer, classes: background
->DONE

== bgTrouble
#setContainer: bgContainer >> classes: bgTrouble
	->DONE

== bgDrive
#setContainer: bgContainer >> classes: bgDrive
	->DONE

== replaceBg(filename)
#removeAllImages: bgContainer
#addImage: {filename} >> target: bgContainer, classes: background
	->DONE

== chapter(filename)
#removeAllImages: canvas
#addImage: {filename} >> target: chapterMarker
->DONE

